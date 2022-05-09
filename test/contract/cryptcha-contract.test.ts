import '@nomiclabs/hardhat-waffle';
import { ethers, network, waffle } from 'hardhat';
import type { Cryptcha } from '../../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { assert } from 'console';

chai.use(chaiAsPromised);

const { expect } = chai;

const maxSupply = 10;
const mintPrice = 400;

const originalBalance = ethers.BigNumber.from('10000000000000000000000');

describe('TestCryptchaContract', function () {
  let nifty: Cryptcha;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let creator: SignerWithAddress;
  let dev: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1, creator, dev] = await ethers.getSigners();

    // reset the network to prevent tests from affecting each other
    await network.provider.send('hardhat_reset');

    const Nifty = await ethers.getContractFactory('Cryptcha');

    nifty = (await Nifty.deploy(
      creator.address,
      dev.address,
      maxSupply,
      mintPrice,
      7
    )) as Cryptcha;
  });

  it('should fail to mint if the sale has not started', async function () {
    await expect(nifty.mint(1)).to.eventually.be.rejectedWith(
      'Cryptcha: sale is closed'
    );
  });

  it('should fail to mint for insufficient funds', async function () {
    await nifty.setSaleState(1);
    await expect(
      nifty.mint(1, { value: mintPrice - 1 })
    ).to.eventually.be.rejectedWith('Cryptcha: not enough funds sent');
  });

  it('should update the baseURI appropriately', async function () {
    await nifty.setSaleState(1);

    await nifty.mint(1, { value: mintPrice });

    const ogURI = await nifty.tokenURI(1);

    expect(ogURI).to.equal('ipfs://1');

    await nifty.setBaseURI('ipfs://blah/');

    const newURI = await nifty.tokenURI(1);

    expect(newURI).to.equal('ipfs://blah/1');
  });

  it('should reject appropriate calls when made by a non owner account', async function () {
    const nonOwnerContract = nifty.connect(user1);

    await expect(
      nonOwnerContract.setSaleState(1)
    ).to.be.eventually.rejectedWith('Ownable');

    await expect(
      nonOwnerContract.setBaseURI('blah')
    ).to.be.eventually.rejectedWith('Ownable');

    await expect(
      nonOwnerContract.devMint(owner.address, 1)
    ).to.be.eventually.rejectedWith('Ownable');

    await expect(nonOwnerContract.withdraw()).to.be.eventually.rejectedWith(
      'Ownable'
    );
  });

  it('should fail to mint after max supply is reached', async function () {
    await nifty.setSaleState(1);
    for (let i = 0; i < maxSupply; i++) {
      await nifty.mint(1, { value: mintPrice });
    }

    await expect(
      nifty.mint(1, { value: mintPrice })
    ).to.eventually.be.rejectedWith('Cryptcha: none left');
  });

  it('should properly withdraw balance and split value with dev', async function () {
    await nifty.setSaleState(1);

    await nifty.mint(1, { value: mintPrice });

    const ogBalance = await waffle.provider.getBalance(creator.address);

    expect(ogBalance).to.equal(originalBalance);

    await nifty.withdraw();

    const creatorBalance = await waffle.provider.getBalance(creator.address);
    const devBalance = await waffle.provider.getBalance(dev.address);

    expect(creatorBalance).to.equal(
      originalBalance.add((mintPrice * 93) / 100)
    );

    expect(devBalance).to.equal(originalBalance.add((mintPrice * 7) / 100));
  });

  it('should support minting multiple NFTs via allowList', async function () {
    await nifty.setSaleState(1);
    await nifty.mint(2, { value: mintPrice * 2 });

    const numMinted = await nifty.totalMinted();

    expect(numMinted).to.equal(2);

    const ownerOf1 = await nifty.ownerOf(1);
    expect(ownerOf1).to.equal(owner.address);

    const ownerOf2 = await nifty.ownerOf(2);
    expect(ownerOf2).to.equal(owner.address);
  });

  it('should issue an event for the mint', async function () {
    await nifty.setSaleState(1);
    await expect(nifty.mint(1, { value: mintPrice * 1 }))
      .to.emit(nifty, 'Transfer')
      .withArgs('0x0000000000000000000000000000000000000000', owner.address, 1);
  });

  it('should return an appropriate map of owners', async function () {
    await nifty.setSaleState(1);
    await nifty.mint(2, { value: mintPrice * 2 });

    const owners = await nifty.allOwners();

    const expectedOwners = new Array(maxSupply + 1).fill(
      '0x0000000000000000000000000000000000000000'
    );

    expectedOwners[1] = owner.address;
    expectedOwners[2] = owner.address;

    expect(owners).to.eql(expectedOwners);
  });

  it('the owner should be able to mint for free without the sale enabled', async function () {
    await nifty.devMint(owner.address, 2);

    const ownerOf1 = await nifty.ownerOf(1);
    expect(ownerOf1).to.equal(owner.address);

    const ownerOf2 = await nifty.ownerOf(2);
    expect(ownerOf2).to.equal(owner.address);
  });

  it('should respect a new max supply if it is set', async function () {
    await nifty.setMaxSupply(1);

    await nifty.devMint(owner.address, 1);
    await expect(nifty.devMint(owner.address, 1)).to.eventually.be.rejectedWith(
      'Cryptcha: none left'
    );
  });

  it('should be able to set the public mint price', async function () {
    await nifty.setSaleState(1);
    await nifty.setPublicMintPrice(1000);

    await expect(
      nifty.mint(1, { value: mintPrice })
    ).to.eventually.be.rejectedWith('Cryptcha: not enough funds sent');

    await nifty.mint(1, { value: 1000 });

    const owner1 = await nifty.ownerOf(1);
    expect(owner1).to.equal(owner.address);
  });

  it('should limit the mint to 5 per txn', async function () {
    await nifty.setSaleState(1);
    await expect(nifty.mint(6, { value: 6 * mintPrice })).to.be.rejectedWith(
      'Cryptcha: Cannot mint more than 5 tokens at once'
    );

    await nifty.mint(5, { value: 5 * mintPrice });
    await nifty.mint(5, { value: 5 * mintPrice });

    const owner1 = await nifty.ownerOf(10);
    expect(owner1).to.equal(owner.address);
  });
});
