import '@nomiclabs/hardhat-ethers';
import * as hre from 'hardhat';

const { ethers } = hre;

var inquirer = require('inquirer');

const contractArgs = {
  mumbai: {
    Destructor: [],
    ChildTunnel: ['0xCf73231F28B7331BBe3124B907840A94851f9f11'],
    Nifty: [
      '0x5e7610698ba465973C11A607eAf43b7f1733D947', // wallet to withdraw to
      60, // max supply
      333, // allowList Price (wei)
      1 * 24 * 60 * 60, // auction duration (seconds)
      999, // auction start price (wei)
      333, // auction end price (wei)
      10 * 60, // price drop interval (seconds)
      1000, // royalty numerator out of 10000
    ],
  },
  goerli: {
    RootTunnel: ['0x2890bA17EfE978480615e330ecB65333b880928e'],
  },
  rinkeby: {
    Nifty: [
      '0x5e7610698ba465973C11A607eAf43b7f1733D947', // wallet to withdraw to
      60, // max supply
      ethers.utils.parseEther('.01'), // allowList Price (wei)
      1 * 24 * 60 * 60, // auction duration (seconds)
      ethers.utils.parseEther('.02'), // auction start price (wei)
      ethers.utils.parseEther('.01'), // auction end price (wei)
      10 * 60, // price drop interval (seconds)
      1000, // royalty numerator out of 10000
    ],
    Smokers: [
      '0x5e7610698ba465973C11A607eAf43b7f1733D947',
      '0xb374D0d55a3e432aeF1745bD207C5Ef58C8c7FE8',
      10000,
      hre.ethers.utils.parseEther('0.0240'),
      hre.ethers.utils.parseEther('0.0420'),
      5,
    ],
  },
  mainnet: {
    Smokers: [
      '0x9aaB8649A947bd03e92B413dc1b4e495aBf8C6cc',
      '0x8FBb56A5e54080791d0D3F0CFB3f03f5029aDaB5',
      10000,
      hre.ethers.utils.parseEther('0.0240'),
      hre.ethers.utils.parseEther('0.0420'),
      5,
    ],
  },
  hardhat: {},
  polygon: {
    Nifty: [
      '0xd54bFc7C30E41C1c362d7C1f5ff765CC16F4e9b3', // wallet to withdraw to
      60, // max supply
      ethers.utils.parseEther('333'), // allowList Price (wei)
      1 * 24 * 60 * 60, // auction duration (seconds)
      ethers.utils.parseEther('1933'), // auction start price (wei)
      ethers.utils.parseEther('333'), // auction end price (wei)
      10 * 60, // price drop interval (seconds)
      1000, // royalty numerator out of 10000
    ],
    Destructor: [],
  },
  local: {
    Nifty: [],
  },
};

function confirmDeploy(contractName, network, args) {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'confirm',
          message: `Are you sure you want to deploy ${contractName} to ${network} with the following args: ${args.join(
            ', '
          )} (y/n)`,
        },
      ])
      .then((answer) => {
        resolve(answer.confirm.toLowerCase() === 'y');
      })
      .catch(() => {
        resolve(false);
      });
  });
}

function getContractName(network): Promise<string> {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'contract',
          message: `What contract would you like to deploy to ${network}? (case sensitive)`,
        },
      ])
      .then((answer) => {
        resolve(answer.contract);
      })
      .catch(() => {
        resolve('');
      });
  });
}

async function main() {
  const network = hre.network.name;

  const contract = await getContractName(network);

  if (!contractArgs[network] || !contractArgs[network][contract]) {
    throw new Error(
      'No contract arguments found for this network and contract'
    );
  }

  const args = contractArgs[network][contract];
  const [deployer] = await ethers.getSigners();

  console.log('Using the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Contract = await ethers.getContractFactory(contract);
  const confirmed = await confirmDeploy(contract, network, args);

  if (!confirmed) {
    console.log('Exiting without deploy');
    return;
  }

  console.log('Attempting to deploy contract');

  const instance = await Contract.deploy(...args);
  await instance.deployed();

  console.log(`Contract ${contract} deployed to address ${instance.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
