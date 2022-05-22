<script lang="ts">
	import GenericButton from '../../../embed/svelte/parts/GenericButton.svelte';
	import Popup from '../../../embed/svelte/parts/Popup.svelte';
	export let contractAddress: string;
	export let network: string;
</script>

<Popup header={'♕ !! Nice !! ♕'}>
	<div slot="content">
		<div class="contentWrapper">
			<span
				>You have deployed a smart contract to {network}! <br /> <br /> You can view the contract on
				<a href={`https://louper.dev/diamond/${contractAddress}?network=rinkeby`} target="_blank"
					>louper</a
				>
				(recommended) or
				<a href={`https://rinkeby.etherscan.io/address/${contractAddress}`} target="_blank"
					>etherscan</a
				>. Next step is to configure your contract and mint some tokens.</span
			>
			<div style="margin-top: 70px;">
				<GenericButton
					backgroundColor="#1f271b"
					title="Go to Contract Dashboard"
					handleClick={() => {
						window.open(`/contracts/${contractAddress}`, '_self');
					}}
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
