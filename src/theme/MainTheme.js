const fontSizes = {
  s: '1.1rem',
  m: '1.6rem',
  l: '1.8rem',
  xl: '2rem',
  xxl: '2.4rem',
  xxxl: '4.5rem',
};

const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1400px)',
};

export const theme = {
  colors: {
    primary: '#48bb78',
    secondary: '#f56565',
    accept: '#48bb78',
    lightAccept: '#c6f6d5',
    discard: '#f56565',
    lightDiscard: '#fed7d7',
    activeLink: '#b2f5ea',
    text: '#4a5568',
    darkGray: '#4a5568',
    gray: '#718096',
    lightGray: '#edf2f7',
    white: '#ffffff',
    progress: {
      max: '#48bb78',
      mid: '#ed8936',
      low: '#f56565',
    },
  },
  shadows: {
    basic: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);',
    upper: '0 -3px 3px 0 rgba(0, 0, 0, 0.05)',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 600,
  },
  fontSizes,
  breakpoints,
};
