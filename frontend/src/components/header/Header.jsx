import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        className="header-swiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="header-contents">
            <h2>Kuimarisha Ukuaji wa Kifedha kwa Mikopo </h2>
            <p>
              Jiunge na jukwaa letu upate mikopo nafuu, usimamie akiba za
              kikundi mchamas, na ufikie malengo yako ya kifedha kwa urahisi.
              
            </p>
            <button>Anza leo</button>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="header-contents">
            <h2>Pata Mikopo kwa Riba Nafuu</h2>
            <p>
              Mikopo yenye riba nafuu kwa wanachama wa kikundi chako ili
              kufanikisha malengo ya kifedha kwa urahisi.
            </p>
            <button>Anza Sasa</button>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="header-contents">
            <h2>Simamia Akiba za Kikundi kwa Urahisi</h2>
            <p>
              Mfumo rahisi wa kuwekeza na kuchukua akiba zako ndani ya kikundi
              chako bila matatizo.
            </p>
            <button>Jiunge Leo</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Header;
