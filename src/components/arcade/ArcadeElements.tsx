import styled, { css, keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

// Keyframes
const scanline = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const flicker = keyframes`
  0% {
    opacity: 1;
  }
  5% {
    opacity: 0.8;
  }
  10% {
    opacity: 1;
  }
  15% {
    opacity: 0.9;
  }
  20% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  60% {
    opacity: 0.7;
  }
  65% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const blink = keyframes`
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 5px ${theme.colors.neon}, 0 0 10px ${theme.colors.neon};
  }
  50% {
    box-shadow: 0 0 20px ${theme.colors.neon}, 0 0 30px ${theme.colors.neon};
  }
  100% {
    box-shadow: 0 0 5px ${theme.colors.neon}, 0 0 10px ${theme.colors.neon};
  }
`;

// Mixins
const pixelBorder = css`
  border-style: solid;
  border-width: 4px;
  border-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4"><path d="M0 0h1v1H0zm1 1h1v1H1zm1 1h1v1H2zm1-1h1v1H3z" fill="white" /></svg>');
  border-image-slice: 2;
  border-image-repeat: stretch;
  image-rendering: pixelated;
`;

const crtEffect = css`
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
    background-size: 100% ${theme.arcade.scanlineSize};
    pointer-events: none;
    z-index: 2;
    opacity: 0.3;
    animation: ${scanline} 10s linear infinite;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px 2px ${theme.colors.crtGlow} inset;
    border-radius: ${theme.arcade.crtCurvature};
    pointer-events: none;
    z-index: 3;
  }
`;

// Styled Components
export const ArcadeScreen = styled.div`
  ${crtEffect}
  background-color: ${theme.colors.background};
  border-radius: ${theme.arcade.crtCurvature};
  padding: ${theme.spacing.lg};
  width: 100%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${flicker} 5s infinite;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
    min-height: 50vh;
  }
`;

export const ArcadeCabinet = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  background: linear-gradient(135deg, #444, #222);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  
  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    background: ${theme.colors.background};
    border-radius: 10px;
    z-index: 0;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
    
    &::before {
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
    }
  }
`;

export const ArcadeTitle = styled.h1`
  font-family: ${theme.fonts.pixel};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.primary};
  text-shadow: 0 0 10px ${theme.colors.primary};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.8rem;
    margin-bottom: ${theme.spacing.md};
  }
`;

export const BlinkingText = styled.div`
  font-family: ${theme.fonts.pixel};
  font-size: 1.2rem;
  text-align: center;
  margin: ${theme.spacing.md} 0;
  animation: ${blink} 1s infinite;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const ArcadeButton = styled.button`
  font-family: ${theme.fonts.pixel};
  font-size: 1rem;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.gradients.button};
  color: ${theme.colors.text};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.button};
  transition: ${theme.transitions.default};
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: ${theme.gradients.buttonHover};
    box-shadow: ${theme.shadows.buttonHover};
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(30deg);
    transition: ${theme.transitions.default};
    opacity: 0;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 0.8rem;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

export const StartButton = styled(ArcadeButton)`
  animation: ${pulse} 2s infinite;
  margin-top: ${theme.spacing.lg};
  font-size: 1.2rem;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }
`;

export const PixelArtContainer = styled.div`
  image-rendering: pixelated;
  image-rendering: crisp-edges;
`;

export const LoadingBar = styled.div`
  width: 100%;
  max-width: 400px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid ${theme.colors.text};
  margin: ${theme.spacing.md} 0;
  position: relative;
  overflow: hidden;
  ${pixelBorder}
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--progress, 0%);
    background: ${theme.gradients.main};
    transition: width 0.3s ease;
  }
`;

export const CoinSlot = styled.div`
  width: 60px;
  height: 30px;
  background-color: #333;
  border-radius: 5px;
  margin: ${theme.spacing.md} auto;
  position: relative;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 3px;
    background-color: #222;
    border-radius: 1px;
  }
`;

export const FloatingElement = styled.div`
  animation: ${float} 3s ease-in-out infinite;
`;

export default {
  ArcadeScreen,
  ArcadeCabinet,
  ArcadeTitle,
  BlinkingText,
  ArcadeButton,
  StartButton,
  PixelArtContainer,
  LoadingBar,
  CoinSlot,
  FloatingElement,
};
