import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { IoMailOutline, IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding and About */}
          <div className="text-center lg:text-left ">
            <p className="text-3xl font-bold font-Dancing text-white">
              Vape
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-pink-400 bg-clip-text text-transparent">
                Bazar
              </span>
            </p>
            <p className="mt-2 text-sm">
              Your one-stop shop for all vaping needs. Quality products and customer satisfaction guaranteed.
            </p>
            <div className="flex justify-center lg:justify-start mt-4 space-x-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                <p
                  key={index}
                  className="p-2 rounded-full bg-white text-black shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white"
                >
                  <Icon />
                </p>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className=" lg:pl-10">
            <h2 className="text-xl font-semibold text-white">Quick Links</h2>
            <ul className="mt-3 space-y-2">
              <li className="group relative">
                <Link to="/" className="relative hover:text-white">
                  Home
                  <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </li>
              {["Product", "Blog", "Contact"].map((item, index) => (
                <li key={index} className="group relative">
                  <Link to={`/${item.toLowerCase()}`} className="relative hover:text-white">
                    {item}
                    <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Policies */}
          <div className="">
            <h2 className="text-xl font-semibold text-white">Company</h2>
            <ul className="mt-3 space-y-2">
              {["Privacy Policy", "Product", "Refund", "Terms"].map((item, index) => (
                <li key={index} className="group ">
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white relative">
                    {item}
                    <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h2 className="text-xl font-semibold text-white">Contact Us</h2>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-x-2">
                <IoMailOutline className="text-lg" />
                <span>Email: contact@vapebazara.com</span>
              </li>
              <li className="flex items-center gap-x-2">
                <FiPhoneCall />
                <span>Phone: +123 456 7890</span>
              </li>
              <li className="flex items-center gap-x-2">
                <IoLocationOutline className="text-lg" />
                <span>123 Vape Street, Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} VapeBazar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
