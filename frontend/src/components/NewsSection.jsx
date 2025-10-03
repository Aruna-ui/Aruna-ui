import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { newsArticles } from "../data/mock";

const NewsSection = () => {
  return (
    <section id="news" className="news-section">
      <div className="section-background">
        <div className="cracked-wall"></div>
        <div className="parchment-texture"></div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Raven's Cry</h2>
          <p className="section-subtitle">
            Whispers from the author's realm - updates, insights, and glimpses behind the veil
          </p>
        </div>
        
        <div className="news-grid">
          {newsArticles.map((article) => (
            <Card key={article.id} className={`news-card ${article.featured ? 'featured-news' : ''}`}>
              <div className="news-image-container">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="news-image"
                />
                <div className="news-overlay"></div>
              </div>
              
              <CardHeader>
                <div className="news-meta">
                  <Badge variant="outline" className="category-badge">
                    {article.category}
                  </Badge>
                  <span className="news-date">{article.date}</span>
                </div>
                <CardTitle className="news-title">{article.title}</CardTitle>
                <CardDescription className="news-excerpt">{article.excerpt}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="news-content">{article.content}</p>
                <button className="read-more-btn">
                  Continue Reading
                  <span className="arrow">→</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;