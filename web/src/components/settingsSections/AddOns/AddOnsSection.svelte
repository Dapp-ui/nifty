<script lang="ts">
	import { primaryColor } from '../../../globalStyles';

	import GenericButton from '../../../../../embed/svelte/parts/GenericButton.svelte';
	import AddOnItem from './AddOnItem.svelte';

	let addons = [
		{
			id: 'payment-splitter',
			name: 'Payment Splitter',
			icon: '÷',
			description:
				'Withdraw funds from your contract in a transparent way. Set % splits between your teammates and divy up the revenue from your NFT sales and royalties.'
		},
		{
			id: 'lazy-mint',
			name: 'Lazy Mint',
			icon: '⏾',
			description:
				'Minting tokens yourself and listing them on secondary platforms can be expensive and time consuming. Lazy mint allows your holders to mint NFTs from your collection themselves, so gas cost is passed to the end minter.'
		},
		{
			id: 'random-mint',
			name: 'Random Mint',
			icon: '⚄',
			description:
				'A random mint is when users do not know what NFT they will receive. We provide a "provenance hash" and a "cut" value to mathmatically prove the mint was fair and random.'
		},
		{
			id: 'allowlist',
			name: 'Allowlist',
			icon: '☑',
			description:
				'If you only want certain people to purchase your collection, you can gate who can buy with an Allowlist. Only addresses on the allow list will be able to purchase during an allowlist sale.'
		},
		{
			id: 'refundable-auction',
			name: 'Refundable Auction',
			icon: '⇟',
			description:
				'Refundable Auction is a variation of the Dutch Auction. The price starts high and goes down at a specified time interval. The only difference is if you purchase early and the collection sells out at a lower price, you will be refunded the difference'
		}
	];

	let currDescriptionIndex = 0;

	$: descriptionItem = addons[currDescriptionIndex];

	let selectedIds: { [key: string]: boolean } = {};

	const handleClick = () => {};
	const toggleItem = (index: number) => {
		const id = addons[index].id;
		selectedIds[id] = !selectedIds[id];
	};
	const onHover = (index: number) => {
		currDescriptionIndex = index;
	};
</script>

<div class="descriptionsContainer">
	<div class="descriptionTitle">
		<span class="icon">{descriptionItem.icon}</span>
		{descriptionItem.name}
		<span class="icon">{descriptionItem.icon}</span>
	</div>
	<div class="descriptionBody">
		{descriptionItem.description}
	</div>
</div>

<div class="addOnsContainer">
	{#each addons as addon, index}
		<AddOnItem {...addon} {index} {toggleItem} {onHover} selected={selectedIds[addon.id]} />
	{/each}
</div>

<GenericButton
	title="Update Add Ons"
	{handleClick}
	width={200}
	height={50}
	backgroundColor={primaryColor}
/>

<style>
	.descriptionsContainer {
		margin-top: 25px;
		max-width: 600px;
		height: 150px;
		text-align: center;
	}

	.descriptionTitle {
		font-size: 24px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.descriptionBody {
		color: grey;
	}

	.addOnsContainer {
		margin-top: 20px;
		margin-bottom: 70px;
		display: flex;
		align-items: center;
		flex-direction: row;
		overflow-y: scroll;
	}

	.icon {
		font-size: 45px;
		margin: 10px;
	}

	.addOnsContainer::-webkit-scrollbar {
		display: none;
	}
</style>
