"use client"
import {useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { chapterData } from '@/app/(utils)/chapterData';
import { chapters } from '@/app/(utils)/chapterFullInfo';
import { CiHome, CiMenuBurger } from "react-icons/ci";
import Link from 'next/link';
import { IoChevronBackCircleOutline ,IoChevronForwardCircleOutline} from "react-icons/io5";
import { TbCircleChevronsLeft } from "react-icons/tb";
export default function ChapterPage() {
  const { id } = useParams();
  const content = chapters.find((c) => c.id === id) || {};
  const metadata = chapterData.find((c) => c.id === id) || {};
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentChapterIndex = chapters.findIndex(c => c.id === id);
  const hasPrevious = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < chapters.length - 1;

  // Refs for title and info elements
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const paragraphContainerRef = useRef(null);
  const videoRef = useRef(null);


  // Initialize paragraphRefs with an array of null values
  const paragraphRefs = useRef(Array(content.content?.length).fill(null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-20');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    // Observe title and info elements
    if (titleRef.current) observer.observe(titleRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  useEffect(() => {
    const hideTitleAndInfo = setTimeout(() => {
      titleRef.current?.classList.add('hidden');
      infoRef.current?.classList.add('hidden');
      showParagraphsSequentially();
    }, 5000);

    return () => clearTimeout(hideTitleAndInfo);
  }, []);// 5 seconds delay

  const showParagraphsSequentially = () => {
    const paragraphs = content.content || [];
    let totalDuration = 0;

    paragraphs.forEach((paragraph, index) => {
      const typingSpeed = 50; // Speed in milliseconds per character
      const paragraphDuration = paragraph.length * typingSpeed;

      setTimeout(() => {
        if (paragraphRefs.current[index]) {
          paragraphRefs.current[index].classList.remove('hidden');
          paragraphRefs.current[index].style.animation = `typewriter ${paragraphDuration}ms steps(${paragraph.length}), cursorblink 0.5s infinite`;
        }
      }, totalDuration);

      // Add delay for the next paragraph
      totalDuration += paragraphDuration + 1000; // Add 1 second pause between 
       // After last paragraph, trigger video
       if (index === paragraphs.length - 1) {
        setTimeout(() => {
          // Hide text paragraphs
          paragraphRefs.current.forEach(ref => {
            ref?.classList.add('hidden');
          });
          
          // Show video with animation
          if (videoRef.current) {
            videoRef.current.classList.remove('hidden', 'opacity-0', 'translate-y-20');
            videoRef.current.classList.add('opacity-100', 'translate-y-0');
          }
        }, totalDuration + 500);
      }
    });
  };

  return (
    <>
      <div className="fixed top-10 right-10 z-50">
        {/* Home Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 backdrop-blur-md rounded-full shadow-lg bg-black hover:bg-white text-white hover:text-black transition-colors"
        >
          <CiMenuBurger className="text-2xl" />
        </button>

        {/* Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-64 bg-white/90 backdrop-blur-lg rounded-lg shadow-xl p-4 space-y-4">
            {/* Home */}
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-2 rounded-md 
                        hover:bg-white/50 transition-colors w-full"
            >
              <CiHome className="text-2xl" />
              <span>Home</span>
            </Link>


            <Link 
              href="/main" 
              className="flex items-center gap-3 px-4 py-2 rounded-md 
                        hover:bg-white/50 transition-colors w-full"
            >
              <TbCircleChevronsLeft className="text-2xl " />
              <span>Main</span>
            </Link>

            {/* Previous Chapter */}
            <button 
              disabled={!hasPrevious}
              onClick={() => hasPrevious && router.push(`/chapter/${chapters[currentChapterIndex - 1].id}`)}
              className={`flex items-center gap-3 px-4 py-2 rounded-md 
                        ${hasPrevious ? 'hover:bg-white/50 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                        transition-colors w-full`}
            >
              <IoChevronBackCircleOutline className="text-2xl" />
              <span>Previous</span>
            </button>

             {/* Next Chapter */}
             <button 
              disabled={!hasNext}
              onClick={() => hasNext && router.push(`/chapter/${chapters[currentChapterIndex + 1].id}`)}
              className={`flex items-center gap-3 px-4 py-2 rounded-md 
                        ${hasNext ? 'hover:bg-white/50 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                        transition-colors w-full`}
            >
              <IoChevronForwardCircleOutline className="text-2xl" />
              <span>Next</span>
            </button>
          </div>
        )}
      </div>

      <div className="quote-font flex flex-col items-center justify-center gap-10">
        {/* Title with Parallax Effect */}
        <h1
          ref={titleRef}
          className={`text-7xl font-normal opacity-0 transform translate-y-20 transition-all duration-1000 px-10`}
        >
          {content.title || 'Chapter Not Found'}
        </h1>

        {/* Info with Parallax Effect */}
        <p
          ref={infoRef}
          className="text-5xl opacity-0 transform translate-y-20 transition-all duration-1000"
        >
          {content.info}
        </p>

        {/* Paragraphs with Typewriting Effect */}
        <div
          className="flex flex-col gap-2 quote-font"
        >
          {content.content.map((paragraph, index) => (
            <p
              key={index}
              ref={(el) => (paragraphRefs.current[index] = el)}
              className="type-writer-text text-center hidden"
            >
              {paragraph}
            </p>
          ))}
        </div>


        {/* Video Container */}
        <div 
          ref={videoRef}
          className="hidden opacity-0 translate-y-20 transition-all duration-1000 mt-10"
        >
          <video 
            autoPlay 
            loop 
            muted
            controls 
            playsInline 
            controlsList="nodownload" 
            className="w-full max-w-4xl rounded-lg shadow-xl"
          >
            <source 
              src="/Demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}