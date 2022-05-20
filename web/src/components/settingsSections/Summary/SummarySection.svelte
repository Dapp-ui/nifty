<script lang="ts">
	import Nifty from '../../../../../embed/Nifty';
	import walletConnector from '../../../../../embed/svelte/walletConnectorInstance';
	import LoaderButton from '../../../../../embed/svelte/parts/LoaderButton.svelte';

	export let contractAddress: string;

	let name: string;
	let symbol: string;
	let startToken: number;
	let isLoading = false;
	const nifty = new Nifty('rinkeby', contractAddress, walletConnector);

	const handleClick = async () => {
		isLoading = true;
		const tx = await nifty.baseNFTFacet.setTokenMeta(name, symbol, startToken);
		await tx.wait();
		isLoading = false;
	};

	const onNameChange = (e: any) => {
		name = e.target.value;
	};

	const onSymbolChange = (e: any) => {
		symbol = e.target.value;
	};

	const onStartTokenChange = (e: any) => {
		startToken = e.target.value;
	};

	const todoAscii = `
 _____          _       
/__   \\___   __| | ___  
  / /\\/ _ \\ / _\` |/ _ \\ 
 / / | (_) | (_| | (_) |
 \\/   \\___/ \\__,_|\\___/ 

 In the future you can add
 ASCII art to your contract
source. NOT right now tho :)



`;
</script>

<div class="card">
	<div class="asciiWrapper">
		<pre>{todoAscii}</pre>
	</div>
	<div class="metaWrapper">
		<div class="locked">
			<div class="leftLock">
				<h2>Standard</h2>
				<span>ERC721A</span>
			</div>
			<div class="rightLock">
				<h2>Network</h2>
				<span>Rinkeby</span>
			</div>
		</div>
		<h2>Name</h2>
		<input type="text" class="nameInput" placeholder="Cool NFT" on:input={onNameChange} />
		<h2>Symbol</h2>
		<input type="text" class="nameInput" placeholder="COOL" on:input={onSymbolChange} />
		<h2>Start Token</h2>
		<input type="number" class="nameInput" placeholder="0" on:input={onStartTokenChange} />
	</div>
</div>

<LoaderButton
	title="Update Contract"
	{handleClick}
	width={200}
	borderColor="#1f271b"
	loadingText={'Updating...'}
	{isLoading}
/>

<style>
	.metaWrapper {
		padding: 30px;
		width: 425px;
		box-sizing: border-box;
	}

	.leftLock {
		width: 50%;
		border-right: 1px dashed lightgrey;
		text-align: left;
		padding: 20px 0px;
	}

	.rightLock {
		width: 50%;
		text-align: right;
		padding: 15px 0px;
	}

	.locked > div > h2 {
		margin-top: 0px;
	}

	.locked {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1px dashed lightgrey;
		padding-bottom: 20px;
	}

	.card {
		overflow: hidden;
		margin: 80px;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		border: 1px solid lightgrey;
		display: flex;
		flex-direction: row;
		width: 850px;
		min-height: 450px;
		border-radius: 20px;
	}

	.asciiWrapper {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 1px dashed lightgrey;
	}

	input {
		border: none;
		outline: none;
		font-family: 'NunitoSans';
		font-size: 20px;
		width: 100%;
		resize: none;
		color: grey;
	}

	input::placeholder {
		color: lightgrey;
	}

	h2 {
		font-family: 'NunitoSans';
		margin: 5px 0px;
		margin-top: 15px;
	}

	span {
		color: grey;
		font-size: 20px;
	}
</style>
