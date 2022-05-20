<script lang="ts">
	import TokenAttributeCreateRow from './TokenAttributeCreateRow.svelte';
	type Attribute = {
		name: string;
		value: string | number;
	};
	let attributes: Attribute[] = [];
	const handleAddClicked = () => {
		attributes = [...attributes, { name: '', value: '' }];
	};

	export let onAttributesChange: (attributes: Attribute[]) => void;

	const onAttributeChange = (index: number, name: string, value: string | number) => {
		attributes[index].name = name;
		attributes[index].value = value;
		attributes = [...attributes];
		onAttributesChange(attributes);
	};
</script>

<div class="tokenAttributesCreator">
	{#each attributes as attribute, index}
		<TokenAttributeCreateRow {...attribute} onChange={onAttributeChange} {index} />
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
