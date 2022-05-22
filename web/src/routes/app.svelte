<script lang="ts">
	import DeployContractFlow from '../components/DeployContractFlow.svelte';
	import ConnectWalletFlow from '../../../embed/svelte/ConnectWalletFlow.svelte';
	import Modal from 'svelte-simple-modal';
</script>

<main>
	<h1>Create a Contract</h1>
	<div class="card">
		<div class="half withBottomBorder">
			<div class="horzHalf">
				<span class="step">1</span>
				<h2>Choose Network</h2>
				<select>
					<option>Rinkeby Testnet</option>
					<option>Arbitrum Rinkeby</option>
					<option>Polygon Mumbai</option>
				</select>
			</div>
			<div class="horzHalf right">
				<span class="step">2</span>
				<h2>Connect Wallet</h2>
				<ConnectWalletFlow />
			</div>
		</div>
		<div class="half">
			<div class="horzHalf">
				<span class="step">3</span>
				<h2>Choose Contract Type</h2>
				<select>
					<option>ERC721A</option>
					<option>ERC1155 (TODO)</option>
					<option>ERC20 (TODO)</option>
				</select>
			</div>
			<div class="horzHalf right">
				<span class="step">4</span>
				<h2>Deploy Contract</h2>
				<Modal classBg="bgBlur">
					<DeployContractFlow />
				</Modal>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 50px;
		width: 100vw;
		min-height: 90vh;
		box-sizing: border-box;
	}

	h1 {
		font-size: 50px;
	}

	.withBottomBorder {
		border-bottom: 1px dashed lightgrey;
	}

	.horzHalf.right {
		border-right: none;
	}

	.half {
		padding: 20px 0px;
		width: 100%;
		height: 50%;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.step {
		position: absolute;
		top: -0px;
		left: 25px;
		width: 25px;
		height: 25px;
		color: grey;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px dashed lightgrey;
		border-right: 1px dashed lightgrey;
	}

	.horzHalf {
		position: relative;
		height: 100%;
		border-right: 1px dashed lightgrey;
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.card {
		overflow: hidden;
		margin: 80px;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		border: 1px solid lightgrey;
		display: flex;
		flex-direction: column;
		width: 800px;
		height: 450px;
		border-radius: 20px;
	}

	select {
		outline: none;
		border: none;
		border: 1px solid #1f271b;
		padding: 20px 10px;
		border-radius: 5px;
		color: #1f271b;
		width: 175px;
		font-size: 14px;
		font-family: 'NunitoSans';
		text-align: center;
	}
</style>
