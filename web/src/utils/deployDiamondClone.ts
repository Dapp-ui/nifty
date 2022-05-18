import { ethers, ContractFactory } from 'ethers';
import niftyInstance from '../.././../embed/svelte/niftyInstance';
import diamondCloneContract from '../../../artifacts/contracts/DiamondClone.sol/DiamondClone.json';
import baseNFTFacetContract from '../../../artifacts/contracts/facets/BaseNFTFacet.sol/BaseNFTFacet.json';

const maxFeePerGas = 5000000000;
const maxPriorityFeePerGas = 3000000000;

async function deployDiamondClone(params: {
	diamondSawAddress: string;
	baseNFTFacetAddress: string;
	baseDiamondCloneFacetAddress: string;
}): Promise<string> {
	const { diamondSawAddress, baseNFTFacetAddress, baseDiamondCloneFacetAddress } = params;
	const signer = niftyInstance.getSigner();
	if (!signer) {
		throw new Error('Wallet must be connected to create a contract');
	}

	const baseNFTFacet = new ethers.Contract(baseNFTFacetAddress, baseNFTFacetContract.abi, signer);

	let functionCall = baseNFTFacet.interface.encodeFunctionData('init');

	const DiamondCloneFactory = new ContractFactory(
		diamondCloneContract.abi,
		diamondCloneContract.bytecode,
		signer
	);

	const diamondClone = await DiamondCloneFactory.deploy(
		diamondSawAddress,
		[baseDiamondCloneFacetAddress, baseNFTFacetAddress],
		baseNFTFacetAddress,
		functionCall,
		{ maxFeePerGas, maxPriorityFeePerGas }
	);

	console.log('Deploy Diamond Clone with txn hash', diamondClone.deployTransaction.hash);

	await diamondClone.deployed();

	return diamondClone.address;
}

export default deployDiamondClone;
