import dotenv from 'dotenv';
import * as hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';

dotenv.config();

// Deploys contract and sends
// hardhat ether to tester wallets
async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Using the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Contract = await hre.ethers.getContractFactory('Nifty');

  console.log('Attempting to deploy contract');

  // ARGS
  const maxSupply = 10;
  const allowListPrice = 200;
  const auctionDuration = 1 * 24 * 60 * 60; // days
  const auctionStartPrice = 1000;
  const auctionEndPrice = 200;
  const priceDropInterval = 15 * 60; // minutes
  const royaltyNumerator = 1000; // out of 10000

  const instance = await Contract.deploy(
    deployer.address,
    maxSupply,
    allowListPrice,
    auctionDuration,
    auctionStartPrice,
    auctionEndPrice,
    priceDropInterval,
    royaltyNumerator
  );
  await instance.deployed();

  console.log(`Contract deployed to address ${instance.address}`);

  const hardhatPrivateKey =
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  let wallet = new hre.ethers.Wallet(hardhatPrivateKey, hre.ethers.provider);

  let receiver1 = process.env.TESTER_1;
  let receiver2 = process.env.TESTER_2;

  let amountInEther = '1.0';

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

  console.log('SENT 1 ETH TO ', receiver1, receiver2);

  const balance = await hre.ethers.provider.getBalance(
    '0x5e7610698ba465973C11A607eAf43b7f1733D947'
  );

  console.log('THE BALANCE!!', balance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
