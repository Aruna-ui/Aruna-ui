import React, { useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Books from './components/Books';
import Contact from './components/Contact';
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
        <Contact />
      </main>
      <Toaster />
    </div>
  );
}

export default App;