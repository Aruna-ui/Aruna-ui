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
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h2 className="hero-welcome">
            Enter the Dark Realm
          </h2>
          <h3 className="hero-subtitle">
            Where Gothic Tales Await
          </h3>
          <p className="hero-description">
            Welcome to the second realm of shadows and mystical tales. 
            Explore the depths of dark fantasy through carefully crafted stories 
            that blend horror with beauty, nightmare with dream.
          </p>
        </div>
        
        <div className="hero-cta">
          <Button 
            onClick={scrollToBooks}
            className="gothic-cta-button"
            size="lg"
          >
            Explore My Books
          </Button>
        </div>
        
        <div className="hero-quote">
          <blockquote>
            "Every shadow tells a story, every whisper holds a secret, 
            every page turns toward the unknown."
          </blockquote>
          <cite>— From The Author's Journal</cite>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;