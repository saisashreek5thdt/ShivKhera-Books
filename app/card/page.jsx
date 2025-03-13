"use client"; // Ensures this runs on the client side

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/parallax";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Parallax, Scrollbar, Autoplay, Navigation, Pagination} from "swiper/modules";
import Image from "next/image";
import "../card.css";
import Link from "next/link";

// Import JSON data correctly
import { data } from "../(utils)/cardData.js"; // Ensure chapterData.js exports data as default

export default function Card() {
  return (
    <div className="body">
      <article>
        <section className="sectionWrapper">
          <section className="swiper">
          <div
                className="parallax-bg bg-gradient-to-b from-gray-600 to-black"
                data-swiper-parallax="600"
                data-swiper-parallax-scale="0.85"
              ></div>
            <Swiper
              modules={[EffectCoverflow, Parallax, Scrollbar, Autoplay, Navigation, Pagination]}
              direction="horizontal"
              loop={false}
              speed={1500}
              spaceBetween={60}
              mousewheel={true}
              effect="coverflow"
              centeredSlides={true}
              slidesPerView={4}
              coverflowEffect={{
                rotate: 40,
                slideShadows: true,
              }}
              parallax={true}
              autoplay={{
                delay: 2000,
                pauseOnMouseEnter: true,
              }}
              scrollbar={{ el: ".swiper-scrollbar" }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 60,
                },
                600: {
                  slidesPerView: 2,
                  spaceBetween: 60,
                },
                1000: {
                  slidesPerView: 3,
                  spaceBetween: 60,
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 60,
                },
                2300: {
                  slidesPerView: 5,
                  spaceBetween: 60,
                },
                2900: {
                  slidesPerView: 6,
                  spaceBetween: 60,
                },
              }}
            >
              {/* Map over JSON data */}
              
              <div className="swiper-wrapper">
                  {data.map((card) => (
                    <SwiperSlide key={card.id}>
                    <figure className="swiper-slide">
                      <div
                        className="cardPopout"
                        data-swiper-parallax="30"
                        data-swiper-parallax-scale="0.9"
                        data-swiper-parallax-opacity="0.8"
                        data-swiper-parallax-duration="1000"
                      >
                        <Image
                          src={card.image}
                          alt={card.title}
                          width={800}
                          height={400}
                          data-swiper-parallax="80"
                          data-swiper-parallax-duration="2000"
                        />
                        <h2
                          className="title"
                          data-swiper-parallax="80"
                          data-swiper-parallax-duration="1000"
                        >
                          {card.title}
                        </h2>
                        <h4
                          className="subtitle"
                          data-swiper-parallax="80"
                          data-swiper-parallax-duration="1500"
                        >
                          {card.subtitle}
                        </h4>
                        {/* <figcaption
                          data-swiper-parallax="80"
                          data-swiper-parallax-duration="1250"
                        >
                          <p>{card.description}</p>
                        </figcaption> */}
                        <Link 
                          href={`/chapter/${card.id}`} 
                          title="Continue Reading"
                          data-swiper-parallax="80"
                          data-swiper-parallax-opacity="0.2"
                          data-swiper-parallax-duration="1750"
                        >
                          Continue Reading
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-right-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                            />
                          </svg>
                          </Link>
                      </div>
                      </figure>
                      
                    </SwiperSlide>
                  ))}
              </div>
              <div className="swiper-scrollbar"></div>
            </Swiper>
          </section>
        </section>
      </article>
    </div>
  );
}
