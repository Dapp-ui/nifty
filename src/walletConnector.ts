import chainIdFromNetwork from './utils/chainIdFromNetwork';
import { CurrencyUnit, Network, SaleState } from './types';
import { BigNumber, ethers } from 'ethers';

class WalletConnector {
  private network: Network;

  _getProvider() {
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

  public async connectWallet(): Promise<string> {
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

    this.contract = new ethers.Contract(this.contractAddress, abi, this.signer);

    return await this.signer.getAddress();
  }

  public async getConnectedWallet(): Promise<string> {
    if (!isWriteProvider(this.provider)) {
      throw new Error('No wallet is connected');
    }

    return await this.signer.getAddress();
  }
}

export default WalletConnector;
