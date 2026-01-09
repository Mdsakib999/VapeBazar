import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { IoMailOutline, IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        { Icon: FaFacebookF, color: "from-blue-600 to-blue-400", label: "Facebook" },
        { Icon: FaTwitter, color: "from-cyan-500 to-blue-500", label: "Twitter" },
        { Icon: FaLinkedinIn, color: "from-blue-700 to-blue-500", label: "LinkedIn" },
        { Icon: FaInstagram, color: "from-pink-600 via-purple-600 to-orange-500", label: "Instagram" },
    ];

    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Product", path: "/product" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ];

    const companyLinks = [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Product", path: "/product" },
        { name: "Refund", path: "/refund" },
        { name: "Terms", path: "/terms" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`footer-particle-${i}`}
                        className="absolute rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-xl"
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: `${100 + Math.random() * 20}%`,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: `${-20 - Math.random() * 20}%`,
                            x: [
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%`,
                            ],
                        }}
                        transition={{
                            duration: 25 + Math.random() * 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.4,
                        }}
                        style={{
                            width: `${60 + Math.random() * 100}px`,
                            height: `${60 + Math.random() * 100}px`,
                        }}
                    />
                ))}

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Decorative Top Wave */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent" />

            {/* Main Footer Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative container mx-auto px-6 py-16"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Branding and About */}
                    <motion.div variants={itemVariants} className="text-center lg:text-left">
                        {/* Logo with Glow Effect */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-block"
                        >
                            <h3 className="text-4xl font-bold font-Dancing relative">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    Vape
                                </span>
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                    Bazar24
                                </span>
                                <motion.div
                                    className="absolute -top-1 -right-8"
                                    animate={{
                                        rotate: [0, 10, 0],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Sparkles className="w-5 h-5 text-cyan-400" />
                                </motion.div>
                            </h3>
                        </motion.div>

                        <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs mx-auto lg:mx-0">
                            Your one-stop shop for all vaping needs. Quality products and customer satisfaction guaranteed.
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex justify-center lg:justify-start mt-6 gap-3">
                            {socialLinks.map(({ Icon, color, label }, index) => (
                                <motion.a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.2, y: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="group relative"
                                >
                                    <div className="relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden">
                                        {/* Animated Background */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                        
                                        {/* Icon */}
                                        <Icon className="relative z-10 w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                                    </div>

                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10`} />
                                </motion.a>
                            ))}
                        </div>

                        {/* Newsletter Signup */}
                        {/* <motion.div
                            variants={itemVariants}
                            className="mt-8"
                        >
                            <p className="text-sm font-semibold text-white mb-3">Subscribe to Newsletter</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 pr-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute right-1 top-1 p-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                                >
                                    <ArrowUp className="w-4 h-4 rotate-90" />
                                </motion.button>
                            </div>
                        </motion.div> */}

                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="text-center lg:text-left">
                        <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className="group"
                                >
                                    <Link
                                        to={link.path}
                                        className="relative inline-block text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        <span className="relative">
                                            {link.name}
                                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                                        </span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Policies */}
                    <motion.div variants={itemVariants} className="text-center lg:text-left">
                        <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
                            Company
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link, index) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className="group"
                                >
                                    <Link
                                        to={link.path}
                                        className="relative inline-block text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        <span className="relative">
                                            {link.name}
                                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                                        </span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Details */}
                    <motion.div variants={itemVariants} className="text-center lg:text-left">
                        <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
                        </h4>
                        <ul className="space-y-4">
                            <motion.li
                                whileHover={{ x: 5 }}
                                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300 justify-center lg:justify-start"
                            >
                                <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 mt-0.5">
                                    <IoMailOutline className="text-lg text-cyan-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Email</span>
                                    <span className="text-sm">contact@vapebazara.com</span>
                                </div>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 5 }}
                                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300 justify-center lg:justify-start"
                            >
                                <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 mt-0.5">
                                    <FiPhoneCall className="text-lg text-blue-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Phone</span>
                                    <span className="text-sm">+123 456 7890</span>
                                </div>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 5 }}
                                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300 justify-center lg:justify-start"
                            >
                                <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 mt-0.5">
                                    <IoLocationOutline className="text-lg text-purple-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Location</span>
                                    <span className="text-sm">123 Vape Street, Dubai, UAE</span>
                                </div>
                            </motion.li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 pt-8 border-t border-white/10"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-gray-500 text-center md:text-left">
                            &copy; {new Date().getFullYear()} VapeBazar. All rights reserved. Crafted with{" "}
                            <span className="text-red-500">❤️</span> for vaping enthusiasts.
                        </p>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">We Accept</span>
                            {["Visa", "MC", "PayPal"].map((method) => (
                                <motion.div
                                    key={method}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="px-3 py-1.5 rounded bg-white/5 backdrop-blur-sm border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300"
                                >
                                    {method}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: showScrollTop ? 1 : 0,
                    scale: showScrollTop ? 1 : 0,
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-6 h-6" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 blur-xl opacity-50 -z-10" />
            </motion.button>

            {/* CSS for gradient animation */}
            <style jsx>{`
                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                
                .animate-gradient {
                    animation: gradient 5s ease infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;