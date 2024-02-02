import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { createUseStyles } from 'react-jss'

type P = PropsWithChildren<
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    transparent?: boolean
    // onClick?: () => void;
  }
>

function Backdrop({ className, style, children, transparent, onClick }: P) {
  const classes = useStyles({ transparent })

  return createPortal(
    <div
      className={classNames(classes.c, className)}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>,
    document.body
  )
}

export default Backdrop

interface SP {
  transparent?: boolean
}

const useStyles = createUseStyles(
  () => ({
    c: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      background: ({ transparent }: SP) =>
        !!transparent ? 'transparent' : 'rgba(0, 0, 0, .5)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: '1000',
      animation: '$in .5s',
    },

    '@keyframes in': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  }),
  {}
)
