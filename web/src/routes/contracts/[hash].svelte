<script lang="ts">
	import SettingsMenu from '../../components/settingsMenu/SettingsMenu.svelte';
	import shortenAddress from '../../../../embed/utils/shortenAddress';
	import TokenMintSection from '../../components/settingsSections/TokenMint/TokenMintSection.svelte';
	import OverviewSection from '../../components/settingsSections/Summary/SummarySection.svelte';
	import AddOnsSection from '../../components/settingsSections/AddOns/AddOnsSection.svelte';
	import { defaultMenuItems, refreshMenuItems } from '../../components/settingsMenu/settingsMenu';
	import { onMount } from 'svelte';
	import EmbedSection from '../../components/settingsSections/Embed/EmbedSection.svelte';
	import PaymentSplitterSection from '../../components/settingsSections/PaymentSplitter/PaymentSplitterSection.svelte';
	import Modal from 'svelte-simple-modal';

	export let hash: string;
	export let selectedMenuId = 'summary';
	const onSelectedMenuChange = (menuId: string) => {
		selectedMenuId = menuId;
	};

	let menuItems = defaultMenuItems;

	const onAddOnsUpdated = async () => {
		menuItems = await refreshMenuItems(hash);
	};

	onMount(async () => {
		menuItems = await refreshMenuItems(hash);
	});
</script>

<main>
	<a href={`https://louper.dev/diamond/${hash}?network=rinkeby`} target="_blank"
		><h1>{shortenAddress(hash)}</h1></a
	>
	<SettingsMenu {onSelectedMenuChange} {menuItems} />
	{#if selectedMenuId === 'summary'}
		<OverviewSection contractAddress={hash} />
	{:else if selectedMenuId === 'tokens'}
		<Modal classBg="bgBlur">
			<TokenMintSection contractAddress={hash} />
		</Modal>
	{:else if selectedMenuId === 'add-ons'}
		<AddOnsSection contractAddress={hash} onChange={onAddOnsUpdated} />
	{:else if selectedMenuId === 'payment-splitter'}
		<PaymentSplitterSection />
	{:else if selectedMenuId === 'embed'}
		<EmbedSection />
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

	a {
		color: #1f271b;
		text-decoration: none;
	}
</style>
