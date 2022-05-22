import chainIdFromNetwork from './utils/chainIdFromNetwork';
import type { CurrencyUnit, Network, SaleState } from './types';
import { BigNumber, ethers, Wallet } from 'ethers';
import isWriteProvider from './utils/isWriteProvider';

import type WalletConnectProviderType from '@walletconnect/web3-provider';

export type WalletType = 'metamask' | 'coinbase' | 'wallet-connect';

declare global {
  interface Window {
    ethereum: any;
  }
}

class WalletConnector {
  private network: Network;
  private walletType: WalletType;
  private provider: ethers.providers.Provider;
  private signer: ethers.Signer;
  private connectedAddress: string | null;
  private onConnectCallbacks: (() => void)[];

  constructor(network: Network) {
    this.network = network;
    this.onConnectCallbacks = [];

    this._attemptOptimisticConnect();
  }

  async _attemptOptimisticConnect() {
    if (typeof window === 'undefined') {
      return;
    }

    const lastConnection = window.localStorage.getItem(
      'last-nifty-connecttion'
    );

    if (!lastConnection) {
      return;
    }

    const { walletType, address } = JSON.parse(lastConnection);

    this.walletType = walletType;
    const windowProvider = await this._getProvider();

    const writeProvider = new ethers.providers.Web3Provider(
      windowProvider,
      parseInt(chainIdFromNetwork(this.network))
    );

    const accounts =
      walletType === 'wallet-connect'
        ? (windowProvider as WalletConnectProviderType).accounts
        : await writeProvider.listAccounts();

    if (accounts.includes(address)) {
      this.connectWallet(walletType);
    }
  }

  _getCoinbaseProvider(): ethers.providers.ExternalProvider | null {
    if (window.ethereum?.isCoinbaseWallet) {
      return window.ethereum;
    }

    if (window.ethereum?.providers?.length > 0) {
      for (let provider of window.ethereum.providers) {
        if (provider.isCoinbaseWallet) {
          return provider;
        }
      }
    }

    return null;
  }

  _getMetaMaskProvider(): ethers.providers.ExternalProvider | null {
    if (window.ethereum?.isMetaMask && !window.ethereum?.overrideIsMetaMask) {
      return window.ethereum;
    }

    if (window.ethereum?.providers?.length > 0) {
      for (let provider of window.ethereum.providers) {
        if (provider.isMetaMask) {
          return provider;
        }
      }
    }

    return null;
  }

  async _getWalletConnectProvider(): Promise<ethers.providers.ExternalProvider | null> {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const WalletConnectProvider = await import(
        '@walletconnect/web3-provider/dist/umd/index.min.js'
      );

      // @ts-ignore
      const provider = new WalletConnectProvider.default({
        infuraId: 'a8846b8c3fdb46dea53be16c64411520',
      }) as WalletConnectProviderType;

      return provider as ethers.providers.ExternalProvider;
    }

    return null;
  }

  async _getProvider(): Promise<ethers.providers.ExternalProvider | null> {
    switch (this.walletType) {
      case 'coinbase':
        return this._getCoinbaseProvider();
      case 'wallet-connect':
        return this._getWalletConnectProvider();
      default:
        return this._getMetaMaskProvider();
    }
  }

  public async connectWallet(walletType: WalletType): Promise<string> {
    this.walletType = walletType;

    const windowProvider = await this._getProvider();

    if (!windowProvider) {
      throw new Error('No ethereum detected on web page');
    }

    const writeProvider = new ethers.providers.Web3Provider(
      windowProvider,
      parseInt(chainIdFromNetwork(this.network))
    );

    if (this.walletType !== 'wallet-connect') {
      await writeProvider.send('eth_requestAccounts', []);
    } else {
      await (windowProvider as unknown as WalletConnectProviderType).enable();
    }

    await writeProvider.send('wallet_switchEthereumChain', [
      { chainId: chainIdFromNetwork(this.network) },
    ]);

    this.provider = writeProvider;

    if (!isWriteProvider(writeProvider)) {
      throw new Error(
        'No write privileges to connect, please connect wallet first'
      );
    }

    this.signer = writeProvider.getSigner();

    this.connectedAddress = await this.signer.getAddress();

    window.localStorage.setItem(
      'last-nifty-connecttion',
      JSON.stringify({ walletType, address: this.connectedAddress })
    );

    for (let onConnectCallback of this.onConnectCallbacks) {
      onConnectCallback();
    }

    return this.connectedAddress;
  }

  public getConnectedAddress(): string | null {
    return this.connectedAddress;
  }

  public getProvider(): ethers.providers.Provider {
    return this.provider;
  }

  public getSigner(): ethers.Signer {
    return this.signer;
  }

  public addConnectListener(callback: () => void) {
    this.onConnectCallbacks.push(callback);
  }
}

export default WalletConnector;
