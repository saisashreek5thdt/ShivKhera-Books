"use client"
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const animationCount = useRef(0);

  const handleAnimationEnd = () => {
    animationCount.current += 1;
    if (animationCount.current === 2) {
      setTimeout(() => setTextVisible(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen flex flex-col items-center justify-center text-white -gap-10">
      {/* Animated Main Text */}
      <div className=" flex flex-col items-center justify-center uppercase ">
        <div className="overflow-hidden" >
          <p 
            className="animate-reveal font-medium text-[85px]  " 
            onAnimationEnd={handleAnimationEnd}
          >
            You Can
          </p>
        </div>
        <div className="overflow-hidden">
          <p 
            className="animate-reveal font-semibold text-[210px] -mt-20" 
            onAnimationEnd={handleAnimationEnd}
          >
            Win
          </p>
        </div>
      </div>

      {/* Bottom Content Container */}
      <div className="relative -mt-10 flex items-center justify-center footLightMtPro">
        {/* Fading Text */}
        <p
          className={`quote-font font-normal text-[35px] text-center transition-opacity duration-500 ${
            textVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Winners don&apos;t do different things,<br /> they do things differently
        </p>

        {/* Animated Hover Button */}
        {!textVisible && (
          <Link href={`/main`} onClick={()=>{}} className="group absolute w-64 h-12 bg-gray-600 text-black text-2xl rounded-full overflow-hidden shadow-lg transition-all duration-300 flex items-center justify-center">
            <span className="relative z-10 text-center quote-font font-bold">Get in</span>
            <div 
              className="absolute inset-0 bg-white rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
              style={{ transformOrigin: 'bottom' }}
            />
          </Link>
        )}
      </div>
    </div>
  );
}