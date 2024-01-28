import React from 'react';
import MedicationCard from "@/components/ui/MedicationCard";

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
                    Simplify Medication - <br/>Trust Medication</div>
                    
                
                {/* search bar */}
                <div className="flex pl-2 pt-2 pb-2 w-full h-fit bg-neutral-50 rounded-3xl border border-slate-50">
                    <i className="fas fa-search text-sm" ></i>
                    <input type="text" className="pl-2 w-full bg-neutral-50 text-zinc-400 text-xs font-normal font-['Inter']" placeholder="Search through your medication"/>
                </div>

            </div>


            
            {/* list */}
            <div className="flex flex-col pl-6 pr-6">

                {/* text and see all */}
                <div className="flex flex-row justify-between">
                    
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-sky-600 text-base font-semibold font-['Inter']">Your Medication</div>
                    <div className="flex items-center text-teal-600 text-xs font-normal font-['Inter']">Add New Medication</div>
                
                </div>
                
                {medicationData
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