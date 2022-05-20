import { CurrencyUnit, Network, SaleState } from './types';
import { BigNumber, ethers } from 'ethers';
import rpcUrlFromNetwork from './utils/rpcUrlFromNetwork';
import isWriteProvider from './utils/isWriteProvider';
import type WalletConnector from './WalletConnector';
import type {
  BaseNFTFacet,
  BaseDiamondCloneFacet,
  LazyMintFacet,
  PaymentSplitterFacet,
} from '../typechain-types';

import diamondCloneFacet from '../artifacts/contracts/facets/DiamondClone/BaseDiamondCloneFacet.sol/BaseDiamondCloneFacet.json';
import facetAddressMap from './utils/facetAddressMap';

interface NFT {
  id: number;
  uri: string;
}

class Nifty {
  private contractAddress: string;
  private provider: ethers.providers.Provider;
  private network: Network;
  private walletConnector: WalletConnector;

  // Facets!!!
  public diamondCloneFacet: BaseDiamondCloneFacet;
  private baseNFTFacet: BaseNFTFacet;
  public paymentSplitterFacet: PaymentSplitterFacet;
  public lazyMintFacet: LazyMintFacet;

  constructor(
    network: Network,
    contractAddress: string,
    walletConnector: WalletConnector,
    provider: ethers.providers.Provider = null
  ) {
    // running in the browser
    if (typeof window !== 'undefined') {
      // @ts-ignore - useful for debugging
      window.ethers = ethers;
    }

    this.walletConnector = walletConnector;
    this.contractAddress = contractAddress;
    this.network = network;

    const rpcUrl = rpcUrlFromNetwork(this.network);

    // allow a passed provider to be used!
    this.provider = provider || new ethers.providers.JsonRpcProvider(rpcUrl);

    if (walletConnector) {
      walletConnector.addConnectListener(() => {
        this.onWalletConnectCallback();
      });
    }

    this.initializeFacets();
  }

  private _initFacet(address) {
    const info = facetAddressMap[address.toLowerCase()];

    if (!info) {
      return;
    }

    const { type, abi } = info;

    const contract = new ethers.Contract(
      this.contractAddress,
      abi,
      this._getSigner() || this.provider
    );

    switch (type) {
      case 'base-nft':
        this.baseNFTFacet = contract as BaseNFTFacet;
        break;
      case 'payment-splitter':
        this.paymentSplitterFacet = contract as PaymentSplitterFacet;
        break;
      case 'lazy-mint':
        this.lazyMintFacet = contract as LazyMintFacet;
        break;
    }
  }

  public async initializeFacets() {
    if (!this.contractAddress) {
      return;
    }

    this.diamondCloneFacet = new ethers.Contract(
      this.contractAddress,
      diamondCloneFacet.abi,
      this._getSigner() || this.provider
    ) as BaseDiamondCloneFacet;

    const facetAddresses = await this.diamondCloneFacet.facetAddresses();

    for (let facetAddress of facetAddresses) {
      this._initFacet(facetAddress);
    }
  }

  public async nextPriceDropTime(): Promise<number> {
    // const auctionStartSeconds = await this.baseNFTFacet.auctionStartAt();
    // const auctionStart = auctionStartSeconds.mul(1000).toNumber();

    // const intervalSeconds = await this.baseNFTFacet.dutchAuctionPriceDropInterval();

    // const interval = intervalSeconds.mul(1000).toNumber();

    // const nextIntervalNum =
    //   Math.floor((Date.now() - auctionStart) / interval) + 1;

    // const nextPriceDropTime = auctionStart + nextIntervalNum * interval;

    // return nextPriceDropTime;
    return 0;
  }

  public async devMint(to: string, count = 1, tokenURI?: string) {
    if (tokenURI) {
      return this.baseNFTFacet.devMintWithTokenURI(to, tokenURI);
    }

    return this.baseNFTFacet.devMint(to, count);
  }

  public async mintPrice(unit: CurrencyUnit = 'wei'): Promise<string> {
    const priceWei = await this.mintPriceWei();

    return ethers.utils.formatUnits(priceWei, unit);
  }

  public async saleState(): Promise<SaleState> {
    return (await this.baseNFTFacet.saleState()).toNumber();
  }

  public async maxMintable(): Promise<number> {
    return (await this.baseNFTFacet.maxMintable()).toNumber();
  }

  public async totalNumMinted(): Promise<number> {
    return (await this.baseNFTFacet.totalMinted()).toNumber();
  }

  onWalletConnectCallback() {
    this.provider = this.walletConnector.getProvider();

    if (!isWriteProvider(this.provider)) {
      throw new Error('Connected wallet has no signer');
    }

    this.initializeFacets();
  }

  public getConnectedAddress(): string | null {
    if (!this.walletConnector) {
      return null;
    }

    return this.walletConnector.getConnectedAddress();
  }

  private _getSigner(): ethers.Signer {
    if (this.walletConnector) {
      return this.walletConnector.getSigner();
    }

    return null;
  }

  public async mint(count: number): Promise<string> {
    if (!isWriteProvider(this.provider)) {
      throw new Error(
        'No write privileges to mint, please connect wallet first'
      );
    }

    const price = await this.mintPriceWei();

    const address = await this.provider.getSigner().getAddress();
    const saleState = (await this.baseNFTFacet.saleState()).toNumber();

    let txn;

    switch (saleState) {
      case SaleState.CLOSED:
        throw new Error('Sale is closed');
      case SaleState.PUBLIC:
        // txn = await this.baseNFTFacet.publicMint(count, {
        //   from: address,
        //   value: price.mul(count),
        // });
        break;
      case SaleState.ALLOW_LIST:
      // txn = await this.baseNFTFacet.allowListMint(count, {
      //   from: address,
      //   value: price.mul(count),
      // });
    }

    const txnResult = await txn.wait();

    return txnResult.transactionHash;
  }

  // TODO
  public async ownedNFTs(): Promise<NFT[]> {
    return [];
    // if (!isWriteProvider(this.provider)) {
    //   throw new Error('No signer detected, wallet may not be connected');
    // }
    // const allOwners = await this.baseNFTFacet.allOwners();
    // const address = await this.provider.getSigner().getAddress();
    // const ownedIds = Object.keys(allOwners).filter((idStr) => {
    //   const id = parseInt(idStr);
    //   return allOwners[id] === address;
    // });
    // const ownedNFTPromises = ownedIds.map(async (stringId): Promise<NFT> => {
    //   const id = parseInt(stringId);
    //   const uri = await this.baseNFTFacet.tokenURI(id);
    //   return {
    //     id,
    //     uri,
    //   };
    // });
    // return await Promise.all(ownedNFTPromises);
  }

  // TODO - implement
  private async mintPriceWei(): Promise<BigNumber> {
    const saleState = await this.saleState();

    switch (saleState) {
      case SaleState.DUTCH_AUCTION:
      // return await this.baseNFTFacet.getAuctionPrice();
      case SaleState.ALLOW_LIST:
      // return await this.baseNFTFacet.allowListPrice();
      default:
      // return await this.baseNFTFacet.publicMintPrice();
    }

    return BigNumber.from(0);
  }
}

export default Nifty;
