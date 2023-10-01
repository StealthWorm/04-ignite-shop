import { styled } from "../../styles";

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const Button = styled('button', {
  display: 'flex',
  position: 'relative',
  padding: '.75rem',
  borderRadius: '6px',
  backgroundColor: '$gray800',
  border: 0,
  cursor: 'pointer',

  variants: {
    color: {
      empty: {
        color: '$gray500',
      },
      full: {
        color: '$gray300',
      }
    }
  },

  span: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: ' -.5rem',
    right: '-.5rem',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    backgroundColor: '$green500',
    color: '$white',
    textAlign: 'center',
    fontSize: '$sm',
    fontWeight: 'bold',
    border: '3px solid $gray900'
  }
})