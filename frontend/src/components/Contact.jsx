import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Instagram, Twitter, BookMarked, Send } from 'lucide-react';
import { socialLinks } from '../mockData';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleMailingListSignup = (e) => {
    e.preventDefault();
    // Mock signup - will be connected to backend later
    toast({
      title: "Welcome to the garden!",
      description: "You've been added to the mailing list.",
    });
    setEmail('');
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
                  className="flex-1 border-warm-gray/40 focus:border-burgundy"
                />
                <Button
                  type="submit"
                  className="bg-gold hover:bg-gold/90 text-charcoal px-6 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
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
                href="#"
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