import React from "react";
import './CreateGarden.css';

const CreateGarden = () => {
  const handleClick = (event) => {
    event.preventDefault();
    window.open(
      "https://www.spatial.io/s/Players-Home-6619708170f7d10e5463d1da",
      "_blank"
    );
  };

  return (
    <div className="fullscreen-container">
      <h1 className="text-4xl font-bold">Players Room</h1>
      
      <div className="iframe-container">
        <iframe
          src="https://www.spatial.io/s/Players-Home-6619708170f7d10e5463d1da"
          allow="camera; fullscreen; autoplay; display-capture; microphone; clipboard-write"
          title="Virtual Garden"
        ></iframe>
      </div>
    </div>
  );
};

export default CreateGarden;
