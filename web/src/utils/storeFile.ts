// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_KEY: string = import.meta.env.VITE_NFT_STORAGE_KEY;

async function storeFile(blob: Blob) {
	const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

	// call client.store, passing in the image & metadata
	return nftstorage.storeBlob(blob);
}

export default storeFile;
