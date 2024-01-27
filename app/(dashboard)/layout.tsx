const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <div className = "h-full relative">
            <main>
                MAIN CONTENT ( Medication)
                {children}
            </main>
            <div>
                NAVBAR
            </div>
        </div>
            
     );
}
 
export default DashboardLayout;