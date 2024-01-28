import Image from "next/image";
import { Inter } from "next/font/google"
import moment from "moment"
import { Button } from "./button";

const inter = Inter({ subsets: ["latin"] });
const currentTime = moment().format('LLL');

export default function Popup({ pills, changeState }: { pills: string[], changeState: () => void } ) {
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white w-full h-full flex flex-col items-center">
          <div className="mt-10 w-[102px] h-[102px] bg-violet-50 rounded-full mb-5 justify-center flex flex-col items-center" >
            <Image 
                alt="Done"
                src="/done_24px.svg"
                width={57}
                height={57}
            />
          </div>
          <div className="text-black text-center font-bold mb-3">
            {pills.join(", ")}
            {/* That's the correct Medication */}
          </div>
          <div className="text-emerald-600 text-pretty text-center font-bold mb-3">
          {currentTime}
          </div>
          <Button className="bg-transparent hover:bg-transparent" onClick={changeState}>
              <div className="w-[182px] h-[56px] bg-emerald-600 rounded-full mt-5 justify-center flex flex-col items-center text-White">
                  Back to home
              </div>
          </Button>
        </div>
      </div>
    </div>
  </>

  );
}