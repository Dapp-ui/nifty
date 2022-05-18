<script lang="ts">
	import SettingsMenu from '../../components/settingsMenu/SettingsMenu.svelte';
	import shortenAddress from '../../../../embed/utils/shortenAddress';
	import TokenMintSection from '../../components/settingsSections/TokenMint/TokenMintSection.svelte';

	export let hash: string;
	// export let selectedMenuItem
</script>

<main>
	<h1>{shortenAddress(hash)}</h1>
	<SettingsMenu />
	<TokenMintSection />
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
		margin-top: 0px;
		font-size: 25px;
	}
</style>
