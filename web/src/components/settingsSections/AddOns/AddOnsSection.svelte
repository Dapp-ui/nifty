<script lang="ts">
	import { primaryColor } from '../../../globalStyles';

	import AddOnItem from './AddOnItem.svelte';
	import diamondCut from '../../../utils/diamondCut';
	import { addons, addonsMap } from './addOns';
	import LoaderButton from '../../../../../embed/svelte/parts/LoaderButton.svelte';

	let currDescriptionIndex = 0;
	let isLoading = false;
	export let contractAddress: string;
	export let onChange: () => void;

	$: descriptionItem = addons[currDescriptionIndex];

	let selectedIds: { [key: string]: boolean } = {};

	const handleClick = async () => {
		isLoading = true;
		const selectedAddonFacets = Object.keys(selectedIds)
			.filter((key) => selectedIds[key])
			.map((key) => addonsMap[key].facetAddress);

		await diamondCut(contractAddress, selectedAddonFacets);
		onChange();
		isLoading = false;
	};
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

<LoaderButton
	title="Update Add Ons"
	{handleClick}
	width={200}
	height={50}
	loadingText={'Updating...'}
	borderColor={primaryColor}
	{isLoading}
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
