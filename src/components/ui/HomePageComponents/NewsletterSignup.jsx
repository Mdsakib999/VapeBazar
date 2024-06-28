import React, { useState } from 'react';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        setSubmitted(true);
        setEmail('');
    };

    return (
        <section className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-xl">
                <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">
                    Subscribe to our Newsletter
                </h2>
                <p className="mt-4 text-center text-gray-700">
                    Stay updated with the latest news and exclusive offers.
                </p>
                <form onSubmit={handleSubmit} className="mt-8 sm:flex sm:justify-center">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-rose-500 focus:outline-none sm:max-w-xs"
                        placeholder="Enter your email"
                    />
                    <button
                        type="submit"
                        className="mt-3 w-full px-5 py-3 bg-rose-600 text-white font-medium rounded-md shadow-sm hover:bg-rose-700 focus:ring focus:ring-rose-500 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto"
                    >
                        Subscribe
                    </button>
                </form>
                {submitted && (
                    <p className="mt-4 text-center text-green-600">
                        Thank you for subscribing!
                    </p>
                )}
            </div>
        </section>
    );
};

export default NewsletterSignup;
