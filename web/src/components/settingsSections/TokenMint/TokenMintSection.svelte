<script lang="ts">
	import { primaryColor } from '../../../globalStyles';

	import TokenAttributeCreator from './TokenAttributeCreator.svelte';
	import compileMeta from '../../../utils/compileMeta';
	import Nifty from '../../../../../embed/Nifty';
	import walletConnector from '../../../../../embed/svelte/walletConnectorInstance';
	import LoaderButton from '../../../../../embed/svelte/parts/LoaderButton.svelte';

	let isLoading = false;
	let imgSrc = '';
	let ipfsImage = '';
	let name = '';
	let description = '';
	let attributes: { name: string; value: string }[] = [];
	export let contractAddress;

	const niftyInstance = new Nifty('rinkeby', contractAddress, walletConnector);

	const onNameChange = (e: any) => {
		name = e.target.value;
	};

	const onDescriptionChange = (e: any) => {
		e.target.style.height = 'auto';
		e.target.style.height = e.target.scrollHeight + 'px';
		description = e.target.value;
	};

	const onAttributesChange = (a: any) => {
		attributes = a;
	};

	const onImageSelect = async (e: any) => {
		const [file] = e.target.files;
		if (file) {
			imgSrc = URL.createObjectURL(file);

			const res = await fetch('/files', {
				method: 'POST',
				body: file
			});

			const { cid } = await res.json();
			ipfsImage = `ipfs://${cid}`;
		}
	};

	const onMint = async () => {
		if (!ipfsImage) {
			throw new Error('No Image Or Maybe Still Uploading');
		}

		isLoading = true;

		// upload the metadata
		const metaBlob = compileMeta(name, description, ipfsImage, attributes);

		const res = await fetch('/files', {
			method: 'POST',
			body: metaBlob
		});

		const { cid } = await res.json();

		const address = niftyInstance.getConnectedAddress();

		if (!address) {
			throw new Error('need to be connected');
		}

		const mintTxn = await niftyInstance.devMint(address, 1, `ipfs://${cid}`);
		await mintTxn.wait();
		isLoading = false;
	};
</script>

<div class="uploadCard">
	<div class="fileWrapper">
		{#if imgSrc}
			<img src={imgSrc} class="imagePreview" alt="Display NFT File Inputted" />
		{:else}
			<input
				class="imageUploadInput"
				id="tokenContentUpload"
				type="file"
				on:change={onImageSelect}
			/>
			<label for="tokenContentUpload">
				<span>+ Upload File +</span>
			</label>
		{/if}
	</div>
	<div class="metaWrapper">
		<h2>Name</h2>
		<input type="text" class="nameInput" placeholder="Bored Ape #1" on:input={onNameChange} />
		<h2>Description</h2>
		<textarea
			class="descriptionInput"
			placeholder="The first bored ape"
			on:input={onDescriptionChange}
		/>
		<TokenAttributeCreator {onAttributesChange} />
	</div>
</div>

<LoaderButton
	title="Mint NFT"
	handleClick={onMint}
	width={200}
	height={50}
	loadingText={'Minting...'}
	borderColor={primaryColor}
	{isLoading}
/>

<style>
	.imagePreview {
		width: 100%;
		height: 100%;
	}

	.fileWrapper {
		width: 425px;
	}

	label {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		height: 100%;
		border-right: 1px dashed lightgrey;
	}

	.imageUploadInput {
		display: none;
	}

	.uploadCard {
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

	.metaWrapper {
		padding: 25px;
		width: 425px;
		box-sizing: border-box;
	}

	input,
	textarea {
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

	textarea {
		border-bottom: 1px dashed lightgrey;
	}

	textarea::placeholder {
		color: lightgrey;
	}

	textarea {
		min-height: 65px;
		overflow-y: hidden;
	}

	h2 {
		font-family: 'NunitoSans';
		margin: 5px 0px;
		margin-top: 15px;
	}

	span {
		font-size: 18px;
	}
</style>
