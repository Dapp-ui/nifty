import chainIdFromNetwork from './utils/chainIdFromNetwork';
import type { CurrencyUnit, Network, SaleState } from './types';
import { BigNumber, ethers, Wallet } from 'ethers';
import isWriteProvider from './utils/isWriteProvider';

export type WalletType = 'metamask' | 'coinbase';

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

  constructor(network: Network) {
    this.network = network;
  }

  _getCoinbaseProvider(): ethers.providers.ExternalProvider {
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

  _getMetaMaskProvider(): ethers.providers.ExternalProvider {
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

  _getProvider(): ethers.providers.ExternalProvider | null {
    switch (this.walletType) {
      case 'coinbase':
        return this._getCoinbaseProvider();
      default:
        return this._getMetaMaskProvider();
    }
  }

  public async connectWallet(walletType: WalletType): Promise<string> {
    this.walletType = walletType;

    const windowProvider = this._getProvider();

    if (!windowProvider) {
      throw new Error('No ethereum detected on web page');
    }

    const writeProvider = new ethers.providers.Web3Provider(
      windowProvider,
      parseInt(chainIdFromNetwork(this.network))
    );

    await writeProvider.send('eth_requestAccounts', []);

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
}

export default WalletConnector;
