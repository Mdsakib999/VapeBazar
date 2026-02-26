import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Gift, TrendingUp, Check } from 'lucide-react';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Static background orbs — no animate-pulse, no infinite motion */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-6 w-72 h-72 bg-gradient-to-br from-cyan-400/25 to-blue-500/25 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-6 w-72 h-72 bg-gradient-to-br from-purple-400/25 to-pink-500/25 rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative max-w-7xl mx-auto">
                        {/* Decorative corner blobs — static, no animation */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-40 pointer-events-none" />
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-2xl opacity-40 pointer-events-none" />

                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            {/* Static gradient background — replaces the heavy cycling animation */}
                            <div className="absolute inset-0 bg-gradient-to-135 from-[#667eea] to-[#764ba2]"
                                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4facfe 100%)' }}
                            />

                            {/* Subtle radial overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_60%)]" />

                            {/* Content */}
                            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-16">

                                {/* Left — Image & Features */}
                                <div className="space-y-6">
                                    {/* Image — desktop only */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="relative hidden lg:block"
                                    >
                                        <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                                            <img
                                                src="https://vapehub.risingbamboo.com/wp-content/uploads/2024/11/section-banner4-1-1.png"
                                                alt="Newsletter"
                                                className="w-full h-full object-contain drop-shadow-2xl"
                                                loading="lazy"
                                            />
                                            {/* Simple static badge — removed infinite floating */}
                                            <div className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-md">
                                                <Sparkles className="w-5 h-5 text-yellow-300" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Feature Cards — CSS hover only, no whileHover framer */}
                                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                                        {[
                                            { icon: Gift, text: "60% OFF", color: "from-pink-500 to-rose-500" },
                                            { icon: TrendingUp, text: "Exclusive Deals", color: "from-cyan-500 to-blue-500" },
                                            { icon: Sparkles, text: "VIP Access", color: "from-purple-500 to-pink-500" },
                                        ].map((feature, index) => (
                                            <motion.div
                                                key={feature.text}
                                                initial={{ opacity: 0, y: 16 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + index * 0.1 }}
                                                className="group relative"
                                            >
                                                <div className="relative p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors duration-300 cursor-default">
                                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} w-fit mb-2`}>
                                                        <feature.icon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <p className="text-white font-bold text-xs sm:text-sm leading-tight">{feature.text}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right — CTA & Form */}
                                <div className="space-y-5">
                                    <motion.div
                                        initial={{ opacity: 0, x: 16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="space-y-4"
                                    >
                                        {/* Badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                                            <Mail className="w-4 h-4 text-white" />
                                            <span className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                                                Newsletter Signup
                                            </span>
                                        </div>

                                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                                            Save Up To
                                            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                                                60% OFF
                                            </span>
                                        </h2>

                                        <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-xl">
                                            Join our VIP community and get exclusive discounts, early access to new products, and special deals delivered straight to your inbox!
                                        </p>
                                    </motion.div>

                                    {/* Form */}
                                    <motion.form
                                        initial={{ opacity: 0, x: 16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.35 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="relative">
                                            <div className="relative flex items-center">
                                                <Mail className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-12 pr-36 py-4 rounded-full bg-white text-gray-800 placeholder-gray-400 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-shadow duration-300 text-sm sm:text-base"
                                                    placeholder="Enter your email address"
                                                />
                                                <button
                                                    type="submit"
                                                    className="absolute right-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-200 text-sm flex items-center gap-1.5"
                                                >
                                                    Subscribe
                                                    <span className="hidden sm:inline">→</span>
                                                </button>
                                            </div>

                                            {/* Success Message */}
                                            <AnimatePresence>
                                                {submitted && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -8 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="absolute top-full mt-3 left-0 right-0 z-20"
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
                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                                            {["No spam, ever", "Unsubscribe anytime", "100% secure"].map((text) => (
                                                <div key={text} className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm">
                                                    <Check className="w-3.5 h-3.5 text-green-300 flex-shrink-0" />
                                                    <span>{text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.form>

                                    {/* Social Proof */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-center gap-4 pt-2"
                                    >
                                        <div className="flex -space-x-2.5">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center text-white text-xs"
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSignup;