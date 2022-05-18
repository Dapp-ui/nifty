<script lang="ts">
	import { primaryColor } from '../globalStyles';

	import LoaderButton from '../../../embed/svelte/parts/LoaderButton.svelte';
	import deployDiamondClone from '../utils/deployDiamondClone';
	let isLoading = false;
	let loadingText = 'deploying...';
	const onClick = async () => {
		isLoading = true;
		const contractAddy = await deployDiamondClone({
			diamondSawAddress: '0xAE713045508dC9b995a82C41F433bCacc62b0896',
			baseDiamondCloneFacetAddress: '0x9E401ECaFDB2ad3D2A3e0cAc01dbc05177Af8bFc',
			baseNFTFacetAddress: '0xACA83e6F8D762efc9D0bD774AA107DCcf586cEA4'
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
