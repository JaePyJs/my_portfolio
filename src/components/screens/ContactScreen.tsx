import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import { 
  ArcadeScreen, 
  ArcadeCabinet, 
  ArcadeTitle, 
  ArcadeButton,
  BlinkingText
} from '../arcade/ArcadeElements';
import { theme } from '../../styles/theme';

// Animations
const countdown = keyframes`
  0% { content: "10"; }
  10% { content: "9"; }
  20% { content: "8"; }
  30% { content: "7"; }
  40% { content: "6"; }
  50% { content: "5"; }
  60% { content: "4"; }
  70% { content: "3"; }
  80% { content: "2"; }
  90% { content: "1"; }
  100% { content: "0"; }
`;

// Styled components specific to the contact screen
const ContactContainer = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GameOverTitle = styled.h2`
  font-family: ${theme.fonts.pixel};
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 0 0 10px ${theme.colors.primary};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const HighScoreText = styled.h3`
  font-family: ${theme.fonts.pixel};
  font-size: 1.5rem;
  color: ${theme.colors.neon};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 500px;
  margin: ${theme.spacing.lg} auto;
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const FormLabel = styled.label`
  display: block;
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid ${theme.colors.tertiary};
  border-radius: ${theme.borderRadius.medium};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  transition: ${theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(246, 114, 128, 0.3);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid ${theme.colors.tertiary};
  border-radius: ${theme.borderRadius.medium};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.pixel};
  font-size: 0.9rem;
  min-height: 150px;
  resize: vertical;
  transition: ${theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(246, 114, 128, 0.3);
  }
`;

const SubmitButton = styled(ArcadeButton)`
  width: 100%;
  margin-top: ${theme.spacing.md};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

const SocialLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SocialIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
`;

const SocialName = styled.span`
  font-family: ${theme.fonts.pixel};
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
`;

const ContinueCounter = styled.div`
  position: relative;
  margin-top: ${theme.spacing.xl};
  font-family: ${theme.fonts.pixel};
  font-size: 1.2rem;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  
  &::after {
    content: "10";
    margin-left: ${theme.spacing.sm};
    animation: ${countdown} 10s steps(1) infinite;
  }
`;

const SuccessMessage = styled.div`
  background-color: rgba(39, 174, 96, 0.2);
  border: 2px solid rgba(39, 174, 96, 0.5);
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  text-align: center;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: ${theme.spacing.xl};
`;

interface ContactScreenProps {
  onNavigate: (screen: string) => void;
}

const ContactScreen: React.FC<ContactScreenProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Sound effects
  const typeSound = new Howl({
    src: ['/sounds/type.mp3'],
    volume: 0.2,
  });
  
  const submitSound = new Howl({
    src: ['/sounds/success.mp3'],
    volume: 0.5,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    typeSound.play();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      submitSound.play();
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        message: '',
      });
    }, 1500);
  };
  
  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Form animation
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        delay: 0.5
      }
    );
    
    // Cleanup
    return () => {
      typeSound.stop();
      submitSound.stop();
    };
  }, []);
  
  const socialLinks = [
    {
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/JaePyJs',
    },
    {
      name: 'Email',
      icon: '📧',
      url: 'mailto:jmbarron0@gmail.com',
    },
    {
      name: 'Discord',
      icon: '💬',
      url: 'https://discordapp.com/users/898905034107019285',
    },
  ];
  
  return (
    <ContactContainer ref={containerRef}>
      <ArcadeCabinet>
        <ArcadeScreen>
          <GameOverTitle>GAME OVER</GameOverTitle>
          <HighScoreText>NEW HIGH SCORE!</HighScoreText>
          
          {!isSubmitted ? (
            <ContactForm ref={formRef} onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="name">ENTER YOUR NAME:</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="email">ENTER YOUR EMAIL:</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="message">YOUR MESSAGE:</FormLabel>
                <FormTextarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'SAVING...' : 'SAVE SCORE'}
              </SubmitButton>
            </ContactForm>
          ) : (
            <SuccessMessage>
              <h3>SCORE SAVED SUCCESSFULLY!</h3>
              <p>Thank you for your message. I'll get back to you soon.</p>
            </SuccessMessage>
          )}
          
          <SocialLinks>
            {socialLinks.map((link, index) => (
              <SocialLink 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SocialIcon>{link.icon}</SocialIcon>
                <SocialName>{link.name}</SocialName>
              </SocialLink>
            ))}
          </SocialLinks>
          
          <ContinueCounter>CONTINUE?</ContinueCounter>
          
          <NavigationButtons>
            <ArcadeButton onClick={() => onNavigate('projects')}>
              PREVIOUS LEVEL
            </ArcadeButton>
            <ArcadeButton onClick={() => onNavigate('levels')}>
              LEVEL SELECT
            </ArcadeButton>
          </NavigationButtons>
        </ArcadeScreen>
      </ArcadeCabinet>
    </ContactContainer>
  );
};

export default ContactScreen;
