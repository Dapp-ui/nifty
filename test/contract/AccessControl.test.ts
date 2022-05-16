import '@nomiclabs/hardhat-waffle';

const { deployDiamond } = require('../../scripts/deployDiamondSaw.js');

import { BaseNFTFacet } from '../../typechain-types';

const { assert, expect } = require('chai');
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const cutAbi = require('../../artifacts/contracts/facets/DiamondClone/DiamondCloneCutFacet.sol/DiamondCloneCutFacet.json');

async function checkAdminFuncs(contract, nonOwner, calls) {
  for (let call of calls) {
    let functionCall = contract.interface.encodeFunctionData(
      call.signature,
      call.args
    );

    const promise = nonOwner.sendTransaction({
      to: contract.address,
      data: functionCall,
    });

    await expect(promise).to.be.revertedWith(
      call.operator ? 'AccessControl: account' : 'Caller is not the owner'
    );
  }
}

describe('AccessControlTest', async function () {
  let diamondAddress,
    accessControlFacet,
    nonOwnerAccessControlFacet,
    contractOwner,
    nonOwner: SignerWithAddress,
    accounts;

  beforeEach(async function () {
    const data = await deployDiamond();
    diamondAddress = data.diamondAddress;
    accessControlFacet = (await ethers.getContractAt(
      'BaseNFTFacet',
      diamondAddress
    )) as BaseNFTFacet;

    accounts = await ethers.getSigners();
    contractOwner = accounts[0];
    nonOwner = accounts[1];

    nonOwnerAccessControlFacet = accessControlFacet.connect(
      nonOwner
    ) as BaseNFTFacet;
  });

  it('should only allow the owner to add or remove operators', async () => {
    await expect(
      nonOwnerAccessControlFacet.grantOperator(nonOwner.address)
    ).to.be.revertedWith('Caller is not the owner');

    await accessControlFacet.grantOperator(nonOwner.address);

    await nonOwnerAccessControlFacet.devMint(nonOwner.address, 1);

    const ownerof = await accessControlFacet.ownerOf(0);
    expect(ownerof).to.equal(nonOwner.address);
  });

  it('should renounce both owners and operators on an ownership renounce', async () => {
    await accessControlFacet.grantOperator(nonOwner.address);

    await accessControlFacet.renounceOwnership();

    await expect(
      nonOwnerAccessControlFacet.devMint(nonOwner.address, 1)
    ).to.be.revertedWith('Admin functionality revoked');
  });

  it('should allow ownership transfer by the current owner', async () => {
    await accessControlFacet.transferOwnership(nonOwner.address);

    await nonOwnerAccessControlFacet.devMint(nonOwner.address, 1);

    const ownerof = await accessControlFacet.ownerOf(0);
    expect(ownerof).to.equal(nonOwner.address);
  });

  it('should not allow operators to access owner functionality', async () => {
    await accessControlFacet.grantOperator(nonOwner.address);

    await expect(
      nonOwnerAccessControlFacet.setTokenMeta('blah', 'blah', 0)
    ).to.be.revertedWith('Caller is not the owner');
  });

  it('should allow for revoking of operator', async () => {
    await accessControlFacet.grantOperator(nonOwner.address);

    await accessControlFacet.revokeOperator(nonOwner.address);

    await expect(
      nonOwnerAccessControlFacet.devMint(nonOwner.address, 1)
    ).to.be.revertedWith('AccessControl: account ');
  });

  it('should properly gate all admin functions', async () => {
    const diamondFacetCalls = [
      {
        signature: 'diamondCut((address,uint8,bytes4[])[],address,bytes)',
        args: [[], ethers.constants.AddressZero, '0x'],
      },
      {
        signature: 'setGasCacheForSelector(bytes4)',
        args: ['0x00000000'],
        operator: true,
      },
      {
        signature: 'setImmutableUntilBlock(uint256)',
        args: [0],
      },
      {
        signature: 'upgradeDiamondSaw(address[],address[],address,bytes)',
        args: [[], [], ethers.constants.AddressZero, '0x'],
      },
    ];

    const baseNFTCalls = [
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
      {
        signature: '',
        args: [],
      },
    ];

    const diamondContract = await ethers.getContractAt(
      'BaseDiamondCloneFacet',
      diamondAddress
    );

    await checkAdminFuncs(diamondContract, nonOwner, diamondFacetCalls);
    await checkAdminFuncs(accessControlFacet, nonOwner, baseNFTCalls);
  });
});
