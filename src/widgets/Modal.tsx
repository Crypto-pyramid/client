import React, { PropsWithChildren } from 'react';
import { createUseStyles } from 'react-jss';

import classNames from 'classnames';

import Backdrop from './Backdrop';


function Modal({ className, children }: PropsWithChildren<{ className?: string; }>) {
  const classes = useStyles();

  return (
    <Backdrop>
      <div className={classNames(classes.c, className)}>
        {children}
      </div>
    </Backdrop>
  );
}

export default Modal;

const useStyles = createUseStyles(() => ({
  c: {
    borderRadius: '10px',
    background: 'white',
  },
}), { });
