import dotenv from 'dotenv';
import * as hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import type { Smokers } from '../typechain-types';

dotenv.config();

// Deploys contract and sends
// hardhat ether to tester wallets
async function main() {
  const [deployer, creator, dev] = await hre.ethers.getSigners();

  console.log('Using the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Contract = await hre.ethers.getContractFactory('Smokers');

  console.log('Attempting to deploy contract');

  // ARGS
  // const maxSupply = 10;
  // const allowListPrice = hre.ethers.utils.parseEther('0.1');
  // const auctionDuration = 1 * 24 * 60 * 60; // days
  // const auctionStartPrice = hre.ethers.utils.parseEther('0.2');
  // const auctionEndPrice = hre.ethers.utils.parseEther('0.1');
  // const priceDropInterval = 15 * 60; // minutes
  // const royaltyNumerator = 1000; // out of 10000

  // const instance = (await Contract.deploy(
  //   deployer.address,
  //   maxSupply,
  //   allowListPrice,
  //   auctionDuration,
  //   auctionStartPrice,
  //   auctionEndPrice,
  //   priceDropInterval,
  //   royaltyNumerator
  // )) as Nifty;

  const maxSupply = 10;

  const allowListPrice = hre.ethers.utils.parseEther('0.1');
  const publicSalePrice = hre.ethers.utils.parseEther('0.2');
  const devShare = 5;

  const instance = (await Contract.deploy(
    creator.address,
    dev.address,
    maxSupply,
    allowListPrice,
    publicSalePrice,
    devShare
  )) as Smokers;

  await instance.deployed();

  console.log(`Contract deployed to address ${instance.address}`);

  const hardhatPrivateKey =
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  let wallet = new hre.ethers.Wallet(hardhatPrivateKey, hre.ethers.provider);

  let receiver1 = process.env.TESTER_1;
  let receiver2 = process.env.TESTER_2;

  let amountInEther = '4.0';

  let tx1 = {
    to: receiver1,
    value: hre.ethers.utils.parseEther(amountInEther),
  };

  let tx2 = {
    to: receiver2,
    value: hre.ethers.utils.parseEther(amountInEther),
  };

  // Send a transaction
  await wallet.sendTransaction(tx1);
  await wallet.sendTransaction(tx2);

  console.log('SENT 4 ETH TO ', receiver1, receiver2);

  // Add testers to allowlist
  await instance.setMultipleAllowListEntries([receiver1, receiver2], 4);
  await instance.setSaleState(1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
