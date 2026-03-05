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
    setTitle('Home | Vapes 24');

    return (
        <div className="relative w-full bg-white">



            {/* Content */}
            <div className=" ">
                <div className="relative">
                    {/* Carousel Section */}
                    <div className="relative z-10">
                        <Carousel />
                    </div>


                </div>
                {/* <Banner /> */}
                <div className='  bg-gray-90 bg-opacity-80 '>
                    <ProductCategories />
                    <FeaturedProducts />
                    {/* GradientCards Section */}
                    <GradientCards />
                    <Testimonials />
                    <BlogSection />
                    <NewsletterSignup />
                </div>
            </div>
        </div>
    );
};

export default Home;
