import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useSelector } from 'react-redux'
import { shortHash } from '../models'
import { Member } from '../models/Member'
import { State } from '../redux/reducers'
import arrow_down from '../assets/arrow_down.svg'
import copy from 'copy-to-clipboard'
import { SecurityRepository } from '../repositories/SecurityRepository'
import useWindowDimensions from './useWindowDimensions'

interface P {
  onLogin: () => void
  onLogout: () => void
}

function HeaderPortrait({ onLogin, onLogout }: P) {
  const classes = useStyles()
  const repository = useContext(SecurityRepository.Context)
  const member = useSelector(({ member }: State) => member)
  const ref = useRef<HTMLDivElement>(null)
  const [hasLink, setHasLink] = useState(false)
  const { width } = useWindowDimensions()

  useEffect(() => {
    if (
      member?.address === undefined ||
      member?.address === Member.ANONYMOUS.address
    ) {
      return
    }

    repository.hasLink().then((value) => {
      setHasLink(value)
    })
  }, [member?.address, repository])

  const [isClicked, setIsClicked] = useState(false)

  const openLogout = useCallback(async () => {
    setIsClicked(!isClicked)
  }, [isClicked])

  useEffect(() => {
    function assertIsNode(e: EventTarget | null): asserts e is Node {
      if (!e || !('nodeType' in e)) {
        throw new Error(`Node expected`)
      }
    }

    function handleClickOutside(this: Document, ev: MouseEvent) {
      assertIsNode(ev.target)
      if (ref.current && !ref.current.contains(ev.target)) {
        setIsClicked(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return !member || Member.ANONYMOUS === member ? (
    <div>
      {width > 1100 ? (
        <button className={classes.quickLink} onClick={onLogin}>
          Connect
        </button>
      ) : (
        <div className={classes.quickLinkSml} onClick={onLogin}>
          Connect
        </div>
      )}
    </div>
  ) : (
    <div>
      {width > 1100 ? (
        <>
          <button onClick={openLogout} className={classes.quickLink}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {shortHash(member.address)}
              <img src={arrow_down} alt='arrow' className={classes.arrow} />
            </div>
          </button>
          {isClicked && (
            <div className={classes.logoutBox} ref={ref}>
              <button className={classes.logout} onClick={onLogout}>
                Logout
              </button>
              {hasLink && (
                <button
                  className={classes.logout}
                  onClick={() =>
                    copy(window.location.origin + '/#/' + member.id)
                  }
                >
                  Copy referal link
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {hasLink && (
            <button
              className={classes.logout}
              onClick={() => copy(window.location.origin + '/#/' + member.id)}
            >
              Copy referal link
            </button>
          )}
          <button className={classes.logout} onClick={onLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  )
}

export default HeaderPortrait

const useStyles = createUseStyles(() => ({
  quickLink: {
    display: 'block',
    padding: '12px 12px 12px',
    lineHeight: '17px',
    fontWeight: '800',
    fontSize: '16px',
    background: 'none',
    borderRadius: '22px',
    fontFamily: 'courier',
    color: 'white',
    borderColor: 'white',
    transition: 'all 0.235s ease-in-out',
    '&:hover': {
      color: '#212121',
      background: '#ffffff63',
    },
  },

  quickLinkSml: {
    margin: '10px 0',
    display: 'block',
    lineHeight: '17px',
    fontWeight: '800',
    fontSize: '16px',
    background: 'none',
    fontFamily: 'courier',
    color: 'white',
    border: '0px',
    borderColor: 'none',
    transition: 'all 0.235s ease-in-out',
    width: '100%',
    '&:hover': {
      color: '#212121',
      background: '#ffffff63',
    },
  },

  arrow: {
    width: '16px',
    height: '16px',
    marginLeft: '5px',
  },

  logoutBox: {
    background: '#8a8888bf',
    borderRadius: '7px',
    position: 'fixed',
    zIndex: '100',
    margin: '10px',
    padding: '10px',
    right: '45px',
    color: 'white',
  },

  logout: {
    margin: '10px 0',
    display: 'block',
    lineHeight: '17px',
    fontWeight: '800',
    fontSize: '16px',
    background: 'none',
    fontFamily: 'courier',
    color: 'white',
    border: '0px',
    borderColor: 'none',
    transition: 'all 0.235s ease-in-out',
    width: '100%',
    '&:hover': {
      color: '#212121',
      background: '#ffffff63',
    },
  },
}))
