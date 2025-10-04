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
    </header>
  );
};

export default Header;