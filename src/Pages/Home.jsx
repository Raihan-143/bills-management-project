import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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
      <section className="bg-gradient-to-r from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-6 py-20 gap-12">
          
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
              className="h-80 w-96  sm:h-80 lg:h-96 xl:h-112 2xl:h-128 shadow-xl rounded-xl"
            />
          </div>
        </div>
      </section>

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
