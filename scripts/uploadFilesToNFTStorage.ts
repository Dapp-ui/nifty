import { NFTStorage, File } from 'nft.storage';
import { getFilesFromPath } from 'files-from-path';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.NFT_STORAGE_TOKEN;

async function main() {
  const path = process.argv.slice(2);
  const files = await getFilesFromPath(path);

  const storage = new NFTStorage({ token });

  console.log(`storing ${files.length} file(s) from ${path}`);

  if (files.length < 1) {
    throw new Error('No files to upload');
  }

  //@ts-ignore
  const cid = await storage.storeDirectory(files, {
    pathPrefix: path,
  });

  console.log('THE CID: ', cid);

  const status = await storage.status(cid);
  console.log(status);
}
main();

export {};
