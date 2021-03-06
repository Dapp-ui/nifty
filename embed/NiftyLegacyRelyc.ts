import { CurrencyUnit, Network, SaleState } from './types';
import { BigNumber, ethers } from 'ethers';
import abi from './abi';
import rpcUrlFromNetwork from './utils/rpcUrlFromNetwork';
import isWriteProvider from './utils/isWriteProvider';
import WalletConnector, { WalletType } from './WalletConnector';
import type { Relyc as NiftyContract } from '../typechain-types';

interface NFT {
  id: number;
  uri: string;
}

class Nifty {
  private contractAddress: string;
  private contract: NiftyContract;
  private provider: ethers.providers.Provider;
  private network: Network;
  private walletConnector: WalletConnector;

  constructor(
    network: Network,
    contractAddress: string,
    provider: ethers.providers.Provider = null
  ) {
    // running in the browser
    if (typeof window !== 'undefined') {
      // @ts-ignore - TODO remove this ignore
      window.ethers = ethers;
      this.walletConnector = new WalletConnector(network);
    }

    this.contractAddress = contractAddress;
    this.network = network;

    const rpcUrl = rpcUrlFromNetwork(this.network);

    // allow a passed provider to be used!
    this.provider = provider || new ethers.providers.JsonRpcProvider(rpcUrl);

    this.contract = new ethers.Contract(
      this.contractAddress,
      abi,
      this.provider
    ) as NiftyContract;
  }

  public async nextPriceDropTime(): Promise<number> {
    // @ts-ignore
    const auctionStartSeconds = await this.contract.auctionStartAt();
    const auctionStart = auctionStartSeconds.mul(1000).toNumber();

    // @ts-ignore
    const intervalSeconds = await this.contract.dutchAuctionPriceDropInterval();

    const interval = intervalSeconds.mul(1000).toNumber();

    const nextIntervalNum =
      Math.floor((Date.now() - auctionStart) / interval) + 1;

    const nextPriceDropTime = auctionStart + nextIntervalNum * interval;

    return nextPriceDropTime;
  }

  public async mint(count: number): Promise<string> {
    if (!isWriteProvider(this.provider)) {
      throw new Error(
        'No write privileges to mint, please connect wallet first'
      );
    }

    const price = await this.mintPriceWei();

    const address = await this.provider.getSigner().getAddress();
    const saleState = (await this.contract.saleState()).toNumber();

    let txn;

    switch (saleState) {
      case SaleState.CLOSED:
        throw new Error('Sale is closed');
      case SaleState.PUBLIC:
        txn = await this.contract.publicMint(count, {
          from: address,
          value: price.mul(count),
        });
        break;
      case SaleState.ALLOW_LIST:
        txn = await this.contract.allowListMint(count, {
          from: address,
          value: price.mul(count),
        });
    }

    const txnResult = await txn.wait();

    return txnResult.transactionHash;
  }

  private async mintPriceWei(): Promise<BigNumber> {
    const saleState = await this.saleState();

    switch (saleState) {
      case SaleState.DUTCH_AUCTION:
        // @ts-ignore
        return await this.contract.getAuctionPrice();
      case SaleState.ALLOW_LIST:
        return await this.contract.allowListPrice();
      default:
        return await this.contract.publicMintPrice();
    }
  }

  public async mintPrice(unit: CurrencyUnit = 'wei'): Promise<string> {
    const priceWei = await this.mintPriceWei();

    return ethers.utils.formatUnits(priceWei, unit);
  }

  public async saleState(): Promise<SaleState> {
    return (await this.contract.saleState()).toNumber();
  }

  public async maxSupply(): Promise<number> {
    return (await this.contract.maxSupply()).toNumber();
  }

  public async totalNumMinted(): Promise<number> {
    return (await this.contract.totalMinted()).toNumber();
  }

  public async ownedNFTs(): Promise<NFT[]> {
    if (!isWriteProvider(this.provider)) {
      throw new Error('No signer detected, wallet may not be connected');
    }

    const allOwners = await this.contract.allOwners();

    const address = await this.provider.getSigner().getAddress();

    const ownedIds = Object.keys(allOwners).filter((idStr) => {
      const id = parseInt(idStr);
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

  public async connectWallet(walletType: WalletType): Promise<string> {
    const address = await this.walletConnector.connectWallet(walletType);
    this.provider = this.walletConnector.getProvider();

    if (!isWriteProvider(this.provider)) {
      throw new Error('Connected wallet has no signer');
    }

    // redeclare contract with signer
    this.contract = new ethers.Contract(
      this.contractAddress,
      abi,
      this.provider.getSigner()
    ) as NiftyContract;

    return address;
  }

  public getConnectedAddress(): string | null {
    if (!this.walletConnector) {
      return null;
    }

    return this.walletConnector.getConnectedAddress();
  }

  public getSigner(): ethers.Signer {
    return this.walletConnector.getSigner();
  }
}

export default Nifty;
