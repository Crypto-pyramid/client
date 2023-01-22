import * as React from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import axios, { AxiosInstance } from 'axios';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

export class ChainRepository {
  public static readonly $ = new ChainRepository(axios);
  public static readonly Context = React.createContext(ChainRepository.$);
  private _provider: any;
  private _web3?: Web3;
  private _onAccountsChanged?: () => Promise<void> = async () => {
    window.location.reload();
  };

  constructor(private a: AxiosInstance) {
    detectEthereumProvider({ mustBeMetaMask: true }).then(p => {
      this._provider = p;
      if (this._provider) {
        this._provider.on('accountsChanged', () => this.onAccountsChanged());
      }
    });
  }

  private async onAccountsChanged() {
    if (!this._onAccountsChanged) {
      return;
    }

    await this._onAccountsChanged();
  }

  public bind(
    onAccountsChanged: () => Promise<void>
  ) {
    this._onAccountsChanged = onAccountsChanged;
  }

  public get provider() {
    return this._provider;
  }

  public get web3() {
    if (this._web3) {
      return this._web3;
    }
    this._web3 = new Web3(this._provider);
    return this._web3;
  }

  public commonContract(
    address: string,
    jsonInterface: AbiItem | AbiItem[],
  ): Contract {
    return new this.web3.eth.Contract(jsonInterface, address);
  }

  public async switchChain(): Promise<void> {
    if (!this._provider) {
      return;
    }

    const id = await this._provider.request({ method: 'eth_chainId' });
    
    var chain = !!process.env.REACT_APP_CHAIN_ID ? process.env.REACT_APP_CHAIN_ID : '0x1'
    if (id !== chain)
      await this._provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chain }],
      });
  }

  public getSignText(address: string) {
    return `Welcome to Crypto Pyramid! Click to sign in and accept the Terms of Service, This request will not trigger a blockchain transaction or cost any gas fees. Your authentication status will reset after 24 hours. Wallet address: ${address} Nonce: ${this.generateNonce()}`;
  }

  public generateNonce() {
    return new Date().valueOf();
  }

}
