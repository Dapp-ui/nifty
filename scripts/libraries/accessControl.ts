import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import '@nomiclabs/hardhat-waffle';
import { Contract } from 'ethers';
const { assert, expect } = require('chai');

export async function checkAdminFuncs(
  contract: Contract,
  nonOwner: SignerWithAddress,
  calls: { signature: string; args: any[]; operator?: boolean }[]
) {
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
