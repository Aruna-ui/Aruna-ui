import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

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
      <div className="bg-cream-white border-b border-warm-gray/20 py-3 px-6 text-center">
        <p className="text-charcoal text-sm">
          New novel, a general fiction title, coming soon. Sign up for updates
        </p>
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
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/80"></div>
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
      <nav className="bg-cream-white border-b border-warm-gray/30 py-6">
        <div className="max-w-4xl mx-auto flex justify-center items-center space-x-16">
          <button
            onClick={() => scrollToSection('books')}
            className="text-base text-charcoal hover:text-burgundy transition-colors duration-300 font-medium"
          >
            Horror Novels
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-base text-charcoal hover:text-burgundy transition-colors duration-300 font-medium"
          >
            The Author
          </button>
          <button
            onClick={() => scrollToSection('new-fiction')}
            className="text-base text-charcoal hover:text-burgundy transition-colors duration-300 font-medium"
          >
            The New Direction
          </button>
        </div>
      </nav>
    </>
  );
};

export default Hero;