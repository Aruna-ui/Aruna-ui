import React from 'react';
import { authorBio } from '../mock';

const About = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Rose Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516565349308-c76fe36a115c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxkYXJrJTIwcm9zZXN8ZW58MHx8fHwxNzYwNzA3MjA5fDA&ixlib=rb-4.1.0&q=85"
          alt="Rose background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cream-white/90"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            Behind the Rose Trellis
          </h2>
          <div className="w-24 h-1 bg-burgundy mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Author Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src={authorBio.image}
                alt="Aruna"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/30 to-transparent"></div>
            </div>
            {/* Decorative Rose Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1516565349308-c76fe36a115c?w=200"
                alt="Rose decoration"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl text-burgundy mb-6">About Aruna</h3>
            
            {authorBio.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-charcoal/90 leading-relaxed text-base"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-6">
              <div className="inline-block px-6 py-3 bg-burgundy/10 border-l-4 border-burgundy rounded">
                <p className="text-burgundy font-medium italic">
                  "Drawing inspiration from the unspoken fears and hidden histories that reside in the everyday."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;