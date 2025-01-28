import React from 'react';
import Carousel from '../../components/ui/HomePageComponents/Carousel';
import Banner from '../../components/ui/HomePageComponents/Banner';
import TopCategories from '../../components/ui/HomePageComponents/TopCategories';
import ProductCategories from '../../components/ui/HomePageComponents/ProductCategories';
import FeaturedProducts from '../../components/ui/HomePageComponents/FeaturedProducts';
import Testimonials from '../../components/ui/HomePageComponents/Testimonials';
import TestimonialSliders from '../../components/ui/HomePageComponents/AnotherTest';
import AnotherTest from '../../components/ui/HomePageComponents/AnotherTest';
import BlogSection from '../../components/ui/HomePageComponents/BlogSection';
import NewsletterSignup from '../../components/ui/HomePageComponents/NewsletterSignup';
import { setTitle } from '../../components/SetTitle';

const Home = () => {
    setTitle('Home | vape smoke 24')
    return (
        <div className='section-container mx-auto'>
            {/* <Carousel /> */}
            <Banner />
            {/* <TopCategories /> */}
            <ProductCategories />
            <FeaturedProducts />
            <Testimonials />
            <BlogSection />
            <NewsletterSignup />
        </div>
    );
};

export default Home;