import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VisitorCounter = () => {
  const [stats, setStats] = useState({
    total_visits: 0,
    unique_visitors: 0,
    daily_visits: 0
  });
  const [loading, setLoading] = useState(true);

  // Track visit and get stats
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Track this visit
        await fetch(`${API}/track-visit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page_path: window.location.pathname
          })
        });

        // Get updated stats
        const response = await fetch(`${API}/visitor-stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error tracking visit:', error);
        // Set default values if API fails
        setStats({
          total_visits: 1337,
          unique_visitors: 666,
          daily_visits: 13
        });
      } finally {
        setLoading(false);
      }
    };

    trackVisit();
  }, []);

  if (loading) {
    return (
      <div className="visitor-counter loading">
        <div className="counter-title">Souls Who Have Wandered Here</div>
        <div className="counter-stats">
          <div className="stat-item">
            <span className="stat-number">...</span>
            <span className="stat-label">Total Wanderers</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visitor-counter">
      <div className="counter-title">Souls Who Have Wandered Here</div>
      <div className="counter-stats">
        <div className="stat-item">
          <span className="stat-number">{stats.total_visits?.toLocaleString()}</span>
          <span className="stat-label">Total Wanderers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.unique_visitors?.toLocaleString()}</span>
          <span className="stat-label">Lost Souls</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.daily_visits?.toLocaleString()}</span>
          <span className="stat-label">Today's Visitors</span>
        </div>
      </div>
      <div className="counter-subtitle">
        "In darkness, we find kinship with fellow wanderers"
      </div>
    </div>
  );
};

export default VisitorCounter;