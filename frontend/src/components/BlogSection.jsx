import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { blogPosts } from "../data/mock";
import { Clock, BookOpen, ArrowRight, Feather } from "lucide-react";

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const openPostModal = (post) => {
    setSelectedPost(post);
    setShowFullContent(true);
  };

  const closePostModal = () => {
    setSelectedPost(null);
    setShowFullContent(false);
  };

  return (
    <section id="blog" className="blog-section">
      <div className="section-background">
        <div className="parchment-texture"></div>
        <div className="ink-drops"></div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <div className="blog-icon">
            <Feather className="section-icon" />
          </div>
          <h2 className="section-title">The Writer's Grimoire</h2>
          <p className="section-subtitle">
            Chronicles from the author's journey through darkness and light,
            sharing insights from the craft of weaving tales that haunt and heal.
          </p>
        </div>
        
        {/* Featured Posts */}
        <div className="featured-posts">
          <h3 className="subsection-title">Featured Chronicles</h3>
          <div className="featured-grid">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="featured-post-card">
                <div className="post-image-container">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="post-image"
                  />
                  <div className="post-overlay"></div>
                  <div className="featured-badge">
                    <BookOpen className="featured-icon" />
                    <span>Featured</span>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="post-meta">
                    <span className="post-date">{post.publishedDate}</span>
                    <div className="reading-time">
                      <Clock className="time-icon" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <CardTitle className="post-title">{post.title}</CardTitle>
                  <CardDescription className="post-excerpt">{post.excerpt}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="post-tag">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => openPostModal(post)}
                    className="read-more-btn"
                    variant="outline"
                  >
                    Read the Chronicle
                    <ArrowRight className="arrow-icon" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Regular Posts */}
        <div className="regular-posts">
          <h3 className="subsection-title">Recent Writings</h3>
          <div className="posts-grid">
            {regularPosts.map((post) => (
              <Card key={post.id} className="post-card">
                <div className="post-image-container">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="post-image"
                  />
                  <div className="post-overlay"></div>
                </div>
                
                <CardHeader>
                  <div className="post-meta">
                    <span className="post-date">{post.publishedDate}</span>
                    <div className="reading-time">
                      <Clock className="time-icon" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <CardTitle className="post-title">{post.title}</CardTitle>
                  <CardDescription className="post-excerpt">{post.excerpt}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="post-tags">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="post-tag">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => openPostModal(post)}
                    className="read-more-btn"
                    variant="outline"
                  >
                    Read More
                    <ArrowRight className="arrow-icon" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Blog Post Modal */}
      {showFullContent && selectedPost && (
        <div className="blog-modal-overlay" onClick={closePostModal}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="modal-image"
              />
              <div className="modal-header-content">
                <div className="modal-meta">
                  <span className="modal-date">{selectedPost.publishedDate}</span>
                  <div className="modal-reading-time">
                    <Clock className="time-icon" />
                    <span>{selectedPost.readingTime}</span>
                  </div>
                </div>
                <h2 className="modal-title">{selectedPost.title}</h2>
                <div className="modal-tags">
                  {selectedPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="modal-tag">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <button className="close-modal-btn" onClick={closePostModal}>
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="modal-text">
                {selectedPost.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="modal-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="modal-footer">
                <div className="modal-author">
                  <span>Written by {selectedPost.author}</span>
                </div>
                <Button onClick={closePostModal} className="close-btn">
                  Return to Grimoire
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;