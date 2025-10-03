import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { MessageCircle, Star, Send, X, Heart } from "lucide-react";

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    type: 'general',
    rating: 0,
    message: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFeedbackData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const API = `${BACKEND_URL}/api`;
      
      const response = await fetch(`${API}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...feedbackData,
          subject: `Feedback: ${feedbackData.type} - Rating: ${feedbackData.rating}/5`,
          name: 'Anonymous Reader'
        })
      });

      const result = await response.json();
      
      if (result.success || response.ok) {
        setSubmitMessage("Your whispers have reached the shadows... Thank you for sharing your thoughts.");
        setFeedbackData({ type: 'general', rating: 0, message: '', email: '' });
        setTimeout(() => {
          setIsOpen(false);
          setSubmitMessage('');
        }, 3000);
      } else {
        setSubmitMessage("The void seems unreachable. Please try again later.");
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitMessage("The ancient spirits are restless. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSubmitMessage('');
    }
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <div className={`feedback-float-btn ${isOpen ? 'btn-active' : ''}`} onClick={toggleWidget}>
        {isOpen ? <X className="feedback-icon" /> : <MessageCircle className="feedback-icon" />}
        <div className="feedback-tooltip">
          {isOpen ? 'Close' : 'Share Your Thoughts'}
        </div>
      </div>

      {/* Feedback Panel */}
      {isOpen && (
        <div className="feedback-panel">
          <div className="feedback-header">
            <div className="feedback-title">
              <Heart className="title-icon" />
              <span>Whisper Your Thoughts</span>
            </div>
            <p className="feedback-subtitle">
              Your voice matters in this realm of shadows and stories
            </p>
          </div>

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <Label htmlFor="feedback-type">What brings you here?</Label>
              <select
                id="feedback-type"
                name="type"
                value={feedbackData.type}
                onChange={handleInputChange}
                className="feedback-select"
              >
                <option value="general">General Thoughts</option>
                <option value="website">Website Experience</option>
                <option value="books">About My Books</option>
                <option value="writing">Writing & Craft</option>
                <option value="suggestion">Suggestions</option>
              </select>
            </div>

            <div className="form-group">
              <Label>How would you rate your experience?</Label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${feedbackData.rating >= star ? 'star-active' : ''}`}
                    onClick={() => handleRatingClick(star)}
                  >
                    <Star className="star-icon" />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <Label htmlFor="feedback-message">Share your thoughts</Label>
              <Textarea
                id="feedback-message"
                name="message"
                value={feedbackData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your journey through my realm..."
                rows={4}
                className="feedback-textarea"
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="feedback-email">Your email (optional)</Label>
              <Input
                id="feedback-email"
                name="email"
                type="email"
                value={feedbackData.email}
                onChange={handleInputChange}
                placeholder="If you wish to hear back from the shadows..."
                className="feedback-input"
              />
            </div>

            <Button 
              type="submit" 
              className="feedback-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending to the Void...' : 'Cast Your Words'}
              <Send className="send-icon" />
            </Button>

            {submitMessage && (
              <div className={`feedback-message ${submitMessage.includes('whispers have reached') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && <div className="feedback-backdrop" onClick={toggleWidget}></div>}
    </>
  );
};

export default FeedbackWidget;