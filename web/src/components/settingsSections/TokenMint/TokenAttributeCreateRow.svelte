<script lang="ts">
	import TokenAttributeVariableInput from './TokenAttributeVariableInput.svelte';

	export let name: string = '';
	export let value: string | number = '';
	export let index: number;
	export let onChange: (index: number, name: string, value: string | number) => void;

	const onNameChange = (e: any) => {
		name = e.target.value;
		onChange(index, name, value);
	};

	const onValueChange = (e: any) => {
		value = e.target.value;
		onChange(index, name, value);
	};
</script>

<div class="attributeCreateRow">
	<input class="nameInput" placeholder="Attribute Name" value={name} on:input={onNameChange} />
	<TokenAttributeVariableInput {value} onChange={onValueChange} />
</div>

<style>
	.attributeCreateRow {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 15px 0px;
	}

	.nameInput {
		font-size: 18px;
		color: grey;
		border: none;
		border-right: 1px solid lightgrey;
		width: 40%;
		outline: none;
	}

	.nameInput::placeholder {
		color: lightgrey;
	}
</style>
