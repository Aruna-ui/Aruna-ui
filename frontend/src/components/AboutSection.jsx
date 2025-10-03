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
              <p className="bio-text">{authorInfo.longBio}</p>
              
              <div className="author-stats">
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Published Novels</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">540</span>
                  <span className="stat-label">Total Pages</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3</span>
                  <span className="stat-label">International Awards</span>
                </div>
              </div>
              
              <div className="awards-section">
                <h3 className="awards-title">Awards & Recognition</h3>
                <ul className="awards-list">
                  {authorInfo.awards.map((award, index) => (
                    <li key={index} className="award-item">{award}</li>
                  ))}
                </ul>
              </div>
              
              <blockquote className="author-quote">
                "Thank you for venturing into this world with me. May you find both a thrilling new darkness and a quiet bit of healing within these pages."
              </blockquote>
            </div>
          </div>
          
          <div className="author-image-container">
            <div className="image-frame">
              <img 
                src="https://customer-assets.emergentagent.com/job_gothic-author/artifacts/8po8yksd_1703018909560.jpg" 
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