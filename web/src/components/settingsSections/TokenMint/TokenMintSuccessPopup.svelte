<script lang="ts">
	import { getContext } from 'svelte';
	import GenericButton from '../../../../../embed/svelte/parts/GenericButton.svelte';
	import Popup from '../../../../../embed/svelte/parts/Popup.svelte';
	export let contractAddress: string;
	export let tokenId: number;
	export let metadataCid: string;

	const { close } = getContext('simple-modal');
</script>

<Popup header={'♕ !! Woop !! ♕'}>
	<div slot="content">
		<div class="contentWrapper">
			<span
				>Congrats - you have minted NFT #{tokenId}! <br /> <br /> You can view the NFT on
				<a
					href={`https://rinkeby.rarible.com/token/${contractAddress.toLowerCase()}:${tokenId}?tab=details`}
					target="_blank">Rarible</a
				>
				or
				<a
					href={`https://testnets.opensea.io/assets/rinkeby/${contractAddress.toLowerCase()}/${tokenId}`}
					target="_blank">Opensea</a
				>. You can also inspect the metadata on
				<a href={`https://ipfs.io/ipfs/${metadataCid}`} target="blank">ipfs</a>.</span
			>
			<div style="margin-top: 70px;">
				<GenericButton
					backgroundColor="#1f271b"
					title="Mint More!"
					handleClick={close}
					width={300}
					height={60}
				/>
			</div>
		</div>
	</div>
</Popup>

<style>
	.contentWrapper {
		margin-top: 30px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	a {
		cursor: pointer;
		color: #e79621;
	}

	span {
		color: grey;
	}
</style>
