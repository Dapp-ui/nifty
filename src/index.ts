import { Network, SaleState } from './types';
import { ethers } from 'ethers';
import abi from './abi';
import chainIdFromNetwork from './utils/chainIdFromNetwork';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface NFT {
  id: number;
  uri: string;
}

class Nifty {
  private contractAddress: string;
  private network: Network;
  private signer: ethers.providers.JsonRpcSigner = null;
  private contract: ethers.Contract;

  constructor(network: Network, contractAddress: string) {
    this.contractAddress = contractAddress;
    this.network = network;
  }

  public async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('No Metamask has been installed');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send('wallet_switchEthereumChain', [
      { chainId: chainIdFromNetwork(this.network) },
    ]);

    await provider.send('eth_requestAccounts', []);

    this.signer = provider.getSigner();

    this.contract = new ethers.Contract(this.contractAddress, abi, this.signer);

    return await this.signer.getAddress();
  }

  public async getConnectedWallet(): Promise<string> {
    return await this.signer.getAddress();
  }

  public async mint(count: number): Promise<NFT[]> {
    const price = await this.mintPrice();
    const txn = await this.contract.plantTrees(count, { value: price * count });

    const result = await txn.wait();

    return result as NFT[];
  }

  public async mintPrice(): Promise<number> {
    const saleState = await this.saleState();

    switch (saleState) {
      case 'openAuction':
        return await this.contract.getCurrentAuctionPrice();
      default:
        return await this.contract.ALLOWLIST_PRICE();
    }
  }

  public async saleState(): Promise<SaleState> {
    const numMinted = await this.contract.numMinted();
    const maxSupply = await this.contract.MAX_SUPPLY();

    if (numMinted === maxSupply) {
      return 'soldOut';
    }

    const isSaleOpen = await this.contract.getSaleState();
    const auctionStart = await this.contract.AUCTION_START_AT();

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
    const allOwners = await this.contract.owners();

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
