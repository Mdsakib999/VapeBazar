import React from 'react';

const blogPosts = [
    {
        id: 1,
        title: 'The Rise of Vaping: Trends and Insights',
        excerpt: 'Explore the latest trends and insights in the vaping industry...',
        imageUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe2df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHZhcGV8ZW58MHx8fHwxNjE5Mjc5Nzcy&ixlib=rb-1.2.1&q=80&w=400',
        link: '/blog/the-rise-of-vaping',
    },
    {
        id: 2,
        title: 'Health Benefits and Risks of Vaping',
        excerpt: 'Understand the health benefits and risks associated with vaping...',
        imageUrl: 'https://images.unsplash.com/photo-1512069772998-18b63b7c4858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIxfHx2YXBlfGVufDB8fHx8MTYxOTI3OTc3Mg&ixlib=rb-1.2.1&q=80&w=400',
        link: '/blog/health-benefits-and-risks',
    },
    {
        id: 3,
        title: 'How to Choose the Best Vape Device for You',
        excerpt: 'A comprehensive guide to selecting the perfect vape device...',
        imageUrl: 'https://images.unsplash.com/photo-1592841992032-60cbf13bb227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExfHx2YXBlfGVufDB8fHx8MTYxOTI3OTc3Mg&ixlib=rb-1.2.1&q=80&w=400',
        link: '/blog/choose-the-best-vape-device',
    },
];

const BlogSection = () => {
    return (
        <section className="bg-gray-200 container mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Highlights of Recent Blog Posts
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                    <article key={post.id} className="relative overflow-hidden rounded-lg shadow-lg group">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 p-6 text-white transition-opacity duration-300 group-hover:opacity-100">
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                            <p className="mt-2">{post.excerpt}</p>
                            <a
                                href={post.link}
                                className="mt-4 inline-block text-rose-400 hover:underline"
                            >
                                Read More
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
