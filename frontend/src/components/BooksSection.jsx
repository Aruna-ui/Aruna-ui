import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { books } from "../data/mock";
import ComingSoonPopup from "./ComingSoonPopup";

const BooksSection = () => {
  const [selectedComingSoonBook, setSelectedComingSoonBook] = useState(null);
  const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);

  const handleComingSoonClick = (book) => {
    setSelectedComingSoonBook(book);
    setShowComingSoonPopup(true);
  };

  const closeComingSoonPopup = () => {
    setSelectedComingSoonBook(null);
    setShowComingSoonPopup(false);
  };

  return (
    <section id="books" className="books-section">
      <div className="section-background">
        <div className="gothic-pattern"></div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Library of Forbidden Scrolls</h2>
          <p className="section-subtitle">
            Chronicles of darkness, tales of wonder, and stories that blur the line between dreams and nightmares.
          </p>
        </div>
        
        <div className="books-grid">
          {books.map((book) => (
            <Card key={book.id} className="book-card">
              <div className="book-cover-container">
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="book-cover"
                />
                <div className="book-glow"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="book-title">{book.title}</CardTitle>
                <CardDescription className="book-subtitle">{book.subtitle}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="book-description">{book.description}</p>
                
                <div className="book-meta">
                  <div className="book-genres">
                    {book.genre.map((genre) => (
                      <Badge key={genre} variant="secondary" className="genre-badge">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="book-details">
                    <span className="book-price">{book.price}</span>
                    <span className="book-date">{book.publishDate}</span>
                  </div>
                </div>
                
                <div className="book-actions">
                  {book.comingSoon ? (
                    <Button 
                      className="book-action-btn coming-soon"
                      onClick={() => handleComingSoonClick(book)}
                    >
                      Coming Soon - Notify Me!
                    </Button>
                  ) : (
                    <>
                      {book.purchaseLinks && (
                        <>
                          {book.purchaseLinks.amazon && (
                            <Button 
                              className="book-action-btn primary"
                              onClick={() => window.open(book.purchaseLinks.amazon, '_blank')}
                            >
                              Buy on Amazon
                            </Button>
                          )}
                          {book.purchaseLinks.googlePlay && (
                            <Button 
                              className="book-action-btn primary"
                              onClick={() => window.open(book.purchaseLinks.googlePlay, '_blank')}
                            >
                              Buy on Google Play
                            </Button>
                          )}
                        </>
                      )}
                      <Button variant="outline" className="book-action-btn secondary">
                        Read Sample
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;