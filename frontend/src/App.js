import React from "react";
import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BooksSection from "./components/BooksSection";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import NewsSection from "./components/NewsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import FeedbackWidget from "./components/FeedbackWidget";

function App() {
  return (
    <div className="App gothic-theme">
      <Header />
      <HeroSection />
      <BooksSection />
      <AboutSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;