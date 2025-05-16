import { styled } from "../../styles";

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

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
      },

      '&:not(:disabled):hover': {
        transition: 'all 0.5s',
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
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    maxHeight: 80,
    minWidth: 250,
  },

  main: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
    justifyContent: 'space-between',

    'div:last-child': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
  }
})

export const List = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '2rem',
  maxHeight: '20rem',
  overflowY: 'auto',

  [`& + ${ListItem}`]: {
    marginTop: '2rem',
  },
})

export const BagEmptyInfo = styled('strong', {
  color: '$gray500',
  fontSize: '$xl'
})

export const ButtonClose = styled('button', {
  display: 'flex',
  justifyContent: 'flex-end',
  border: 0,
  backgroundColor: 'transparent',
  color: '$gray500',
  cursor: 'pointer',
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  justifyContent: 'space-between',

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$green500',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    fontWeight: 'bold',
    lineHeight: 1.6,
    border: 0,
    cursor: 'pointer',
    width: '100%',

    '&:hover': {
      transition: 'all 0.5s',
      color: '$green300',
    }
  },

  span: {
    color: '$gray300',
    fontSize: '$md',
    minWidth: '1.5rem',
    textAlign: 'center',
    width: 'auto',
  }
})

export const QuantityControl = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: '$gray900',
  padding: '0.5rem',
  borderRadius: '8px',
})