import { CurrencyUnit, Network, SaleState } from './types';
import { ethers } from 'ethers';
import abi from './abi';
import chainIdFromNetwork from './utils/chainIdFromNetwork';
import rpcUrlFromNetwork from './utils/rpcUrlFromNetwork';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

interface NFT {
  id: number;
  uri: string;
}

function isWriteProvider(
  provider: ethers.providers.Provider
): provider is ethers.providers.Web3Provider {
  return (
    (provider as ethers.providers.Web3Provider).jsonRpcFetchFunc !== undefined
  );
}

class Nifty {
  private contractAddress: string;
  private network: Network;
  private signer: ethers.providers.JsonRpcSigner = null;
  private contract: ethers.Contract;
  private provider: ethers.providers.Provider;

  constructor(network: Network, contractAddress: string) {
    if (!window.ethereum && !window.web3.currentProvider) {
      throw new Error('No Metamask has been installed');
    }

    this.contractAddress = contractAddress;
    this.network = network;

    this.provider = new ethers.providers.JsonRpcProvider(
      rpcUrlFromNetwork(network)
    );

    this.provider
      .getNetwork()
      .then((network) => console.log('THE NETWORK???', network));

    this.contract = new ethers.Contract(
      this.contractAddress,
      abi,
      this.provider
    );
  }

  public async connectWallet(): Promise<string> {
    const writeProvider = new ethers.providers.Web3Provider(
      window.web3?.currentProvider || window.ethereum,
      parseInt(chainIdFromNetwork(this.network))
    );

    await writeProvider.send('eth_requestAccounts', []);

    await writeProvider.send('wallet_switchEthereumChain', [
      { chainId: chainIdFromNetwork(this.network) },
    ]);

    this.provider = writeProvider;

    if (!isWriteProvider(this.provider)) {
      throw new Error('No write privileges, please connect wallet first');
    }

    this.signer = this.provider.getSigner();

    this.contract = new ethers.Contract(this.contractAddress, abi, this.signer);

    return await this.signer.getAddress();
  }

  public async getConnectedWallet(): Promise<string> {
    if (!isWriteProvider(this.provider)) {
      throw new Error('No wallet is connected');
    }

    return await this.signer.getAddress();
  }

  public async nextPriceDropTime(): Promise<number> {
    const auctionStart = (await this.contract.auctionStartAt()) * 1000;
    const interval = (await this.contract.PRICE_DROP_INTERVAL()) * 1000;

    const nextIntervalNum =
      Math.floor((Date.now() - auctionStart) / interval) + 1;

    const nextPriceDropTime = auctionStart + nextIntervalNum * interval;

    return nextPriceDropTime;
  }

  public async mint(count: number): Promise<NFT[]> {
    if (!isWriteProvider(this.provider)) {
      throw new Error('No write privileges, please connect wallet first');
    }

    const price = await this.mintPrice();

    const address = await this.signer.getAddress();

    const txn = await this.contract.mint(count, {
      from: address,
      value: price * count,
    });

    const txnResult = await txn.wait();

    return txnResult.transactionHash;
  }

  public async mintPrice(): Promise<number> {
    const saleState = await this.saleState();

    switch (saleState) {
      case 'openAuction':
        return await this.contract.getAuctionPrice();
      default:
        return await this.contract.ALLOWLIST_PRICE();
    }
  }

  public async mintPriceWithUnits(unit: CurrencyUnit = 'wei'): Promise<string> {
    const priceWei = await this.mintPrice();

    return ethers.utils.formatUnits(priceWei, unit);
  }

  public async saleState(): Promise<SaleState> {
    const numMinted = await this.contract.numMinted();
    const maxSupply = await this.contract.MAX_SUPPLY();

    if (numMinted === maxSupply) {
      return 'soldOut';
    }

    const isSaleOpen = await this.contract.isSaleLive();
    const auctionStart = await this.contract.auctionStartAt();

    if (!isSaleOpen) {
      return 'closed';
    }

    if (auctionStart > 0) {
      return 'openAuction';
    }

    return 'openAllowlist';
  }

  public async maxSupply(): Promise<number> {
    return await this.contract.MAX_SUPPLY();
  }

  public async totalNumMinted(): Promise<number> {
    return await this.contract.numMinted();
  }

  public async ownedNFTs(): Promise<NFT[]> {
    const allOwners = await this.contract.allOwners();

    const address = await this.signer.getAddress();

    const ownedIds = Object.keys(allOwners).filter((id) => {
      return allOwners[id] === address;
    });

    const ownedNFTPromises = ownedIds.map(async (stringId): Promise<NFT> => {
      const id = parseInt(stringId);
      const uri = await this.contract.tokenURI(id);
      return {
        id,
        uri,
      };
    });

    return await Promise.all(ownedNFTPromises);
  }
}

export default Nifty;
