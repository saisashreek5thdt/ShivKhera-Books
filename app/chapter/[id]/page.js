"use client"
import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { chapterData } from '@/app/(utils)/chapterData';
import { chapters } from '@/app/(utils)/chapterFullInfo';

export default function ChapterPage() {
  const { id } = useParams();
  const content = chapters.find((c) => c.id === id) || {};
  const metadata = chapterData.find((c) => c.id === id) || {};

  // Refs for title and info elements
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const paragraphContainerRef = useRef(null);


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
    // Hide title and info after 5 seconds
    const hideTitleAndInfo = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('hidden');
      }
      if (infoRef.current) {
        infoRef.current.classList.add('hidden');
      }

      showParagraphsSequentially();
    }, 5000); // 5 seconds delay

    return () => clearTimeout(hideTitleAndInfo); // Cleanup timeout
  }, []);

  const showParagraphsSequentially = () => {
    const paragraphs = content.content || [];
    let delay = 0;

    paragraphs.forEach((paragraph, index) => {
      const typingSpeed = 50; // Speed in milliseconds per character
      const paragraphDuration = paragraph.length * typingSpeed;

      setTimeout(() => {
        if (paragraphRefs.current[index]) {
          paragraphRefs.current[index].classList.remove('hidden');
          paragraphRefs.current[index].style.animation = `typewriter ${paragraphDuration}ms steps(${paragraph.length}), cursorblink 0.5s infinite`;
        }
      }, delay);

      // Add delay for the next paragraph
      delay += paragraphDuration + 1000; // Add 1 second pause between paragraphs
    });
  };

  return (
    <>
      <div className="quote-font flex flex-col items-center justify-center gap-10 p-10">
        {/* Title with Parallax Effect */}
        <h1
          ref={titleRef}
          className={`text-7xl font-normal opacity-0 transform translate-y-20 transition-all duration-1000`}
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
      </div>
    </>
  );
}