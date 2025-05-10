import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 4000 }}
      loop={true}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={true}
      className="w-full"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <section className="bg-gradient-to-r from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center px-6 py-20 gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                স্মার্ট <span className="text-violet-600">বিল ম্যানেজমেন্ট</span><br /> এখন আরো সহজে
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                আপনার সব বিল এক জায়গায় পরিচালনা করুন, সময়মতো পেমেন্ট দিন এবং আর্থিক পরিকল্পনা হোক আরও মজবুত!
              </p>
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <NavLink to="/bills" className="px-6 py-3 text-white bg-violet-600 hover:bg-violet-700 rounded-lg text-lg font-semibold transition-all duration-300">
                  বিলসমূহ দেখুন
                </NavLink>
                <NavLink to="/register" className="px-6 py-3 border border-violet-600 text-violet-600 hover:bg-violet-100 rounded-lg text-lg font-semibold transition-all duration-300">
                  একাউন্ট খুলুন
                </NavLink>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="https://i.ibb.co.com/S4B870Qj/Chat-GPT-Image-May-10-2025-05-02-29-PM.png"
                alt="বিল ম্যানেজমেন্ট"
                className="h-80 w-96 sm:h-80 lg:h-96 xl:h-[420px] 2xl:h-[460px] shadow-xl rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <section className="bg-gradient-to-r from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center px-6 py-20 gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-indigo-600">ডিজিটাল বিল ট্র্যাকার</span><br /> আপনার আর্থিক নিয়ন্ত্রণে সহায়ক
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                প্রতিটি বিলের তথ্য এক জায়গায় সংরক্ষণ করুন এবং ভুলে যাওয়ার চিন্তা ভুলে যান। এখন থেকে আপনার বিল ম্যানেজমেন্ট হবে আরও নির্ভরযোগ্য।
              </p>
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <NavLink to="/bills" className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition-all duration-300">
                   বিলসমূহ দেখুন
                </NavLink>
                <NavLink to="/login" className="px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-100 rounded-lg text-lg font-semibold transition-all duration-300">
                  লগইন করুন
                </NavLink>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="https://i.ibb.co.com/B25hRYp7/Chat-GPT-Image-May-10-2025-09-28-39-PM.png"
                alt="ডিজিটাল বিল ট্র্যাকার"
                className="h-80 w-96 sm:h-80 lg:h-96 xl:h-[420px] 2xl:h-[460px] shadow-xl rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
