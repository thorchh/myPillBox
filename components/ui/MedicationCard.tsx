import React from 'react';

export default function MedicationCard({ imageSrc, name, description, time, dosage }: { imageSrc: string, name: string, description: string, time: string, dosage: string }) {
  return (
    <div className="flex flex-row pr-6 h-[125px] border rounded-lg border-emerald-50">
      <div className="MedImage pl-1.5 pt-1.5 pr-1.5 pb-1.5">
        <img className="rounded-lg w-[110px] h-[110px]" src={imageSrc} alt="Medicine" />
      </div>

      <div className="pl-1 flex flex-col">
        <div className="DrugName w-full pt-4 pb-0.5 text-gray-900 text-lg font-semibold font-['Inter']">{name}</div>
        <div className="DrugDescription w-full pb-0.5 text-zinc-400 text-xs font-medium font-['Inter']">{description}</div>

        <div className="w-fit">
          <div className="flex GreenBox pl-2 pr-2 w-full h-fit pt-1 pb-1 bg-emerald-50 rounded-sm">
            <i className="fas fa-clock text-sm" style={{ color: '#199A8E' }}></i>
            <div className="pl-1 text-teal-600 text-xs font-medium font-['Inter']">{time}</div>
          </div>

          <div className="flex OrangeBox mt-1 pl-2 pr-2 w-fit h-fit pt-1 pb-1 bg-orange-50 rounded-sm">
            <i className="fas fa-prescription-bottle" style={{ color: 'orange' }}></i>
            <div className="pl-1 text-orange-600 text-xs font-medium font-['Inter']">{dosage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
