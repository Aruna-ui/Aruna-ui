import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail, Twitter, Instagram, BookOpen } from "lucide-react";
import { authorInfo } from "../data/mock";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const API = `${BACKEND_URL}/api`;
      
      const response = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitMessage(result.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitMessage(result.message || 'The ancient spirits are restless. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('The void seems unreachable. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-background">
        <div className="spectral-chamber"></div>
        <div className="void-well"></div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Séance Chamber</h2>
          <p className="section-subtitle">
            Reach out to the shadows • Send a message into the void • Connect with the creator
          </p>
        </div>
        
        <div className="contact-content">
          <Card className="contact-form-card">
            <CardHeader>
              <CardTitle>Send a Whisper</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="gothic-input"
                      placeholder="Who calls from the shadows?"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="gothic-input"
                      placeholder="How shall I reach you?"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-field">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="gothic-input"
                    placeholder="What draws you to my realm?"
                    required
                  />
                </div>
                
                <div className="form-field">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="gothic-textarea"
                    placeholder="Share your thoughts, questions, or tales from your own journey through the darkness..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" className="gothic-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Casting into the Void...' : 'Cast Your Message Into the Void'}
                </Button>
                
                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('cast into the void') ? 'success' : 'error'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
          
          <div className="contact-info">
            <Card className="social-links-card">
              <CardHeader>
                <CardTitle>Other Realms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="social-links">
                  <a href={authorInfo.socialLinks.email} className="social-link">
                    <Mail className="social-icon" />
                    <span>Direct Message</span>
                  </a>
                  <a href={authorInfo.socialLinks.twitter} className="social-link">
                    <Twitter className="social-icon" />
                    <span>Twitter Realm</span>
                  </a>
                  <a href={authorInfo.socialLinks.instagram} className="social-link">
                    <Instagram className="social-icon" />
                    <span>Visual Chronicles</span>
                  </a>
                  <a href={authorInfo.socialLinks.goodreads} className="social-link">
                    <BookOpen className="social-icon" />
                    <span>Goodreads Library</span>
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <div className="contact-quote">
              <blockquote>
                "Every message is a thread in the tapestry of connection.
                I read each one by candlelight and moonshine."
              </blockquote>
              <cite>— Aruna.S</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;