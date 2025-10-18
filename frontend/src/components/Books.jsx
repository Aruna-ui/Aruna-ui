import React from 'react';
import { mockBooks } from '../mockData';
import { Button } from './ui/button';

// Flower Icon Component
const FlowerIcon = ({ className = "w-4 h-4" }) => (
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
    const text = encodeURIComponent(`Check out "${title}" by Aruna`);
    const shareUrl = encodeURIComponent(url);
    window.open(`https://wa.me/?text=${text}%20${shareUrl}`, '_blank');
  };

  const shareOnInstagram = () => {
    // Instagram doesn't support direct sharing via URL, so we copy to clipboard
    navigator.clipboard.writeText(`Check out "${title}" by Aruna! ${url}`);
    alert('Link copied! Share it on Instagram stories or posts.');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out "${title}" by Aruna`);
    const shareUrl = encodeURIComponent(url);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
  };

  const shareOnFacebook = () => {
    const shareUrl = encodeURIComponent(url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2 mt-3">
      <span className="text-cream-white/60 text-xs">Share:</span>
      <button
        onClick={shareOnWhatsApp}
        className="w-8 h-8 rounded-full bg-green-600/80 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Share on WhatsApp"
      >
        <FlowerIcon className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={shareOnInstagram}
        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Share on Instagram"
      >
        <FlowerIcon className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={shareOnTwitter}
        className="w-8 h-8 rounded-full bg-blue-500/80 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Share on Twitter"
      >
        <FlowerIcon className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={shareOnFacebook}
        className="w-8 h-8 rounded-full bg-blue-700/80 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Share on Facebook"
      >
        <FlowerIcon className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};

const Books = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <section id="books" className="relative">
      <div className="grid md:grid-cols-2">
        {/* Left Side - Horror Archive (The Thorns) */}
        <div className="relative py-12 md:py-20 px-4 md:px-8 lg:px-12 overflow-hidden border-r border-gold/20">
          {/* Darker burgundy overlay */}
          <div className="absolute inset-0 z-0 bg-burgundy/30"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-8 md:mb-12">
              <FlowerIcon className="w-6 h-6 md:w-8 md:h-8 text-gold" />
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream-white text-center">
                The Horror Archive (The Thorns)
              </h2>
              <FlowerIcon className="w-6 h-6 md:w-8 md:h-8 text-gold" />
            </div>

            <div className="space-y-6 md:space-y-8">
              {mockBooks.horror.map((book) => (
                <div key={book.id} className="flex flex-col items-center">
                  <div className="w-40 h-56 md:w-56 md:h-80 mb-4 shadow-2xl rounded overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-cream-white mb-3 text-center">
                    {book.title}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-2">
                    <Button
                      className="bg-gold hover:bg-gold/90 text-charcoal px-4 md:px-6 py-2 text-xs md:text-sm rounded-full transition-all duration-300 flex items-center gap-1 md:gap-2"
                      onClick={() => window.open(book.buyLinks.amazon, '_blank')}
                    >
                      <FlowerIcon className="w-3 h-3" />
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent border-2 border-cream-white text-cream-white hover:bg-cream-white hover:text-burgundy px-4 md:px-6 py-2 text-xs md:text-sm rounded-full transition-all duration-300 flex items-center gap-1 md:gap-2"
                      onClick={() => window.open(book.excerpt, '_blank')}
                    >
                      <FlowerIcon className="w-3 h-3" />
                      Read Excerpt
                    </Button>
                  </div>
                  <ShareButtons 
                    title={book.title} 
                    url={`${currentUrl}#books`} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - New Bloom (The Petals) */}
        <div id="new-fiction" className="relative py-12 md:py-20 px-4 md:px-8 lg:px-12 overflow-hidden">
          {/* Lighter overlay for contrast */}
          <div className="absolute inset-0 z-0 bg-soft-pink/20"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-8 md:mb-12">
              <FlowerIcon className="w-6 h-6 md:w-8 md:h-8 text-soft-pink" />
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream-white text-center">
                The New Bloom (The Petals)
              </h2>
              <FlowerIcon className="w-6 h-6 md:w-8 md:h-8 text-soft-pink" />
            </div>

            <div className="max-w-md">
              <div className="w-48 h-72 md:w-64 md:h-96 mb-6 shadow-2xl rounded overflow-hidden mx-auto transform hover:scale-105 transition-transform duration-300">
                <img
                  src={mockBooks.newFiction.cover}
                  alt={mockBooks.newFiction.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="font-serif text-xl md:text-2xl text-cream-white mb-3 text-center">
                {mockBooks.newFiction.title}
              </h3>
              
              <p className="text-cream-white/80 text-center mb-2 italic text-sm md:text-base px-4">
                {mockBooks.newFiction.teaser}
              </p>
              
              <p className="text-gold font-medium text-center mb-6">
                Pre-order now!
              </p>

              <Button
                className="w-full bg-gold hover:bg-gold/90 text-charcoal px-6 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-4"
                onClick={() => window.open(mockBooks.newFiction.preorder, '_blank')}
              >
                <FlowerIcon className="w-4 h-4 md:w-5 md:h-5" />
                Join the Mailing List for Exclusive Sneak Peeks
              </Button>
              
              <div className="flex justify-center">
                <ShareButtons 
                  title={mockBooks.newFiction.title} 
                  url={`${currentUrl}#new-fiction`} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;