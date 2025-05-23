import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import { 
  ArcadeScreen, 
  ArcadeCabinet, 
  ArcadeTitle, 
  BlinkingText, 
  LoadingBar, 
  CoinSlot 
} from '../arcade/ArcadeElements';
import { theme } from '../../styles/theme';

// Styled components specific to the loading screen
const LoadingScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingText = styled.p`
  font-family: ${theme.fonts.pixel};
  font-size: 1rem;
  color: ${theme.colors.text};
  margin-top: ${theme.spacing.md};
  text-align: center;
`;

const InsertCoinText = styled(BlinkingText)`
  margin-top: ${theme.spacing.lg};
  cursor: pointer;
`;

const CoinImage = styled.div`
  width: 40px;
  height: 40px;
  background-color: #FFD700;
  border-radius: 50%;
  margin: ${theme.spacing.md} auto;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  position: relative;
  cursor: pointer;
  
  &::before {
    content: "25¢";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ${theme.fonts.pixel};
    font-size: 0.6rem;
    color: #333;
  }
`;

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [coinInserted, setCoinInserted] = useState(false);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sound effects
  const startupSound = new Howl({
    src: ['/sounds/startup.mp3'],
    volume: 0.5,
  });
  
  const coinSound = new Howl({
    src: ['/sounds/coin.mp3'],
    volume: 0.5,
  });
  
  const handleCoinInsert = () => {
    if (!coinInserted) {
      coinSound.play();
      setCoinInserted(true);
      
      // Start loading progress
      gsap.to(loadingBarRef.current, {
        '--progress': '100%',
        duration: 3,
        ease: 'steps(20)',
        onUpdate: () => {
          const progress = gsap.getProperty(loadingBarRef.current, '--progress') as string;
          setProgress(parseInt(progress, 10));
        },
        onComplete: () => {
          // Fade out loading screen
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            delay: 0.5,
            onComplete: onLoadingComplete,
          });
        },
      });
    }
  };
  
  useEffect(() => {
    // Play startup sound when component mounts
    startupSound.play();
    
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Cleanup
    return () => {
      startupSound.stop();
      coinSound.stop();
    };
  }, []);
  
  return (
    <LoadingScreenContainer ref={containerRef}>
      <ArcadeCabinet>
        <ArcadeScreen>
          <ArcadeTitle>JaePyJs ARCADE</ArcadeTitle>
          <LoadingText>SYSTEM BOOTING...</LoadingText>
          <LoadingBar ref={loadingBarRef} style={{ '--progress': '0%' } as React.CSSProperties} />
          <LoadingText>{progress}%</LoadingText>
          
          {!coinInserted ? (
            <>
              <InsertCoinText onClick={handleCoinInsert}>INSERT COIN TO CONTINUE</InsertCoinText>
              <CoinImage onClick={handleCoinInsert} />
              <CoinSlot />
            </>
          ) : (
            <LoadingText>LOADING GAME DATA...</LoadingText>
          )}
        </ArcadeScreen>
      </ArcadeCabinet>
    </LoadingScreenContainer>
  );
};

export default LoadingScreen;
