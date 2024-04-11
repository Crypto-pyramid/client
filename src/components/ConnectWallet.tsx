import React, { useCallback, useContext, useEffect, useState } from 'react'

import { ChainRepository } from '../repositories/ChainRepository'
import { SecurityRepository } from '../repositories/SecurityRepository'
import { Member } from '../models/Member'
import { useSelector } from 'react-redux'
import { State } from '../redux/reducers'
import { useAlert } from '../widgets/Alert'
import ReactGA from 'react-ga4'

interface P {
  connecting: boolean
  onConnected: (member?: Member) => void
  onDisConnect: () => Promise<void>
}

function ConnectWallet({ connecting, onConnected, onDisConnect }: P) {
  const member = useSelector(({ member }: State) => member)
  const chainRepo = useContext(ChainRepository.Context)
  const securityRepo = useContext(SecurityRepository.Context)
  const [loading, setLoading] = useState(false)

  const { toast } = useAlert()

  const accountsChanged = useCallback(async () => {
    if (!member || Member.ANONYMOUS === member) {
      return
    }
    await onDisConnect()
    window.location.reload()
  }, [onDisConnect, member])

  useEffect(() => {
    chainRepo.bind(accountsChanged)
  }, [chainRepo, accountsChanged])

  const connect = useCallback(async () => {
    try {
      ReactGA.event({
        category: 'Wallet',
        action: 'Try login',
      })

      setLoading(true)
      if (!chainRepo.provider) {
        toast('Install the MetaMask first', -1)
        setLoading(false)
        onConnected()
        return
      }

      await chainRepo.switchChain()

      const accounts = await chainRepo.provider.request({
        method: 'eth_requestAccounts',
      })

      const address = accounts[0].toLowerCase()
      const message = chainRepo.getSignText(address)
      const sign = await chainRepo.web3.eth.personal.sign(message, address, '')
      onConnected(await securityRepo.login(address, message, sign))
      setLoading(false)
    } catch (e: any) {
      if (e.code !== -32002) {
        toast('Error', -1)
        setLoading(false)
        onConnected()
      }
    }
  }, [chainRepo, toast, onConnected, securityRepo])

  useEffect(() => {
    if (connecting) {
      connect()
    }
  }, [connecting, connect])
  return connecting && loading ? <div>Loading</div> : <></>
}

export default ConnectWallet
