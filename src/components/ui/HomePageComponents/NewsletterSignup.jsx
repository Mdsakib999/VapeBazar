import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Gift, TrendingUp, Check } from 'lucide-react';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-2xl"
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: `${100 + Math.random() * 20}%`,
                        }}
                        animate={{
                            y: `${-20 - Math.random() * 20}%`,
                            x: [
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%`,
                            ],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.5,
                        }}
                        style={{
                            width: `${80 + Math.random() * 120}px`,
                            height: `${80 + Math.random() * 120}px`,
                        }}
                    />
                ))}

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Main Container with Glassmorphism */}
                    <div className="relative max-w-7xl mx-auto">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            {/* Animated Gradient Background */}
                            <motion.div
                                animate={{
                                    background: [
                                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    ],
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-0"
                            />

                            {/* Overlay Pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

                            {/* Content Container */}
                            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 md:p-12 lg:p-16">
                                {/* Left Section - Image & Features */}
                                <div className="space-y-8">
                                    {/* Decorative Image */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="relative hidden lg:block"
                                    >
                                        <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                                            <img
                                                src="https://vapehub.risingbamboo.com/wp-content/uploads/2024/11/section-banner4-1-1.png"
                                                alt="Newsletter"
                                                className="w-full h-full object-contain drop-shadow-2xl"
                                            />
                                            
                                            {/* Floating Elements */}
                                            <motion.div
                                                animate={{
                                                    y: [0, -20, 0],
                                                    rotate: [0, 5, 0],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                                className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-md"
                                            >
                                                <Sparkles className="w-6 h-6 text-yellow-300" />
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Features Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {[
                                            { icon: Gift, text: "60% OFF", color: "from-pink-500 to-rose-500" },
                                            { icon: TrendingUp, text: "Exclusive Deals", color: "from-cyan-500 to-blue-500" },
                                            { icon: Sparkles, text: "VIP Access", color: "from-purple-500 to-pink-500" },
                                        ].map((feature, index) => (
                                            <motion.div
                                                key={feature.text}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.4 + index * 0.1 }}
                                                whileHover={{ scale: 1.05, y: -5 }}
                                                className="group relative"
                                            >
                                                <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} w-fit mb-2`}>
                                                        <feature.icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <p className="text-white font-bold text-sm">{feature.text}</p>
                                                </div>
                                                
                                                {/* Glow Effect */}
                                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl -z-10`} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Section - CTA & Form */}
                                <div className="space-y-6">
                                    {/* Heading */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        className="space-y-4"
                                    >
                                        {/* Badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                                            <Mail className="w-4 h-4 text-white" />
                                            <span className="text-sm font-semibold text-white uppercase tracking-wider">
                                                Newsletter Signup
                                            </span>
                                        </div>

                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                                            Save Up To
                                            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
                                                60% OFF
                                            </span>
                                        </h2>

                                        <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                                            Join our VIP community and get exclusive discounts, early access to new products, and special deals delivered straight to your inbox!
                                        </p>
                                    </motion.div>

                                    {/* Form */}
                                    <motion.form
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="relative">
                                            <div className="relative flex items-center">
                                                <Mail className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-12 pr-32 py-4 rounded-full bg-white text-gray-800 placeholder-gray-400 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
                                                    placeholder="Enter your email address"
                                                />
                                                <motion.button
                                                    type="submit"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onHoverStart={() => setIsHovered(true)}
                                                    onHoverEnd={() => setIsHovered(false)}
                                                    className="absolute right-1 px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        Subscribe
                                                        <motion.div
                                                            animate={isHovered ? { x: [0, 5, 0] } : {}}
                                                            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                                                        >
                                                            →
                                                        </motion.div>
                                                    </span>
                                                </motion.button>
                                            </div>

                                            {/* Success Message */}
                                            <AnimatePresence>
                                                {submitted && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="absolute top-full mt-3 left-0 right-0"
                                                    >
                                                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500 text-white shadow-lg">
                                                            <div className="p-1 rounded-full bg-white/20">
                                                                <Check className="w-4 h-4" />
                                                            </div>
                                                            <span className="text-sm font-semibold">
                                                                🎉 Successfully subscribed! Check your inbox.
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Trust Indicators */}
                                        <div className="flex flex-wrap items-center gap-4 pt-2">
                                            <div className="flex items-center gap-2 text-white/80 text-sm">
                                                <Check className="w-4 h-4 text-green-300" />
                                                <span>No spam, ever</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/80 text-sm">
                                                <Check className="w-4 h-4 text-green-300" />
                                                <span>Unsubscribe anytime</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/80 text-sm">
                                                <Check className="w-4 h-4 text-green-300" />
                                                <span>100% secure</span>
                                            </div>
                                        </div>
                                    </motion.form>

                                    {/* Stats */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.7 }}
                                        className="flex items-center gap-6 pt-4"
                                    >
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center text-white font-bold text-xs"
                                                >
                                                    👤
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-white/90">
                                            <p className="text-sm font-semibold">Join 10,000+ subscribers</p>
                                            <p className="text-xs text-white/70">Already enjoying exclusive deals</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-50 animate-pulse" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSignup;