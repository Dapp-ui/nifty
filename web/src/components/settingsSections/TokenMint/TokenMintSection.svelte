<script lang="ts">
	import { primaryColor } from '../../../globalStyles';

	import GenericButton from '../../../../../embed/svelte/parts/GenericButton.svelte';
	import TokenAttributeCreator from './TokenAttributeCreator.svelte';
	const handleClick = () => {};
	const autoResize = (e: any) => {
		e.target.style.height = 'auto';
		e.target.style.height = e.target.scrollHeight + 'px';
	};

	let imgSrc = '';

	const onImageSelect = (e: any) => {
		const [file] = e.target.files;
		if (file) {
			imgSrc = URL.createObjectURL(file);
		}
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
		<input type="text" class="nameInput" placeholder="Bored Ape #1" />
		<h2>Description</h2>
		<textarea class="descriptionInput" placeholder="The first bored ape" on:input={autoResize} />
		<TokenAttributeCreator />
	</div>
</div>

<GenericButton
	title="Mint NFT"
	{handleClick}
	width={200}
	height={50}
	backgroundColor={primaryColor}
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

	textarea {
		border-bottom: 1px dashed lightgrey;
	}

	input::placeholder {
		color: lightgrey;
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
