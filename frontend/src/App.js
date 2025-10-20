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
import { PenLine, Plus, Trash2, Edit, LogOut, User } from 'lucide-react';
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <PenLine className="w-6 h-6 text-rose-400" />
              <span className="text-2xl font-display text-white">Aruna.S Writes</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="nav-link" data-testid="nav-home">Home</Link>
              <Link to="/about" className="nav-link" data-testid="nav-about">About</Link>
              {localStorage.getItem('token') ? (
                <Link to="/admin" className="nav-link" data-testid="nav-admin">Admin</Link>
              ) : (
                <Button
                  onClick={() => setShowAuth(true)}
                  variant="outline"
                  size="sm"
                  className="border-rose-500 text-rose-400 hover:bg-rose-500/10"
                  data-testid="login-btn"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
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
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
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

  if (!post) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>;

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <PenLine className="w-6 h-6 text-rose-400" />
              <span className="text-2xl font-display text-white">Aruna.S Writes</span>
            </Link>
            <Link to="/" className="nav-link" data-testid="back-home">← Back to Home</Link>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-8">
          <span className="post-category" data-testid="article-category">{post.category}</span>
          <h1 className="article-title" data-testid="article-title">{post.title}</h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm mt-4">
            <span data-testid="article-author">By {post.author}</span>
            <span>•</span>
            <span data-testid="article-date">{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="article-image-container">
          <img src={post.image_url} alt={post.title} className="article-image" />
        </div>

        <div className="article-content" data-testid="article-content" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
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
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <PenLine className="w-6 h-6 text-rose-400" />
              <span className="text-2xl font-display text-white">Aruna.S Writes</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-slate-300">Welcome, {localStorage.getItem('username')}</span>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-rose-400" data-testid="logout-btn">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-display text-white" data-testid="admin-title">Manage Posts</h1>
          <Button onClick={() => setShowCreateDialog(true)} className="cta-button" data-testid="create-post-btn">
            <Plus className="w-5 h-5 mr-2" />
            Create New Post
          </Button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="admin-post-card" data-testid={`admin-post-${post.slug}`}>
              <div className="flex gap-4">
                <img src={post.image_url} alt={post.title} className="admin-post-thumbnail" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2" data-testid={`admin-post-title-${post.slug}`}>{post.title}</h3>
                  <p className="text-slate-400 text-sm mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>by {post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setEditingPost(post)}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300"
                    data-testid={`edit-post-${post.slug}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    variant="outline"
                    size="sm"
                    className="border-rose-500 text-rose-400 hover:bg-rose-500/10"
                    data-testid={`delete-post-${post.slug}`}
                  >
                    <Trash2 className="w-4 h-4" />
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
      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl" data-testid="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {isLogin ? 'Login to manage your blog posts' : 'Register to start writing'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                required
                data-testid="auth-username"
              />
            </div>
          )}
          <div>
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              required
              data-testid="auth-email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
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
            className="text-rose-400 text-sm hover:underline"
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
      <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl" data-testid="post-dialog-title">{post ? 'Edit Post' : 'Create New Post'}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {post ? 'Update your blog post details below' : 'Fill in the details to create a new blog post'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-slate-300">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              required
              data-testid="post-title-input"
            />
          </div>
          <div>
            <Label className="text-slate-300">Slug (URL)</Label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              required
              data-testid="post-slug-input"
            />
          </div>
          <div>
            <Label className="text-slate-300">Excerpt</Label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              required
              data-testid="post-excerpt-input"
            />
          </div>
          <div>
            <Label className="text-slate-300">Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white min-h-[200px]"
              required
              data-testid="post-content-input"
            />
          </div>
          <div>
            <Label className="text-slate-300">Image URL</Label>
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
              required
              data-testid="post-image-input"
            />
          </div>
          <div>
            <Label className="text-slate-300">Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-slate-800 border-slate-700 text-white"
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
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <PenLine className="w-6 h-6 text-rose-400" />
              <span className="text-2xl font-display text-white">Aruna.S Writes</span>
            </Link>
            <Link to="/" className="nav-link" data-testid="about-back-home">← Back to Home</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-5xl font-display text-white mb-6" data-testid="about-title">About Aruna.S Writes</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            Welcome to Aruna.S Writes, where words dance in the shadows and stories emerge from the depths of imagination.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            This is a space dedicated to thoughtful writing, creative expression, and the timeless art of storytelling. Each post is crafted with care, designed to inspire, provoke thought, and transport you to new worlds.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            Whether you're seeking mystery, reflection, or simply a moment of literary escape, you'll find it here among the pages of Aruna.S Writes.
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
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