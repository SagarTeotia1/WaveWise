import React, { useState } from 'react';
import './App.css';
import bgVideo from './assets/background-video.mp4'; // Add your video here

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleGetStartedClick = () => {
    // Open the side nav when "Get Started" is clicked
    setIsNavOpen(true);
  };

  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <nav className="top-navbar">
        <div className="top-navbar-left">WaveWise</div>
      </nav>

      {/* Toggle Nav Button */}
      <button className="nav-toggle" onClick={toggleNav}>
        {isNavOpen ? '×' : '☰'}
      </button>

      {/* Side Navigation Bar */}
      <nav className={`navbar ${isNavOpen ? 'open' : ''}`}>
        <a href="#games" className="nav-button">GameS</a>
        <a href="#webinars" className="nav-button">Webinars</a>
        <a href="#meetups" className="nav-button">Meetups</a>
        <a href="#connect" className="nav-button">Connect</a>
      </nav>

      {/* Background Video */}
      <div className="video-container">
        <video autoPlay muted loop className="bg-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>

      {/* Get Started Button */}
      <div className="button-container">
        <button className="start-button" onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
