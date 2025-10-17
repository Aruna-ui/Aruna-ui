import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Instagram, Twitter, BookMarked, Mail, Send } from 'lucide-react';
import { socialLinks } from '../mockData';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission - will be connected to backend later
    toast({
      title: "Thank you for your message!",
      description: "I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleMailingListSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // Mock signup - will be connected to backend later
    toast({
      title: "Welcome to the garden!",
      description: "You've been added to the mailing list.",
    });
    e.target.reset();
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background with Rose Pattern */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1499381582676-649f710ba3f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxkYXJrJTIwcm9zZXN8ZW58MHx8fHwxNzYwNzA3MjA5fDA&ixlib=rb-4.1.0&q=85"
          alt="Roses background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/85"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-cream-white mb-4">
            Gathered at the Gate
          </h2>
          <p className="text-soft-pink text-lg">Step through the door and join the story</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Mailing List Signup */}
          <div className="bg-cream-white/95 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
            <div className="flex items-center mb-6">
              <Mail className="w-6 h-6 text-burgundy mr-3" />
              <h3 className="font-serif text-2xl text-charcoal">Join the Mailing List</h3>
            </div>
            
            <p className="text-charcoal/80 mb-6 leading-relaxed">
              Be the first to step through the door. Get exclusive updates on the new novel, early news, and special sneak peeks.
            </p>

            <form onSubmit={handleMailingListSignup} className="space-y-4">
              <Input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                className="border-warm-gray/30 focus:border-burgundy"
              />
              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium py-6 rounded transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Subscribe Now
              </Button>
            </form>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-warm-gray/30">
              <p className="text-charcoal/70 text-sm mb-4 text-center">Follow the journey</p>
              <div className="flex justify-center space-x-6">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy hover:text-crimson transition-colors duration-300"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy hover:text-crimson transition-colors duration-300"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href={socialLinks.goodreads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy hover:text-crimson transition-colors duration-300"
                >
                  <BookMarked className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-cream-white/95 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
            <h3 className="font-serif text-2xl text-charcoal mb-6">Get in Touch</h3>
            <p className="text-charcoal/80 mb-6 leading-relaxed">
              For media inquiries, press kits, or general questions, please reach out below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="border-warm-gray/30 focus:border-burgundy"
              />
              <Input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-warm-gray/30 focus:border-burgundy"
              />
              <Textarea
                placeholder="Your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="border-warm-gray/30 focus:border-burgundy resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-burgundy hover:bg-crimson text-cream-white font-medium py-6 rounded transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;