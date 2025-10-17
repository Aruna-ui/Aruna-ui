import React from 'react';

// Flower Icon Component
const FlowerIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 10 4 10 6C10 7 10.5 8 11.5 8.5C10.5 9 10 10 10 11C10 13 12 15 12 15C12 15 14 13 14 11C14 10 13.5 9 12.5 8.5C13.5 8 14 7 14 6C14 4 12 2 12 2Z"/>
    <path d="M12 15C12 15 10 17 10 19C10 20 10.5 21 11.5 21.5C10.5 22 10 23 10 24H14C14 23 13.5 22 12.5 21.5C13.5 21 14 20 14 19C14 17 12 15 12 15Z"/>
    <path d="M15 12C15 12 17 10 19 10C20 10 21 10.5 21.5 11.5C22 10.5 23 10 24 10V14C23 14 22 13.5 21.5 12.5C21 13.5 20 14 19 14C17 14 15 12 15 12Z"/>
    <path d="M9 12C9 12 7 10 5 10C4 10 3 10.5 2.5 11.5C2 10.5 1 10 0 10V14C1 14 2 13.5 2.5 12.5C3 13.5 4 14 5 14C7 14 9 12 9 12Z"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
  </svg>
);

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Weaving Fear and Folklore",
      excerpt: "Exploring the intersection of ancient myths and modern psychological horror in contemporary storytelling...",
      date: "October 15, 2024",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600"
    },
    {
      id: 2,
      title: "My Journey from Horror to General Fiction",
      excerpt: "After three novels in psychological horror, I'm embarking on a new literary adventure that explores broader human experiences...",
      date: "September 28, 2024",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600"
    },
    {
      id: 3,
      title: "Writing Rituals and Rose Gardens",
      excerpt: "Behind every dark story lies a writer's sanctuary. Mine happens to be surrounded by roses—both beautiful and thorned...",
      date: "August 12, 2024",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600"
    }
  ];

  return (
    <section id="blog" className="relative py-24 overflow-hidden">
      {/* Rose Petals Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200"
          alt="Rose petals background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-soft-gray/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FlowerIcon className="w-10 h-10 text-burgundy" />
            <h2 className="font-serif text-5xl text-charcoal">
              From the Writer's Garden
            </h2>
            <FlowerIcon className="w-10 h-10 text-burgundy" />
          </div>
          <p className="text-warm-gray text-lg mt-4">
            Musings on writing, stories, and the spaces between light and darkness
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Flower overlay on hover */}
                <div className="absolute top-4 right-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FlowerIcon className="w-8 h-8" />
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FlowerIcon className="w-4 h-4 text-burgundy" />
                  <time className="text-sm text-warm-gray">{post.date}</time>
                </div>
                
                <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-burgundy transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-charcoal/80 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <button className="flex items-center gap-2 text-burgundy hover:text-crimson font-medium text-sm transition-colors duration-300">
                  <span>Read More</span>
                  <FlowerIcon className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 bg-burgundy hover:bg-crimson text-cream-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            <FlowerIcon className="w-5 h-5" />
            <span>View All Posts</span>
            <FlowerIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
