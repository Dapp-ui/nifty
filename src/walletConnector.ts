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

  constructor(network: Network) {
    this.network = network;
  }

  _getProvider() {
    // TODO - use wallet type here to get provider
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      !window.ethereum.overrideIsMetaMask
    ) {
      return window.ethereum;
    }

    if (window.ethereum && window.ethereum.overrideIsMetaMask) {
      return window.ethereum.providers[0];
    }

    return null;
  }

  public async connectWallet(walletType: WalletType): Promise<string> {
    this.walletType = walletType;

    const windowProvider = this._getProvider();

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

    return await this.signer.getAddress();
  }
}

export default WalletConnector;