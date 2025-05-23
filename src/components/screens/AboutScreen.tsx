import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { 
  ArcadeScreen, 
  ArcadeCabinet, 
  ArcadeTitle, 
  ArcadeButton,
  FloatingElement
} from '../arcade/ArcadeElements';
import { theme } from '../../styles/theme';

// Styled components specific to the about screen
const AboutContainer = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CharacterSheet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const CharacterPortrait = styled.div`
  width: 200px;
  height: 200px;
  background-image: url('/images/pixel-character.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
  margin-bottom: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    margin-right: ${theme.spacing.lg};
    margin-bottom: 0;
  }
`;

const CharacterInfo = styled.div`
  flex: 1;
`;

const CharacterName = styled.h2`
  font-family: ${theme.fonts.pixel};
  font-size: 1.8rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const CharacterClass = styled.h3`
  font-family: ${theme.fonts.pixel};
  font-size: 1.2rem;
  color: ${theme.colors.secondary};
  margin-bottom: ${theme.spacing.lg};
`;

const StatsContainer = styled.div`
  width: 100%;
  margin-bottom: ${theme.spacing.lg};
`;

const StatBar = styled.div<{ value: number }>`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  color: ${theme.colors.text};
  width: 120px;
`;

const StatProgress = styled.div`
  flex: 1;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid ${theme.colors.text};
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.value}%;
    background: ${theme.gradients.main};
  }
  
  &::after {
    content: "${props => props.value}/100";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ${theme.fonts.pixel};
    font-size: 0.7rem;
    color: ${theme.colors.text};
  }
`;

const BackstoryContainer = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.tertiary};
`;

const BackstoryTitle = styled.h3`
  font-family: ${theme.fonts.pixel};
  font-size: 1.2rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const BackstoryText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const SpecialAbility = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background-color: rgba(246, 114, 128, 0.1);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.primary};
  display: flex;
  align-items: center;
`;

const AbilityIcon = styled.div`
  font-size: 2rem;
  margin-right: ${theme.spacing.md};
`;

const AbilityInfo = styled.div`
  flex: 1;
`;

const AbilityName = styled.h4`
  font-family: ${theme.fonts.pixel};
  font-size: 1rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const AbilityDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: ${theme.spacing.xl};
`;

interface AboutScreenProps {
  onNavigate: (screen: string) => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Stats animation
    gsap.fromTo(
      statsRef.current?.children,
      { width: '0%', opacity: 0 },
      { 
        width: '100%', 
        opacity: 1, 
        duration: 1.5, 
        stagger: 0.2, 
        ease: 'power3.out',
        delay: 0.5
      }
    );
  }, []);
  
  const stats = [
    { name: 'CODING', value: 85 },
    { name: 'PROBLEM SOLVING', value: 90 },
    { name: 'CREATIVITY', value: 75 },
    { name: 'TEAMWORK', value: 80 },
    { name: 'LEARNING', value: 95 },
  ];
  
  return (
    <AboutContainer ref={containerRef}>
      <ArcadeCabinet>
        <ArcadeScreen>
          <ArcadeTitle>LEVEL 1: ABOUT ME</ArcadeTitle>
          
          <CharacterSheet>
            <FloatingElement>
              <CharacterPortrait />
            </FloatingElement>
            
            <CharacterInfo>
              <CharacterName>JaePyJs</CharacterName>
              <CharacterClass>STUDENT DEVELOPER</CharacterClass>
              
              <StatsContainer ref={statsRef}>
                {stats.map((stat, index) => (
                  <StatBar key={index} value={stat.value}>
                    <StatLabel>{stat.name}</StatLabel>
                    <StatProgress value={stat.value} />
                  </StatBar>
                ))}
              </StatsContainer>
              
              <BackstoryContainer>
                <BackstoryTitle>BACKSTORY</BackstoryTitle>
                <BackstoryText>
                  A Computer Science student passionate about AI, web development, and logic programming.
                  Started coding journey with Python and gradually expanded skills to include various
                  technologies. Currently focused on creating interactive web experiences and exploring
                  the depths of artificial intelligence.
                </BackstoryText>
              </BackstoryContainer>
              
              <SpecialAbility>
                <AbilityIcon>🎵</AbilityIcon>
                <AbilityInfo>
                  <AbilityName>SPECIAL ABILITY: BEATBOXING</AbilityName>
                  <AbilityDescription>
                    Can create rhythm and beats while coding, enhancing focus and creativity.
                  </AbilityDescription>
                </AbilityInfo>
              </SpecialAbility>
            </CharacterInfo>
          </CharacterSheet>
          
          <NavigationButtons>
            <ArcadeButton onClick={() => onNavigate('levels')}>
              BACK TO LEVELS
            </ArcadeButton>
            <ArcadeButton onClick={() => onNavigate('skills')}>
              NEXT LEVEL
            </ArcadeButton>
          </NavigationButtons>
        </ArcadeScreen>
      </ArcadeCabinet>
    </AboutContainer>
  );
};

export default AboutScreen;
