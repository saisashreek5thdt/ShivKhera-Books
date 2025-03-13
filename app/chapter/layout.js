import React from 'react'
import bgImage from "../../public/chapterBG.png"
export default function Layout({children}) {
  return (
    <>
     <div
          className="h-screen w-full flex items-center justify-center cursor-none"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Your content goes here */}
          {children}
        </div>
        
    </>
  )
}

 