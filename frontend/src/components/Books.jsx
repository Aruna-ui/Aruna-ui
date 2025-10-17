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

const Books = () => {
  return (
    <section id="books" className="relative">
      <div className="grid md:grid-cols-2">
        {/* Left Side - Horror Archive (The Thorns) */}
        <div className="relative py-20 px-8 lg:px-12 overflow-hidden border-r border-gold/20">
          {/* Darker burgundy overlay */}
          <div className="absolute inset-0 z-0 bg-burgundy/30"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-12">
              <FlowerIcon className="w-8 h-8 text-gold" />
              <h2 className="font-serif text-4xl text-cream-white text-center">
                The Horror Archive (The Thorns)
              </h2>
              <FlowerIcon className="w-8 h-8 text-gold" />
            </div>

            <div className="space-y-8">
              {mockBooks.horror.map((book) => (
                <div key={book.id} className="flex flex-col items-center">
                  <div className="w-56 h-80 mb-4 shadow-2xl rounded overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-cream-white mb-3 text-center">
                    {book.title}
                  </h3>
                  <div className="flex gap-3">
                    <Button
                      className="bg-gold hover:bg-gold/90 text-charcoal px-6 py-2 text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                      onClick={() => window.open(book.buyLinks.amazon, '_blank')}
                    >
                      <FlowerIcon className="w-3 h-3" />
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent border-2 border-cream-white text-cream-white hover:bg-cream-white hover:text-burgundy px-6 py-2 text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                      onClick={() => window.open(book.excerpt, '_blank')}
                    >
                      <FlowerIcon className="w-3 h-3" />
                      Read Excerpt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - New Bloom (The Petals) */}
        <div id="new-fiction" className="relative py-20 px-8 lg:px-12 overflow-hidden">
          {/* Lighter overlay for contrast */}
          <div className="absolute inset-0 z-0 bg-soft-pink/20"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center gap-3 mb-12">
              <FlowerIcon className="w-8 h-8 text-soft-pink" />
              <h2 className="font-serif text-4xl text-cream-white text-center">
                The New Bloom (The Petals)
              </h2>
              <FlowerIcon className="w-8 h-8 text-soft-pink" />
            </div>

            <div className="max-w-md">
              <div className="w-64 h-96 mb-6 shadow-2xl rounded overflow-hidden mx-auto transform hover:scale-105 transition-transform duration-300">
                <img
                  src={mockBooks.newFiction.cover}
                  alt={mockBooks.newFiction.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="font-serif text-2xl text-burgundy mb-3 text-center">
                {mockBooks.newFiction.title}
              </h3>
              
              <p className="text-charcoal text-center mb-2 italic">
                {mockBooks.newFiction.teaser}
              </p>
              
              <p className="text-burgundy font-medium text-center mb-6">
                Pre-order now!
              </p>

              <Button
                className="w-full bg-gold hover:bg-gold/90 text-charcoal px-8 py-4 text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                onClick={() => window.open(mockBooks.newFiction.preorder, '_blank')}
              >
                <FlowerIcon className="w-5 h-5" />
                Join the Mailing List for Exclusive Sneak Peeks
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;