import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import HeroSlider from "./HeroSlider";

const Home = () => {
  const [demoBills, setDemoBills] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/homeData.json")
      .then((res) => res.json())
      .then((data) => {
        setDemoBills(data.demoBills);
        setFeatures(data.features);
      });
  }, []);

  return (
    <div className="space-y-20">

      {/* Sliding Hero Section */}
      <HeroSlider></HeroSlider>
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">🧾 সাম্প্রতিক বিলসমূহ</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoBills.map((bill) => (
            <div key={bill.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{bill.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">পরিমাণ: <span className="font-bold">৳{bill.amount}</span></p>
              <p className={`mt-1 text-sm font-medium ${bill.status === "Paid" ? "text-green-500" : "text-red-500"}`}>
                অবস্থা: {bill.status === "Paid" ? "পরিশোধিত" : "অপরিশোধিত"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-violet-50 dark:bg-gray-800 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">🌟 কেন ব্যবহার করবেন বিল ম্যানেজার?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
