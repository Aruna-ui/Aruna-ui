import React from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [doorsOpen, setDoorsOpen] = React.useState(false);
  const [hasEntered, setHasEntered] = React.useState(false);

  const scrollToBooks = () => {
    const booksSection = document.querySelector('#books');
    if (booksSection) {
      booksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterAbyss = () => {
    setDoorsOpen(true);
    setTimeout(() => {
      setHasEntered(true);
      scrollToBooks();
    }, 2000);
  };

  React.useEffect(() => {
    // Auto-open doors after 3 seconds if user hasn't interacted
    const timer = setTimeout(() => {
      if (!doorsOpen) {
        setDoorsOpen(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [doorsOpen]);

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-mist"></div>
        <div className="hero-shadows"></div>
      </div>
      
      {/* Mystical Doors */}
      <div className={`mystical-doors ${doorsOpen ? 'doors-open' : ''}`}>
        <div className="door door-left">
          <div className="door-panel">
            <div className="door-runes">
              <span className="rune">◈</span>
              <span className="rune">※</span>
              <span className="rune">⟐</span>
            </div>
          </div>
        </div>
        <div className="door door-right">
          <div className="door-panel">
            <div className="door-runes">
              <span className="rune">◈</span>
              <span className="rune">※</span>
              <span className="rune">⟐</span>
            </div>
          </div>
        </div>
        <div className="door-glow"></div>
      </div>
      
      <div className={`hero-content ${hasEntered ? 'content-revealed' : ''}`}>
        <div className="hero-text">
          <h2 className="hero-welcome">Welcome</h2>
          <h3 className="hero-subtitle">Step into the Abyss</h3>
          <p className="hero-description">
            Where shadows dance with moonlight and whispers carry ancient secrets.
            Enter a realm where darkness holds its own twisted beauty,
            and every tale beckons you deeper into the unknown.
          </p>
        </div>
        
        <div className="hero-cta">
          <Button 
            onClick={handleEnterAbyss}
            className={`gothic-cta-button ${doorsOpen ? 'button-revealed' : ''}`}
            size="lg"
          >
            {doorsOpen ? 'Enter the Realm' : 'Open the Gates'}
          </Button>
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