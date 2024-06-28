import { useEffect, useState } from 'react';
import bannerImg from '../../../../public/homePage/banner.jpg';
const Banner = () => {
    const [animate, setAnimate] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollY = window.scrollY;
    //         if (scrollY < 100) {
    //             setAnimate(true);
    //         } else {
    //             setAnimate(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div
            style={{ backgroundImage: `url(${bannerImg})` }}
            className="bg-cover bg-right md:bg-center h-[550px]  scale-x-[-1] relative flex items-center justify-end text-white px-4 md:px-16"
        >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50 scale-x-[-1]"></div>

            {/* Banner content */}
            <div

                className={`scale-x-[-1] ${animate ? 'animate-fadeRight' : ''} animate-fadeRight relative z-10 flex flex-col items-start h-full justify-center space-y-4 w-full max-w-xl md:max-w-2xl lg:max-w-3xl`}>
                <p className="font-barrio text-5xl md:text-7xl text-textColor">
                    BOOST YOUR <br /> FLAVOUR
                </p>
                <p className="mt-4 text-lg md:text-xl text-gray-200">
                    Discover the best vape products and accessories.
                </p>
                <button className="mt-6 px-6 py-3 bg-primaryColor text-white text-lg rounded-full hover:bg-secondaryColor transition duration-300">
                    Shop Now
                </button>
            </div>
        </div>
    );
};

export default Banner;
