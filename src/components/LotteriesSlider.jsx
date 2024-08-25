import LotteryCard from "./LotteryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function LotteriesSlider({ lotteries }) {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={4}
      speed={1000}
      loop={true}
      modules={[Autoplay, Pagination]}
      pagination={{
        el: ".lotteries-pagination",
        clickable: true
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      className=" w-100"
      dir="rtl"
      breakpoints={{
        992: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 3
        },
        350: {
          slidesPerView: 2
        }
      }}
    >
      {lotteries?.map((lottery, index) => (
        <SwiperSlide key={index}>
          <LotteryCard lottery={lottery} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
