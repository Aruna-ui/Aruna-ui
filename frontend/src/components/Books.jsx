import React from 'react';
import { mockBooks } from '../mockData';
import { Button } from './ui/button';

const Books = () => {
  return (
    <section id="books" className="relative">
      <div className="grid md:grid-cols-2">
        {/* Left Side - Horror Archive (The Thorns) */}
        <div className="relative py-20 px-8 lg:px-12 overflow-hidden">
          {/* Dark burgundy background with rose pattern */}
          <div className="absolute inset-0 z-0 bg-burgundy">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1529106550889-a7ed1c7a0293?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxkYXJrJTIwcm9zZXN8ZW58MHx8fHwxNzYwNzA3MjA5fDA&ixlib=rb-4.1.0&q=85)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>

          <div className="relative z-10">
            <h2 className="font-serif text-4xl text-cream-white mb-12 text-center">
              The Horror Archive (The Thorns)
            </h2>

            <div className="space-y-8">
              {mockBooks.horror.map((book) => (
                <div key={book.id} className="flex flex-col items-center">
                  <div className="w-56 h-80 mb-4 shadow-2xl rounded overflow-hidden">
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
                      className="bg-gold hover:bg-gold/90 text-charcoal px-6 py-2 text-sm rounded-full transition-all duration-300"
                      onClick={() => window.open(book.buyLinks.amazon, '_blank')}
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent border-2 border-cream-white text-cream-white hover:bg-cream-white hover:text-burgundy px-6 py-2 text-sm rounded-full transition-all duration-300"
                      onClick={() => window.open(book.excerpt, '_blank')}
                    >
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
          {/* Light pink/cream background with floral pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-soft-pink/30"></div>
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/flagged/photo-1687355616097-ebf4e0008091?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxldGhlcmVhbCUyMHJvc2UlMjBnYXJkZW58ZW58MHx8fHwxNzYwNzA3MTc5fDA&ixlib=rb-4.1.0&q=85)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h2 className="font-serif text-4xl text-burgundy mb-12 text-center">
              The New Bloom (The Petals)
            </h2>

            <div className="max-w-md">
              <div className="w-64 h-96 mb-6 shadow-2xl rounded overflow-hidden mx-auto">
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
                className="w-full bg-gold hover:bg-gold/90 text-charcoal px-8 py-4 text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.open(mockBooks.newFiction.preorder, '_blank')}
              >
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