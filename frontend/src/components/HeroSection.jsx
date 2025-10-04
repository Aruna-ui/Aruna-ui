import React from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const scrollToBooks = () => {
    const booksSection = document.querySelector('#books');
    if (booksSection) {
      booksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-mist"></div>
        <div className="hero-shadows"></div>
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
      
      <div className="hero-content">
        <div className="hero-text">
          <h2 
            className={`hero-welcome ${doorsOpen ? 'activated' : 'interactive'}`}
            onClick={handleWelcomeClick}
          >
            Welcome
          </h2>
          <h3 
            className={`hero-subtitle ${doorsOpen ? 'activated' : 'interactive'}`}
            onClick={handleWelcomeClick}
          >
            Step into the Abyss
          </h3>
          <p className="hero-description">
            {!doorsOpen ? (
              <span className="click-instruction">Click above to witness the serpent's entrance and unlock the gateway to darkness.</span>
            ) : (
              <>Where shadows dance with moonlight and whispers carry ancient secrets.
              Enter a realm where darkness holds its own twisted beauty,
              and every tale beckons you deeper into the unknown.</>
            )}
          </p>
        </div>
        
        <div className="hero-cta">
          {hasEntered && (
            <Button 
              onClick={handleEnterAbyss}
              className="gothic-cta-button entrance-revealed"
              size="lg"
            >
              Enter My Dark Realm
            </Button>
          )}
        </div>
        
        <div className="hero-quote">
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
    </section>
  );
};

export default HeroSection;