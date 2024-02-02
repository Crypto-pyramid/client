import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUseStyles } from 'react-jss'
import { SecurityRepository } from '../repositories/SecurityRepository'
import { ChainRepository } from '../repositories/ChainRepository'
import { Member } from '../models/Member'
import { login, logout } from '../redux/actions'
import Header from '../widgets/Header'
import Home from './Home'
import ConnectWallet from './ConnectWallet'
import Follow from './Follow'
import Statistics from './Statistics'

function Index() {
  const classes = useStyles()

  const [connecting, setConnecting] = useState(false)
  const dispatch = useDispatch()
  const securityRepo = useContext(SecurityRepository.Context)
  const chainRepo = useContext(ChainRepository.Context)

  const initialLogin = useCallback(async () => {
    try {
      const member = await securityRepo.whoami()
      const address = (
        await chainRepo.provider.request({ method: 'eth_requestAccounts' })
      )[0].toLowerCase()
      if (member.address === address) {
        dispatch(login(member))
      } else {
        throw new Error('bad address')
      }
    } catch (e: any) {
      if (e.response?.status === 401) {
        dispatch(login(Member.ANONYMOUS))
      } else {
        dispatch(await logout())
      }
    }
  }, [securityRepo, dispatch, chainRepo])

  useEffect(() => {
    initialLogin()
  }, [initialLogin])

  const onConnected = useCallback(
    (member?: Member) => {
      if (!!member) {
        dispatch(login(member))
      }
      setConnecting(false)
    },
    [dispatch]
  )

  const onDisConnect = useCallback(async () => {
    dispatch(await logout())
    securityRepo.logout()
  }, [dispatch, securityRepo])

  return (
    <>
      <Header
        onLogin={() => setConnecting(true)}
        onLogout={async () => dispatch(await logout())}
      />
      <div className={classes.c}>
        <Routes>
          <Route path='/:id' element={<Follow />} />
          <Route path='/stats' element={<Statistics />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
      <ConnectWallet
        connecting={connecting}
        onConnected={onConnected}
        onDisConnect={onDisConnect}
      />
    </>
  )
}

export default Index

const useStyles = createUseStyles(() => ({
  c: {
    width: '100%',
    margin: '0 auto',
    overflow: 'auto',
  },
}))
