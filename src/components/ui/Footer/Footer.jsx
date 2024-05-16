
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-1/3 text-center lg:text-left mb-6 lg:mb-0">
                        {/* <h1 className="text-2xl font-bold">VapeBazara</h1> */}
                        <p className='-mt-5 text-3xl font-bold font-Dancing'>Vape<span className='font-bold bg-gradient-to-r from-blue-400 via-green-400 to-pink-400 bg-clip-text text-transparent text-gradient'>Bazara</span></p>
                        <p className="mt-2">
                            Your one-stop shop for all vaping needs.
                        </p>
                        <div className="flex justify-center lg:justify-start mt-4 space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="h-6 w-6" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <img src="data:image/jpeg;base64,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" alt="Twitter" className="h-6 w-6 rounded-full" />
                            </a>
                            <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="h-6 w-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 text-center mb-6 lg:mb-0">
                        <h2 className="text-xl font-semibold">Contact Us</h2>
                        <p className="mt-2">Email: contact@vapebazara.com</p>
                        <p className="mt-1">Phone: +123 456 7890</p>
                        <p className="mt-1">Address: 123 Vape Street, Vapetown, USA</p>
                    </div>
                    <div className="w-full lg:w-1/3 text-center lg:text-right">
                        <h2 className="text-xl font-semibold">Quick Links</h2>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/shop" className="hover:underline">Shop</a></li>
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center border-t border-gray-700 pt-4">
                    <p>&copy; {new Date().getFullYear()} VapeBazara. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;