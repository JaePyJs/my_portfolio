import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { 
  ArcadeScreen, 
  ArcadeCabinet, 
  ArcadeTitle, 
  BlinkingText, 
  StartButton,
  FloatingElement
} from '../arcade/ArcadeElements';
import { theme } from '../../styles/theme';

// Styled components specific to the start screen
const StartScreenContainer = styled.div`
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
  z-index: 900;
`;

const GameTitle = styled(ArcadeTitle)`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.xl};
  background: ${theme.gradients.main};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px ${theme.colors.primary});
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const CharacterSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing.lg} 0;
`;

const PixelCharacter = styled.div`
  width: 100px;
  height: 100px;
  background-image: url('/images/pixel-character.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 80px;
    height: 80px;
  }
`;

const CreditsText = styled.p`
  font-family: ${theme.fonts.pixel};
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.lg};
  text-align: center;
`;

const BackgroundCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Sound effects
  const startSound = new Howl({
    src: ['/sounds/start.mp3'],
    volume: 0.5,
  });
  
  const handleStart = () => {
    startSound.play();
    
    // Fade out start screen
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: onStart,
    });
  };
  
  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'elastic.out(1, 0.5)' }
    );
    
    // Cleanup
    return () => {
      startSound.stop();
    };
  }, []);
  
  return (
    <StartScreenContainer ref={containerRef}>
      <BackgroundCanvas>
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </BackgroundCanvas>
      
      <ArcadeCabinet>
        <ArcadeScreen>
          <GameTitle ref={titleRef}>JaePyJs ADVENTURE</GameTitle>
          
          <CharacterSelect>
            <FloatingElement>
              <PixelCharacter />
            </FloatingElement>
          </CharacterSelect>
          
          <BlinkingText>PRESS START</BlinkingText>
          
          <StartButton onClick={handleStart}>
            START
          </StartButton>
          
          <CreditsText>CREDITS: 1</CreditsText>
        </ArcadeScreen>
      </ArcadeCabinet>
    </StartScreenContainer>
  );
};

export default StartScreen;
