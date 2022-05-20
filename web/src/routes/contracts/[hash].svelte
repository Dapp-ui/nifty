<script lang="ts">
	import SettingsMenu from '../../components/settingsMenu/SettingsMenu.svelte';
	import shortenAddress from '../../../../embed/utils/shortenAddress';
	import TokenMintSection from '../../components/settingsSections/TokenMint/TokenMintSection.svelte';
	import OverviewSection from '../../components/settingsSections/Summary/SummarySection.svelte';
	import AddOnsSection from '../../components/settingsSections/AddOns/AddOnsSection.svelte';

	export let hash: string;
	export let selectedMenuId = 'tokens';
	const onSelectedMenuChange = (menuId: string) => {
		selectedMenuId = menuId;
	};
</script>

<main>
	<h1>{shortenAddress(hash)}</h1>
	<SettingsMenu {onSelectedMenuChange} />
	{#if selectedMenuId === 'summary'}
		<OverviewSection contractAddress={hash} />
	{:else if selectedMenuId === 'tokens'}
		<TokenMintSection contractAddress={hash} />
	{:else if selectedMenuId === 'add-ons'}
		<AddOnsSection contractAddress={hash} />
	{/if}
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
