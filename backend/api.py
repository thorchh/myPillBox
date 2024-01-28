from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from PIL import Image
from ultralytics import YOLO
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import pickle
import cv2
import numpy as np
import torch
import torchvision
import torch
from segment_anything import sam_model_registry
from segment_anything import SamAutomaticMaskGenerator
import supervision as sv

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost/dbname'
db = SQLAlchemy(app)

# DEVICE = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
# MODEL_TYPE = "vit_b"

# sam = sam_model_registry[MODEL_TYPE](checkpoint='/Users/jason/Desktop/pushin-pill/sam_vit_b_01ec64.pth')
# sam.to(device=DEVICE)

# mask_generator = SamAutomaticMaskGenerator(sam)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    time_registered = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Medication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(120), nullable=False)
    shedule = db.Column(db.String(120), nullable=False)
    dosage = db.Column(db.String(120), nullable=False)

class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    filename = db.Column(db.String(120), nullable=False)
    time_uploaded = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    prediction = db.Column(db.String(500), nullable=False)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'username and password required'}), 400
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'user created'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'username and password required'}), 400
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'invalid username or password'}), 401
    return jsonify({'message': 'login successful'}), 200

@app.route('/medication', methods=['POST'])
def add_medication():
    data = request.get_json()
    name = data.get('name')
    shedule = data.get('shedule')
    dosage = data.get('dosage')
    if not name or not shedule or not dosage:
        return jsonify({'error': 'name, shedule and dosage required'}), 400
    new_medication = Medication(name=name, shedule=shedule, dosage=dosage)
    db.session.add(new_medication)
    db.session.commit()
    return jsonify({'message': 'medication added'}), 201

@app.route('/medication', methods=['GET'])
def get_medication():
    medications = Medication.query.all()
    return jsonify([medication.name for medication in medications]), 200



model = YOLO('best.pt')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'no file'}), 400
    file = request.files['file']
    filename = secure_filename(file.filename)
    filename = 'images/' + filename

    img = Image.open(file)
    img = img.resize((360, 240))
    img.save(filename)
    img = cv2.imread(filename)

    # hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # lower_pill = np.array([70, 70, 0])
    # upper_pill = np.array([255, 255, 255])
    # mask = cv2.inRange(hsv, lower_pill, upper_pill)
    # img = cv2.bitwise_and(img, img, mask=mask)

    # image_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    # result = mask_generator.generate(image_rgb)
    # print(result)
    # return jsonify({'message': 'success'}), 200

    mask = np.zeros(img.shape[:2], np.uint8)
    rect = (100, 40, 260, 200)
    bgdModel = np.zeros((1,65),np.float64)
    fgdModel = np.zeros((1,65),np.float64)
    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
    img = img*mask2[:,:,np.newaxis]
    cv2.imwrite(filename, img)

    img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    non_black_pixels_mask = np.any(img != [0, 0, 0], axis=-1)
    current_avg_saturation = np.mean(img_hsv[non_black_pixels_mask, 1])
    ratio = (0.25 * 255) / current_avg_saturation
    img_hsv[..., 1] = img_hsv[..., 1] * ratio
    img_hsv[..., 1] = np.clip(img_hsv[..., 1], 0, 255)
    img = cv2.cvtColor(img_hsv, cv2.COLOR_HSV2BGR)
    cv2.imwrite(filename, img)

    current_avg_brightness = np.mean(img[non_black_pixels_mask])
    brightness_ratio = 0.5 * 255 / current_avg_brightness
    img[non_black_pixels_mask] = cv2.convertScaleAbs(img[non_black_pixels_mask], alpha=brightness_ratio)

    background = cv2.imread('background.jpg')
    coords = np.array(np.nonzero(mask))
    top_left = np.min(coords, axis=1)
    bottom_right = np.max(coords, axis=1)
    cropped_img = img[top_left[0]:bottom_right[0]+1, top_left[1]:bottom_right[1]+1]
    resized_img = cv2.resize(cropped_img, (60, int(img.shape[0] / img.shape[1] * 60)))
    x = background.shape[1]//2 - resized_img.shape[1]//2 + 20
    y = background.shape[0]//2 - resized_img.shape[0]//2 + 20
    dark_threshold = 70
    resized_non_black_pixels_mask = np.all(resized_img > dark_threshold, axis=-1)
    resized_non_black_pixels_mask = cv2.GaussianBlur(resized_non_black_pixels_mask.astype(float), (5,5), 0)
    resized_non_black_pixels_mask = resized_non_black_pixels_mask > 0.5
    non_dark_pixels_mask_color = np.stack([resized_non_black_pixels_mask]*3, axis=-1)    
    background[y:y+resized_img.shape[0], x:x+resized_img.shape[1]][non_dark_pixels_mask_color] = resized_img[non_dark_pixels_mask_color]        
    img = background
    cv2.imwrite(filename, img)
    
    results = model(img)
    prediction = results[0].tojson()
    photo = Photo(filename=filename, prediction=prediction)
    # db.session.add(photo)
    # db.session.commit()
    return prediction

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)