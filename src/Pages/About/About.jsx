import React from 'react';
import { setTitle } from '../../components/SetTitle';
import { FiAward, FiShield, FiTrendingUp, FiUsers, FiHeart, FiTarget, FiZap, FiCheckCircle } from 'react-icons/fi';
import { BsLightningChargeFill, BsStarFill } from 'react-icons/bs';

const About = () => {
    setTitle('About Us | Vape Smoke 24');

    const stats = [
        { number: '10K+', label: 'Happy Customers', icon: <FiUsers /> },
        { number: '500+', label: 'Products', icon: <FiZap /> },
        { number: '5', label: 'Years Experience', icon: <FiAward /> },
        { number: '100%', label: 'Authentic', icon: <FiShield /> }
    ];

    const values = [
        {
            icon: <FiShield className="text-4xl" />,
            title: 'Quality Assurance',
            description: 'We source only authentic products from trusted manufacturers, ensuring premium quality in every purchase.',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <FiHeart className="text-4xl" />,
            title: 'Customer First',
            description: 'Your satisfaction is our priority. We provide exceptional service and support at every step of your journey.',
            gradient: 'from-pink-500 to-rose-500'
        },
        {
            icon: <FiTrendingUp className="text-4xl" />,
            title: 'Innovation',
            description: 'Stay ahead with the latest vaping technology and trends. We continuously update our collection.',
            gradient: 'from-purple-500 to-indigo-500'
        },
        {
            icon: <FiTarget className="text-4xl" />,
            title: 'Expertise',
            description: 'Our knowledgeable team is here to guide you, whether you\'re a beginner or an experienced vaper.',
            gradient: 'from-orange-500 to-red-500'
        }
    ];

    const features = [
        'Premium quality products from leading brands',
        'Competitive pricing with regular discounts',
        'Fast and reliable delivery across UAE',
        'Expert customer support available 24/7',
        'Wide range of flavors and nicotine strengths',
        'Secure payment options for peace of mind'
    ];

    const milestones = [
        { year: '2019', title: 'Founded', description: 'Vape Smoke 24 was established in Dubai' },
        { year: '2020', title: 'Expansion', description: 'Opened our first physical store in Business Bay' },
        { year: '2022', title: 'Going Digital', description: 'Launched our online platform for wider reach' },
        { year: '2024', title: 'Leading Brand', description: 'Became one of UAE\'s trusted vape retailers' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 md:py-32 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-block mb-6">
                            <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold">
                                About Us
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                            Your Trusted Partner in
                            <span className="block mt-2">Premium Vaping</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                            Delivering excellence in quality, service, and innovation since 2019. Your satisfaction is our smoke signal.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                                <div className="flex justify-center mb-3 text-3xl">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-black mb-2">{stat.number}</div>
                                <div className="text-sm md:text-base text-white/80">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block mb-4">
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
                                Our Story
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                            Passion Meets
                            <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Excellence
                            </span>
                        </h2>
                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                Founded in 2019, <span className="font-bold text-gray-900">Vape Smoke 24</span> emerged from a simple vision: to provide vapers in the UAE with access to premium, authentic products backed by exceptional service.
                            </p>
                            <p>
                                What started as a small venture in Dubai has grown into one of the region's most trusted names in vaping. Our commitment to quality, authenticity, and customer satisfaction has been the cornerstone of our success.
                            </p>
                            <p>
                                Today, we proudly serve thousands of satisfied customers, offering an extensive collection of vape products, expert guidance, and a shopping experience that's second to none.
                            </p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a href="/product" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                Shop Now
                            </a>
                            <a href="/contact" className="bg-white border-2 border-indigo-600 text-indigo-600 font-bold py-4 px-8 rounded-xl hover:bg-indigo-50 transition-all duration-300">
                                Contact Us
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <BsLightningChargeFill className="text-8xl text-indigo-600 mb-6 mx-auto animate-pulse" />
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Vape Smoke 24</h3>
                                    <p className="text-gray-600 text-lg">Premium Vaping Experience</p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl -z-10 transform rotate-12"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl -z-10 transform -rotate-12"></div>
                    </div>
                </div>
            </div>

            {/* Our Values Section */}
            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4">
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
                                Our Values
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                            What We Stand For
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Our core values guide everything we do, ensuring excellence in every aspect of our business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                                <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${value.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-10 md:p-12 text-white shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-black mb-8">Why Choose Vape Smoke 24?</h2>
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <FiCheckCircle className="text-white" />
                                    </div>
                                    <p className="text-white/90 text-lg group-hover:text-white transition-colors">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="inline-block mb-4">
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
                                Benefits
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                            Experience the
                            <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Difference
                            </span>
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            At Vape Smoke 24, we don't just sell products—we create experiences. Every aspect of our service is designed with you in mind, from our carefully curated product selection to our knowledgeable support team.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Join thousands of satisfied customers who trust us for their vaping needs. Whether you're new to vaping or a seasoned enthusiast, we're here to provide the best products, advice, and service in the UAE.
                        </p>

                        {/* Customer Rating */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <BsStarFill key={i} className="text-yellow-400 text-xl" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600">Rated 5.0 by our customers</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-gray-900">5.0</p>
                                    <p className="text-sm text-gray-600">out of 5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            {/* CTA Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20">
                <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-3xl p-12 md:p-16 text-center shadow-md relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Ready to Join Our Community?
                        </h2>
                        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                            Experience premium vaping with Vape Smoke 24. Shop our collection today and discover why thousands trust us.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/product" className="bg-white text-indigo-600 font-bold py-4 px-10 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                Explore Products
                            </a>
                            <a href="/contact" className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition-all duration-300">
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;