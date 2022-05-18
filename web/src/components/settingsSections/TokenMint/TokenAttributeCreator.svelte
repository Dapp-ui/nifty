<script lang="ts">
	import TokenAttributeCreateRow from './TokenAttributeCreateRow.svelte';
	type Attribute = {
		name: string;
		value: string;
	};
	let attributes: Attribute[] = [{ name: '', value: '' }];
	const handleAddClicked = () => {
		attributes = [...attributes, { name: '', value: '' }];
	};
</script>

<div class="tokenAttributesCreator">
	{#each attributes as attribute}
		<TokenAttributeCreateRow {...attribute} />
	{/each}
	<button on:click={handleAddClicked}>Add Attribute</button>
</div>

<style>
	.tokenAttributesCreator {
		margin-top: 15px;
	}

	button {
		border: 1px solid lightgrey;
		background: white;
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 15px;
	}
</style>
