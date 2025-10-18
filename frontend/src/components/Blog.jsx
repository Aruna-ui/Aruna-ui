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

const ShareButtons = ({ title, url }) => {
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`Check out this article: "${title}" by Aruna`);
    const shareUrl = encodeURIComponent(url);
    window.open(`https://wa.me/?text=${text}%20${shareUrl}`, '_blank');
  };

  const shareOnInstagram = () => {
    navigator.clipboard.writeText(`Check out this article: "${title}" by Aruna! ${url}`);
    alert('Link copied! Share it on Instagram stories or posts.');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this article: "${title}" by Aruna`);
    const shareUrl = encodeURIComponent(url);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
  };

  const shareOnFacebook = () => {
    const shareUrl = encodeURIComponent(url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-cream-white/60 text-xs">Share:</span>
      <button
        onClick={shareOnWhatsApp}
        className="w-7 h-7 rounded-full bg-green-600/80 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Share on WhatsApp"
      >
        <FlowerIcon className="w-3 h-3 text-white" />
      </button>
      <button
        onClick={shareOnInstagram}
        className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Share on Instagram"
      >
        <FlowerIcon className="w-3 h-3 text-white" />
      </button>
      <button
        onClick={shareOnTwitter}
        className="w-7 h-7 rounded-full bg-blue-500/80 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Share on Twitter"
      >
        <FlowerIcon className="w-3 h-3 text-white" />
      </button>
      <button
        onClick={shareOnFacebook}
        className="w-7 h-7 rounded-full bg-blue-700/80 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Share on Facebook"
      >
        <FlowerIcon className="w-3 h-3 text-white" />
      </button>
    </div>
  );
};

const Blog = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  const blogPosts = [
    {
      id: 1,
      title: "The Quiet Cost of the Overbooked Calendar",
      author: "Aruna S",
      excerpt: "The alarm goes off. You're up, focused, already mentally listing the day's targets. You ace the pitch, navigate the market with surgical precision, and close the demanding project. You are, by all metrics, a success. But then, 9 PM hits...",
      date: "January 15, 2025",
      image: "https://customer-assets.emergentagent.com/job_petals-and-thorns/artifacts/ruyejh1v_1760725446846.jpg",
      isFeatured: true,
      fullContent: `The alarm goes off. You're up, focused, already mentally listing the day's targets. You ace the pitch, navigate the market with surgical precision, and close the demanding project. You are, by all metrics, a success.

But then, 9 PM hits. The laptop lid finally closes. You look up, and there's a silence in the room far deeper than the absence of noise. That's when the quiet cost of the overbooked calendar comes due.

It's the hug you wanted to give but didn't because he was already in a meeting. It's the story you forgot to share because your brain was still debugging the system crash. We spend so much energy optimizing our professional lives, yet often treat our emotional lives like a low-priority background task.

In my new novel, Between Two Time Zones, I explore the life of a woman who loves her successful husband but is separated from him by the chasm of their relentless careers. She's living proof that two successful people in the same house can still exist on different emotional schedules.

**The Illusion of "Keeping Busy"**

I know that feeling of desperation, that urge to "keep yourself busy" just so you don't have to face the loneliness. It's a survival tactic. You take on a new project, sign up for a night class, or start a demanding workout routine. You build a fortress of productivity around yourself.

And it works—for a while.

But busyness is a distraction, not a cure. It creates a powerful, self-sufficient exterior that, ironically, makes it harder for anyone to see the vulnerable part of you that just wants to be held. The wall you build to keep the pain out often ends up keeping the connection out, too.

**How to Stop Banking Emotional Reserves**

If you recognize yourself in this description, the solution isn't to quit your job or demand your partner quit theirs. It's about establishing The Meridian Line—the clear, agreed-upon center where your two worlds meet.

• **Stop Deleting the Vulnerable Texts**: If you feel the urge to share something real, something soft, send it. Don't let your self-editing protect you from potential connection.

• **Schedule the Disruption**: Your professional calendar has meetings; your personal life needs "interruptions." Schedule a "no-tech fifteen" after dinner. Even fifteen minutes of focused, eye-to-eye conversation is a deposit into your emotional account.

• **Define Your True Success**: If your eulogy were written by your spouse, what would you want it to say? If the answer is only about your P&L reports, your priorities need a serious audit.

It takes courage to slow down, to be still, and to admit the distance. But it is only in that quiet space that we can finally bridge the time zones and truly arrive home.

What is the "Meridian Line" in your life? How do you carve out real time for what matters most? Grab your early copy of my general fiction debut, Between Two Time Zones, coming soon.`
    },
    {
      id: 2,
      title: "The Art of Weaving Fear and Folklore",
      excerpt: "Exploring the intersection of ancient myths and modern psychological horror in contemporary storytelling...",
      date: "October 15, 2024",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600"
    },
    {
      id: 3,
      title: "My Journey from Horror to General Fiction",
      excerpt: "After three novels in psychological horror, I'm embarking on a new literary adventure that explores broader human experiences...",
      date: "September 28, 2024",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600"
    },
    {
      id: 4,
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
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FlowerIcon className="w-10 h-10 text-gold" />
            <h2 className="font-serif text-5xl text-cream-white">
              From the Writer's Garden
            </h2>
            <FlowerIcon className="w-10 h-10 text-gold" />
          </div>
          <p className="text-cream-white/70 text-lg mt-4">
            Musings on writing, stories, and the spaces between light and darkness
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-12">
          {/* Featured Post */}
          {blogPosts.filter(post => post.isFeatured).map((post) => (
            <article
              key={post.id}
              className="bg-burgundy/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl border border-gold/30 hover:shadow-3xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Featured Image */}
                <div className="relative h-96 md:h-auto overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gold px-4 py-2 rounded-full">
                    <span className="text-charcoal font-medium text-sm uppercase tracking-wide">Featured</span>
                  </div>
                </div>

                {/* Featured Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <FlowerIcon className="w-5 h-5 text-gold" />
                    <time className="text-sm text-gold font-medium">{post.date}</time>
                  </div>
                  
                  <h3 className="font-serif text-3xl md:text-4xl text-cream-white mb-4 leading-tight">
                    {post.title}
                  </h3>
                  
                  {post.author && (
                    <p className="text-gold/80 text-sm mb-4 italic">By {post.author}</p>
                  )}
                  
                  <p className="text-cream-white/80 text-base leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <button className="flex items-center gap-2 text-gold hover:text-soft-pink font-medium text-base transition-colors duration-300 mb-4">
                    <span>Read Full Article</span>
                    <FlowerIcon className="w-5 h-5" />
                  </button>

                  {/* Share Buttons */}
                  <ShareButtons 
                    title={post.title} 
                    url={`${currentUrl}#blog`} 
                  />
                </div>
              </div>
            </article>
          ))}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {blogPosts.filter(post => !post.isFeatured).map((post) => (
              <article
                key={post.id}
                className="bg-burgundy/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group border border-gold/20"
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
                    <FlowerIcon className="w-4 h-4 text-gold" />
                    <time className="text-sm text-cream-white/60">{post.date}</time>
                  </div>
                  
                  <h3 className="font-serif text-xl text-cream-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-cream-white/70 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <button className="flex items-center gap-2 text-gold hover:text-soft-pink font-medium text-sm transition-colors duration-300 mb-3">
                    <span>Read More</span>
                    <FlowerIcon className="w-4 h-4" />
                  </button>

                  {/* Share Buttons */}
                  <ShareButtons 
                    title={post.title} 
                    url={`${currentUrl}#blog`} 
                  />
                </div>
              </article>
            ))}
          </div>
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