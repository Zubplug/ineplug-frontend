import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-[#003399] text-white px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">

        {/* LEFT TEXT CONTENT */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Your Plug for Everything Official, Fast, and Digital
          </h1>
          <p className="text-base md:text-lg text-blue-100 mb-6">
            From government docs to electricity tokens — Zubplug simplifies how Nigerians access verified services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/register"
              className="bg-white text-[#003399] px-6 py-3 rounded-md text-sm font-semibold hover:bg-blue-100 transition"
            >
              Get Started
            </a>
            <a
              href="#services"
              className="border border-white text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-white hover:text-[#003399] transition"
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="w-full md:w-[400px]">
          <img
            src="/hero-illustration.png"
            alt="Zubplug Hero"
            className="w-full max-w-sm md:max-w-full mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
