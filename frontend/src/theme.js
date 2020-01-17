/** @jsx jsx */

import {Global} from '@emotion/core';
import React, {memo} from 'react';
import {jsx, useThemeUI, ThemeProvider, Styled} from 'theme-ui';
import {swiss} from '@theme-ui/presets';
import {downArrow} from './utils';

// Some styles are easier to just declare in an actual styles file
import './styles.css';

const theme = {
  // Base theme
  ...swiss,
  breakpoints: ['40em', '52em', '64em'],
  fonts: {
    text: ''
  },
  styles: {
    root: {
      height: '100%',
      display: 'flex',
      flex: '1 1 auto',
      justifyContent: 'center',
      px: 3
    },
    Layout: {
      flex: '1 1 auto',
      display: 'flex',
      maxWidth: '60em'
    },
    Main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    Container: {
      width: '100%',
      maxWidth: '72em',
      display: 'flex',
      flexDirection: 'column',
      py: 0
    },
    Footer: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      py: 4
    },
    ol: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
      display: 'flex',
      alignItems: 'center'
    },
    li: {
      display: 'inline-block'
    },
    h1: {
      color: 'primary'
    },
    h2: {
      color: 'secondary'
    },
    h4: {
      color: 'text',
      fontWeight: '200'
    },
    p: {
      fontSize: 2,
      color: 'text'
    }
  },
  layout: {
    nav: {
      justifyContent: 'flex-end',
      width: '100%',
      display: 'flex',
      py: 4
    }
  },
  text: {
    button: {
      color: 'white',
      margin: 0,
      padding: 0
    },
    link: {
      ...swiss.styles.h3,
      color: 'muted',
      textDecoration: 'none',
      borderBottom: '1px solid white'
    }
  },
  // Variants
  underline: {
    display: 'inline-block',
    color: 'text',
    borderBottomColor: 'text',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    cursor: 'pointer',
    mr: 3,
    ml: 3
  },
  card: {
    bg: 'background',
    width: '100%',
    height: 60,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '4px',
    borderColor: 'secondary',
    borderWidth: '2px',
    borderStyle: 'solid',
    mt: 1,
    mb: 1,
    px: 3,
    ':hover': {
      bg: 'muted',
      cursor: 'pointer'
    },
    remove: {
      marginLeft: 'auto',
      position: 'absolute',
      zIndex: 5,
      right: '14px',
      bottom: '1px',
    }
  },
  circle: {
    display: 'block',
    width: 35,
    height: 35,
    backgroundColor: 'white',
    borderColor: 'secondary',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '50%',
    mr: 2
  },
  checkmark: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    display: 'block',
    strokeWidth: '2',
    stroke: 'white',
    strokeMiterlimit: '10',
    boxShadow: 'inset 0px 0px 0px #306',
    // animation: 'fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both',
    inner: {
      strokeDasharray: '166',
      strokeDashoffset: '166',
      strokeWidth: '2',
      strokeMiterlimit: '10',
      stroke: '#306',
      fill: 'hsl(10,60%,50%)'
      // animation: 'stroke .6s cubic-bezier(0.650, 0.000, 0.450, 1.000) forwards'
    },
    check: {
      transformOrigin: '50% 50%',
      strokeDasharray: '48',
      // strokeDashoffset: '48', // use for animation
      strokeDashoffset: '0'
      // animation: 'stroke .3s cubic-bezier(0.650, 0.000, 0.450, 1.000) .8s forwards'
    },
    '@keyframes stroke': {'100%': {strokeDashoffset: '0'}},
    '@keyframes scale': {
      '0%, 100%': {transform: 'none'},
      '50%': {transform: 'scale3d(1.1, 1.1, 1)'}
    },
    '@keyframes fill': {'100%': {boxShadow: 'inset 0px 0px 0px 30px #306'}}
  },
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '30em'
  },
  button: {
    width: '100%',
    maxWidth: '300px',
    appearance: 'none',
    fontWeight: 'body',
    lineHeight: 'body',
    fontSize: 0,
    bg: 'secondary',
    p: 2,
    mt: 2,
    cursor: 'pointer',
    display: 'inline-block',
    textAlign: 'center',
    textTransform: 'uppercase',
    borderRadius: '2px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'secondary',
    height: '50px',
    boxShadow: 'none',
    transition: 'all 260ms ease-in-out',
    ':hover': {
      outline: 0,
      bg: 'primary',
      borderColor: 'primary'
    },
    ':focus': {
      outline: 0
    }
  },
  input: {
    bg: 'secondary',
    color: 'white',
    width: '100%',
    height: '60px',
    fontSize: 1,
    py: 2,
    px: 3,
    mt: 1,
    mb: 1,
    border: 0,
    outline: 'none',
    '::placeholder': {
      color: 'white',
      opacity: 1
    }
  },
  select: {
    height: '60px',
    display: 'block',
    minWidth: '130px',
    padding: '8px 12px',
    color: 'secondary',
    fontSize: '14px',
    backgroundColor: 'white',
    backgroundImage: `url(${downArrow})`,
    backgroundSize: '12px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '90%',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderColor: 'secondary',
    borderWidth: 2,
    appearance: 'none',
    ml: 1
  }
};

const Reset = () =>
  React.createElement(Global, {
    styles: {
      body: {
        margin: '0',
        backgroundColor: swiss.colors.background
      },
      '*': {
        fontFamily: 'Oxygen'
      },
      a: {
        textDecoration: 'none',
        color: swiss.colors.primary,
        fontSize: 20
      },
      img: {
        maxWidth: '100%'
      }
    }
  });

const CustomThemeProvider = memo(({children, ...props}) => (
  <ThemeProvider theme={theme} {...props}>
    <Reset />
    <Styled.root>{children}</Styled.root>
  </ThemeProvider>
));

export {theme, useThemeUI as useTheme, CustomThemeProvider as default};
