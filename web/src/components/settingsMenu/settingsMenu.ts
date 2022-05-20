import Nifty from '../../../../embed/Nifty';
import { idToFacetAddress } from '../../../../embed/utils/facetAddressMap';

export type MenuItem = {
	name: string;
	icon: string;
	id: string;
};

export const defaultMenuItems = [
	{
		name: 'Summary',
		icon: '⚙',
		id: 'summary'
	},
	{
		name: 'Tokens',
		icon: '᯽',
		id: 'tokens'
	},
	{
		name: 'Add Ons',
		icon: '+',
		id: 'add-ons'
	}
];

const otherMenuItemsByFacetAddress = {
	[idToFacetAddress['payment-splitter']]: [
		{
			name: 'Payments',
			icon: '÷',
			id: 'payment-splitter'
		}
	],
	[idToFacetAddress['lazy-mint']]: [
		{
			name: 'Embed',
			icon: '⏣',
			id: 'embed'
		}
	]
};

export const refreshMenuItems = async (
	contractAddress: string,
	nextFacets = []
): Promise<MenuItem[]> => {
	const nifty = new Nifty('rinkeby', contractAddress);
	const facetAddresses =
		nextFacets.length > 0 ? nextFacets : await nifty.diamondCloneFacet.facetAddresses();

	let allMenuItems = [...defaultMenuItems];

	for (let facetAddress of facetAddresses) {
		const menuItems = otherMenuItemsByFacetAddress[facetAddress.toLowerCase()];
		if (menuItems && menuItems.length) {
			allMenuItems = [...allMenuItems, ...menuItems];
		}
	}

	return allMenuItems;
};
