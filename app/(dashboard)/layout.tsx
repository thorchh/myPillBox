const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
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
                <div className="text-gray-900 text-[24px] font-semibold font-['Inter']">
                    Simplify Medication - <br/>Trust Medication
                </div>
                    
                
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
                    <div className="text-gray-900 text-base font-semibold font-['Inter']">Your Medication</div>
                    <div className="text-teal-600 text-xs font-normal font-['Inter']">Add New Medication</div>
                </div>
                
                {/* card */}
                <div className="flex flex-row pr-6 h-[125px] border rounded-lg border-emerald-50">
                    <div className="MedImage pl-1.5 pt-1.5 pr-1.5 pb-1.5">
                        <img className=" rounded-lg w-[110px] h-[110px]" src="https://via.placeholder.com/125x125" />
                    </div>
                    
                    <div className="pl-1 flex flex-col">
                        {/* name & description */}
                        <div className="DrugName w-full pt-4 pb-0.5 text-gray-900 text-lg font-semibold font-['Inter']">Lisinopril</div>
                        <div className="DrugDescription w-full pb-0.5 text-zinc-400 text-xs font-medium font-['Inter']">High blood pressure</div>
                        
                        <div className="w-fit">
                            {/* time */}
                            <div className="flex GreenBox pl-2 pr-2 w-full h-fit pt-1 pb-1 bg-emerald-50 rounded-sm">
                                {/* <img className="w-[11px] h-[11px] " src="https://via.placeholder.com/11x10" /> */}
                                <i className="fas fa-clock text-sm" style={{ color: '#199A8E' }}></i>
                                <div className="pl-1 text-teal-600 text-xs font-medium font-['Inter']">
                                    9:00 AM
                                </div>
                            </div>

                            {/* dosage */}
                            <div className="flex OrangeBox mt-1 pl-2 pr-2 w-fit h-fit pt-1 pb-1 bg-orange-50 rounded-sm">
                                {/* <img className="w-[11px] h-[11px] " src="https://via.placeholder.com/11x10" /> */}
                                <i className="fas fa-prescription-bottle" style={{ color: "orange" }}></i>
                                <div className="pl-1 text-orange-600 text-xs font-medium font-['Inter']">
                                    10mg
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
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