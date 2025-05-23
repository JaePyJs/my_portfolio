import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import { 
  ArcadeScreen, 
  ArcadeCabinet, 
  ArcadeTitle, 
  ArcadeButton,
  BlinkingText,
  CoinSlot
} from '../arcade/ArcadeElements';
import { theme } from '../../styles/theme';

// Styled components specific to the projects screen
const ProjectsContainer = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ArcadeHall = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.lg};
  width: 100%;
  margin: ${theme.spacing.lg} 0;
  perspective: 1000px;
`;

const ArcadeMachine = styled.div`
  width: 280px;
  height: 400px;
  background-color: ${theme.colors.tertiary};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(5deg);
  transition: ${theme.transitions.default};
  box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: rotateY(0deg) translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%);
    border-radius: ${theme.borderRadius.medium};
    pointer-events: none;
  }
`;

const GameScreen = styled.div`
  flex: 1;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.small};
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${theme.colors.scanline} 50%,
      transparent 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.3;
  }
`;

const GameScreenshot = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  border-radius: ${theme.borderRadius.small};
`;

const GameTitle = styled.h3`
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
`;

const GameDescription = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${theme.spacing.md};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const TechTag = styled.span`
  font-size: 0.7rem;
  color: ${theme.colors.text};
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.small};
`;

const InsertCoinText = styled(BlinkingText)`
  font-size: 0.8rem;
  margin-bottom: ${theme.spacing.sm};
`;

const HighScoresContainer = styled.div`
  margin-top: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.tertiary};
  width: 100%;
`;

const HighScoresTitle = styled.h3`
  font-family: ${theme.fonts.pixel};
  font-size: 1.2rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`;

const ScoresList = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${theme.spacing.sm} ${theme.spacing.md};
`;

const ScoreRank = styled.div`
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  color: ${theme.colors.neon};
`;

const ScoreName = styled.div`
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  color: ${theme.colors.text};
`;

const ScoreValue = styled.div`
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  color: ${theme.colors.primary};
  text-align: right;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: ${theme.spacing.xl};
`;

interface ProjectsScreenProps {
  onNavigate: (screen: string) => void;
}

const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const arcadeHallRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  // Sound effects
  const coinSound = new Howl({
    src: ['/sounds/coin.mp3'],
    volume: 0.5,
  });
  
  const handleInsertCoin = (projectId: string) => {
    coinSound.play();
    setSelectedProject(projectId);
    
    // Open project in new tab
    const project = projects.find(p => p.id === projectId);
    if (project && project.link) {
      window.open(project.link, '_blank');
    }
  };
  
  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Arcade machines animation
    gsap.fromTo(
      arcadeHallRef.current?.children,
      { 
        y: 100, 
        opacity: 0,
        rotationY: 45
      },
      { 
        y: 0, 
        opacity: 1, 
        rotationY: 5,
        duration: 1, 
        stagger: 0.2, 
        ease: 'power3.out',
        delay: 0.5
      }
    );
    
    // Cleanup
    return () => {
      coinSound.stop();
    };
  }, []);
  
  const projects = [
    {
      id: 'enrollment',
      title: 'PERPETUAL HELP ENROLLMENT SYSTEM',
      description: 'Comprehensive enrollment system',
      image: '/images/project1.png',
      tech: ['Python', 'Flask', 'SQLite', 'HTML/CSS/JS'],
      link: 'https://github.com/JaePyJs/perpetual-help-enrollment-system',
    },
    {
      id: 'reddit',
      title: 'REDDIT2DISCORD MEMES',
      description: 'Automated meme sharing bot',
      image: '/images/project2.png',
      tech: ['Python', 'discord.py', 'praw'],
      link: 'https://github.com/JaePyJs/reddit2discord-memes',
    },
    {
      id: 'recipe',
      title: 'MIX AND MUNCH',
      description: 'Filipino Recipe Generator',
      image: '/images/project3.png',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      link: 'https://github.com/JaePyJs/mix-and-munch',
    },
  ];
  
  const highScores = [
    { rank: '1ST', name: 'ENROLLMENT SYSTEM', score: '10,000' },
    { rank: '2ND', name: 'REDDIT2DISCORD', score: '8,500' },
    { rank: '3RD', name: 'MIX AND MUNCH', score: '7,200' },
    { rank: '4TH', name: 'PORTFOLIO', score: '6,800' },
    { rank: '5TH', name: 'SNAKE GAME', score: '5,500' },
  ];
  
  return (
    <ProjectsContainer ref={containerRef}>
      <ArcadeCabinet>
        <ArcadeScreen>
          <ArcadeTitle>LEVEL 3: PROJECTS</ArcadeTitle>
          
          <ArcadeHall ref={arcadeHallRef}>
            {projects.map((project) => (
              <ArcadeMachine key={project.id}>
                <GameScreen>
                  <GameScreenshot image={project.image} />
                </GameScreen>
                
                <GameTitle>{project.title}</GameTitle>
                <GameDescription>{project.description}</GameDescription>
                
                <TechStack>
                  {project.tech.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechStack>
                
                <InsertCoinText>INSERT COIN TO PLAY</InsertCoinText>
                <CoinSlot />
                
                <ArcadeButton 
                  onClick={() => handleInsertCoin(project.id)}
                  style={{ fontSize: '0.8rem' }}
                >
                  PLAY GAME
                </ArcadeButton>
              </ArcadeMachine>
            ))}
          </ArcadeHall>
          
          <HighScoresContainer>
            <HighScoresTitle>HIGH SCORES</HighScoresTitle>
            
            <ScoresList>
              {highScores.map((score, index) => (
                <React.Fragment key={index}>
                  <ScoreRank>{score.rank}</ScoreRank>
                  <ScoreName>{score.name}</ScoreName>
                  <ScoreValue>{score.score}</ScoreValue>
                </React.Fragment>
              ))}
            </ScoresList>
          </HighScoresContainer>
          
          <NavigationButtons>
            <ArcadeButton onClick={() => onNavigate('skills')}>
              PREVIOUS LEVEL
            </ArcadeButton>
            <ArcadeButton onClick={() => onNavigate('contact')}>
              NEXT LEVEL
            </ArcadeButton>
          </NavigationButtons>
        </ArcadeScreen>
      </ArcadeCabinet>
    </ProjectsContainer>
  );
};

export default ProjectsScreen;
