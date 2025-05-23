import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Howl } from "howler";
import { theme } from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import LoadingScreen from "./components/screens/LoadingScreen";
import StartScreen from "./components/screens/StartScreen";
import LevelSelectScreen from "./components/screens/LevelSelectScreen";
import AboutScreen from "./components/screens/AboutScreen";
import SkillsScreen from "./components/screens/SkillsScreen";
import ProjectsScreen from "./components/screens/ProjectsScreen";
import ContactScreen from "./components/screens/ContactScreen";

// Game states
type GameState =
  | "loading"
  | "start"
  | "levels"
  | "about"
  | "skills"
  | "projects"
  | "contact";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("loading");
  const [bgMusic, setBgMusic] = useState<Howl | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    // Initialize background music
    const music = new Howl({
      src: ["/sounds/background.mp3"],
      loop: true,
      volume: 0.3,
      autoplay: false,
    });

    setBgMusic(music);

    // Cleanup
    return () => {
      if (music) {
        music.stop();
      }
    };
  }, []);

  // Handle game state transitions
  const handleLoadingComplete = () => {
    setGameState("start");
  };

  const handleStartGame = () => {
    setGameState("levels");

    // Start background music
    if (bgMusic && !isMuted) {
      bgMusic.play();
    }
  };

  const handleSelectLevel = (level: string) => {
    setGameState(level as GameState);
  };

  const handleNavigate = (screen: string) => {
    setGameState(screen as GameState);
  };

  // Toggle music
  const toggleMusic = () => {
    if (bgMusic) {
      if (isMuted) {
        bgMusic.play();
      } else {
        bgMusic.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Render the current game state
  const renderGameState = () => {
    switch (gameState) {
      case "loading":
        return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
      case "start":
        return <StartScreen onStart={handleStartGame} />;
      case "levels":
        return <LevelSelectScreen onSelectLevel={handleSelectLevel} />;
      case "about":
        return <AboutScreen onNavigate={handleNavigate} />;
      case "skills":
        return <SkillsScreen onNavigate={handleNavigate} />;
      case "projects":
        return <ProjectsScreen onNavigate={handleNavigate} />;
      case "contact":
        return <ContactScreen onNavigate={handleNavigate} />;
      default:
        return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {/* Music toggle button */}
      <button
        onClick={toggleMusic}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          background: "rgba(0, 0, 0, 0.5)",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "24px",
        }}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {renderGameState()}
    </ThemeProvider>
  );
};

export default App;
