import React from "react";
import "./App.css";
import bgVideo from "./assets/background-video.mp4"; // Add your video here

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">Wave Wise</div>
        <div className="navbar-center">
          <button className="nav-button">GameS</button>
          <button className="nav-button">Webinar</button>
          <button className="nav-button">Meetups</button>
          <button className="nav-button">Connect</button>
          <button className="nav-button">Profile</button>
        </div>
        <div className="navbar-right">
          <button className="login-button">Login</button>
        </div>
      </nav>

      {/* Background Video */}
      <div className="video-container">
        <video autoPlay muted loop className="bg-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>

      {/* Get Started Button */}
      <div className="button-container">
        <button className="start-button">Tutorial !</button>
      </div>
    </div>
  );
}

export default App;
