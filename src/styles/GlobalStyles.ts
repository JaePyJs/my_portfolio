import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@300;400;500;700;900&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    overflow-x: hidden;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    position: relative;
  }

  /* CRT Effect */
  body::before {
    content: "";
    position: fixed;
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
    z-index: 9999;
    opacity: 0.3;
  }

  body::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px 2px ${theme.colors.crtGlow} inset;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.pixel};
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2rem;
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 1.25rem;
    }
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${theme.transitions.default};
  }

  button {
    font-family: ${theme.fonts.pixel};
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.tertiary};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary};
  }

  /* Utility Classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-gradient {
    background: ${theme.gradients.main};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .pixel-corners {
    clip-path: polygon(
      0px 4px,
      4px 0px,
      calc(100% - 4px) 0px,
      100% 4px,
      100% calc(100% - 4px),
      calc(100% - 4px) 100%,
      4px 100%,
      0px calc(100% - 4px)
    );
  }

  /* Animation Classes */
  .blink {
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  .glitch {
    position: relative;
    
    &::before, &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    &::before {
      left: 2px;
      text-shadow: -2px 0 ${theme.colors.neon};
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim 5s infinite linear alternate-reverse;
    }
    
    &::after {
      left: -2px;
      text-shadow: -2px 0 ${theme.colors.secondary};
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim2 5s infinite linear alternate-reverse;
    }
  }

  @keyframes glitch-anim {
    0% { clip: rect(31px, 9999px, 94px, 0); }
    10% { clip: rect(112px, 9999px, 76px, 0); }
    20% { clip: rect(85px, 9999px, 77px, 0); }
    30% { clip: rect(27px, 9999px, 97px, 0); }
    40% { clip: rect(64px, 9999px, 98px, 0); }
    50% { clip: rect(61px, 9999px, 85px, 0); }
    60% { clip: rect(99px, 9999px, 114px, 0); }
    70% { clip: rect(34px, 9999px, 115px, 0); }
    80% { clip: rect(98px, 9999px, 129px, 0); }
    90% { clip: rect(43px, 9999px, 96px, 0); }
    100% { clip: rect(82px, 9999px, 64px, 0); }
  }

  @keyframes glitch-anim2 {
    0% { clip: rect(125px, 9999px, 162px, 0); }
    10% { clip: rect(120px, 9999px, 147px, 0); }
    20% { clip: rect(113px, 9999px, 171px, 0); }
    30% { clip: rect(123px, 9999px, 153px, 0); }
    40% { clip: rect(142px, 9999px, 158px, 0); }
    50% { clip: rect(131px, 9999px, 162px, 0); }
    60% { clip: rect(111px, 9999px, 146px, 0); }
    70% { clip: rect(133px, 9999px, 163px, 0); }
    80% { clip: rect(121px, 9999px, 154px, 0); }
    90% { clip: rect(146px, 9999px, 165px, 0); }
    100% { clip: rect(125px, 9999px, 156px, 0); }
  }
`;

export default GlobalStyles;
