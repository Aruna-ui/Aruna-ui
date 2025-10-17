import React from 'react';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1702817452020-efd4d8d8a164?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxvcm5hdGUlMjB3b29kZW4lMjBkb29yJTIwcm9zZXN8ZW58MHx8fHwxNzYwNzA3MTcyfDA&ixlib=rb-4.1.0&q=85"
          alt="Ornate door with roses"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-block px-6 py-2 bg-burgundy/20 backdrop-blur-sm border border-gold/30 rounded-full mb-6">
            <p className="text-gold text-sm tracking-widest uppercase">New Novel Coming Fall 2025</p>
          </div>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-white mb-6 leading-tight">
          Aruna
        </h1>
        
        <p className="text-xl md:text-2xl text-soft-pink mb-4 font-light tracking-wide">
          Where Beauty Holds the Blade
        </p>

        <p className="text-lg text-cream-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          From the darkest corners of psychological horror to the luminous depths of human experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => scrollToSection('new-fiction')}
            className="bg-gold hover:bg-gold/90 text-charcoal px-8 py-6 text-base font-medium rounded transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Explore the New Chapter
          </Button>
          <Button
            onClick={() => scrollToSection('books')}
            className="bg-transparent hover:bg-cream-white/10 text-cream-white border-2 border-cream-white px-8 py-6 text-base font-medium rounded transition-all duration-300"
          >
            Discover Horror Novels
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-cream-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-cream-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;