import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Flower Icon Component
const FlowerIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 10 4 10 6C10 7 10.5 8 11.5 8.5C10.5 9 10 10 10 11C10 13 12 15 12 15C12 15 14 13 14 11C14 10 13.5 9 12.5 8.5C13.5 8 14 7 14 6C14 4 12 2 12 2Z"/>
    <path d="M12 15C12 15 10 17 10 19C10 20 10.5 21 11.5 21.5C10.5 22 10 23 10 24H14C14 23 13.5 22 12.5 21.5C13.5 21 14 20 14 19C14 17 12 15 12 15Z"/>
    <path d="M15 12C15 12 17 10 19 10C20 10 21 10.5 21.5 11.5C22 10.5 23 10 24 10V14C23 14 22 13.5 21.5 12.5C21 13.5 20 14 19 14C17 14 15 12 15 12Z"/>
    <path d="M9 12C9 12 7 10 5 10C4 10 3 10.5 2.5 11.5C2 10.5 1 10 0 10V14C1 14 2 13.5 2.5 12.5C3 13.5 4 14 5 14C7 14 9 12 9 12Z"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
  </svg>
);

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
    <section id="contact" className="relative py-16 overflow-hidden border-t border-gold/20">
      {/* Rose Petals Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200"
          alt="Rose petals background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FlowerIcon className="w-8 h-8 text-gold" />
              <h2 className="font-serif text-3xl text-cream-white">
                Gathered at the Gate
              </h2>
            </div>
            
            <p className="text-cream-white/80 mb-8 leading-relaxed">
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
                  className="flex-1 border-gold/30 focus:border-gold bg-burgundy/20 text-cream-white placeholder:text-cream-white/50"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gold hover:bg-gold/90 text-charcoal px-6 transition-all duration-300"
                >
                  <FlowerIcon className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Contact Form */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <FlowerIcon className="w-6 h-6 text-gold" />
                <h3 className="font-serif text-2xl text-cream-white">
                  Send a Message
                </h3>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your name"
                  required
                  disabled={loading}
                  className="border-gold/30 focus:border-gold bg-burgundy/20 text-cream-white placeholder:text-cream-white/50"
                />
                <Input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Your email"
                  required
                  disabled={loading}
                  className="border-gold/30 focus:border-gold bg-burgundy/20 text-cream-white placeholder:text-cream-white/50"
                />
                <Textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Your message"
                  required
                  disabled={loading}
                  rows={4}
                  className="border-gold/30 focus:border-gold resize-none bg-burgundy/20 text-cream-white placeholder:text-cream-white/50"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-burgundy hover:bg-crimson text-cream-white px-8 py-3 rounded-md transition-all duration-300 flex items-center justify-center gap-2 border border-gold/30"
                >
                  <FlowerIcon className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FlowerIcon className="w-8 h-8 text-gold" />
              <h3 className="font-serif text-3xl text-cream-white">
                Contact & Media
              </h3>
            </div>
            
            <div className="space-y-4 mb-8 bg-burgundy/20 backdrop-blur-sm p-6 rounded-lg border border-gold/20">
              <div className="flex items-center gap-2">
                <FlowerIcon className="w-5 h-5 text-gold" />
                <p className="text-cream-white/80">Press Inquiries</p>
              </div>
              <div className="flex items-center gap-2">
                <FlowerIcon className="w-5 h-5 text-gold" />
                <p className="text-cream-white/80">Press Materials</p>
              </div>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-charcoal px-8 py-2 rounded-full transition-all duration-300 flex items-center gap-2"
                onClick={() => window.location.href = 'mailto:press@aruna.com'}
              >
                <FlowerIcon className="w-4 h-4" />
                Contact
              </Button>
            </div>

            {/* Social Links with Flowers */}
            <div className="bg-burgundy/20 backdrop-blur-sm p-6 rounded-lg border border-gold/20">
              <p className="text-cream-white/70 text-sm mb-4">Connect with Aruna</p>
              <div className="grid grid-cols-4 gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-soft-pink/20 flex items-center justify-center text-gold hover:from-gold hover:to-soft-pink hover:text-charcoal transition-all duration-300 hover:scale-110 border border-gold/30"
                  title="Instagram"
                >
                  <FlowerIcon className="w-7 h-7" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-soft-pink/20 flex items-center justify-center text-gold hover:from-gold hover:to-soft-pink hover:text-charcoal transition-all duration-300 hover:scale-110 border border-gold/30"
                  title="Twitter"
                >
                  <FlowerIcon className="w-7 h-7" />
                </a>
                <a
                  href="https://goodreads.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-soft-pink/20 flex items-center justify-center text-gold hover:from-gold hover:to-soft-pink hover:text-charcoal transition-all duration-300 hover:scale-110 border border-gold/30"
                  title="Goodreads"
                >
                  <FlowerIcon className="w-7 h-7" />
                </a>
                <a
                  href="mailto:hello@aruna.com"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-soft-pink/20 flex items-center justify-center text-gold hover:from-gold hover:to-soft-pink hover:text-charcoal transition-all duration-300 hover:scale-110 border border-gold/30"
                  title="Email"
                >
                  <FlowerIcon className="w-7 h-7" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;