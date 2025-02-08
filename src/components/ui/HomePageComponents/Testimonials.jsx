import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        loop: true,
        slidesPerView: 1.25,
        spacing: 16,
        breakpoints: {
            '(min-width: 1024px)': {
                slidesPerView: 1.5,
                spacing: 32,
            },
        },
    });

    const testimonials = [
        {
            id: 1,
            name: "Ahmed Al-Mansoori",
            rating: 5,
            title: "Best Vape in Dubai",
            content: "I’ve tried multiple brands, but nothing compares to the quality and flavor of these vapes. The smoothness and consistency make it the best choice for any vape enthusiast in Dubai.",
        },
        {
            id: 2,
            name: "Fatima Al-Farsi",
            rating: 5,
            title: "Amazing Vape Collection",
            content: "The variety of flavors and sleek designs make this the best vape shop in Dubai. I’ve been a loyal customer for months and always look forward to new product releases.",
        },
        {
            id: 3,
            name: "Khalid Al-Sabah",
            rating: 5,
            title: "Top-Notch Quality",
            content: "The customer service is fantastic and the products are top-notch. Every vape I’ve purchased has exceeded my expectations. Highly recommend this to everyone in Dubai!",
        },
        {
            id: 4,
            name: "Laila Al-Najjar",
            rating: 5,
            title: "Unmatched Experience",
            content: "From the moment I walked in, I was greeted with professionalism. The experience and quality of products are unmatched in Dubai. I’ll definitely continue shopping here.",
        },
    ];


    return (
        <div className=''>
            <section className="container  mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24 ">
                <div className="keen-slider section-container ">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16 ">
                        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right ">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Don't just take our word for it...
                            </h2>

                            <p className="mt-4 text-white">
                                Discover why vapers in Dubai trust us for their premium vape products. From smooth flavors to sleek designs, our customers rave about the quality and experience that sets us apart!
                            </p>


                            <div className="hidden lg:mt-8 lg:flex lg:gap-4 navigation-wrapper">
                                <button
                                    aria-label="Previous slide"
                                    id="keen-slider-previous"
                                    className="rounded-full border-2 border-rose-600 p-4 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                                    onClick={() => instanceRef.current?.prev()}
                                >
                                    <svg
                                        className="size-5 -rotate-180 transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </button>

                                <button
                                    aria-label="Next slide"
                                    id="keen-slider-next"
                                    className="rounded-full border-2 border-rose-600 p-4 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                                    onClick={() => instanceRef.current?.next()}
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="-mx-6 lg:col-span-2 lg:mx-0 navigation-wrapper">
                            <div ref={sliderRef} className="keen-slider">
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="keen-slider__slide">
                                        <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                                            <div>
                                                <div className="flex gap-0.5 text-orange-500">
                                                    {Array(testimonial.rating).fill(0).map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            className="h-5 w-5"
                                                        >
                                                            <path
                                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                            />
                                                        </svg>
                                                    ))}
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-2xl font-bold text-rose-600 sm:text-3xl">{testimonial.title}</p>

                                                    <p className="mt-4 leading-relaxed text-gray-700">
                                                        {testimonial.content}
                                                    </p>
                                                </div>
                                            </div>

                                            <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                                                &mdash; {testimonial.name}
                                            </footer>
                                        </blockquote>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-4 lg:hidden">
                    <button
                        aria-label="Previous slide"
                        id="keen-slider-previous"
                        className="rounded-full border border-rose-600 p-4 text-rose-600 transition hover:bg-rose-600 hover:text-white "
                        onClick={() => instanceRef.current?.prev()}
                    >
                        <svg
                            className="size-5 -rotate-180 transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </button>

                    <button
                        aria-label="Next slide"
                        id="keen-slider-next"
                        className="rounded-full border border-rose-600 p-4 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                        onClick={() => instanceRef.current?.next()}
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
