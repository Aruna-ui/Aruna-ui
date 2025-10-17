import React from 'react';
import { mockBooks } from '../mockData';
import { Button } from './ui/button';
import { ExternalLink, BookOpen } from 'lucide-react';

const BookCard = ({ book, isNewFiction = false }) => {
  return (
    <div className="bg-cream-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
      <div className="relative overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="font-serif text-2xl text-charcoal mb-2">{book.title}</h3>
        {book.subtitle && (
          <p className="text-burgundy text-sm mb-3 font-medium">{book.subtitle}</p>
        )}
        
        <p className="text-charcoal/80 leading-relaxed mb-4 text-sm">
          {book.synopsis || book.teaser}
        </p>

        {book.releaseDate && (
          <p className="text-gold font-medium mb-4 text-sm">Release: {book.releaseDate}</p>
        )}

        <div className="flex flex-wrap gap-2">
          {book.buyLinks && (
            <>
              <Button
                className="bg-burgundy hover:bg-crimson text-cream-white text-xs px-4 py-2 rounded transition-colors duration-300"
                onClick={() => window.open(book.buyLinks.amazon, '_blank')}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="border-burgundy text-burgundy hover:bg-burgundy hover:text-cream-white text-xs px-4 py-2 rounded transition-colors duration-300"
                onClick={() => window.open(book.excerpt, '_blank')}
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Read Excerpt
              </Button>
            </>
          )}
          
          {book.preorder && (
            <>
              <Button
                className="bg-gold hover:bg-gold/90 text-charcoal text-xs px-4 py-2 rounded transition-colors duration-300 font-medium"
                onClick={() => window.open(book.preorder, '_blank')}
              >
                Pre-order
              </Button>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-charcoal text-xs px-4 py-2 rounded transition-colors duration-300"
                onClick={() => window.open(book.goodreads, '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Add to Goodreads
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Books = () => {
  return (
    <section id="books" className="relative py-24 overflow-hidden">
      {/* Soft Rose Garden Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/flagged/photo-1687355616097-ebf4e0008091?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxldGhlcmVhbCUyMHJvc2UlMjBnYXJkZW58ZW58MHx8fHwxNzYwNzA3MTc5fDA&ixlib=rb-4.1.0&q=85"
          alt="Rose garden background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cream-white/92"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            The Petals & The Thorns
          </h2>
          <p className="text-warm-gray text-lg">A journey through darkness and light</p>
          <div className="w-24 h-1 bg-burgundy mx-auto mt-4"></div>
        </div>

        {/* New Fiction Section - The Bloom */}
        <div id="new-fiction" className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-burgundy/30 flex-1 max-w-xs"></div>
            <h3 className="font-serif text-3xl text-burgundy mx-6">The New Bloom</h3>
            <div className="h-px bg-burgundy/30 flex-1 max-w-xs"></div>
          </div>
          
          <div className="max-w-md mx-auto">
            <BookCard book={mockBooks.newFiction} isNewFiction={true} />
          </div>
        </div>

        {/* Horror Archive Section - The Thorns */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-charcoal/30 flex-1 max-w-xs"></div>
            <h3 className="font-serif text-3xl text-charcoal mx-6">The Horror Archive</h3>
            <div className="h-px bg-charcoal/30 flex-1 max-w-xs"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockBooks.horror.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;