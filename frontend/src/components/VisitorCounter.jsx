import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Flower Icon Component
const FlowerIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 10 4 10 6C10 7 10.5 8 11.5 8.5C10.5 9 10 10 10 11C10 13 12 15 12 15C12 15 14 13 14 11C14 10 13.5 9 12.5 8.5C13.5 8 14 7 14 6C14 4 12 2 12 2Z"/>
    <path d="M12 15C12 15 10 17 10 19C10 20 10.5 21 11.5 21.5C10.5 22 10 23 10 24H14C14 23 13.5 22 12.5 21.5C13.5 21 14 20 14 19C14 17 12 15 12 15Z"/>
    <path d="M15 12C15 12 17 10 19 10C20 10 21 10.5 21.5 11.5C22 10.5 23 10 24 10V14C23 14 22 13.5 21.5 12.5C21 13.5 20 14 19 14C17 14 15 12 15 12Z"/>
    <path d="M9 12C9 12 7 10 5 10C4 10 3 10.5 2.5 11.5C2 10.5 1 10 0 10V14C1 14 2 13.5 2.5 12.5C3 13.5 4 14 5 14C7 14 9 12 9 12Z"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
  </svg>
);

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackAndFetchVisitors = async () => {
      try {
        // Track this visitor
        await axios.post(`${API}/visitors/track`);
        
        // Fetch current count
        const response = await axios.get(`${API}/visitors/count`);
        if (response.data.success) {
          setVisitorCount(response.data.count);
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      } finally {
        setLoading(false);
      }
    };

    trackAndFetchVisitors();
  }, []);

  return (
    <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50">
      <div className="bg-burgundy/90 backdrop-blur-md border-2 border-gold/40 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-2xl">
        <div className="flex items-center gap-2 md:gap-3">
          <FlowerIcon className="w-4 h-4 md:w-5 md:h-5 text-gold animate-pulse" />
          <div className="text-cream-white">
            <p className="text-xs uppercase tracking-wide text-gold/80">Visitors</p>
            <p className="text-xl md:text-2xl font-serif font-bold">
              {loading ? '...' : visitorCount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
