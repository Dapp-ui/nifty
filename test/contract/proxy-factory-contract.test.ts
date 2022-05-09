import '@nomiclabs/hardhat-waffle';
import { ethers, network, waffle } from 'hardhat';
import type { Nifty } from '../../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const { expect } = chai;

const maxSupply = 10;
const allowListPrice = 200;
const auctionDuration = 1 * 24 * 60 * 60; // days
const auctionStartPrice = 1000;
const auctionEndPrice = 200;
const priceDropInterval = 15 * 60; // minutes
const royaltyNumerator = 1000; // out of 10000

const originalBalance = ethers.BigNumber.from('10000000000000000000000');

describe('', function () {
  let nifty: Nifty;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    // reset the network to prevent tests from affecting each other
    await network.provider.send('hardhat_reset');

    const Nifty = await ethers.getContractFactory('Nifty');

    nifty = (await Nifty.deploy(
      user1.address,
      maxSupply,
      allowListPrice,
      auctionDuration,
      auctionStartPrice,
      auctionEndPrice,
      priceDropInterval,
      royaltyNumerator
    )) as Nifty;
  });
});
