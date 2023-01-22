import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

import Button from './Button';
import Modal from './Modal';

interface AlertParams {
  readonly title: string;
  readonly body: string[];
  readonly ok?: string;
  readonly secondary?: boolean;
}

export enum Status {
  Success,
  Failure = -1
}

export const alertContext = createContext({
  alert2: (_: AlertParams) => Promise.reject<void>(),
  toast: (_message: string, _status?: Status, _milliseconds?: number, callback?: () => void) => Promise.reject<void>(),
});

export function useAlert() {
  return useContext(alertContext);
}

interface Terminates {
  resolve(value: void | PromiseLike<void>): void;
  reject(reason?: any): void;
}

interface AlertFrame extends Terminates {
  params: AlertParams;
}

interface ToastFrame extends Terminates {
  readonly message: string;
  readonly status: Status;
}

function Alert({ children }: PropsWithChildren<{}>) {
  const classes = useStyles();
  const [ alerts, setAlerts ] = useState<AlertFrame[]>([]);
  const [ toasts, setToasts ] = useState<ToastFrame[]>([]);
  const handleAlert = useCallback((params: AlertParams) =>
    new Promise<void>((resolve, reject) => {
      setAlerts(xs => xs.concat({ params, resolve, reject }));
    }), []);
  const handleToast = useCallback((message: string, status: Status = Status.Success, milliseconds: number = 3000, callback?: () => void) =>
    new Promise<void>((resolve, reject) => {
      const t = ({ message, status, resolve, reject });
      setToasts(xs => xs.concat(t));
      setTimeout(() => {
        setToasts(xs => xs.filter(x => x !== t));
        callback && callback();
      }, milliseconds);
    }), []);
  const handleClose = (a: AlertFrame, ok: boolean) => {
    setAlerts(xs => xs.filter(x => x !== a));
    (ok ? a.resolve : a.reject)();
  };

  return (
    <alertContext.Provider value={{ alert2: handleAlert, toast: handleToast }}>
      <>
        {children}

        {alerts.map((a, i) => (
          <Modal className={classes.c} key={i}>
            <img src={''} alt="" onClick={() => handleClose(a, false)} className={classes.close} />

            <h3 className={classes.title}>{a.params.title}</h3>
            {a.params.body.map((p, i) => (
              <p className={classes.p} key={i}>{p}</p>
            ))}

            <Button primary={!a.params.secondary} onClick={() => handleClose(a, true)} className={classes.ok}>
              {a.params.ok || '确认'}
            </Button>
          </Modal>
        ))}

        {toasts.map(({ message, status }, i) => (
          <Toast message={message} status={status} key={i} />
        ))}
      </>
    </alertContext.Provider>
  );
}

function Toast({ message, status }: { message: string, status: Status }) {
  const classes = useStyles();
  const c = useRef<HTMLDivElement>(null);
  const [ marginLeft, setMarginLeft ] = useState<number>();

  useEffect(() => {
    if (c.current) {
      setMarginLeft(- c.current.clientWidth / 2);
    }
  }, [c]);

  return (
    <div ref={c} className={`${classes.toast} ${status === -1 ? 'failure': ''}`} style={{ marginLeft }}>
      <img src={status === 0 ? '': ''} alt="" className={classes.status} />
      {message}
    </div>
  );
}

export default Alert;

const useStyles = createUseStyles(() => ({
  c: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '32px 24px 36px',
    margin: '0 16px',
    position: 'relative',
    textAlign: 'center',
  },

  close: {
    position: 'absolute',
    top: '16px',
    right: '16px',
  },

  title: {
    margin: '0 0 16px',
    fontSize: '28px',
    lineHeight: '40px',
  },

  p: {
    margin: '8px 16px',
    fontSize: '15px',
    lineHeight: '21px',
  },

  ok: {
    display: 'block',
    width: '100%',
    marginTop: '24px',
  },

  toast: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    padding: '0 16px',
    background: '#e5ffed',
    borderRadius: '20px',
    fontSize: '13px',
    color: 'green',
    position: 'fixed',
    top: '10%',
    left: '50%',
    zIndex: '1000',
    '&.failure': {
      backgroundColor: '#fde8e8',
      color: '#f43030'
    }
  },

  status: {
    width: '16px',
    height: '16px',
    marginRight: '8px',
  },
}), {});
