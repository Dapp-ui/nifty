import { idToFacetAddress } from '../../../../../embed/utils/facetAddressMap';

export const addons = [
	{
		id: 'payment-splitter',
		name: 'Payment Splitter',
		icon: '÷',
		facetAddress: idToFacetAddress['payment-splitter'],
		description:
			'Withdraw funds from your contract in a transparent way. Set % splits between your teammates and divy up the revenue from your NFT sales and royalties.'
	},
	{
		id: 'lazy-mint',
		name: 'Lazy Mint',
		icon: '⏾',
		facetAddress: idToFacetAddress['lazy-mint'],
		description:
			'Minting tokens yourself and listing them on secondary platforms can be expensive and time consuming. Lazy mint allows your holders to mint NFTs from your collection themselves, so gas cost is passed to the end minter.'
	},
	{
		id: 'random-mint',
		name: 'Random Mint',
		icon: '⚄',
		description:
			'A random mint is when users do not know what NFT they will receive. We provide a "provenance hash" and a "cut" value to mathmatically prove the mint was fair and random.',
		comingSoon: true
	},
	{
		id: 'allowlist',
		name: 'Allowlist',
		icon: '☑',
		description:
			'If you only want certain people to purchase your collection, you can gate who can buy with an Allowlist. Only addresses on the allow list will be able to purchase during an allowlist sale.',
		comingSoon: true
	},
	{
		id: 'refundable-auction',
		name: 'Refundable Auction',
		icon: '⇟',
		description:
			'Refundable Auction is a variation of the Dutch Auction. The price starts high and goes down at a specified time interval. The only difference is if you purchase early and the collection sells out at a lower price, you will be refunded the difference',
		comingSoon: true
	}
];

export const addonsMap: { [key: string]: any } = addons.reduce((acc, currentAddon) => {
	return {
		...acc,
		[currentAddon.id]: currentAddon
	};
}, {});
