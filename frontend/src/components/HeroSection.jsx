import React from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [doorsOpen, setDoorsOpen] = React.useState(false);
  const [hasEntered, setHasEntered] = React.useState(false);
  const [videoPlaying, setVideoPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  const scrollToBooks = () => {
    const booksSection = document.querySelector('#books');
    if (booksSection) {
      booksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWelcomeClick = () => {
    setDoorsOpen(true);
    setVideoPlaying(true);
    
    // Start the video
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Start from beginning
      videoRef.current.play();
    }
    
    // After video completes, show enter button
    setTimeout(() => {
      setHasEntered(true);
    }, 3000); // Adjust timing based on your video length
  };

  const handleEnterAbyss = () => {
    scrollToBooks();
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-mist"></div>
        <div className="hero-shadows"></div>
      </div>
      
      {/* Gothic Video Background */}
      <div className={`gothic-video-container ${doorsOpen ? 'doors-opening' : ''} ${hasEntered ? 'video-revealed' : ''}`}>
        <video
          ref={videoRef}
          className={`gothic-background-video ${videoPlaying ? 'playing' : 'paused'}`}
          muted
          playsInline
          poster="https://customer-assets.emergentagent.com/job_gothic-author/artifacts/hix160h1_1759516429354.jpg"
          onEnded={() => setVideoPlaying(false)}
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_gothic-author/artifacts/pqvep5or_1759541615032.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className={`video-overlay ${doorsOpen ? 'overlay-opening' : ''}`}></div>
        <div className="video-mystical-effects">
          <div className={`floating-particles ${doorsOpen ? 'particles-active' : ''}`}></div>
          <div className={`mystical-glow ${doorsOpen ? 'glow-active' : ''}`}></div>
          <div className={`snake-entrance ${doorsOpen ? 'snake-entering' : ''}`}>
            <div className="snake-trail"></div>
          </div>
        </div>
      </div>
      
      <div className={`hero-content ${hasEntered ? 'content-revealed' : ''}`}>
        <div className="hero-text">
          <h2 
            className={`hero-welcome ${!doorsOpen ? 'clickable' : 'clicked'}`}
            onClick={!doorsOpen ? handleWelcomeClick : undefined}
            style={{ cursor: !doorsOpen ? 'pointer' : 'default' }}
          >
            Welcome
          </h2>
          <h3 
            className={`hero-subtitle ${!doorsOpen ? 'clickable' : 'clicked'}`}
            onClick={!doorsOpen ? handleWelcomeClick : undefined}
            style={{ cursor: !doorsOpen ? 'pointer' : 'default' }}
          >
            Step into the Abyss
          </h3>
          <p className="hero-description">
            {!doorsOpen ? (
              <>Click above to witness the serpent's entrance and unlock the gateway to darkness.</>
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
              className="gothic-cta-button button-revealed"
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