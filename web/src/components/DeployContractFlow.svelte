<script lang="ts">
	import { primaryColor } from '../globalStyles';

	import LoaderButton from '../../../embed/svelte/parts/LoaderButton.svelte';
	import deployDiamondClone from '../utils/deployDiamondClone';
	import { getContext } from 'svelte';

	import DeployContractSuccessPopup from './DeployContractSuccessPopup.svelte';

	let isLoading = false;
	let loadingText = 'deploying...';

	const { open } = getContext('simple-modal');

	const openModal = (contractAddress: string) => {
		open(DeployContractSuccessPopup, {
			contractAddress,
			network: 'rinkeby'
		});
	};

	const onClick = async () => {
		isLoading = true;
		const contractAddress = await deployDiamondClone({
			diamondSawAddress: '0x27c1A6417803bDac8958361d2Edf788F79bA94CC',
			baseDiamondCloneFacetAddress: '0x3Fcc7CDa97FcB816a3261D8d064574BAE6f79878',
			baseNFTFacetAddress: '0x91E15D89E13801A46f8B3a8396F394ffa73502f5'
		});
		isLoading = false;

		openModal(contractAddress);
	};
</script>

<LoaderButton
	width={200}
	title="Deploy"
	borderColor={primaryColor}
	{loadingText}
	handleClick={onClick}
	{isLoading}
/>

<style>
</style>
