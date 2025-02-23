
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slides from './Slides';

import bgImg1 from '../assets/images/carousel1.jpg'
import bgImg2 from '../assets/images/carousel2.jpg'
import bgImg3 from '../assets/images/carousel3.jpg'

export default function Carousel() {
  return (
    <div className='container font-lato py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Slides image={bgImg1} text='Get Your Web Development Projects Done in minuits'></Slides>
        </SwiperSlide>
        <SwiperSlide>
            <Slides image={bgImg2} text='Get Your Web Development Projects Done in minuits'></Slides>
        </SwiperSlide>
        <SwiperSlide>
            <Slides image={bgImg3} text='Get Your Web Development Projects Done in minuits'></Slides>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
