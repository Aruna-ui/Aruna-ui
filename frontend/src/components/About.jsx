import React from 'react';
import { authorBio } from '../mockData';

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

const About = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Dark floral background - matching overall theme */}
      <div className="absolute inset-0 z-0 bg-transparent"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FlowerIcon className="w-10 h-10 text-gold" />
            <h2 className="font-serif text-5xl text-cream-white">
              Behind the Rose Trellis
            </h2>
            <FlowerIcon className="w-10 h-10 text-gold" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Bio Content */}
          <div className="space-y-6 bg-burgundy/20 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gold/20">
            {authorBio.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-cream-white/90 leading-relaxed text-base"
              >
                {paragraph}
              </p>
            ))}
            
            {/* Decorative flower divider */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <FlowerIcon className="w-5 h-5 text-gold" />
              <div className="w-16 h-px bg-gold"></div>
              <FlowerIcon className="w-5 h-5 text-gold" />
              <div className="w-16 h-px bg-gold"></div>
              <FlowerIcon className="w-5 h-5 text-gold" />
            </div>
          </div>

          {/* Author Image with Ornate Flower Frame */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Flower border decoration */}
              <div className="absolute inset-0 -m-8">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Decorative circles */}
                  <circle cx="200" cy="200" r="190" fill="none" stroke="#C9A961" strokeWidth="2" opacity="0.4"/>
                  <circle cx="200" cy="200" r="180" fill="none" stroke="#C4B5A0" strokeWidth="1" opacity="0.3"/>
                </svg>
                
                {/* Corner flowers */}
                <div className="absolute top-0 left-0 text-gold opacity-60">
                  <FlowerIcon className="w-12 h-12" />
                </div>
                <div className="absolute top-0 right-0 text-soft-pink opacity-60">
                  <FlowerIcon className="w-12 h-12" />
                </div>
                <div className="absolute bottom-0 left-0 text-soft-pink opacity-60">
                  <FlowerIcon className="w-12 h-12" />
                </div>
                <div className="absolute bottom-0 right-0 text-gold opacity-60">
                  <FlowerIcon className="w-12 h-12" />
                </div>
              </div>
              
              {/* Circular author image */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-gold/30">
                <img
                  src={authorBio.image}
                  alt="Aruna"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;