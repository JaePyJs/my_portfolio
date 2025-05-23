import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import { 
  ArcadeScreen, 
  ArcadeCabinet, 
  ArcadeTitle, 
  ArcadeButton
} from '../arcade/ArcadeElements';
import { theme } from '../../styles/theme';

// Styled components specific to the level select screen
const LevelSelectContainer = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LevelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  width: 100%;
  max-width: 800px;
  margin: ${theme.spacing.lg} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const LevelCard = styled.div<{ locked?: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${props => props.locked ? theme.colors.tertiary : theme.colors.primary};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: ${theme.transitions.default};
  position: relative;
  overflow: hidden;
  cursor: ${props => props.locked ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.locked ? 0.7 : 1};
  
  &:hover {
    transform: ${props => props.locked ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.locked ? 'none' : `0 10px 20px rgba(0, 0, 0, 0.2)`};
    border-color: ${props => props.locked ? theme.colors.tertiary : theme.colors.neon};
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.gradients.main};
    opacity: 0.1;
    z-index: -1;
  }
`;

const LevelNumber = styled.div`
  font-family: ${theme.fonts.pixel};
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const LevelIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
`;

const LevelTitle = styled.h3`
  font-family: ${theme.fonts.pixel};
  font-size: 1.2rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  text-align: center;
`;

const LevelDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${theme.spacing.md};
`;

const LockIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  color: ${theme.colors.tertiary};
`;

interface LevelSelectScreenProps {
  onSelectLevel: (level: string) => void;
}

const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({ onSelectLevel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);
  
  // Sound effects
  const selectSound = new Howl({
    src: ['/sounds/select.mp3'],
    volume: 0.5,
  });
  
  const handleLevelSelect = (level: string) => {
    selectSound.play();
    onSelectLevel(level);
  };
  
  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Levels animation
    gsap.fromTo(
      levelsRef.current?.children,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power3.out',
        delay: 0.5
      }
    );
    
    // Cleanup
    return () => {
      selectSound.stop();
    };
  }, []);
  
  const levels = [
    {
      id: 'about',
      number: '1',
      icon: '👤',
      title: 'ABOUT ME',
      description: 'Character stats and backstory',
      locked: false,
    },
    {
      id: 'skills',
      number: '2',
      icon: '🛠️',
      title: 'SKILLS',
      description: 'Power-ups and abilities',
      locked: false,
    },
    {
      id: 'projects',
      number: '3',
      icon: '🚀',
      title: 'PROJECTS',
      description: 'Completed quests and missions',
      locked: false,
    },
    {
      id: 'contact',
      number: '4',
      icon: '📬',
      title: 'CONTACT',
      description: 'Send a message to the player',
      locked: false,
    },
  ];
  
  return (
    <LevelSelectContainer ref={containerRef}>
      <ArcadeCabinet>
        <ArcadeScreen>
          <ArcadeTitle>SELECT LEVEL</ArcadeTitle>
          
          <LevelsGrid ref={levelsRef}>
            {levels.map((level) => (
              <LevelCard 
                key={level.id} 
                locked={level.locked}
                onClick={() => !level.locked && handleLevelSelect(level.id)}
              >
                {level.locked && <LockIcon>🔒</LockIcon>}
                <LevelNumber>LEVEL {level.number}</LevelNumber>
                <LevelIcon>{level.icon}</LevelIcon>
                <LevelTitle>{level.title}</LevelTitle>
                <LevelDescription>{level.description}</LevelDescription>
                
                {!level.locked && (
                  <ArcadeButton>SELECT</ArcadeButton>
                )}
              </LevelCard>
            ))}
          </LevelsGrid>
        </ArcadeScreen>
      </ArcadeCabinet>
    </LevelSelectContainer>
  );
};

export default LevelSelectScreen;
