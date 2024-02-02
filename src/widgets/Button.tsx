import React, { PropsWithChildren } from 'react'
import { createUseStyles } from 'react-jss'

import classnames from 'classnames'

type P = PropsWithChildren<
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
    fluid?: boolean
    primary?: boolean
    size?: 'm' | 'l'
    disabled?: boolean | 'shallow'
  }
>

function Button({
  className,
  fluid,
  primary,
  size,
  disabled,
  children,
  ...rest
}: P) {
  const classes = useStyles({
    fluid,
    primary,
    size,
    disabled,
    ...rest,
  })

  return (
    <button
      className={classnames(className, classes.c)}
      disabled={disabled && 'shallow' !== disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button

const useStyles = createUseStyles(
  () => ({
    c: {
      width: ({ fluid }: P) => fluid && '100%',
      minWidth: ({ size }: P) => ({ m: '104px', l: '120px' })[size || 'm'],
      height: ({ size }: P) => ({ m: '40px', l: '48px' })[size || 'm'],
      border: 'none',
      borderRadius: '1000px',
      outline: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      color: ({ disabled, primary }: P) =>
        primary ? 'white' : disabled ? 'grey' : 'black',
      cursor: 'pointer',
    },
  }),
  {}
)
