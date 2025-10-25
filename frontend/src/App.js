import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PenLine, Plus, Trash2, Edit, LogOut, User, ThumbsUp, ThumbsDown, Share2, Eye, Facebook, Twitter, Linkedin, Link as LinkIcon, Mail } from 'lucide-react';
import Starfield from '@/components/Starfield';
import IntroSequence from '@/components/IntroSequence';
import '@/App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      const url = selectedCategory ? `${API}/posts?category=${selectedCategory}` : `${API}/posts`;
      const response = await axios.get(url);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen">
      <Starfield />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/70 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <PenLine className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <span className="text-xl md:text-2xl font-display text-indigo-100">Aruna.S</span>
            </Link>
            <div className="flex items-center gap-3 md:gap-6">
              <Link to="/" className="nav-link text-sm md:text-base" data-testid="nav-home">Home</Link>
              <Link to="/about" className="nav-link text-sm md:text-base" data-testid="nav-about">About</Link>
              {localStorage.getItem('token') ? (
                <Link to="/admin" className="nav-link text-sm md:text-base" data-testid="nav-admin">Admin</Link>
              ) : (
                <Button
                  onClick={() => setShowAuth(true)}
                  variant="outline"
                  size="sm"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/20 text-xs md:text-sm"
                  data-testid="login-btn"
                >
                  <User className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
                  <span className="hidden md:inline">Login</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {featuredPost && (
        <div className="hero-section" data-testid="hero-section">
          <div className="hero-overlay" />
          <img src={featuredPost.image_url} alt={featuredPost.title} className="hero-image" />
          <div className="hero-content">
            <h1 className="hero-title" data-testid="hero-title">{featuredPost.title}</h1>
            <p className="hero-excerpt" data-testid="hero-excerpt">{featuredPost.excerpt}</p>
            <Button
              onClick={() => navigate(`/post/${featuredPost.slug}`)}
              className="cta-button"
              data-testid="hero-read-more"
            >
              Read More
            </Button>
          </div>
        </div>
      )}

      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`category-chip ${!selectedCategory ? 'active' : ''}`}
              data-testid="category-all"
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`category-chip ${selectedCategory === cat.slug ? 'active' : ''}`}
                data-testid={`category-${cat.slug}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="section-title" data-testid="recent-posts-title">Recent Stories</h2>
        <div className="posts-grid">
          {regularPosts.map((post) => (
            <div key={post.id} className="post-card" data-testid={`post-card-${post.slug}`}>
              <div className="post-image-container">
                <img src={post.image_url} alt={post.title} className="post-image" />
              </div>
              <div className="post-content">
                <span className="post-category" data-testid={`post-category-${post.slug}`}>{post.category}</span>
                <h3 className="post-title" data-testid={`post-title-${post.slug}`}>{post.title}</h3>
                <p className="post-excerpt" data-testid={`post-excerpt-${post.slug}`}>{post.excerpt}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="post-author" data-testid={`post-author-${post.slug}`}>by {post.author}</span>
                  <Button
                    onClick={() => navigate(`/post/${post.slug}`)}
                    variant="ghost"
                    size="sm"
                    className="text-rose-400 hover:text-rose-300"
                    data-testid={`read-more-${post.slug}`}
                  >
                    Read More →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog open={showAuth} onOpenChange={setShowAuth} />
    </div>
  );
};

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    // Check if user has already liked/disliked
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts') || '[]');
    setHasLiked(likedPosts.includes(slug));
    setHasDisliked(dislikedPosts.includes(slug));
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API}/posts/${slug}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Post not found');
      navigate('/');
    }
  };

  const handleLike = async () => {
    if (hasLiked) {
      toast.info('You already liked this post');
      return;
    }
    try {
      const response = await axios.post(`${API}/posts/${post.id}/like`);
      setPost(response.data);
      setHasLiked(true);
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      likedPosts.push(slug);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      toast.success('Thank you for your feedback!');
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleDislike = async () => {
    if (hasDisliked) {
      toast.info('You already disliked this post');
      return;
    }
    try {
      const response = await axios.post(`${API}/posts/${post.id}/dislike`);
      setPost(response.data);
      setHasDisliked(true);
      const dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts') || '[]');
      dislikedPosts.push(slug);
      localStorage.setItem('dislikedPosts', JSON.stringify(dislikedPosts));
      toast.success('Thank you for your feedback!');
    } catch (error) {
      toast.error('Failed to dislike post');
    }
  };

  if (!post) return <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center"><div className="text-amber-950">Loading...</div></div>;

  return (
    <div className="min-h-screen">
      <Starfield />
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/70 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <PenLine className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <span className="text-xl md:text-2xl font-display text-indigo-100">Aruna.S</span>
            </Link>
            <Link to="/" className="nav-link text-sm md:text-base" data-testid="back-home">← Back</Link>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="mb-8">
          <span className="post-category" data-testid="article-category">{post.category}</span>
          <h1 className="article-title" data-testid="article-title">{post.title}</h1>
          <div className="flex items-center gap-4 text-indigo-200 text-sm mt-4">
            <span data-testid="article-author">By {post.author}</span>
            <span>•</span>
            <span data-testid="article-date">{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="article-image-container">
          <img src={post.image_url} alt={post.title} className="article-image" />
        </div>

        <div className="article-content" data-testid="article-content" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />

        {/* About the Author Section */}
        <div className="mt-8 p-6 bg-slate-900/80 rounded-2xl border border-purple-500/30 backdrop-blur-xl shadow-lg shadow-purple-500/20">
          <h3 className="text-2xl font-display text-purple-400 mb-4">About the Author</h3>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img 
              src="https://customer-assets.emergentagent.com/job_3753420f-aaf4-4ba8-bc35-43e58ba6eb39/artifacts/qy25iad9_1703018909560.jpg"
              alt="Aruna.S"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-500/50 shadow-lg shadow-purple-500/50 flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="text-xl font-display text-indigo-100 mb-2">Aruna.S</h4>
              <p className="text-indigo-200 text-sm mb-3">Author | Blogger | Banking Professional</p>
              <p className="text-indigo-300 leading-relaxed mb-3">
                Aruna.S is an author based in Pune, where she lives with her two daughters. She is known for her books <span className="text-purple-400 font-semibold">Agarkas the King of Satan</span>, <span className="text-purple-400 font-semibold">The Whisper That Name Me</span>, and <span className="text-purple-400 font-semibold">Agarkas the Return of the King</span>. 
              </p>
              <p className="text-indigo-300 leading-relaxed">
                Alongside her literary career, she balances her creative pursuits with a professional career in the banking sector while working on her fourth book.
              </p>
            </div>
          </div>
        </div>

        <div className="article-feedback" data-testid="article-feedback">
          <h3>Was this post helpful?</h3>
          <p className="text-indigo-300 mb-4 text-sm">Your feedback helps me create better content</p>
          <div className="article-feedback-buttons">
            <button
              onClick={handleLike}
              className={`feedback-btn ${hasLiked ? 'liked' : ''}`}
              disabled={hasLiked}
              data-testid="article-like-btn"
            >
              <ThumbsUp className="w-5 h-5" />
              <span>Helpful ({post.likes || 0})</span>
            </button>
            <button
              onClick={handleDislike}
              className={`feedback-btn ${hasDisliked ? 'liked' : ''}`}
              disabled={hasDisliked}
              data-testid="article-dislike-btn"
            >
              <ThumbsDown className="w-5 h-5" />
              <span>Not Helpful ({post.dislikes || 0})</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
      return;
    }
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/posts?published=true`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Post deleted successfully');
      fetchAllPosts();
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <div className="min-h-screen">
      <Starfield />
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/70 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <PenLine className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <span className="text-xl md:text-2xl font-display text-indigo-100">Aruna.S</span>
            </Link>
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-indigo-200 text-sm md:text-base hidden sm:inline">Welcome, {localStorage.getItem('username')}</span>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-purple-300 text-xs md:text-sm" data-testid="logout-btn">
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-display text-indigo-100" data-testid="admin-title">Manage Posts</h1>
          <Button 
            onClick={() => setShowCreateDialog(true)} 
            className="cta-button w-full md:w-auto" 
            data-testid="create-post-btn"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Post
          </Button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="admin-post-card" data-testid={`admin-post-${post.slug}`}>
              <div className="flex flex-col md:flex-row gap-4">
                <img src={post.image_url} alt={post.title} className="admin-post-thumbnail w-full md:w-40 h-48 md:h-32" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-indigo-100 mb-2" data-testid={`admin-post-title-${post.slug}`}>{post.title}</h3>
                  <p className="text-indigo-300 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-indigo-400">
                    <span className="px-2 py-1 bg-purple-500/20 rounded">{post.category}</span>
                    <span>by {post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                      <ThumbsUp className="w-3 h-3" /> {post.likes || 0}
                      <ThumbsDown className="w-3 h-3 ml-1" /> {post.dislikes || 0}
                    </span>
                  </div>
                </div>
                <div className="admin-actions flex md:flex-col gap-2">
                  <Button
                    onClick={() => setEditingPost(post)}
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-300 flex-1 md:flex-none"
                    data-testid={`edit-post-${post.slug}`}
                  >
                    <Edit className="w-4 h-4 md:mr-0" />
                    <span className="md:hidden ml-2">Edit</span>
                  </Button>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-400 hover:bg-red-500/20 flex-1 md:flex-none"
                    data-testid={`delete-post-${post.slug}`}
                  >
                    <Trash2 className="w-4 h-4 md:mr-0" />
                    <span className="md:hidden ml-2">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PostDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={fetchAllPosts}
      />
      <PostDialog
        open={!!editingPost}
        onOpenChange={(open) => !open && setEditingPost(null)}
        post={editingPost}
        onSuccess={fetchAllPosts}
      />
    </div>
  );
};

const AuthDialog = ({ open, onOpenChange }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await axios.post(`${API}${endpoint}`, formData);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('username', response.data.username);
      toast.success(isLogin ? 'Logged in successfully' : 'Account created successfully');
      onOpenChange(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Authentication failed');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900/95 border-purple-500/30 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-indigo-100 text-2xl" data-testid="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</DialogTitle>
          <DialogDescription className="text-indigo-300">
            {isLogin ? 'Login to manage your blog posts' : 'Register to start writing'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="username" className="text-indigo-200">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-slate-800/50 border-purple-500/30 text-indigo-100"
                required
                data-testid="auth-username"
              />
            </div>
          )}
          <div>
            <Label htmlFor="email" className="text-indigo-200">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-indigo-100"
              required
              data-testid="auth-email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-indigo-200">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-indigo-100"
              required
              data-testid="auth-password"
            />
          </div>
          <Button type="submit" className="w-full cta-button" data-testid="auth-submit">
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 text-sm hover:underline"
            data-testid="auth-toggle"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PostDialog = ({ open, onOpenChange, post, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    slug: '',
    published: true
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image_url: post.image_url,
        category: post.category,
        slug: post.slug,
        published: post.published
      });
    } else {
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image_url: '',
        category: '',
        slug: '',
        published: true
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (post) {
        await axios.put(`${API}/posts/${post.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Post updated successfully');
      } else {
        await axios.post(`${API}/posts`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Post created successfully');
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save post');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900/95 border-purple-500/30 backdrop-blur-xl max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-indigo-100 text-2xl" data-testid="post-dialog-title">{post ? 'Edit Post' : 'Create New Post'}</DialogTitle>
          <DialogDescription className="text-indigo-300">
            {post ? 'Update your blog post details below' : 'Fill in the details to create a new blog post'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-indigo-200">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-indigo-100"
              required
              data-testid="post-title-input"
            />
          </div>
          <div>
            <Label className="text-indigo-200">Slug (URL)</Label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-indigo-100"
              required
              data-testid="post-slug-input"
            />
          </div>
          <div>
            <Label className="text-indigo-200">Excerpt</Label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-indigo-100"
              required
              data-testid="post-excerpt-input"
            />
          </div>
          <div>
            <Label className="text-indigo-200">Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-indigo-100 min-h-[200px]"
              required
              data-testid="post-content-input"
            />
          </div>
          <div>
            <Label className="text-indigo-200">Image URL</Label>
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-indigo-100"
              required
              data-testid="post-image-input"
            />
          </div>
          <div>
            <Label className="text-indigo-200">Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-indigo-100"
              required
              data-testid="post-category-input"
            />
          </div>
          <Button type="submit" className="w-full cta-button" data-testid="post-submit-btn">
            {post ? 'Update Post' : 'Create Post'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Starfield />
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/70 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <PenLine className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <span className="text-xl md:text-2xl font-display text-indigo-100">Aruna.S</span>
            </Link>
            <Link to="/" className="nav-link text-sm md:text-base" data-testid="about-back-home">← Back</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img 
              src="https://customer-assets.emergentagent.com/job_3753420f-aaf4-4ba8-bc35-43e58ba6eb39/artifacts/qqg299lc_1703018909560.jpg" 
              alt="Aruna.S" 
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-purple-500/50 shadow-lg shadow-purple-500/50"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-display text-indigo-100 mb-3 md:mb-4" data-testid="about-title">About Aruna.S</h1>
            <p className="text-base md:text-lg text-indigo-200 leading-relaxed mb-3 md:mb-4">
              Author | Blogger | Banking Professional
            </p>
            <p className="text-indigo-300 text-sm md:text-base">
              Based in Pune, India
            </p>
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none space-y-4 md:space-y-6">
          <p className="text-base md:text-lg text-indigo-100 leading-relaxed">
            Aruna.S is an author based in Pune, where she lives with her two daughters. She is known for her books <span className="text-purple-400 font-semibold">Agarkas the King of Satan</span>, <span className="text-purple-400 font-semibold">The Whisper That Name Me</span>, and <span className="text-purple-400 font-semibold">Agarkas the Return of the King</span>.
          </p>
          
          <p className="text-base md:text-lg text-indigo-100 leading-relaxed">
            Alongside her literary career, Aruna.S is also a passionate blogger and is currently working on her fourth book. She balances her creative pursuits with a professional career, working in the banking sector.
          </p>
          
          <p className="text-base md:text-lg text-indigo-100 leading-relaxed">
            While her books explore worlds of fantasy and shadow, her blog bridges those fictional worlds with reality—sharing insights into her writing process, the sparks of inspiration found in daily life, and the chaotic, wonderful balancing act of being a mother, a banker, and a storyteller.
          </p>
          
          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-slate-900/80 rounded-lg border border-purple-500/30 shadow-lg backdrop-blur-xl">
            <h3 className="text-xl md:text-2xl font-display text-purple-400 mb-3 md:mb-4">Published Works</h3>
            <ul className="space-y-2 text-sm md:text-base text-indigo-100">
              <li>📚 <strong>Agarkas the King of Satan</strong></li>
              <li>📚 <strong>The Whisper That Name Me</strong></li>
              <li>📚 <strong>Agarkas the Return of the King</strong></li>
              <li>✍️ <strong>Fourth book in progress...</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Check if user has seen intro before
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroSequence onComplete={handleIntroComplete} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;