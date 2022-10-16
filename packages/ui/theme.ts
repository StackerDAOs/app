import { extendTheme, theme as base } from '@chakra-ui/react';

// TODO: define tokens
const tokens = {
  colors: {
    dark: {
      900: '#111111',
      800: '#121416',
      700: '#171717',
      600: '#1c1d21',
      500: '#1c1f21',
    },
    light: {
      900: '#f9fafb',
      800: '#f4f6f8',
      700: '#edf1fa',
      600: '#eaedf5',
      500: '#e5e9f2',
    },
    brand: {
      'card-bg': '#121416',
      'card-border': '#1c1f21',
      'bg-primary': '#5a44de',
      'bg-default': '#111111',
      'fg-default': '#121416',
      'fg-muted': '#8b949e',
      'fg-accent': '#58a6ff',
      'fg-overlay-default': '#1c1f21',
      'btn-bg': '#21262d',
      'btn-hover-bg': '#30363d',
      'btn-active-bg': 'hsla(212, 12%, 18%, 1)',
      'btn-border': '#1c1f21',
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
      'text-default': '#f9fafb',
      'text-muted': '#8b949e',
    },
    primary: {
      100: '#624AF2',
      200: '#624AF2',
      300: '#624AF2',
      400: '#624AF2',
      500: '#624AF2',
      600: '#624AF2',
      700: '#624AF2',
      800: '#624AF2',
      900: '#624AF2',
    },
    'primary-accent': {
      100: '#7301fa',
      200: '#7301fa',
      300: '#7301fa',
      400: '#7301fa',
      500: '#7301fa',
      600: '#7301fa',
      700: '#7301fa',
      800: '#7301fa',
      900: '#7301fa',
    },
    secondary: {
      100: '#eb00ff',
      200: '#eb00ff',
      300: '#eb00ff',
      400: '#eb00ff',
      500: '#eb00ff',
      600: '#eb00ff',
      700: '#eb00ff',
      800: '#eb00ff',
      900: '#eb00ff',
    },
  },
};

// TODO: define semantic tokens

const semanticTokens = {
  colors: {
    'card-bg': {
      default: tokens.colors.brand['card-bg'],
      _dark: tokens.colors.brand['card-bg'],
    },
    'bg-primary': {
      default: tokens.colors.brand['bg-primary'],
      _dark: tokens.colors.brand['bg-primary'],
    },
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
    'fg-overlay-default': {
      default: tokens.colors.brand['fg-overlay-default'],
      _dark: tokens.colors.brand['fg-overlay-default'],
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
    'text-default': {
      default: tokens.colors.brand['text-default'],
      _dark: tokens.colors.brand['text-default'],
    },
    'text-muted': {
      default: tokens.colors.brand['text-muted'],
      _dark: tokens.colors.brand['text-muted'],
    },
    'dark.900': {
      default: tokens.colors.dark['900'],
      _dark: tokens.colors.dark['900'],
    },
    'dark.800': {
      default: tokens.colors.dark['800'],
      _dark: tokens.colors.dark['800'],
    },
    'dark.700': {
      default: tokens.colors.dark['700'],
      _dark: tokens.colors.dark['700'],
    },
    'dark.600': {
      default: tokens.colors.dark['600'],
      _dark: tokens.colors.dark['600'],
    },
    'dark.500': {
      default: tokens.colors.dark['500'],
      _dark: tokens.colors.dark['500'],
    },
    'light.900': {
      default: tokens.colors.light['900'],
      _dark: tokens.colors.light['900'],
    },
    'light.800': {
      default: tokens.colors.light['800'],
      _dark: tokens.colors.light['800'],
    },
    'light.700': {
      default: tokens.colors.light['700'],
      _dark: tokens.colors.light['700'],
    },
    'light.600': {
      default: tokens.colors.light['600'],
      _dark: tokens.colors.light['600'],
    },
    'light.500': {
      default: tokens.colors.light['500'],
      _dark: tokens.colors.light['500'],
    },
    'primary.900': {
      default: tokens.colors.primary['900'],
      _dark: tokens.colors.primary['900'],
    },
    'primary.800': {
      default: tokens.colors.primary['800'],
      _dark: tokens.colors.primary['800'],
    },
    'primary.700': {
      default: tokens.colors.primary['700'],
      _dark: tokens.colors.primary['700'],
    },
    'primary.600': {
      default: tokens.colors.primary['600'],
      _dark: tokens.colors.primary['600'],
    },
    'primary.500': {
      default: tokens.colors.primary['500'],
      _dark: tokens.colors.primary['500'],
    },
    'primary-accent.900': {
      default: tokens.colors['primary-accent']['900'],
      _dark: tokens.colors['primary-accent']['900'],
    },
    'primary-accent.800': {
      default: tokens.colors['primary-accent']['800'],
      _dark: tokens.colors['primary-accent']['800'],
    },
    'primary-accent.700': {
      default: tokens.colors['primary-accent']['700'],
      _dark: tokens.colors['primary-accent']['700'],
    },
    'primary-accent.600': {
      default: tokens.colors['primary-accent']['600'],
      _dark: tokens.colors['primary-accent']['600'],
    },
    'primary-accent.500': {
      default: tokens.colors['primary-accent']['500'],
      _dark: tokens.colors['primary-accent']['500'],
    },
    'secondary.900': {
      default: tokens.colors.secondary['900'],
      _dark: tokens.colors.secondary['900'],
    },
    'secondary.800': {
      default: tokens.colors.secondary['800'],
      _dark: tokens.colors.secondary['800'],
    },
    'secondary.700': {
      default: tokens.colors.secondary['700'],
      _dark: tokens.colors.secondary['700'],
    },
    'secondary.600': {
      default: tokens.colors.secondary['600'],
      _dark: tokens.colors.secondary['600'],
    },
    'secondary.500': {
      default: tokens.colors.secondary['500'],
      _dark: tokens.colors.secondary['500'],
    },
    'secondary.400': {
      default: tokens.colors.secondary['400'],
      _dark: tokens.colors.secondary['400'],
    },
    'secondary.300': {
      default: tokens.colors.secondary['300'],
      _dark: tokens.colors.secondary['300'],
    },
    'secondary.200': {
      default: tokens.colors.secondary['200'],
      _dark: tokens.colors.secondary['200'],
    },
    'secondary.100': {
      default: tokens.colors.secondary['100'],
      _dark: tokens.colors.secondary['100'],
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
      background: 'dark.900',
      color: 'text-default',
    },
  },
};

// TODO: define components

const components = {
  Accordion: {
    baseStyle: {
      root: {
        bg: 'transparent',
      },
      container: {
        bg: 'dark.700',
        borderWidth: '1px',
        borderColor: 'dark.500',
        borderRadius: 'lg',
      },
      button: {
        bg: 'inherit',
        _hover: {
          bg: 'transparent',
        },
        _focus: {
          boxShadow: 'none',
        },
      },
      panel: {
        bg: 'inherit',
      },
    },
  },
  Tag: {
    baseStyle: {
      container: {
        bg: 'light.900',
        borderWidth: '1px',
        borderColor: 'dark.500',
      },
    },
    variants: {
      default: {
        container: {
          bg: 'light.900',
          color: 'white',
        },
      },
      primary: {
        container: {
          bg: 'primary.900',
          color: 'white',
        },
      },
      dark: {
        container: {
          bg: 'dark.700',
          color: 'white',
        },
      },
      defaultProps: {
        variant: 'default',
      },
    },
  },
  Button: {
    baseStyle: {
      color: 'light.900',
      fontWeight: 'medium',
      borderRadius: '3xl',
      _focus: {
        ring: '0px',
      },
    },
    variants: {
      dark: {
        bg: 'dark.700',
        borderColor: 'dark.500',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: 'light.900',
        _hover: {
          bg: 'dark.600',
        },
        _active: {
          bg: 'dark.800',
        },
        _disabled: {
          bg: 'dark.500',
          _hover: {
            opacity: 0.4,
          },
        },
      },
      default: {
        bg: 'light.900',
        borderColor: 'dark.900',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: 'dark.900',
        _hover: {
          bg: 'light.500',
          _disabled: {
            bg: 'light.500',
          },
        },
        _active: {
          bg: 'light.500',
        },
        _disabled: {
          bg: 'light.500',
        },
      },
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
        _disabled: {
          bg: 'btn-primary-bg',
          _hover: {
            opacity: 0.4,
          },
        },
      },
      link: {
        color: 'light.900',
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
        bg: 'dark.900',
        borderColor: 'primary.900',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: 'primary.900',
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
    sizes: {},
    defaultProps: {
      size: 'md',
    },
  },
  FormLabel: {
    baseStyle: {
      color: 'fg-muted',
    },
  },
  Input: {
    baseStyle: {
      field: {
        color: 'white',
        fontWeight: 'regular',
        borderRadius: 'md',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'dark.500',
        autoComplete: 'off',
        py: '4px',
        px: '8px',
        _focus: {
          ring: '0px',
        },
      },
    },
    variants: {
      brand: {
        field: {
          bg: 'dark.800',
        },
      },
    },
    defaultProps: {
      variant: 'brand',
    },
  },
  Radio: {
    baseStyle: {
      boxShadow: 'none',
      control: {
        boxShadow: 'none',
        borderColor: 'dark.500',
        _checked: {
          boxShadow: 'none',
          bg: 'primary.900',
          borderColor: 'primary.900',
          color: 'dark.500',
          _hover: {
            boxShadow: 'none',
            bg: 'primary.900',
            borderColor: 'primary.900',
            color: 'dark.500',
          },
          _focus: {
            boxShadow: 'none',
            bg: 'primary.900',
            borderColor: 'primary.900',
            color: 'dark.500',
          },
        },
        _focus: {
          boxShadow: 'none',
          bg: 'dark.500',
          borderColor: 'primary.900',
          color: 'dark.500',
        },
        _hover: {
          boxShadow: 'none',
          bg: 'dark.500',
          borderColor: 'primary.900',
          color: 'dark.500',
        },
      },
    },
  },
  Tabs: {
    baseStyle: {
      tab: {
        my: '1',
        _focus: {
          boxShadow: 'none',
        },
      },
    },
    variants: {
      nav: {
        tab: {},
      },
      basic: {
        tab: {
          _active: {
            color: 'inherit',
            bg: 'transparent',
          },
          _selected: {
            borderBottom: '1px solid',
            borderColor: '#fff',
          },
        },
      },
    },
  },
  Textarea: {
    baseStyle: {
      resize: 'none',
      bg: 'dark.800',
      color: 'white',
      fontWeight: 'regular',
      borderRadius: 'md',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'dark.500',
      autoComplete: 'off',
      py: '4px',
      px: '8px',
      _focus: {
        ring: '0px',
      },
    },
    variants: {
      brand: {
        field: {
          bg: 'dark.800',
        },
      },
    },
    defaultProps: {
      variant: 'brand',
    },
  },
};

export const theme = extendTheme({
  components,
  fonts,
  styles,
  semanticTokens,
});
