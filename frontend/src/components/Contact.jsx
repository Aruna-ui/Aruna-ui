import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Instagram, Twitter, BookMarked, Send } from 'lucide-react';
import { socialLinks } from '../mockData';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleMailingListSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/mailing-list/signup`, { email });
      
      if (response.data.success) {
        toast({
          title: "Welcome to the garden!",
          description: "You've been added to the mailing list.",
        });
        setEmail('');
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast({
          title: "Already subscribed",
          description: "This email is already on our mailing list.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Subscription failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/contact/submit`, contactForm);
      
      if (response.data.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. We'll get back to you soon.",
        });
        setContactForm({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 bg-cream-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal mb-6">
              Gathered at the Gate
            </h2>
            
            <p className="text-charcoal/80 mb-8 leading-relaxed">
              Be the first to step through the door. Get updates on the new novel and early news.
            </p>

            <form onSubmit={handleMailingListSignup} className="mb-8">
              <div className="flex gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                  className="flex-1 border-warm-gray/40 focus:border-burgundy"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gold hover:bg-gold/90 text-charcoal px-6 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Contact Form */}
            <div className="mt-12">
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                Send a Message
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your name"
                  required
                  disabled={loading}
                  className="border-warm-gray/40 focus:border-burgundy"
                />
                <Input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Your email"
                  required
                  disabled={loading}
                  className="border-warm-gray/40 focus:border-burgundy"
                />
                <Textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Your message"
                  required
                  disabled={loading}
                  rows={4}
                  className="border-warm-gray/40 focus:border-burgundy resize-none"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-burgundy hover:bg-crimson text-cream-white px-8 py-3 rounded-md transition-all duration-300"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="font-serif text-3xl text-charcoal mb-6">
              Contact & Media
            </h3>
            
            <div className="space-y-4 mb-8">
              <p className="text-charcoal/80">Press Inquiries</p>
              <p className="text-charcoal/80">Press Materials</p>
              <Button
                variant="outline"
                className="border-burgundy text-burgundy hover:bg-burgundy hover:text-cream-white px-8 py-2 rounded-full transition-all duration-300"
                onClick={() => window.location.href = 'mailto:press@aruna.com'}
              >
                Contact
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-burgundy hover:bg-gold hover:text-charcoal transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-burgundy hover:bg-gold hover:text-charcoal transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.goodreads}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-burgundy hover:bg-gold hover:text-charcoal transition-all duration-300"
              >
                <BookMarked className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@aruna.com"
                className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-burgundy hover:bg-gold hover:text-charcoal transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;