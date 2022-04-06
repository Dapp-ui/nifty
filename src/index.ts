import { CurrencyUnit, Network, SaleState } from './types';
import { BigNumber, ethers } from 'ethers';
import abi from './abi';
import rpcUrlFromNetwork from './utils/rpcUrlFromNetwork';
import isWriteProvider from './utils/isWriteProvider';

interface NFT {
  id: number;
  uri: string;
}

class Nifty {
  private contractAddress: string;
  private signer: ethers.providers.JsonRpcSigner = null;
  private contract: ethers.Contract;
  private provider: ethers.providers.Provider;
  private network: Network;

  constructor(network: Network, contractAddress: string) {
    // running in the browser
    if (typeof window !== 'undefined') {
      // @ts-ignore - TODO fix this
      window.ethers = ethers;
    }

    this.contractAddress = contractAddress;
    this.network = network;

    const rpcUrl = rpcUrlFromNetwork(this.network);
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    this.contract = new ethers.Contract(
      this.contractAddress,
      abi,
      this.provider
    );
  }

  public async nextPriceDropTime(): Promise<number> {
    const auctionStart = (await this.contract.auctionStartAt()) * 1000;
    const interval =
      (await this.contract.dutchAuctionPriceDropInterval()) * 1000;

    const nextIntervalNum =
      Math.floor((Date.now() - auctionStart) / interval) + 1;

    const nextPriceDropTime = auctionStart + nextIntervalNum * interval;

    return nextPriceDropTime;
  }

  public async mint(count: number): Promise<NFT[]> {
    if (!isWriteProvider(this.provider)) {
      throw new Error(
        'No write privileges to mint, please connect wallet first'
      );
    }

    const price = await this.mintPriceWei();

    const address = await this.signer.getAddress();

    const txn = await this.contract.mint(count, {
      from: address,
      value: price.mul(count),
    });

    const txnResult = await txn.wait();

    return txnResult.transactionHash;
  }

  private async mintPriceWei(): Promise<BigNumber> {
    const saleState = await this.saleState();

    switch (saleState) {
      case 'openAuction':
        return await this.contract.getAuctionPrice();
      default:
        return await this.contract.allowListPrice();
    }
  }

  public async mintPrice(unit: CurrencyUnit = 'wei'): Promise<string> {
    const priceWei = await this.mintPriceWei();

    return ethers.utils.formatUnits(priceWei, unit);
  }

  public async saleState(): Promise<SaleState> {
    const numMinted = await this.contract.numMinted();
    const maxSupply = await this.contract.maxSupply();

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
    return await this.contract.maxSupply();
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
