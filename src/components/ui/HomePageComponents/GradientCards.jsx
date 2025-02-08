import { Link } from "react-router-dom";
import img1 from "../../../assets/vecteezy_vape-store-logo-design-template_10634918-removebg-preview.png";
import img2 from "../../../assets/vecteezy_vape-esport-logo-company_5076554-removebg-preview.png";

const GradientCards = () => {
    const cards = [
        {
            id: 1,
            title: "IGNITE YOUR SENSES",
            description: "Unleash the power of flavors",
            buttonText: "Shop Now",
            bgGradient: "from-red-500 to-orange-400",
            image: img1,
        },
        {
            id: 2,
            title: "ELEVATE YOUR EXPERIENCE",
            description: "Upgrade your vaping journey",
            buttonText: "Shop Now",
            bgGradient: "from-lime-500 to-green-400",
            image: img2,
        },
    ];

    return (
        <div className="py-12 px-4 ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`p-8 rounded-2xl bg-gradient-to-r ${card.bgGradient} relative text-white flex items-center`}
                    >
                        <div className="w-1/2">
                            <h2 className="text-xl md:text-3xl font-bold mb-2">
                                {card.title}
                            </h2>
                            <p className="text-sm md:text-base mb-4">
                                {card.description}
                            </p>
                            <Link
                                to="/product"
                                className="inline-block bg-white text-black font-medium py-2 px-4 rounded-full hover:bg-gray-200 transition-all"
                            >
                                {card.buttonText}
                            </Link>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="max-w-[120px] md:max-w-[200px]  object-contain transition-transform duration-300 ease-in-out hover:scale-125"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GradientCards;
