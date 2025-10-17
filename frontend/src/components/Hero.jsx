import React, { useState, useEffect } from 'react';
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

const Hero = () => {
  const [doorOpen, setDoorOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Start door opening animation after 500ms
    const doorTimer = setTimeout(() => {
      setDoorOpen(true);
    }, 500);

    // Show welcome text as door opens
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 1500);

    // Complete animation and show main content
    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4500);

    return () => {
      clearTimeout(doorTimer);
      clearTimeout(welcomeTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-cream-white/95 backdrop-blur-sm border-b border-gold/30 py-3 px-6 text-center">
        <p className="text-charcoal text-sm">
          New novel, a general fiction title, coming soon. Sign up for updates
        </p>
      </div>

      {/* Logo Header */}
      <div className="bg-burgundy/30 backdrop-blur-md border-b border-gold/30 py-6">
        <div className="max-w-7xl mx-auto flex justify-center">
          <img 
            src="https://customer-assets.emergentagent.com/job_petals-and-thorns/artifacts/o7uoix6g_1760709576020.jpg" 
            alt="Aruna Logo" 
            className="h-32 w-auto object-contain"
          />
        </div>
      </div>

      {/* Hero Section with Door Opening Animation */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1702817452020-efd4d8d8a164?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxvcm5hdGUlMjB3b29kZW4lMjBkb29yJTIwcm9zZXN8ZW58MHx8fHwxNzYwNzA3MTcyfDA&ixlib=rb-4.1.0&q=85"
            alt="Ornate door with roses"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Door Opening Animation Overlay */}
        {!animationComplete && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            {/* Video of door opening */}
            <video
              autoPlay
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                doorOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src="https://customer-assets.emergentagent.com/job_petals-and-thorns/artifacts/3afhih2u_1760705617973.mp4" type="video/mp4" />
            </video>

            {/* Welcome Text */}
            <div
              className={`relative z-30 text-center transition-all duration-1000 transform ${
                showWelcome ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="bg-charcoal/60 backdrop-blur-md px-12 py-8 rounded-lg border-2 border-gold/40">
                <h2 className="font-serif text-5xl md:text-6xl text-cream-white mb-4 tracking-wide">
                  Welcome to the World
                </h2>
                <h2 className="font-serif text-5xl md:text-6xl text-gold mb-6 tracking-wide">
                  of Literacy
                </h2>
                <div className="w-32 h-1 bg-gold mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Fades in after animation */}
        <div
          className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${
            animationComplete ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-cream-white mb-8 leading-tight tracking-tight">
            Aruna: Where Beauty Holds the Blade
          </h1>

          <Button
            onClick={() => scrollToSection('new-fiction')}
            className="bg-gold hover:bg-gold/90 text-charcoal px-10 py-7 text-lg font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Explore the New Chapter (General Fiction)
          </Button>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="bg-burgundy/30 backdrop-blur-md border-b border-gold/30 py-6">
        <div className="max-w-5xl mx-auto flex justify-center items-center space-x-12">
          <button
            onClick={() => scrollToSection('books')}
            className="flex items-center gap-2 text-base text-cream-white hover:text-gold transition-colors duration-300 font-medium"
          >
            <FlowerIcon className="w-5 h-5" />
            Horror Novels
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="flex items-center gap-2 text-base text-cream-white hover:text-gold transition-colors duration-300 font-medium"
          >
            <FlowerIcon className="w-5 h-5" />
            The Author
          </button>
          <button
            onClick={() => scrollToSection('new-fiction')}
            className="flex items-center gap-2 text-base text-cream-white hover:text-gold transition-colors duration-300 font-medium"
          >
            <FlowerIcon className="w-5 h-5" />
            The New Direction
          </button>
          <button
            onClick={() => scrollToSection('blog')}
            className="flex items-center gap-2 text-base text-cream-white hover:text-gold transition-colors duration-300 font-medium"
          >
            <FlowerIcon className="w-5 h-5" />
            Blog
          </button>
        </div>
      </nav>
    </>
  );
};

export default Hero;