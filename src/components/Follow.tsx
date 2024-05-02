import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Follower, FollowRepository } from '../repositories/FollowRepository'
import Web3 from 'web3'
import copy from 'copy-to-clipboard'
import { createUseStyles } from 'react-jss'
import { useSelector } from 'react-redux'
import { State } from '../redux/reducers'
import { Member } from '../models/Member'
import { useAlert } from '../widgets/Alert'
import { ChainRepository } from '../repositories/ChainRepository'
import crypto_pyramid from '../assets/abi/crypto_pyramid.json'
import { AbiItem } from 'web3-utils'
import ReactGA from 'react-ga4'
import { Helmet } from 'react-helmet'

function Follow() {
  const classes = useStyles()
  var classNames = require('classnames')

  const member = useSelector(({ member }: State) => member)

  const { id } = useParams<{
    id?: string | undefined
  }>()

  const [hasFollowed, setHasFollowed] = useState(false)
  const [follower, setFollower] = useState<Follower | undefined>(undefined)
  const [copied, setCopied] = useState(false)
  const [link, setLink] = useState('')
  const repository = useContext(FollowRepository.context)
  const chainRepo = useContext(ChainRepository.Context)
  const { toast } = useAlert()

  useEffect(() => {
    if (!id) {
      toast('No user to follow is selected!', -1)
      return
    }

    repository.get(+id).then((value) => {
      setFollower(value)
    })
  }, [repository, id, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    ReactGA.event({
      category: 'Follow',
      action: 'Follow Try',
    })

    if (!member?.address || !Web3.utils.isAddress(member?.address)) {
      toast('Your address is not valid!', -1)
      ReactGA.event({
        category: 'FollowError1',
        action: 'FollowError1',
      })
      return
    }

    if (!id || !follower?.address || !Web3.utils.isAddress(follower?.address)) {
      toast('No user to follow is selected!', -1)
      ReactGA.event({
        category: 'FollowError2',
        action: 'FollowError2',
      })
      return
    }

    await chainRepo.switchChain()

    var address = !process.env.REACT_APP_CONTRACT
      ? '0x65dcabbf6E79bf4f3ff78bC7835934767e856121'
      : process.env.REACT_APP_CONTRACT
    //const signer = chainRepo.provider().getS
    const contract = chainRepo.commonContract(
      address,
      crypto_pyramid as AbiItem[]
    )

    contract.methods
      .follow(follower?.address)
      .send({
        value: 10000000000000000,
        from: member?.address,
        gas: 1000000,
        gasPrice: Web3.utils.toWei('2', 'gwei'),
      })
      .on('receipt', () => {
        repository
          .follow(+id)
          .then((response: number) => {
            setHasFollowed(true)
            setLink(window.location.origin + '/#/' + response)
            ReactGA.event({
              category: 'FollowSuccess',
              action: 'FollowSuccess',
            })
          })
          .catch(() => {
            toast(
              'An error occurred on server while trying to follow the user!',
              -1
            )
            ReactGA.event({
              category: 'FollowError3',
              action: 'FollowError3',
            })
          })
      })
      .catch((error: any) => {
        toast('Transaction failed with error: ' + error.message, -1, 6000)
        ReactGA.event({
          category: 'FollowError4',
          action: 'FollowError4',
        })

        return
      })
  }

  return (
    <div className={classes.wrapper}>
      <Helmet>
        <link rel='canonical' href={`https://crypto-pyramid.com/${id}`} />
        <title>Follow {follower?.address} - CryptoPyramid</title>
        <meta
          name='description'
          content={`Follow user with wallet address ${follower?.address} on CryptoPyramid`}
        />
      </Helmet>
      <main className={classes.content}>
        <h2>
          Follow user with wallet address <br />
          <div className={classes.singleLineText}>{follower?.address}</div>
        </h2>
        <div style={{ margin: '20px 0' }}>
          <h4>
            Joining our exclusive CryptoPyramid community, for a payment of just{' '}
            <b>0.01ETH</b>, and you will be granted access to invite others and
            start earning your money! &#129297; &#129297;
          </h4>
          <div className={classes.rules}>
            <h3>Rules:</h3>
            <h4>
              The concept is very simple. For each new user that joins using
              your invitation, you will earn <b>0.0033ETH</b>. That means that
              if you invite three friends, you will have already earned back the
              ETH you spent to join!
            </h4>
            <h4>
              But wait there is more! The remaining of <b>0.0066ETH</b> is
              always evenly distributed among the pyramid branch, meaning that
              you will also earn money when the friends you referred invite new
              people!
            </h4>
            <h4>
              Go to&nbsp;
              <Link to='/' style={{ color: 'white' }}>
                Introduction
              </Link>{' '}
              page to read more!
            </h4>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          {(!member || Member.ANONYMOUS === member) && (
            <div style={{ color: '#ff6464' }}>Connect your wallet first!</div>
          )}
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <input
              type='submit'
              value={!hasFollowed ? 'Follow' : 'Followed!'}
              disabled={hasFollowed || !member || Member.ANONYMOUS === member}
              className={classNames(
                classes.input,
                classes.inputSubmit,
                !hasFollowed && !(!member || Member.ANONYMOUS === member)
                  ? classes.btnHover
                  : undefined,
                !member || Member.ANONYMOUS === member
                  ? classes.redBtn
                  : undefined
              )}
            />
          </div>
        </form>

        {hasFollowed && (
          <>
            <h3>Share the referral link</h3>

            <p>
              You can share you referral link by copying and sending it or
              sharing it on your social media.
            </p>

            <div className={classes.link}>
              <input
                className={classNames(classes.input, classes.followLink)}
                disabled
                value={link}
                style={{ color: '#fff' }}
              />
              <input
                type='submit'
                value={copied ? 'Copied!' : ' Copy! '}
                className={classNames(
                  classes.input,
                  classes.inputSubmit,
                  classes.copyLink,
                  copied ? undefined : classes.hoverCopy
                )}
                onClick={() => {
                  if (copy(link)) {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1000)
                  }
                }}
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Follow

const useStyles = createUseStyles(
  () => ({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      minHeight: `calc(100vh - 82px)`,
    },

    content: {
      maxWidth: '1024px',
      textAlign: 'center',
      color: '#fff',
      padding: '0px 50px',
    },

    h1: {
      marginTop: '0',
    },

    rules: {
      margin: '0 0 25px 0',
      backgroundColor: '#313133',
      opacity: '0.5',
      borderRadius: '10px',
      padding: '1px 25px 10px 25px',
    },

    form: {
      margin: '25px auto',
      display: 'grid',
      gridRowGap: '10px',
    },

    link: {
      display: 'grid',
      gridTemplateColumns: 'auto 130px',
      textAlign: 'center',
      margin: 'auto',
      gridGap: '10px',
      marginBottom: '50px',
    },

    followLink: {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
      padding: '12px',
      width: 'calc(100% - 24px)',
    },

    copyLink: {
      cursor: 'pointer',
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
    },

    input: {
      float: 'left',
      fontSize: '16px',
      border: '1px solid #fff',
      borderRadius: '30px',
      outline: 'none',
      fontFamily: 'courier',
    },

    inputField: {
      padding: '12px',
      background: '#fff',
    },

    inputSubmit: {
      padding: '12px 24px',
      color: '#fff',
      background: 'transparent',
      transition: 'all 0.235s ease-in-out',
      maxWidth: 'fit-content',
    },

    redBtn: {
      color: '#ff6464',
      borderColor: '#ff6464',
    },

    btnHover: {
      cursor: 'pointer',
      '&:hover': {
        color: '#212121',
        background: '#ffffff63',
      },
    },

    hoverCopy: {
      '&:hover': {
        color: '#212121',
        background: '#ffffff63',
      },
    },

    singleLineText: {
      '@media only screen and (max-width: 600px)': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '300px',
        margin: 'auto',
      },
    },
  }),
  {}
)
