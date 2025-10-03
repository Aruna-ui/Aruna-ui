import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { bookTrailers } from "../data/mock";
import { Play, Clock, Eye, X, Film, Star } from "lucide-react";

const BookTrailersSection = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const openTrailerModal = (trailer) => {
    console.log('Opening trailer modal for:', trailer.title);
    console.log('Video URL:', trailer.videoUrl);
    setSelectedTrailer(trailer);
    setIsPlaying(true);
  };

  const closeTrailerModal = () => {
    setSelectedTrailer(null);
    setIsPlaying(false);
  };

  const featuredTrailer = bookTrailers.find(trailer => trailer.featured);
  const regularTrailers = bookTrailers.filter(trailer => !trailer.featured);

  return (
    <section id="trailers" className="book-trailers-section">
      <div className="section-background">
        <div className="film-grain"></div>
        <div className="spotlight-effect"></div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <div className="trailers-icon">
            <Film className="section-icon" />
          </div>
          <h2 className="section-title">The Cinematic Grimoire</h2>
          <p className="section-subtitle">
            Witness the dark tales come to life through haunting visuals and atmospheric storytelling.
            Step into the moving images that capture the essence of each gothic chronicle.
          </p>
        </div>
        
        {/* Featured Trailer */}
        {featuredTrailer && (
          <div className="featured-trailer">
            <h3 className="subsection-title">Official Book Trailer Premiere</h3>
            <Card className={`featured-trailer-card ${featuredTrailer.isOfficialTrailer ? 'official-trailer' : ''}`}>
              <div 
                className="trailer-preview-container"
                onClick={() => openTrailerModal(featuredTrailer)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={featuredTrailer.thumbnail} 
                  alt={featuredTrailer.title}
                  className="trailer-thumbnail"
                />
                <div className="trailer-overlay">
                  <div className="play-button-container">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openTrailerModal(featuredTrailer);
                      }}
                      className="play-button-large"
                    >
                      <Play className="play-icon-large" />
                    </button>
                  </div>
                  <div className="trailer-info">
                    <Badge className="featured-badge">
                      <Star className="featured-star" />
                      Featured Trailer
                    </Badge>
                    <div className="trailer-duration">
                      <Clock className="clock-icon" />
                      <span>{featuredTrailer.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <div className="trailer-header">
                  <div className="title-section">
                    <CardTitle className="trailer-title">{featuredTrailer.title}</CardTitle>
                    {featuredTrailer.subtitle && (
                      <p className="trailer-subtitle">{featuredTrailer.subtitle}</p>
                    )}
                  </div>
                  {featuredTrailer.isOfficialTrailer && (
                    <div className="official-badge">
                      <Film className="film-icon" />
                      <span>Official Trailer</span>
                    </div>
                  )}
                </div>
                <CardDescription className="trailer-description">
                  {featuredTrailer.description}
                </CardDescription>
                
                {featuredTrailer.chapters && (
                  <div className="trailer-stats">
                    <div className="stat">
                      <span className="stat-number">{featuredTrailer.chapters}</span>
                      <span className="stat-label">Chapters</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{featuredTrailer.pages}</span>
                      <span className="stat-label">Pages</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{featuredTrailer.genre.length}</span>
                      <span className="stat-label">Genres</span>
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="trailer-genres">
                  {featuredTrailer.genre && featuredTrailer.genre.map((g) => (
                    <Badge key={g} variant="secondary" className="genre-badge-trailer">
                      {g}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  onClick={() => openTrailerModal(featuredTrailer)}
                  className="watch-trailer-btn featured"
                >
                  <Play className="btn-play-icon" />
                  Watch Official Trailer
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Regular Trailers Gallery */}
        <div className="trailers-gallery">
          <h3 className="subsection-title">More Gothic Chronicles</h3>
          <div className="trailers-grid">
            {regularTrailers.map((trailer) => (
              <Card key={trailer.id} className="trailer-card">
                <div className="trailer-preview-container">
                  <img 
                    src={trailer.thumbnail} 
                    alt={trailer.title}
                    className="trailer-thumbnail"
                  />
                  <div className="trailer-overlay">
                    <button 
                      onClick={() => openTrailerModal(trailer)}
                      className="play-button"
                    >
                      <Play className="play-icon" />
                    </button>
                    <div className="trailer-duration">
                      <Clock className="clock-icon" />
                      <span>{trailer.duration}</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="trailer-title">{trailer.title}</CardTitle>
                  <CardDescription className="trailer-description">
                    {trailer.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Button 
                    onClick={() => openTrailerModal(trailer)}
                    className="watch-trailer-btn"
                    variant="outline"
                  >
                    <Eye className="btn-eye-icon" />
                    Watch Trailer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trailer Modal */}
      {isPlaying && selectedTrailer && (
        <div className="trailer-modal-overlay" onClick={closeTrailerModal}>
          <div className="trailer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-trailer-title">{selectedTrailer.title}</h3>
              <button className="close-trailer-btn" onClick={closeTrailerModal}>
                <X className="close-icon" />
              </button>
            </div>
            
            <div className="video-container">
              {selectedTrailer.videoUrl.includes('.mp4') ? (
                <div className="video-wrapper">
                  <video 
                    controls 
                    className="trailer-video"
                    poster={selectedTrailer.thumbnail}
                    preload="metadata"
                    width="100%"
                    height="100%"
                  >
                    <source src={selectedTrailer.videoUrl} type="video/mp4" />
                    <p>Your browser does not support the video tag.</p>
                  </video>
                  <div className="video-fallback">
                    <p>Having trouble viewing the video?</p>
                    <a 
                      href={selectedTrailer.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="direct-video-link"
                    >
                      Click here to watch directly
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  src={selectedTrailer.videoUrl}
                  title={selectedTrailer.title}
                  className="trailer-iframe"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            
            <div className="modal-content">
              <p className="modal-description">{selectedTrailer.description}</p>
              <div className="modal-footer">
                <Badge variant="secondary">Duration: {selectedTrailer.duration}</Badge>
                <Button onClick={closeTrailerModal} className="close-modal-btn">
                  Return to Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookTrailersSection;