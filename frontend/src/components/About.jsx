import React from 'react';
import { authorBio } from '../mockData';

const About = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Subtle Rose Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cream-white"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1516565349308-c76fe36a115c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxkYXJrJTIwcm9zZXN8ZW58MHx8fHwxNzYwNzA3MjA5fDA&ixlib=rb-4.1.0&q=85)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl text-charcoal mb-4">
            Behind the Rose Trellis
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Bio Content */}
          <div className="space-y-6">
            {authorBio.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-charcoal leading-relaxed text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author Image with Ornate Frame */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Ornate border decoration */}
              <div className="absolute inset-0 -m-8">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="190" fill="none" stroke="#C4B5A0" strokeWidth="2" opacity="0.3"/>
                  <circle cx="200" cy="200" r="180" fill="none" stroke="#6B1C23" strokeWidth="1" opacity="0.2"/>
                  {/* Decorative corner elements */}
                  <path d="M 50,50 Q 50,80 80,80" fill="none" stroke="#6B1C23" strokeWidth="1.5" opacity="0.3"/>
                  <path d="M 350,50 Q 350,80 320,80" fill="none" stroke="#6B1C23" strokeWidth="1.5" opacity="0.3"/>
                  <path d="M 50,350 Q 50,320 80,320" fill="none" stroke="#6B1C23" strokeWidth="1.5" opacity="0.3"/>
                  <path d="M 350,350 Q 350,320 320,320" fill="none" stroke="#6B1C23" strokeWidth="1.5" opacity="0.3"/>
                </svg>
              </div>
              
              {/* Circular author image */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-cream-white">
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