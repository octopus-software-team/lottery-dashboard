import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function DaysSliderFilter() {
  return (
    <div>
      <Swiper
        spaceBetween={8}
        slidesPerView={7}
        speed={1000}
        loop={true}
        modules={[Navigation]}
        effect="fade"
        navigation={{
          nextEl: ".days_filter_swiper-button-next",
          prevEl: ".days_filter_swiper-button-prev"
        }}
      >
        <SwiperSlide>
          <label htmlFor="friday" className="day_field">
            <input type="checkbox" name="day" id="friday" />
            <div className="content">
              <h6>الجمعة</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="saturday" className="day_field">
            <input type="checkbox" name="day" id="saturday" />
            <div className="content">
              <h6>السبت</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="sunday" className="day_field">
            <input type="checkbox" name="day" id="sunday" />
            <div className="content">
              <h6>الاحد</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="monday" className="day_field">
            <input type="checkbox" name="day" id="monday" />
            <div className="content">
              <h6>الاثنين</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="tuesday" className="day_field">
            <input type="checkbox" name="day" id="tuesday" />
            <div className="content">
              <h6>الثلاثاء</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="wednesday" className="day_field">
            <input type="checkbox" name="day" id="wednesday" />
            <div className="content">
              <h6>الاربعاء</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="thursday" className="day_field">
            <input type="checkbox" name="day" id="thursday" />
            <div className="content">
              <h6>الخميس</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="friday" className="day_field">
            <input type="checkbox" name="day" id="friday" />
            <div className="content">
              <h6>الجمعة</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="saturday" className="day_field">
            <input type="checkbox" name="day" id="saturday" />
            <div className="content">
              <h6>السبت</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="sunday" className="day_field">
            <input type="checkbox" name="day" id="sunday" />
            <div className="content">
              <h6>الاحد</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="monday" className="day_field">
            <input type="checkbox" name="day" id="monday" />
            <div className="content">
              <h6>الاثنين</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="tuesday" className="day_field">
            <input type="checkbox" name="day" id="tuesday" />
            <div className="content">
              <h6>الثلاثاء</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="wednesday" className="day_field">
            <input type="checkbox" name="day" id="wednesday" />
            <div className="content">
              <h6>الاربعاء</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="thursday" className="day_field">
            <input type="checkbox" name="day" id="thursday" />
            <div className="content">
              <h6>الخميس</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="friday" className="day_field">
            <input type="checkbox" name="day" id="friday" />
            <div className="content">
              <h6>الجمعة</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="saturday" className="day_field">
            <input type="checkbox" name="day" id="saturday" />
            <div className="content">
              <h6>السبت</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="sunday" className="day_field">
            <input type="checkbox" name="day" id="sunday" />
            <div className="content">
              <h6>الاحد</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="monday" className="day_field">
            <input type="checkbox" name="day" id="monday" />
            <div className="content">
              <h6>الاثنين</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="tuesday" className="day_field">
            <input type="checkbox" name="day" id="tuesday" />
            <div className="content">
              <h6>الثلاثاء</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="wednesday" className="day_field">
            <input type="checkbox" name="day" id="wednesday" />
            <div className="content">
              <h6>الاربعاء</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="thursday" className="day_field">
            <input type="checkbox" name="day" id="thursday" />
            <div className="content">
              <h6>الخميس</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="friday" className="day_field">
            <input type="checkbox" name="day" id="friday" />
            <div className="content">
              <h6>الجمعة</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="saturday" className="day_field">
            <input type="checkbox" name="day" id="saturday" />
            <div className="content">
              <h6>السبت</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="sunday" className="day_field">
            <input type="checkbox" name="day" id="sunday" />
            <div className="content">
              <h6>الاحد</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="monday" className="day_field">
            <input type="checkbox" name="day" id="monday" />
            <div className="content">
              <h6>الاثنين</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="tuesday" className="day_field">
            <input type="checkbox" name="day" id="tuesday" />
            <div className="content">
              <h6>الثلاثاء</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="wednesday" className="day_field">
            <input type="checkbox" name="day" id="wednesday" />
            <div className="content">
              <h6>الاربعاء</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
        <SwiperSlide>
          <label htmlFor="thursday" className="day_field">
            <input type="checkbox" name="day" id="thursday" />
            <div className="content">
              <h6>الخميس</h6>
              <h6>١٦ / ٤ / ٢٠٢٤</h6>
            </div>
          </label>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
