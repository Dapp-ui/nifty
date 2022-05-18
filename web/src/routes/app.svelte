<script lang="ts">
	import DeployContractFlow from '../components/DeployContractFlow.svelte';
	import ConnectWalletFlow from '../../../embed/svelte/ConnectWalletFlow.svelte';
</script>

<main>
	<h1>Create a Contract</h1>
	<ConnectWalletFlow />
	<DeployContractFlow />
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
