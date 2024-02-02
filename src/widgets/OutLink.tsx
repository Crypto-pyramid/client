import React, { PropsWithChildren } from 'react'

type P = PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>

function OutLink({ children, ...rest }: P) {
  return (
    <a rel='noreferrer' target='_blank' {...rest}>
      {children}
    </a>
  )
}

export default OutLink
