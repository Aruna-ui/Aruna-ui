import React, { useState, useEffect } from "react";
import { navigationItems } from "../data/mock";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWelcomeClick = () => {
    console.log('Welcome clicked in header!'); // Debug log
    setDoorsOpen(true);
    
    // Start the video if exists
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        console.log('Video started playing');
      }).catch((e) => {
        console.error('Video play failed:', e);
      });
    }
    
    // Show enter button after animation
    setTimeout(() => {
      setHasEntered(true);
    }, 4000);
  };

  const handleEnterAbyss = () => {
    scrollToSection('#books');
  };

  return (
    <header className={`gothic-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-background">
        <img 
          src="https://customer-assets.emergentagent.com/job_fea8cb67-fe22-4e2c-8016-7db8e7592c25/artifacts/acinu0ga_1759516429354.jpg" 
          alt="The Shadowed Castle" 
          className="header-bg-image"
        />
        <div className="header-overlay"></div>
      </div>

      {/* Gothic Video Background */}
      <div className={`gothic-video-container ${doorsOpen ? 'doors-opening' : ''}`}>
        <video
          ref={videoRef}
          className="gothic-background-video"
          muted
          loop
          playsInline
          poster="https://customer-assets.emergentagent.com/job_gothic-author/artifacts/hix160h1_1759516429354.jpg"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_gothic-author/artifacts/pqvep5or_1759541615032.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>

      {/* Mystical Doors */}
      <div className={`mystical-doors-overlay ${doorsOpen ? 'doors-opening' : ''}`}>
        {/* Left Door */}
        <div className="mystical-door door-left">
          <div className="door-surface">
            <div className="door-runes">
              <span className="rune">◈</span>
              <span className="rune">※</span>
              <span className="rune">⟐</span>
            </div>
            <div className="door-handle"></div>
          </div>
        </div>
        
        {/* Right Door */}
        <div className="mystical-door door-right">
          <div className="door-surface">
            <div className="door-runes">
              <span className="rune">◈</span>
              <span className="rune">※</span>
              <span className="rune">⟐</span>
            </div>
            <div className="door-handle"></div>
          </div>
        </div>
        
        {/* Door Opening Light Beam */}
        <div className={`door-light-beam ${doorsOpen ? 'light-active' : ''}`}></div>
        
        {/* Serpent Entrance */}
        <div className={`serpent-entrance ${doorsOpen ? 'serpent-active' : ''}`}>
          <div className="serpent-body">
            <div className="serpent-head"></div>
            <div className="serpent-trail"></div>
          </div>
        </div>
        
        {/* Mystical Effects */}
        <div className={`mystical-effects ${doorsOpen ? 'effects-active' : ''}`}>
          <div className="glow-burst"></div>
          <div className="particle-swirl"></div>
        </div>
      </div>

      {/* Header Content - Navigation and Interactive Text */}
      <nav className="header-nav">
        <div className="nav-container">
          <div className="author-logo">
            <div className="logo-container">
              <img 
                src="https://customer-assets.emergentagent.com/job_gothic-author/artifacts/munlgj82_Gemini_Generated_Image_gtl3kngtl3kngtl3.png" 
                alt="Aruna.S Logo" 
                className="author-logo-image"
              />
              <div className="logo-text">
                <h1 className="author-name">Aruna.S</h1>
                <p className="author-tagline">Weaving Tales from the Abyss</p>
              </div>
            </div>
          </div>
          
          <ul className="nav-menu">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <button 
                  onClick={() => scrollToSection(item.href)}
                  className="nav-link"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Interactive Welcome Text - Positioned in center like hero */}
      <div className="header-hero-content">
        <div className="header-hero-text">
          <h2 
            className={`header-hero-welcome ${doorsOpen ? 'activated' : 'interactive'}`}
            onClick={handleWelcomeClick}
          >
            Welcome
          </h2>
          <h3 
            className={`header-hero-subtitle ${doorsOpen ? 'activated' : 'interactive'}`}
            onClick={handleWelcomeClick}
          >
            Welcome to the World of Horror
          </h3>
          <p className="header-hero-description">
            {!doorsOpen ? (
              <span className="click-instruction">Click above to witness the serpent's entrance and unlock the gateway to horror.</span>
            ) : (
              <>Where nightmares come alive and terror takes beautiful form.
              Enter a realm where horror holds its own twisted beauty,
              and every tale beckons you deeper into the world of fear.</>
            )}
          </p>
        </div>
        
        <div className="header-hero-cta">
          {hasEntered && (
            <button 
              onClick={handleEnterAbyss}
              className="gothic-cta-button entrance-revealed"
            >
              Enter My Dark Realm
            </button>
          )}
        </div>
        
        <div className="header-hero-quote">
          <blockquote>
            "In the spaces between worlds, where moonlight bleeds through shadows,
            the most beautiful nightmares are born."
          </blockquote>
          <cite>— From The Shadowed Castle</cite>
        </div>
      </div>

      <div className="floating-elements">
        <div className="floating-rune rune-1">◈</div>
        <div className="floating-rune rune-2">※</div>
        <div className="floating-rune rune-3">⟐</div>
      </div>
    </header>
  );
};

export default Header;