"use client";
import React from 'react';
import MedicationCard from "@/components/ui/MedicationCard";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from 'react';

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const medicationData = [
        { id: 1, imageSrc: '/images/LPN05141.jpg', name: 'Lisinopril', description: 'High blood pressure', time: '10:00 AM', dosage: '10mg' },
        { id: 2, imageSrc: '/images/s-l1200.webp', name: 'Ibuprofen', description: 'Pain relief', time: '9:00 AM', dosage: '200mg' },
        { id: 3, imageSrc: '/images/s-l1200.webp', name: 'Ibuprofen', description: 'Pain relief', time: '11:00 AM', dosage: '200mg' },
        { id: 4, imageSrc: '/images/s-l1200.webp', name: 'Ibuprofen', description: 'Pain relief', time: '11:00 AM', dosage: '200mg' },
        { id: 5, imageSrc: '/images/s-l1200.webp', name: 'Ibuprofen', description: 'Pain relief', time: '11:00 AM', dosage: '200mg' },
        { id: 6, imageSrc: '/images/s-l1200.webp', name: 'Ibuprofen', description: 'Pain relief', time: '11:00 AM', dosage: '200mg' },
        { id: 7, imageSrc: '/images/s-l1200.webp', name: 'Ibuprofen', description: 'Pain relief', time: '11:00 AM', dosage: '200mg' },

    ];
    const [medData, setMedicationData] = useState(medicationData);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [time, setTime] = useState("")
    const [dosage, setDosage] = useState("")
    const [image, setImage] = useState("")
    // Function to convert AM/PM time to 24-hour format
    const convertTo24HourFormat = (time: string) => {
        const [hour, minute, period] = time.split(/:| /);
        let hour24 = parseInt(hour, 10);
        if (period === 'PM' && hour24 !== 12) {
            hour24 += 12;
        } else if (period === 'AM' && hour24 === 12) {
            hour24 = 0;
        }
        return `${hour24.toString().padStart(2, '0')}:${minute}`;
    };

    function add_to_med(e: any) {
        console.log("add_to_med")
        e.preventDefault();
        setMedicationData([
            ...medData,
            {
                id: medData.length + 1,
                imageSrc: image,
                name: name,
                description: description,
                time: time,
                dosage: dosage,
            },
        ]);
    }
    return (
        // <div className = "h-full relative">
        //     <main>
        //         MAIN CONTENT ( Medication)
        //         {children}
        //     </main>
        //     <div>
        //         NAVBAR
        //     </div>
        // </div>

        <div className="flex flex-col min-h-screen" >
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

            <div className="pl-6 pt-10 pb-6 pr-6">

                {/* header */}
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-600 text-[24px] font-bold font-['Inter']">
                    Simplify Medication - <br />Trust Medication</div>


                {/* search bar */}
                <div className="flex pl-2 pt-2 pb-2 w-full h-fit bg-neutral-50 rounded-3xl border border-slate-50">
                    <i className="fas fa-search text-sm" ></i>
                    <input type="text" className="pl-2 w-full bg-neutral-50 text-zinc-400 text-xs font-normal font-['Inter']" placeholder="Search through your medication" />
                </div>

            </div>



            {/* list */}
            <div className="flex flex-col pl-6 pr-6">

                {/* text and see all */}
                <div className="flex flex-row justify-between">

                    {/* Your Medication */}
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-sky-600 text-base font-semibold font-['Inter']">Your Medication</div>


                    {/* add new medication popup button */}
                    {/* example: { id: 2, imageSrc: '/images/s-l1200.webp', name: 'Ibuprofen', description: 'Pain relief', time: '9:00 AM', dosage: '200mg' }, */}
                    <Dialog >
                        <DialogTrigger className="flex items-center text-teal-600 text-xs font-normal font-['Inter']">
                            Add New Medication</DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]" >
                            <form onSubmit={add_to_med}>
                                <DialogHeader>
                                    <DialogTitle>Add New Medication</DialogTitle>
                                    <DialogDescription>
                                        Fill out the information for the new medication. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            required
                                            placeholder="e.g. Ibuprofen"
                                            className="col-span-3"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            required
                                            value={description}
                                            placeholder="e.g. Pain relief"
                                            className="col-span-3"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="time" className="text-right">
                                            Time
                                        </Label>
                                        <Input
                                            id="time"
                                            required
                                            value={time}
                                            placeholder="e.g. 9:00 AM"
                                            className="col-span-3"
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dosage" className="text-right">
                                            Dosage
                                        </Label>
                                        <Input
                                            id="dosage"
                                            required
                                            value={dosage}
                                            placeholder="e.g. 200mg"
                                            className="col-span-3"
                                            onChange={(e) => setDosage(e.target.value)}
                                        />
                                    </div>
                                    {/* input image, force required*/}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="image" className="text-right">
                                            Image
                                        </Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            required
                                            value={image}
                                            className="col-span-3"
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" onClick={add_to_med}>Add to Your Medication</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>


                </div>

                {medData
                    .sort((a, b) => {
                        const timeA = convertTo24HourFormat(a.time);
                        const timeB = convertTo24HourFormat(b.time);
                        return timeA.localeCompare(timeB);
                    })
                    .map((medication) => (
                        <MedicationCard
                            key={medication.id}
                            imageSrc={medication.imageSrc}
                            name={medication.name}
                            description={medication.description}
                            time={medication.time}
                            dosage={medication.dosage}
                        />
                    ))}
            </div>

            {/* flexgrow fill */}
            <div className="flex-grow"></div>

            {/* Navbar */}

            <div className="w-full pb-4.5 fixed bottom-0 left-0 shadow-md flex content-around justify-around items-center">
                <div className="w-6 h-6 relative">
                    <i className="fas fa-home"></i>
                </div>
                <div className="w-6 h-6 relative">
                    <label htmlFor="camera-input">
                        <i className="fas fa-camera"></i>
                    </label>
                    <input id="camera-input" type="file" accept="image/*" capture="environment" className="hidden" />
                </div>
                <div className="w-6 h-6 relative">
                    <i className="fas fa-user"></i>
                </div>
            </div>
        </div>

    );
}

export default DashboardLayout;