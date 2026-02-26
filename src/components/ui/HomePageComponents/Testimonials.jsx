import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    loop: true,
    slides: {
      perView: 1.15,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 1.5, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 2.1, spacing: 32 },
      },
    },
  });

  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Al-Mansoori',
      role: 'Verified Buyer',
      avatar: 'A',
      rating: 5,
      title: 'Best Vape in Dubai',
      content:
        "I've tried multiple brands, but nothing compares to the quality and flavor of these vapes. The smoothness and consistency make it the best choice for any vape enthusiast in Dubai.",
    },
    {
      id: 2,
      name: 'Fatima Al-Farsi',
      role: 'Loyal Customer',
      avatar: 'F',
      rating: 5,
      title: 'Amazing Vape Collection',
      content:
        "The variety of flavors and sleek designs make this the best vape shop in Dubai. I've been a loyal customer for months and always look forward to new product releases.",
    },
    {
      id: 3,
      name: 'Khalid Al-Sabah',
      role: 'Regular Customer',
      avatar: 'K',
      rating: 5,
      title: 'Top-Notch Quality',
      content:
        'The customer service is fantastic and the products are top-notch. Every vape I have purchased has exceeded my expectations. Highly recommend this to everyone in Dubai!',
    },
    {
      id: 4,
      name: 'Laila Al-Najjar',
      role: 'Verified Buyer',
      avatar: 'L',
      rating: 5,
      title: 'Unmatched Experience',
      content:
        'From the moment I walked in, I was greeted with professionalism. The experience and quality of products are unmatched in Dubai. I will definitely continue shopping here.',
    },
  ];

  const totalSlides = testimonials.length;

  return (
    <div className="bg-gray-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <section className="container mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-3 border border-indigo-500/30 px-4 py-1 rounded-full bg-indigo-500/10">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-3">
            Don't just take{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
              our word
            </span>{' '}
            for it
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover why vapers in Dubai trust us for their premium vape products. From smooth flavors to sleek designs, our customers say it best.
          </p>
        </motion.div>

        {/* Slider + Controls layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-center">

          {/* Left Panel — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-8"
          >
            {/* Stats */}
            <div className="flex flex-col gap-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">4.9/5</p>
                <div className="flex gap-0.5 mt-1">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 text-xs mt-1">Average rating</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">500+</p>
                <p className="text-gray-400 text-xs mt-1">Happy customers</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <button
                aria-label="Previous slide"
                onClick={() => instanceRef.current?.prev()}
                className="w-12 h-12 rounded-full border-2 border-indigo-500/50 text-indigo-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
              <button
                aria-label="Next slide"
                onClick={() => instanceRef.current?.next()}
                className="w-12 h-12 rounded-full border-2 border-indigo-500/50 text-indigo-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => instanceRef.current?.moveToIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-8 bg-indigo-500' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Slider */}
          <div className="-mx-4 sm:-mx-6 lg:mx-0 overflow-hidden">
            <div ref={sliderRef} className="keen-slider">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="keen-slider__slide px-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group h-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top quote icon */}
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex gap-0.5">
                          {Array(testimonial.rating).fill(0).map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        {/* Large quote mark */}
                        <svg className="w-8 h-8 text-indigo-500/30" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                        {testimonial.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {testimonial.content}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center justify-center gap-4 mt-8 lg:hidden">
          <button
            aria-label="Previous slide"
            onClick={() => instanceRef.current?.prev()}
            className="w-11 h-11 rounded-full border border-indigo-500/50 text-indigo-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>

          {/* Mobile dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => instanceRef.current?.moveToIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-8 bg-indigo-500' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>

          <button
            aria-label="Next slide"
            onClick={() => instanceRef.current?.next()}
            className="w-11 h-11 rounded-full border border-indigo-500/50 text-indigo-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;