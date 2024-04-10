import { Link, useNavigate } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import HeaderPortrait from './HeaderPortrait'
import logo from '../assets/pyramid.svg'
import link_twitter from '../assets/twitter.svg'
import link_discord from '../assets/discord.svg'
import link_youtube from '../assets/youtube.svg'
import link_instagram from '../assets/instagram.svg'
import link_twitter_d from '../assets/twitter_dark.svg'
import link_discord_d from '../assets/discord_dark.svg'
import link_youtube_d from '../assets/youtube_dark.svg'
import link_instagram_d from '../assets/instagram_dark.svg'
import menu from '../assets/menu.svg'
import menu_dark from '../assets/menu_dark.svg'
import OutLink from './OutLink'
import { useCallback, useEffect, useRef, useState } from 'react'
import useWindowDimensions from './useWindowDimensions'

export const HeaderHeight: number = 80

interface P {
  onLogin: () => void
  onLogout: () => Promise<unknown>
}

function Header({ onLogin, onLogout }: P) {
  const classes = useStyles()

  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)

  const [isHoverdTwitter, setIsHoverdTwitter] = useState(false)
  const [isHoverdInstagram, setIsHoverdInstagram] = useState(false)
  const [isHoverdYoutube, setIsHoverdYoutube] = useState(false)
  const [isHoverdDiscord, setIsHoverdDiscord] = useState(false)
  const [isHoverdMenu, setIsHoverdMenu] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const { width } = useWindowDimensions()

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

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const socialLinks = (
    <div style={{ marginLeft: 'auto' }}>
      <OutLink href='https://twitter.com/cryptopyramid2'>
        <img
          src={isHoverdTwitter ? link_twitter_d : link_twitter}
          alt='twitter'
          className={classes.socialLink}
          style={{ marginLeft: '0px' }}
          onMouseOver={() => setIsHoverdTwitter(true)}
          onMouseOut={() => setIsHoverdTwitter(false)}
        />
      </OutLink>
      <OutLink href='https://discord.gg/AN3dUeMN'>
        <img
          src={isHoverdDiscord ? link_discord_d : link_discord}
          alt='discord'
          className={classes.socialLink}
          onMouseOver={() => setIsHoverdDiscord(true)}
          onMouseOut={() => setIsHoverdDiscord(false)}
        />
      </OutLink>
      <OutLink href='https://www.youtube.com/@cryptopyramid'>
        <img
          src={isHoverdYoutube ? link_youtube_d : link_youtube}
          alt='youtube'
          className={classes.socialLink}
          onMouseOver={() => setIsHoverdYoutube(true)}
          onMouseOut={() => setIsHoverdYoutube(false)}
        />
      </OutLink>
      <OutLink href='https://www.instagram.com/cryptopyramidofficial/'>
        <img
          src={isHoverdInstagram ? link_instagram_d : link_instagram}
          alt='instagram'
          className={classes.socialLink}
          onMouseOver={() => setIsHoverdInstagram(true)}
          onMouseOut={() => setIsHoverdInstagram(false)}
        />
      </OutLink>
    </div>
  )

  return (
    <div className={classes.c}>
      <div className={classes.cc}>
        <div className={classes.logoContainer} onClick={() => navigate('/')}>
          <img src={logo} alt='nuwton' className={classes.logo} />
          <p className={classes.slogan}>Crypto Pyramid</p>
        </div>

        {width > 1100 ? (
          <>
            {socialLinks}

            <div className={classes.quickLinks}>
              <Link to='/' className={classes.quickLink}>
                Introduction
              </Link>
              <Link to='/stats' className={classes.quickLink}>
                Statistics
              </Link>
              <HeaderPortrait onLogin={onLogin} onLogout={onLogout} />
            </div>
          </>
        ) : (
          <>
            <div onClick={openLogout}>
              <img
                src={isHoverdMenu ? menu_dark : menu}
                alt='menu'
                className={classes.socialLink}
                onMouseOver={() => setIsHoverdMenu(true)}
                onMouseOut={() => setIsHoverdMenu(false)}
              />
            </div>
            {isClicked && (
              <div className={classes.logoutBox} ref={ref}>
                <Link to='/' className={classes.logout}>
                  Introduction
                </Link>
                <Link to='/stats' className={classes.logout}>
                  Statistics
                </Link>
                <HeaderPortrait onLogin={onLogin} onLogout={onLogout} />
                <div style={{ marginTop: '10px' }}>{socialLinks}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Header

const useStyles = createUseStyles(() => ({
  c: {
    top: 0,
    width: '100%',
    height: `${HeaderHeight}px`,
    borderBottomColor: '#ffffff8c',
    borderBottom: '2px',
    borderBottomStyle: 'solid',
  },

  cc: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: '0 30px',
    margin: '0 auto',
  },

  quickLinks: {
    display: 'flex',
    margin: 'auto 24px',
    alignItems: 'center',
  },

  quickLink: {
    display: 'block',
    padding: '12px 12px 12px',
    marginRight: '10px',
    lineHeight: '17px',
    fontWeight: '800',
    fontSize: '16px',
    textDecoration: 'none',
    color: 'white',
    transition: 'all 0.235s ease-in-out',
    '&:hover': {
      color: '#212121',
      background: '#ffffff63',
    },
  },

  logoContainer: {
    display: 'flex',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  logo: {
    display: 'block',
    margin: 'auto',
    height: '50px',
    width: '50px',
  },

  slogan: {
    margin: [16, 0, 16, 10],
    fontSize: 30,
    fontWeight: 800,
    textAlign: 'center',
    color: 'white',
  },

  socialLink: {
    width: '25px',
    height: '25px',
    marginLeft: '15px',
    paddingTop: '3px',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  logoutBox: {
    background: '#8a8888bf',
    borderRadius: '7px',
    position: 'fixed',
    zIndex: '100',
    padding: '10px',
    right: '30px',
    top: '55px',
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
