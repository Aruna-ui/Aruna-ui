import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, BookOpen, Clock, Bell, Mail, Star } from "lucide-react";

const ComingSoonPopup = ({ book, isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = async (e) => {
    e.preventDefault();
    
    try {
      // Mock subscription - would connect to backend
      console.log('Subscribing email for notifications:', email);
      setIsSubscribed(true);
      
      setTimeout(() => {
        onClose();
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  if (!isOpen || !book) return null;

  return (
    <div className="coming-soon-overlay" onClick={onClose}>
      <div className="coming-soon-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-popup-btn" onClick={onClose}>
          <X className="close-icon" />
        </button>
        
        <div className="popup-header">
          <div className="popup-book-cover">
            <img 
              src={book.cover} 
              alt={book.title}
              className="popup-cover-image"
            />
            <div className="coming-soon-badge">
              <Clock className="clock-icon" />
              <span>Coming Soon</span>
            </div>
          </div>
          
          <div className="popup-book-info">
            <h2 className="popup-title">{book.title}</h2>
            <h3 className="popup-subtitle">{book.subtitle}</h3>
            <p className="popup-description">{book.description}</p>
            
            <div className="popup-details">
              <div className="detail-item">
                <BookOpen className="detail-icon" />
                <span>Expected Release: {book.expectedRelease}</span>
              </div>
              <div className="detail-item">
                <Star className="detail-icon" />
                <span>Genre: {book.genre.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="popup-content">
          <div className="notification-section">
            <div className="notification-header">
              <Bell className="bell-icon" />
              <h4>Be the First to Know</h4>
            </div>
            <p className="notification-text">
              Join the shadows and receive an exclusive notification when "Echoes of the Forsaken" 
              emerges from the depths and becomes available on Amazon.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleNotifyMe} className="notify-form">
                <div className="email-input-container">
                  <Mail className="mail-icon" />
                  <Input
                    type="email"
                    placeholder="Enter your email to be notified..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="notify-email-input"
                    required
                  />
                </div>
                <Button type="submit" className="notify-btn">
                  Notify Me When Available
                </Button>
              </form>
            ) : (
              <div className="subscription-success">
                <div className="success-icon">✓</div>
                <p>The shadows have received your whisper. You will be notified when the book emerges from the void.</p>
              </div>
            )}
          </div>
          
          <div className="preview-section">
            <h4>What Awaits in the Shadows</h4>
            <ul className="preview-features">
              <li>Haunting atmospheric storytelling that lingers long after reading</li>
              <li>Complex characters battling both external demons and internal darkness</li>
              <li>Richly detailed gothic world-building that immerses you completely</li>
              <li>Psychological depth that explores the nature of redemption and loss</li>
            </ul>
          </div>
        </div>
        
        <div className="popup-footer">
          <div className="author-note">
            <p>"This new tale has been whispering to me in the darkest hours, demanding to be told. 
            It will be worth the wait." - Aruna.S</p>
          </div>
          <Button onClick={onClose} variant="outline" className="close-modal-btn">
            Return to the Abyss
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPopup;