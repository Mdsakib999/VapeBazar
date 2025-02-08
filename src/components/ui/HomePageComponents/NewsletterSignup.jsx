import React, { useEffect, useState } from 'react';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        setSubmitted(true);
        setEmail('');
    };
    const [bgColor, setBgColor] = useState('rgb(255, 165, 0)'); // Initial color: orange

    // Function to generate a random RGB color
    const getRandomRGBColor = () => {
        const r = Math.floor(Math.random() * 256); // Red component (0-255)
        const g = Math.floor(Math.random() * 256); // Green component (0-255)
        const b = Math.floor(Math.random() * 256); // Blue component (0-255)
        return `rgb(${r}, ${g}, ${b})`;
    };

    useEffect(() => {
        // Set an interval to change the background color every 2 seconds
        const intervalId = setInterval(() => {
            const newColor = getRandomRGBColor();
            setBgColor(newColor);
        }, 5000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty d

    return (
        <div className='bg-white'>
            <section className="relative bg-gradient-to-r bg-white py-4 px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto overflow-hidden flex justify-between items-center ">
            {/* Background Image */}
            <div className='relative z-10 '>
                <img
                    src="https://vapehub.risingbamboo.com/wp-content/uploads/2024/11/section-banner4-1-1.png"
                    alt="Background"
                    className=" h-[400px]  mb-5 "
                />
            </div>

            <div className="relative z-10 w-[70%] flex flex-col lg:flex-row justify-between items-center">
                {/* Icon and Text */}
                <div className="flex items-center gap-5 mb-8 lg:mb-0">
                    <img
                        src="https://vapehub.risingbamboo.com/wp-content/uploads/2024/10/icon-newsletter.svg"
                        alt="Newsletter Icon"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className="text-xl font-bold text-white">Sign Up & Save 60%</p>
                        <p className="text-white text-sm">
                            Get Exclusive Discounts and Deals Delivered Straight to Your Inbox!
                        </p>
                    </div>
                </div>

                {/* Subscription Form */}
                <form onSubmit={handleSubmit} className="flex w-full relative max-w-md">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow px-5 py-3 border text-black border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-rose-500  focus:outline-none"
                        placeholder="Enter your email"
                    />
                    <button
                        type="submit"
                        className="px-5 py-[13px] bg-rose-600 text-white font-medium absolute end-0 rounded-r-md shadow-sm hover:bg-rose-700 focus:ring focus:ring-rose-500 focus:outline-none"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
            {/* <div className='bg-orange-400 w-full absolute left-0 block h-[200px]'></div> */}
            <div
                style={{
                    backgroundColor: bgColor,
                    transition: 'background-color 5s ease', // Smooth transition effect
                    width: '100%',
                    height: '200px',
                    position: 'absolute',
                    left: 0,
                }}
                className="w-full h-[200px] transition-all duration-200 absolute left-0"
            >
                {/* Content of the div */}
            </div>

            {submitted && (
                <p className="mt-4 text-center text-green-600">
                    Thank you for subscribing!
                </p>
            )}
        </section>
        </div>
    );
};

export default NewsletterSignup;
