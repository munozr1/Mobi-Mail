

import Image from "next/image";

export default function NavBar({children}) {
  //TODO: Add delete email functionality. Delete email call, then refresh email list.
  return (
    <nav className="w-full h-14 shadow-md flex justify-between">
      <span className="inline-flex h-16 w-16 items-center justify-center ml-8">
        <svg width="454" height="238" viewBox="0 0 454 238" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M238.039 237.79H0V0H54.7383L118.914 118.79L182.881 0H238.039V237.79Z" fill="#6B7280"/>
        <path d="M312 157.5H290L265.5 234H286L301 206.5L317 234H338L312 157.5Z" fill="#6B7280"/>
        <path d="M365 234V157.5H383.5V234H365Z" fill="#6B7280"/>
        <path d="M414.5 234V157.5H430V220.5H440H453.5V234H414.5Z" fill="#6B7280"/>
        </svg>
      </span>
      <div className="inline-flex items-center justify-between w-60 ">
      {children}
      </div>

      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 float-right mt-1 mr-8">
        <span className="text-white">TW</span>
      </span>
    </nav>
  );

}
