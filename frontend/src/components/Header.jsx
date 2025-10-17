import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream-white/95 backdrop-blur-md border-b border-warm-sage/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-burgundy rounded-full flex items-center justify-center">
              <span className="text-cream-white text-xl font-serif">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif text-charcoal">Aruna</h1>
              <p className="text-xs tracking-widest text-warm-gray uppercase">Author</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm tracking-wide text-charcoal hover:text-burgundy transition-colors duration-300"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm tracking-wide text-charcoal hover:text-burgundy transition-colors duration-300"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('books')}
              className="text-sm tracking-wide text-charcoal hover:text-burgundy transition-colors duration-300"
            >
              BOOKS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm tracking-wide text-charcoal hover:text-burgundy transition-colors duration-300"
            >
              CONTACT
            </button>
            <Button
              onClick={() => scrollToSection('new-fiction')}
              className="bg-burgundy hover:bg-crimson text-cream-white px-6 py-2 rounded transition-all duration-300 shadow-md hover:shadow-lg"
            >
              New Fiction
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-charcoal"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-sm tracking-wide text-charcoal hover:text-burgundy transition-colors duration-300 py-2"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-sm tracking-wide text-charcoal hover:text-burgundy transition-colors duration-300 py-2"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('books')}
              className="block w-full text-left text-sm tracking-wide text-charcoal hover:text-burgundy transition-colors duration-300 py-2"
            >
              BOOKS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-sm tracking-wide text-charcoal hover:text-burgundy transition-colors duration-300 py-2"
            >
              CONTACT
            </button>
            <Button
              onClick={() => scrollToSection('new-fiction')}
              className="w-full bg-burgundy hover:bg-crimson text-cream-white rounded transition-all duration-300"
            >
              New Fiction
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;