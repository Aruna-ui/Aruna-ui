import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const IntroSequence = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://customer-assets.emergentagent.com/job_3753420f-aaf4-4ba8-bc35-43e58ba6eb39/artifacts/qpey4zea_1761067421161.jpg',
      title: 'Are you ready?',
      subtitle: null
    },
    {
      image: 'https://customer-assets.emergentagent.com/job_3753420f-aaf4-4ba8-bc35-43e58ba6eb39/artifacts/9qbprmie_1761067307179.jpg',
      title: 'Welcome to',
      subtitle: 'Arunasblog'
    },
    {
      image: 'https://customer-assets.emergentagent.com/job_3753420f-aaf4-4ba8-bc35-43e58ba6eb39/artifacts/h27bfxr7_1761067287904.jpg',
      title: 'The shadows hold more than just secrets.',
      subtitle: null
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="intro-sequence">
      <div 
        className="intro-slide"
        style={{
          backgroundImage: `url(${currentSlideData.image})`,
        }}
      >
        <div className="intro-overlay" />
        <div className="intro-content">
          <h1 className="intro-title">
            {currentSlideData.title}
          </h1>
          {currentSlideData.subtitle && (
            <h2 className="intro-subtitle">
              {currentSlideData.subtitle}
            </h2>
          )}
          
          <button 
            onClick={handleNext}
            className="intro-button"
            data-testid={`intro-button-${currentSlide}`}
          >
            {currentSlide === slides.length - 1 ? 'Enter Blog' : 'Continue'}
            <ChevronRight className="w-6 h-6 ml-2" />
          </button>
        </div>

        {/* Slide indicators */}
        <div className="intro-indicators">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`intro-indicator ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroSequence;
