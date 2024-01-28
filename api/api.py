from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from PIL import Image, ExifTags, ImageFilter
from ultralytics import YOLO
import cv2

app = Flask(__name__)

model = YOLO('best.pt')

def correct_orientation(img):
    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == 'Orientation':
                break
        exif = dict(img._getexif().items())

        if exif[orientation] == 3:
            img = img.rotate(180, expand=True)
        elif exif[orientation] == 6:
            img = img.rotate(270, expand=True)
        elif exif[orientation] == 8:
            img = img.rotate(90, expand=True)
    except (AttributeError, KeyError, IndexError):
        pass
    return img

def maintain_aspect_ratio(img, desired_size):
    old_size = img.size
    ratio = min(float(desired_size[i]) / old_size[i] for i in range(len(old_size)))
    new_size = tuple([int(i*ratio) for i in old_size])
    img = img.resize(new_size, Image.LANCZOS)
    img = img.filter(ImageFilter.SMOOTH)
    return img

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'no file'}), 400
    file = request.files['file']
    filename = secure_filename(file.filename)
    filename = 'images/' + filename

    img = Image.open(file)
    img = correct_orientation(img)
    img = maintain_aspect_ratio(img, (480, 640))
    img.save(filename)
    img = cv2.imread(filename)

    results = model(img)
    prediction = results[0].tojson()
    return prediction

if __name__ == '__main__':
    app.run(debug=False)