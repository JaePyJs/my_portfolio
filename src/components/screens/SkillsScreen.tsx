import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import { 
  ArcadeScreen, 
  ArcadeCabinet, 
  ArcadeTitle, 
  ArcadeButton,
  FloatingElement
} from '../arcade/ArcadeElements';
import { theme } from '../../styles/theme';

// Styled components specific to the skills screen
const SkillsContainer = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  width: 100%;
  margin: ${theme.spacing.lg} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryTitle = styled.h3`
  font-family: ${theme.fonts.pixel};
  font-size: 1.2rem;
  color: ${theme.colors.primary};
  margin: ${theme.spacing.lg} 0 ${theme.spacing.md};
  grid-column: 1 / -1;
  position: relative;
  padding-left: ${theme.spacing.lg};
  
  &::before {
    content: ">";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.neon};
  }
`;

const SkillItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.colors.tertiary};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: ${theme.transitions.default};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.colors.primary};
    box-shadow: 0 5px 15px rgba(246, 114, 128, 0.2);
  }
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${theme.spacing.sm};
`;

const SkillName = styled.h4`
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  text-align: center;
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.small};
  margin-top: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.value}%;
    background: ${theme.gradients.main};
    border-radius: ${theme.borderRadius.small};
  }
`;

const SpecialItemsContainer = styled.div`
  margin-top: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  background-color: rgba(246, 114, 128, 0.1);
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.primary};
  width: 100%;
`;

const SpecialItemsTitle = styled.h3`
  font-family: ${theme.fonts.pixel};
  font-size: 1.2rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`;

const SpecialItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SpecialItem = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SpecialItemIcon = styled.div`
  font-size: 2rem;
  margin-right: ${theme.spacing.md};
  color: ${theme.colors.neon};
`;

const SpecialItemInfo = styled.div`
  flex: 1;
`;

const SpecialItemName = styled.h4`
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const SpecialItemDescription = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: ${theme.spacing.xl};
`;

interface SkillsScreenProps {
  onNavigate: (screen: string) => void;
}

const SkillsScreen: React.FC<SkillsScreenProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  // Sound effects
  const powerupSound = new Howl({
    src: ['/sounds/powerup.mp3'],
    volume: 0.5,
  });
  
  const handleSkillClick = () => {
    powerupSound.play();
  };
  
  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Skills animation
    gsap.fromTo(
      skillsRef.current?.querySelectorAll(SkillItem),
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power3.out',
        delay: 0.5
      }
    );
    
    // Cleanup
    return () => {
      powerupSound.stop();
    };
  }, []);
  
  const skillCategories = [
    {
      name: 'LANGUAGES',
      skills: [
        { name: 'Python', icon: '🐍', level: 90 },
        { name: 'JavaScript', icon: '🟨', level: 85 },
        { name: 'C', icon: '⚡', level: 75 },
        { name: 'C++', icon: '🚀', level: 70 },
        { name: 'HTML/CSS', icon: '🌐', level: 85 },
        { name: 'SQL', icon: '💾', level: 80 },
      ],
    },
    {
      name: 'FRAMEWORKS',
      skills: [
        { name: 'React', icon: '⚛️', level: 80 },
        { name: 'Node.js', icon: '🟢', level: 75 },
        { name: 'Express', icon: '🚂', level: 70 },
        { name: 'Flask', icon: '🧪', level: 85 },
      ],
    },
    {
      name: 'TOOLS',
      skills: [
        { name: 'Git', icon: '📂', level: 85 },
        { name: 'MongoDB', icon: '🍃', level: 75 },
        { name: 'SQLite', icon: '🗄️', level: 80 },
      ],
    },
  ];
  
  const specialItems = [
    {
      name: 'DISCORD.PY MASTERY',
      icon: '🤖',
      description: 'Create powerful Discord bots with Python',
    },
    {
      name: 'PRAW EXPERTISE',
      icon: '🔍',
      description: 'Reddit API integration specialist',
    },
    {
      name: 'BEATBOX CODING',
      icon: '🎵',
      description: 'Enhance coding focus with rhythm',
    },
    {
      name: 'GSAP ANIMATIONS',
      icon: '✨',
      description: 'Create smooth web animations',
    },
  ];
  
  return (
    <SkillsContainer ref={containerRef}>
      <ArcadeCabinet>
        <ArcadeScreen>
          <ArcadeTitle>LEVEL 2: SKILLS</ArcadeTitle>
          
          <InventoryGrid ref={skillsRef}>
            {skillCategories.map((category) => (
              <React.Fragment key={category.name}>
                <CategoryTitle>{category.name}</CategoryTitle>
                
                {category.skills.map((skill, index) => (
                  <SkillItem key={index} onClick={handleSkillClick}>
                    <FloatingElement>
                      <SkillIcon>{skill.icon}</SkillIcon>
                    </FloatingElement>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel value={skill.level} />
                  </SkillItem>
                ))}
              </React.Fragment>
            ))}
          </InventoryGrid>
          
          <SpecialItemsContainer>
            <SpecialItemsTitle>SPECIAL ITEMS</SpecialItemsTitle>
            
            <SpecialItemsGrid>
              {specialItems.map((item, index) => (
                <SpecialItem key={index}>
                  <SpecialItemIcon>{item.icon}</SpecialItemIcon>
                  <SpecialItemInfo>
                    <SpecialItemName>{item.name}</SpecialItemName>
                    <SpecialItemDescription>{item.description}</SpecialItemDescription>
                  </SpecialItemInfo>
                </SpecialItem>
              ))}
            </SpecialItemsGrid>
          </SpecialItemsContainer>
          
          <NavigationButtons>
            <ArcadeButton onClick={() => onNavigate('about')}>
              PREVIOUS LEVEL
            </ArcadeButton>
            <ArcadeButton onClick={() => onNavigate('projects')}>
              NEXT LEVEL
            </ArcadeButton>
          </NavigationButtons>
        </ArcadeScreen>
      </ArcadeCabinet>
    </SkillsContainer>
  );
};

export default SkillsScreen;
