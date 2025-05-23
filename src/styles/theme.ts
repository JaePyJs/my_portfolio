export const theme = {
  colors: {
    primary: '#F67280',
    secondary: '#C06C84',
    tertiary: '#6C5B7B',
    quaternary: '#355C7D',
    background: '#22223B',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    neon: '#4ECDC4',
    neonGlow: '0 0 10px #4ECDC4, 0 0 20px #4ECDC4, 0 0 30px #4ECDC4',
    scanline: 'rgba(0, 0, 0, 0.2)',
    crtGlow: 'rgba(111, 255, 233, 0.2)',
  },
  fonts: {
    pixel: '"Press Start 2P", cursive',
    body: '"Inter", sans-serif',
  },
  gradients: {
    main: 'linear-gradient(135deg, #F67280 0%, #C06C84 33%, #6C5B7B 66%, #355C7D 100%)',
    button: 'linear-gradient(90deg, #F67280, #C06C84)',
    buttonHover: 'linear-gradient(90deg, #C06C84, #F67280)',
  },
  shadows: {
    button: '0 4px 10px rgba(246, 114, 128, 0.3)',
    buttonHover: '0 6px 15px rgba(246, 114, 128, 0.4)',
    card: '0 10px 20px rgba(0, 0, 0, 0.1)',
    cardHover: '0 15px 30px rgba(0, 0, 0, 0.2)',
  },
  transitions: {
    default: 'all 0.3s ease',
    slow: 'all 0.5s ease',
    fast: 'all 0.2s ease',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  arcade: {
    scanlineSize: '4px',
    crtCurvature: '10px',
    pixelSize: '2px',
    glitchIntensity: '0.05',
  },
};

export type Theme = typeof theme;
