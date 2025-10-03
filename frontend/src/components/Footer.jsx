import React from "react";
import { authorInfo } from "../data/mock";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="gothic-footer">
      <div className="footer-background">
        <div className="crypt-pattern"></div>
        <div className="castle-silhouette"></div>
      </div>
      
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="footer-title">{authorInfo.name}</h3>
              <p className="footer-tagline">{authorInfo.tagline}</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4 className="footer-section-title">Explore</h4>
                <ul className="footer-nav">
                  <li><a href="#books">Books</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#news">News</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4 className="footer-section-title">Chronicles</h4>
                <ul className="footer-nav">
                  <li><a href="#">The Shadowed Castle</a></li>
                  <li><a href="#">Whispers from the Void</a></li>
                  <li><a href="#">The Bone Garden</a></li>
                  <li><a href="#">Mirror of Sorrows</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4 className="footer-section-title">Connect</h4>
                <ul className="footer-nav">
                  <li><a href="mailto:contact@arunas.com">Email</a></li>
                  <li><a href="#">Newsletter</a></li>
                  <li><a href="#">Goodreads</a></li>
                  <li><a href="#">Social Media</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-legal">
              <p>&copy; {currentYear} {authorInfo.name}. All rights reserved.</p>
              <div className="footer-legal-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
            
            <div className="footer-quote">
              <p>"In darkness, we find the light that guides our stories home."</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;