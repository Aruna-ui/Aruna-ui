import React, { useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Books from './components/Books';
import Blog from './components/Blog';
import Contact from './components/Contact';
import VisitorCounter from './components/VisitorCounter';
import { Toaster } from './components/ui/sonner';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="App">
      <main>
        <Hero />
        <About />
        <Books />
        <Blog />
        <Contact />
      </main>
      <VisitorCounter />
      <Toaster />
    </div>
  );
}

export default App;