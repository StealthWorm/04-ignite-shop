import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  minHeight: 656,
  marginLeft: 'auto',
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  maxHeight: 696,
  width: 696,
  minWidth: 696,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1.25rem',
    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.25rem',

      strong: {
        fontSize: '$lg',
        color: '$gray100',
      },

      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300'
      },
    },

    button: {
      borderRadius: '6px',
      backgroundColor: '$green500',
      color: 'white',
      cursor: 'pointer',
      border: 0,
      padding: '0.75rem',

      '&:hover': {
        transition: 'all 0.5s',
        backgroundColor: '$green300',
      }
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})

export const BagContainer = styled('aside', {
  display: 'flex',
  position: 'fixed',
  top: 0,
  right: 0,
  maxWidth: 480,
  height: '100%',
  minHeight: '100vh',
  padding: '3rem',
  backgroundColor: '$gray800',
  flexDirection: 'column',
  transition: 'all .5s',

  variants: {
    visible: {
      true: {
        opacity: 1,
        visibility: 'visible',
        width: '100%',
      },
      false: {
        opacity: 0,
        visibility: 'hidden',
        width: 0,
      }
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  main: {
    h3: {
      textSize: '$lg',
      marginTop: '1.5rem'
    },
  },

  footer: {
    display: 'flex',
    flexDirection: 'column',
    bottom: 0,
    gap: '0.5rem',
    color: '$gray100',
    marginTop: 'auto',

    div: {
      display: 'flex',
      justifyContent: 'space-between',

      span: {
        fontSize: '$2sm',
      },
      strong: {
        fontSize: '$md',
        fontWeight: 'bold',
      },
    },

    button: {
      display: 'flex',
      backgroundColor: '$green500',
      padding: '1.25rem 2rem',
      borderRadius: '8px',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '$md',
      cursor: 'pointer',
      border: 0,
      marginTop: '3rem',

      '&:hover': {
        backgroundColor: '$green300',
      }
    },
  }
})

export const ListItem = styled('div', {
  display: 'flex',
  gap: '1.25rem',

  img: {
    borderRadius: '8px',
  },

  main: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
    justifyContent: 'space-between',

    div: {
      display: 'flex',
      flexDirection: 'column',
    },

    p: {
      textSize: '$md',
      color: '$gray300',
    },

    strong: {
      color: '$gray100',
      fontSize: '$md',
      fontWeight: 'bold',
      lineHeight: 1.6,
    },

    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      gap: '10px',
      color: '$green500',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      fontWeight: 'bold',
      lineHeight: 1.6,
      textAlign: 'left',
      border: 0,
      cursor: 'pointer',

      '&:hover': {
        transition: 'all 0.5s',
        color: '$green300',
      }
    }
  }
})

export const List = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '2rem',
  maxHeight: '20rem',
  overflowY: 'scroll',

  [`& + ${ListItem}`]: {
    marginTop: '2rem',
  },
})

export const ButtonClose = styled('button', {
  display: 'flex',
  justifyContent: 'flex-end',
  border: 0,
  backgroundColor: 'transparent',
  color: '$gray500',
  cursor: 'pointer',
})

//teste de componente stitches
export const Button = styled('button', {
  backgroundColor: '$green500',
  borderRadius: 4,
  border: 0,
  padding: 10,

  span: {
    fontWeight: 'bold',
    color: 'red'
  },

  '&:hover': {
    filter: 'brightness(0.8)'
  }
})
