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

            <div className="pl-6 pt-10 pb-6">

                {/* header */}
                <div className="text-gray-900 text-[24px] font-semibold font-['Inter']">
                    Simplify Medication - <br/>Trust Medication
                </div>
                    
                
                {/* search bar */}
                <div className="flex flex-row justify-around pt-4 pr-6">
                    <img className="w-[11px] h-[11px] flex" src="https://via.placeholder.com/11x10" />
                    <input type="text" className="w-full h-10 bg-neutral-50 rounded-3xl border border-emerald-50 pl-12 text-zinc-400 text-xs font-normal font-['Inter']" placeholder="Search through your medication"/>
                </div>

            </div>


            
            {/* list */}
            <div className="flex flex-col pl-6 pr-6">

                {/* text and see all */}
                <div className="flex flex-row justify-between">
                    <div className="text-gray-900 text-base font-semibold font-['Inter']">Your Medication</div>
                    <div className="text-teal-600 text-xs font-normal font-['Inter']">See all</div>
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
                        
                        {/* time */}
                        <div className="flex GreenBox h-[18px] bg-emerald-50 rounded-sm">
                            <img className="w-[11px] h-[11px] " src="https://via.placeholder.com/11x10" />
                            <div className=" text-teal-600 text-xs font-medium font-['Inter']">9:00 AM</div>
                        </div>
                    </div>
                </div>
                    
                <div className="flex w-6 h-6 justify-center items-center">
                    PLUS
                </div>
            </div>

            {/* flexgrow fill */}
            <div className="flex-grow"></div>

            {/* Navbar */}

            <div className="w-full shadow-md flex content-around justify-around items-center">
                <div className="w-6 h-6 relative">
                    1
                </div>
                <div className="w-6 h-6 relative">
                    2
                </div>
                <div className="w-6 h-6 relative">
                    3
                </div>
            </div>


        </div>
            
     );
}
 
export default DashboardLayout;