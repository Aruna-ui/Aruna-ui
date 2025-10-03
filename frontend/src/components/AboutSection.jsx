import React from "react";
import { authorInfo } from "../data/mock";

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-background">
        <div className="dust-motes"></div>
        <div className="candlelight-glow"></div>
      </div>
      
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="section-header">
              <h2 className="section-title">The Author's Study</h2>
              <p className="section-subtitle">
                From shadows and moonlight, tales are born
              </p>
            </div>
            
            <div className="author-bio">
              <p className="bio-text">{authorInfo.bio}</p>
              
              <div className="author-stats">
                <div className="stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Published Works</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10k+</span>
                  <span className="stat-label">Devoted Readers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Literary Awards</span>
                </div>
              </div>
              
              <blockquote className="author-quote">
                "I write not to escape reality, but to find the hidden truths that dwell in the spaces between light and shadow."
              </blockquote>
            </div>
          </div>
          
          <div className="author-image-container">
            <div className="image-frame">
              <img 
                src={authorInfo.image} 
                alt={authorInfo.name}
                className="author-image"
              />
              <div className="image-overlay"></div>
            </div>
            
            <div className="floating-books">
              <div className="floating-book book-1"></div>
              <div className="floating-book book-2"></div>
              <div className="floating-book book-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;