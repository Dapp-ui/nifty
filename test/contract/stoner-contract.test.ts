import '@nomiclabs/hardhat-waffle';
import { ethers, network, waffle } from 'hardhat';
import type { Smokers } from '../../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const { expect } = chai;

const maxSupply = 10;
const allowListPrice = 200;
const mintPrice = 400;

const originalBalance = ethers.BigNumber.from('10000000000000000000000');

describe('TestSmokersContract', function () {
  let nifty: Smokers;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    // reset the network to prevent tests from affecting each other
    await network.provider.send('hardhat_reset');

    const Nifty = await ethers.getContractFactory('Smokers');

    nifty = (await Nifty.deploy(
      owner.address,
      user1.address,
      maxSupply,
      allowListPrice,
      mintPrice,
      5
    )) as Smokers;
  });

  it('should fail to mint if the sale has not started', async function () {
    await expect(nifty.mint(1)).to.eventually.be.rejectedWith(
      'Smokers: sale is closed'
    );
  });

  it('should fail to mint if not on the allowlist', async function () {
    await nifty.setSaleState(1);
    await expect(
      nifty.mint(1, { value: allowListPrice })
    ).to.eventually.be.rejectedWith(
      'Smokers: sender does not have enough allow list entries'
    );
  });

  it('should mint the first allowList entry, but fail to mint after the allowList entry is used', async function () {
    await nifty.setAllowListEntries(owner.address, 1);
    await nifty.setSaleState(1);

    await nifty.mint(1, { value: allowListPrice });
    const ownerAddress = await nifty.ownerOf(1);
    expect(ownerAddress).to.equal(owner.address);

    await expect(
      nifty.mint(1, { value: allowListPrice })
    ).to.eventually.be.rejectedWith(
      'Smokers: sender does not have enough allow list entries'
    );
  });

  it('should fail to mint for insufficient funds on the allowList', async function () {
    await nifty.setSaleState(1);
    await expect(
      nifty.mint(1, { value: allowListPrice - 1 })
    ).to.eventually.be.rejectedWith('Smokers: not enough funds sent');
  });

  it('should update the baseURI appropriately', async function () {
    await nifty.setAllowListEntries(owner.address, 1);
    await nifty.setSaleState(1);

    await nifty.mint(1, { value: allowListPrice });

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

    await expect(nonOwnerContract.withdraw()).to.be.eventually.rejectedWith(
      'Ownable'
    );
  });

  it('should fail to mint after max supply is reached', async function () {
    await nifty.setAllowListEntries(owner.address, 20);
    await nifty.setSaleState(1);
    for (let i = 0; i < maxSupply; i++) {
      await nifty.mint(1, { value: allowListPrice });
    }

    await expect(
      nifty.mint(1, { value: allowListPrice })
    ).to.eventually.be.rejectedWith('Smokers: none left');
  });

  it('should properly withdraw balance to external wallet', async function () {
    await nifty.setAllowListEntries(owner.address, 10);
    await nifty.setSaleState(1);

    await nifty.mint(1, { value: allowListPrice });

    const ogBalance = await waffle.provider.getBalance(user1.address);

    expect(ogBalance).to.equal(originalBalance);

    await nifty.withdraw();

    const balance = await waffle.provider.getBalance(user1.address);

    expect(balance).to.equal(originalBalance.add(allowListPrice));
  });

  it('should support minting multiple NFTs via allowList', async function () {
    await nifty.setSaleState(1);
    await nifty.setAllowListEntries(owner.address, 2);
    await nifty.mint(2, { value: allowListPrice * 2 });

    const numMinted = await nifty.totalMinted();

    expect(numMinted).to.equal(2);

    const ownerOf1 = await nifty.ownerOf(1);
    expect(ownerOf1).to.equal(owner.address);

    const ownerOf2 = await nifty.ownerOf(2);
    expect(ownerOf2).to.equal(owner.address);
  });

  it('should reject attempting to mint too many via allowList', async function () {
    await nifty.setSaleState(1);
    await nifty.setAllowListEntries(owner.address, 2);
    await expect(
      nifty.mint(3, { value: allowListPrice * 3 })
    ).to.eventually.be.rejectedWith(
      'Smokers: sender does not have enough allow list entries'
    );
  });

  it('should issue an event for the mint', async function () {
    await nifty.setSaleState(1);
    await nifty.setAllowListEntries(owner.address, 1);
    await expect(nifty.mint(1, { value: allowListPrice * 1 }))
      .to.emit(nifty, 'Transfer')
      .withArgs('0x0000000000000000000000000000000000000000', owner.address, 1);
  });

  it('should return an appropriate map of owners', async function () {
    await nifty.setSaleState(1);
    await nifty.setAllowListEntries(owner.address, 2);
    await nifty.mint(2, { value: allowListPrice * 2 });

    const owners = await nifty.allOwners();

    const expectedOwners = new Array(maxSupply + 1).fill(
      '0x0000000000000000000000000000000000000000'
    );

    expectedOwners[1] = owner.address;
    expectedOwners[2] = owner.address;

    expect(owners).to.eql(expectedOwners);
  });

  it('the owner should be able to mint for free without the sale enabled', async function () {
    await nifty.devMint(2);

    const ownerOf1 = await nifty.ownerOf(1);
    expect(ownerOf1).to.equal(owner.address);

    const ownerOf2 = await nifty.ownerOf(2);
    expect(ownerOf2).to.equal(owner.address);
  });

  it('should allow for multiple people to be added to the whitelist simultaneously', async function () {
    await nifty.setMultipleAllowListEntries([owner.address, user1.address], 2);

    const ownerNum = await nifty.numAllowListEntries(owner.address);
    const user1Num = await nifty.numAllowListEntries(user1.address);

    expect(ownerNum).to.equal(2);
    expect(user1Num).to.equal(2);
  });

  it('should respect a new max supply if it is set', async function () {
    await nifty.setMaxSupply(1);

    await nifty.devMint(1);
    await expect(nifty.devMint(1)).to.eventually.be.rejectedWith(
      'Smokers: none left'
    );
  });

  it('should allow the owner to set allowlist prices', async function () {
    await nifty.setAllowListPrice(220);

    const allowListPrice = await nifty.allowListPrice();

    expect(allowListPrice).to.equal(220);
  });
});
