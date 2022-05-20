import { ethers } from 'ethers';
import Nifty from '../../../embed/Nifty';
import walletConnector from '../../../embed/svelte/walletConnectorInstance';
import facetAddressMap, { idToFacetAddress } from '../../../embed/utils/facetAddressMap';
import { getSelectors } from '../../../scripts/libraries/diamond';

enum FacetCutAction {
	Add = 0,
	Replace = 1,
	Remove = 2
}

const createFacetCutItem = (facetAddress: string, action: FacetCutAction) => {
	// @ts-ignore
	const contract = new ethers.Contract(facetAddress, facetAddressMap[facetAddress].abi);

	return {
		facetAddress,
		action,
		functionSelectors: getSelectors(contract)
	};
};

const diamondCut = async (diamondAddress: string, selectedFacetAddresses: string[]) => {
	const nifty = new Nifty('rinkeby', diamondAddress, walletConnector);

	const nextFacets = [
		idToFacetAddress['base-diamond'],
		idToFacetAddress['base-nft'],
		...selectedFacetAddresses
	];
	const currFacets = (await nifty.diamondCloneFacet.facetAddresses()).map((key) =>
		key.toLowerCase()
	);

	let cut = [];

	for (let facetAddress of nextFacets) {
		if (!currFacets.includes(facetAddress)) {
			const facetCutAdd = createFacetCutItem(facetAddress, FacetCutAction.Add);
			cut.push(facetCutAdd);
		}
	}

	for (let facetAddress of currFacets) {
		if (!nextFacets.includes(facetAddress)) {
			const facetCutRemove = createFacetCutItem(facetAddress, FacetCutAction.Remove);
			cut.push(facetCutRemove);
		}
	}

	const tx = await nifty.diamondCloneFacet.diamondCut(cut, ethers.constants.AddressZero, '0x');

	await tx.wait();
};

export default diamondCut;
