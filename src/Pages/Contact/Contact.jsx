import React, { useState } from 'react';
import { setTitle } from '../../components/SetTitle';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiUser, FiMessageCircle } from 'react-icons/fi';
import { BsWhatsapp, BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';

const Contact = () => {
    setTitle('Contact | vape smoke 24');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    const contactCards = [
        {
            icon: <FiPhone className="text-3xl" />,
            title: "Call Us",
            info: "+971524869090",
            link: "tel:+971524869090",
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50"
        },
        {
            icon: <FiMail className="text-3xl" />,
            title: "Email Us",
            info: "info.Vapesmoke24@gmail.com",
            link: "mailto:info.Vapesmoke24@gmail.com",
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-50 to-pink-50"
        },
        {
            icon: <FiMapPin className="text-3xl" />,
            title: "Visit Us",
            info: "Business Bay, Dubai, UAE",
            link: "#map",
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50"
        },
        {
            icon: <FiClock className="text-3xl" />,
            title: "Working Hours",
            info: "Mon-Sat: 9AM-10PM",
            info2: "Sun: 10AM-6PM",
            gradient: "from-green-500 to-teal-500",
            bgGradient: "from-green-50 to-teal-50"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                {/* Hero Section */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-block mb-4">
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                            Contact Us
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                        Let's Start a{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Conversation
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Have a question or want to work together? We'd love to hear from you.
                    </p>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactCards.map((card, index) => (
                        <a
                            key={index}
                            href={card.link}
                            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            
                            <div className="relative z-10">
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${card.gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-600 font-medium break-words">
                                    {card.info}
                                </p>
                                {card.info2 && (
                                    <p className="text-sm text-gray-600 font-medium mt-1">
                                        {card.info2}
                                    </p>
                                )}
                            </div>
                        </a>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Left Side - Contact Form */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
                                <FiMessageCircle className="text-white text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Send a Message</h2>
                                <p className="text-gray-600">We'll respond within 24 hours</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <FiUser className="text-indigo-600" />
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <FiMail className="text-indigo-600" />
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <FiMessageCircle className="text-indigo-600" />
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what you need..."
                                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 h-32 resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
                            >
                                <span>Send Message</span>
                                <FiSend />
                            </button>
                        </form>

                        {/* Social Media Links */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-center text-gray-600 mb-4 font-semibold">Connect With Us</p>
                            <div className="flex justify-center gap-4">
                                <a href="#" className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <BsWhatsapp size={20} />
                                </a>
                                <a href="#" className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <BsInstagram size={20} />
                                </a>
                                <a href="#" className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <BsFacebook size={20} />
                                </a>
                                <a href="#" className="p-3 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <BsTwitter size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Info Cards */}
                    <div className="space-y-6">
                        {/* Why Choose Us Card */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 md:p-10 text-white">
                            <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Premium Quality</h4>
                                        <p className="text-white/80 text-sm">Authentic products from trusted brands</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Fast Delivery</h4>
                                        <p className="text-white/80 text-sm">Quick shipping across UAE</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Expert Support</h4>
                                        <p className="text-white/80 text-sm">24/7 customer service available</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Best Prices</h4>
                                        <p className="text-white/80 text-sm">Competitive pricing guaranteed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                                    <FiClock className="text-white text-2xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Business Hours</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                    <span className="font-semibold text-gray-900">Monday - Saturday</span>
                                    <span className="text-indigo-600 font-bold">9:00 AM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                    <span className="font-semibold text-gray-900">Sunday</span>
                                    <span className="text-indigo-600 font-bold">10:00 AM - 6:00 PM</span>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                                <p className="text-green-800 font-semibold text-center">
                                    🎉 We're Open Now!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div id="map" className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-6 md:p-8 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
                                <FiMapPin className="text-white text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Visit Our Store</h3>
                                <p className="text-gray-600">Business Bay, Dubai, United Arab Emirates</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-96 md:h-[500px]">
                        <iframe
                            title="Vapesmoke24 Location"
                            className="w-full h-full"
                            frameBorder="0"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14342.949266922387!2d55.27354255000002!3d25.185139250000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6c0c8ec2114f%3A0x34fc78d8d62771b0!2sBusiness%20Bay%2C%20Dubai%2C%20UAE!5e0!3m2!1sen!2sus!4v1674635295142!5m2!1sen!2sus"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* CTA Section */}
                {/* <div className="mt-16 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h3>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Experience premium vape products with exceptional service. Visit us today!
                    </p>
                    <a
                        href="tel:+971524869090"
                        className="inline-flex items-center gap-3 bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                        <FiPhone />
                        Call Us Now
                    </a>
                </div> */}
            </div>
        </div>
    );
};

export default Contact;