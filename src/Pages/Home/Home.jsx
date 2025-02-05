import React from 'react';
import Banner from '../../components/ui/HomePageComponents/Banner';
import ProductCategories from '../../components/ui/HomePageComponents/ProductCategories';
import FeaturedProducts from '../../components/ui/HomePageComponents/FeaturedProducts';
import Testimonials from '../../components/ui/HomePageComponents/Testimonials';
import BlogSection from '../../components/ui/HomePageComponents/BlogSection';
import NewsletterSignup from '../../components/ui/HomePageComponents/NewsletterSignup';
import { setTitle } from '../../components/SetTitle';
import Carousel from '../../components/ui/HomePageComponents/Carousel';
import GradientCards from '../../components/ui/HomePageComponents/GradientCards';

const Home = () => {
    setTitle('Home | Vape Smoke 24');

    return (
        <div className="relative w-full">
            {/* Parallax Background */}
            {/* <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: "url('https://img.freepik.com/free-photo/man-vaping-electronic-cigarette_158595-3038.jpg?t=st=1738128784~exp=1738132384~hmac=9d38b5702f37203b3a8024a5e3169e616e095ac00b297140c0cd2437702309b7&w=1380')",
                }}
            >

                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div> */}

            {/* Content */}
            <div className=" ">
                <div className="relative">
                    {/* Carousel Section */}
                    <div className="relative z-10">
                        <Carousel />
                    </div>

                    {/* GradientCards Section */}
                    <div className="relative md:-mt-36 z-20">
                        <GradientCards />
                    </div>
                </div>
                {/* <Banner /> */}
                <div className='section-container  bg-gray-900 bg-opacity-80 '>
                    <ProductCategories />
                    <FeaturedProducts />
                    <Testimonials />
                    <BlogSection />
                    <NewsletterSignup />
                </div>
            </div>
        </div>
    );
};

export default Home;
