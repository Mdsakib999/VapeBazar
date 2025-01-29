import React from 'react';
import { setTitle } from '../../components/SetTitle';

const Contact = () => {
    setTitle('Contact | vape smoke 24')
    return (
        <section className="py-16 mt-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-lg text-gray-400">
                        We'd love to hear from you! Use the form below to send us your message or drop by for a visit:
                    </p>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Info Section */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Contact Details</h3>
                            <p className="text-gray-300">
                                TEXT:{" "}
                                <a href="tel:+971524869090" className="text-primaryColor hover:underline">
                                    +971524869090
                                </a>
                            </p>
                            <p className="text-gray-300">
                                Email:{" "}
                                <a
                                    href="mailto:info.Vapesmoke24@gmail.com"
                                    className="text-primaryColor hover:underline"
                                >
                                    info.Vapesmoke24@gmail.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Our Address</h3>
                            <p className="text-gray-300">Business Bay, Dubai, United Arab Emirates</p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Opening Hours</h3>
                            <p className="text-gray-300">MON to SAT: 9:00 AM - 10:00 PM</p>
                            <p className="text-gray-300">SUN: 10:00 AM - 6:00 PM</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-lg p-8 text-gray-900">
                        <h3 className="text-2xl font-semibold mb-6 text-center">Send Us A Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primaryColor focus:outline-none"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primaryColor focus:outline-none"
                                />
                            </div>
                            <textarea
                                placeholder="Your Message"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primaryColor focus:outline-none h-32"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full py-3 bg-primaryColor text-white font-semibold rounded-md hover:bg-secondaryColor transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Google Map */}
                <div className="mt-16">
                    <h3 className="text-3xl font-semibold text-center mb-8">Find Us Here</h3>
                    <div className="w-full h-80 rounded-lg overflow-hidden">
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
            </div>
        </section>
    );
};

export default Contact;
