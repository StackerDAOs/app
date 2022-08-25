import { extendTheme, theme as base } from '@chakra-ui/react';

// TODO: define tokens
const tokens = {
  colors: {
    brand: {
      'bg-default': '#0c1117',
      'fg-default': '#c9d1d9',
      'fg-muted': '#8b949e',
      'fg-accent': '#58a6ff',
      'btn-bg': '#21262d',
      'btn-hover-bg': '#30363d',
      'btn-active-bg': 'hsla(212, 12%, 18%, 1)',
      'btn-border': 'rgba(240, 246, 252, 0.1)',
      'btn-hover-border': 'rgba(240, 246, 252, 0.1)',
      'btn-active-border': 'rgba(240, 246, 252, 0.1)',
      'btn-primary-bg': '#5a44de',
      'btn-primary-hover-bg': '#624de0',
      'btn-primary-selected-bg': '#4026d9',
      'btn-primary-border': 'rgba(240, 246, 252, 0.1)',
      'btn-primary-hover-border': 'rgba(240, 246, 252, 0.1)',
      'btn-primary-active-border': 'rgba(240, 246, 252, 0.1)',
      'btn-inverted-bg': 'white',
      'btn-inverted-hover-bg': 'rgba(255, 255, 255, 0.9)',
      'btn-inverted-active-bg': 'white',
      'btn-inverted-border': 'rgba(240, 246, 252, 0.1)',
      'btn-inverted-hover-border': 'rgba(240, 246, 252, 0.1)',
    },
  },
};

// TODO: define semantic tokens

const semanticTokens = {
  colors: {
    'bg-default': {
      default: tokens.colors.brand['bg-default'],
      _dark: tokens.colors.brand['bg-default'],
    },
    'fg-default': {
      default: tokens.colors.brand['fg-default'],
      _dark: tokens.colors.brand['fg-default'],
    },
    'fg-muted': {
      default: tokens.colors.brand['fg-muted'],
      _dark: tokens.colors.brand['fg-muted'],
    },
    'fg-accent': {
      default: tokens.colors.brand['fg-accent'],
      _dark: tokens.colors.brand['fg-accent'],
    },
    'btn-bg': {
      default: tokens.colors.brand['btn-bg'],
      _dark: tokens.colors.brand['btn-bg'],
    },
    'btn-hover-bg': {
      default: tokens.colors.brand['btn-hover-bg'],
      _dark: tokens.colors.brand['btn-hover-bg'],
    },
    'btn-active-bg': {
      default: tokens.colors.brand['btn-active-bg'],
      _dark: tokens.colors.brand['btn-active-bg'],
    },
    'btn-border': {
      default: tokens.colors.brand['btn-border'],
      _dark: tokens.colors.brand['btn-border'],
    },
    'btn-hover-border': {
      default: tokens.colors.brand['btn-hover-border'],
      _dark: tokens.colors.brand['btn-hover-border'],
    },
    'btn-active-border': {
      default: tokens.colors.brand['btn-active-border'],
      _dark: tokens.colors.brand['btn-active-border'],
    },
    'btn-primary-bg': {
      default: tokens.colors.brand['btn-primary-bg'],
      _dark: tokens.colors.brand['btn-primary-bg'],
    },
    'btn-primary-hover-bg': {
      default: tokens.colors.brand['btn-primary-hover-bg'],
      _dark: tokens.colors.brand['btn-primary-hover-bg'],
    },
    'btn-primary-selected-bg': {
      default: tokens.colors.brand['btn-primary-selected-bg'],
      _dark: tokens.colors.brand['btn-primary-selected-bg'],
    },
    'btn-primary-border': {
      default: tokens.colors.brand['btn-primary-border'],
      _dark: tokens.colors.brand['btn-primary-border'],
    },
    'btn-primary-hover-border': {
      default: tokens.colors.brand['btn-primary-hover-border'],
      _dark: tokens.colors.brand['btn-primary-hover-border'],
    },
    'btn-primary-active-border': {
      default: tokens.colors.brand['btn-primary-active-border'],
      _dark: tokens.colors.brand['btn-primary-active-border'],
    },
    'btn-inverted-bg': {
      default: tokens.colors.brand['btn-inverted-bg'],
      _dark: tokens.colors.brand['btn-inverted-bg'],
    },
    'btn-inverted-hover-bg': {
      default: tokens.colors.brand['btn-inverted-hover-bg'],
      _dark: tokens.colors.brand['btn-inverted-hover-bg'],
    },
    'btn-inverted-active-bg': {
      default: tokens.colors.brand['btn-inverted-active-bg'],
      _dark: tokens.colors.brand['btn-inverted-active-bg'],
    },
    'btn-inverted-border': {
      default: tokens.colors.brand['btn-inverted-border'],
      _dark: tokens.colors.brand['btn-inverted-border'],
    },
    'btn-inverted-hover-border': {
      default: tokens.colors.brand['btn-inverted-hover-border'],
      _dark: tokens.colors.brand['btn-inverted-hover-border'],
    },
  },
};

// TODO: define fonts
const fonts = {
  heading: `Poppins, system-ui, ${base.fonts?.heading}`,
  body: `Poppins, system-ui, ${base.fonts?.body}`,
};

// TODO: define global styles

const styles = {
  global: {
    body: {
      background: 'bg-default',
    },
  },
};

// TODO: define components

const components = {
  Button: {
    baseStyle: {
      color: 'fg-default',
      fontWeight: 'regular',
      borderRadius: 'md',
      _focus: {
        ring: '0px',
      },
    },
    variants: {
      solid: {
        bg: 'btn-bg',
        borderColor: 'btn-border',
        borderWidth: '1px',
        borderStyle: 'solid',
        _hover: {
          bg: 'btn-hover-bg',
          borderColor: 'btn-hover-border',
        },
        _active: {
          bg: 'btn-active-bg',
          borderColor: 'btn-active-border',
        },
      },
      primary: {
        bg: 'btn-primary-bg',
        borderColor: 'btn-primary-border',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: 'white',
        _hover: {
          bg: 'btn-primary-hover-bg',
          borderColor: 'btn-primary-hover-border',
        },
        _active: {
          bg: 'btn-primary-selected-bg',
          borderColor: 'btn-primary-active-border',
        },
      },
      link: {
        color: 'fg-muted',
        fontWeight: '500',
        _hover: {
          color: 'fg-accent',
          textDecoration: 'none',
        },
        _active: {
          color: 'fg-accent',
          textDecoration: 'none',
        },
      },
      inverted: {
        bg: 'btn-inverted-bg',
        borderColor: 'btn-inverted-border',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: 'black',
        _hover: {
          bg: 'btn-inverted-hover-bg',
          borderColor: 'btn-inverted-hover-border',
        },
        _active: {
          bg: 'btn-inverted-active-bg',
          borderColor: 'btn-inverted-active-border',
        },
      },
    },
    sizes: {
      md: {
        h: '8',
        p: '5px 16px',
        fontSize: '14px',
      },
    },
    defaultProps: {
      size: 'md',
    },
  },
};

export const theme = extendTheme({
  components,
  fonts,
  styles,
  semanticTokens,
});
