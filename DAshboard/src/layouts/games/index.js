import React, { useState, useEffect } from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

// Importing local videos
import video1 from "assets/videos/video1.webm";
import video2 from "assets/videos/video1.webm";
import video3 from "assets/videos/video1.webm";
import video4 from "assets/videos/video1.webm";

function Games() {
  const videos = [
    { title: "Game 1", src: video1 },
    { title: "Game 2", src: video2 },
    { title: "Game 3", src: video3 },
    { title: "Game 4", src: video4 },
  ];

  // State to manage the active sliding video index
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // Slider functionality to change videos every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideoIndex((prevIndex) =>
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  // Function to handle manual navigation
  const handleNextVideo = () => {
    setActiveVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevVideo = () => {
    setActiveVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  // Sample game cards data
  const games = [
    { title: "Game A", description: "A thrilling action game.", image: "https://img.freepik.com/premium-photo/underwater-seafloor-scene-with-treasure-chest-cartoon-game-background-ocean-underwater-world-with-fish-algae-coral-weed-oceanic-wildlife-painting_76964-404517.jpg?w=996" },
    { title: "Game B", description: "An exciting adventure game.", image: "https://img.freepik.com/premium-photo/underwater-seafloor-scene-with-treasure-chest-cartoon-game-background-ocean-underwater-world-with-fish-algae-coral-weed-oceanic-wildlife-painting_76964-404517.jpg?w=996" },
    { title: "Game C", description: "A captivating puzzle game.", image: "https://img.freepik.com/premium-photo/underwater-seafloor-scene-with-treasure-chest-cartoon-game-background-ocean-underwater-world-with-fish-algae-coral-weed-oceanic-wildlife-painting_76964-404517.jpg?w=996" },
    { title: "Game D", description: "A fast-paced racing game.", image: "https://img.freepik.com/premium-photo/underwater-seafloor-scene-with-treasure-chest-cartoon-game-background-ocean-underwater-world-with-fish-algae-coral-weed-oceanic-wildlife-painting_76964-404517.jpg?w=996" },
    { title: "Game E", description: "An immersive RPG game.", image: "https://img.freepik.com/premium-photo/underwater-seafloor-scene-with-treasure-chest-cartoon-game-background-ocean-underwater-world-with-fish-algae-coral-weed-oceanic-wildlife-painting_76964-404517.jpg?w=996" },
    { title: "Game F", description: "A strategic board game.", image: "https://img.freepik.com/premium-photo/underwater-seafloor-scene-with-treasure-chest-cartoon-game-background-ocean-underwater-world-with-fish-algae-coral-weed-oceanic-wildlife-painting_76964-404517.jpg?w=996" },
    { title: "Game G", description: "A fun educational game.", image: "https://img.freepik.com/premium-photo/underwater-seafloor-scene-with-treasure-chest-cartoon-game-background-ocean-underwater-world-with-fish-algae-coral-weed-oceanic-wildlife-painting_76964-404517.jpg?w=996" },
    { title: "Game H", description: "A sports simulation game.", image: "https://img.freepik.com/premium-photo/underwater-seafloor-scene-with-treasure-chest-cartoon-game-background-ocean-underwater-world-with-fish-algae-coral-weed-oceanic-wildlife-painting_76964-404517.jpg?w=996" },
  ];

  return (
    <VuiBox p={3}>
      {/* Video Slider (Top Section) */}
      <VuiBox mb={4} textAlign="center" position="relative">
        {videos.map((video, index) => (
          <div
            key={index}
            style={{
              display: index === activeVideoIndex ? "block" : "none",
              position: "relative",
            }}
          >
            <video
              width="100%"
              height="300" // Reduced height for video slideshow
              autoPlay
              muted
              loop
              style={{
                borderRadius: "12px",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay Text and Play Now Button */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                textAlign: "center",
                padding: "10px 20px",
              }}
            >
              <VuiTypography variant="h4">{video.title}</VuiTypography>
              <Button
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => alert(`${video.title} is starting now!`)}
              >
                Play Now
              </Button>
            </div>
          </div>
        ))}

        {/* Slider Navigation Controls */}
        <button
          onClick={handlePrevVideo}
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          &#10094; {/* Left arrow symbol */}
        </button>
        <button
          onClick={handleNextVideo}
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          &#10095; {/* Right arrow symbol */}
        </button>
      </VuiBox>

      {/* Game Cards Section with 4 cards */}
      <VuiBox display="flex" justifyContent="space-between" flexWrap="wrap" mb={3}>
        {games.slice(0, 4).map((game, index) => (
          <Card
            key={index}
            style={{
              width: "22%",
              margin: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={game.image}
              alt={game.title}
            />
            <CardContent>
              <VuiTypography
                variant="h5"
                style={{ fontWeight: "bold", textAlign: "center", color: "blue" }}
              >
                {game.title}
              </VuiTypography>
              <VuiTypography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center", color: "white" }}
              >
                {game.description}
              </VuiTypography>
              <Button
                style={{
                  marginTop: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={() => alert(`Playing ${game.title}`)}
              >
                Play Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </VuiBox>

      {/* Another set of Game Cards Section with 4 cards */}
      <VuiBox display="flex" justifyContent="space-between" flexWrap="wrap">
        {games.slice(4).map((game, index) => (
          <Card
            key={index}
            style={{
              width: "22%",
              margin: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={game.image}
              alt={game.title}
            />
            <CardContent>
              <VuiTypography
                variant="h5"
                style={{ fontWeight: "bold", textAlign: "center", color: "blue" }}
              >
                {game.title}
              </VuiTypography>
              <VuiTypography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center", color: "white" }}
              >
                {game.description}
              </VuiTypography>
              <Button
                style={{
                  marginTop: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={() => alert(`Playing ${game.title}`)}
              >
                Play Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </VuiBox>
    </VuiBox>
  );
}

export default Games;
