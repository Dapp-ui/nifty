<script lang="ts">
	import { primaryColor } from '../globalStyles';

	import LoaderButton from '../../../embed/svelte/parts/LoaderButton.svelte';
	import deployDiamondClone from '../utils/deployDiamondClone';
	let isLoading = false;
	let loadingText = 'deploying...';
	const onClick = async () => {
		isLoading = true;
		const contractAddy = await deployDiamondClone({
			diamondSawAddress: '0x27c1A6417803bDac8958361d2Edf788F79bA94CC',
			baseDiamondCloneFacetAddress: '0x3Fcc7CDa97FcB816a3261D8d064574BAE6f79878',
			baseNFTFacetAddress: '0x91E15D89E13801A46f8B3a8396F394ffa73502f5'
		});
		isLoading = false;
		window.open(`/contracts/${contractAddy}`, '_self');
	};
</script>

<main>
	<LoaderButton
		width={200}
		title="Create Contract"
		borderColor={primaryColor}
		{loadingText}
		handleClick={onClick}
		{isLoading}
	/>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 50px;
		width: 100vw;
		min-height: 90vh;
	}

	h1 {
		font-size: 50px;
	}
</style>
