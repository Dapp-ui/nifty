<script lang="ts">
	export let value: string | number = '';
	let type = 'text';

	const onSelect = (e: any) => {
		switch (e.target.value) {
			case 'A':
				type = 'text';
				break;
			case '#':
				type = 'number';
		}
	};

	export let onChange: (e: any) => void;
</script>

<div class="variableInputWrapper">
	<input
		class="valueInput"
		{type}
		placeholder={type === 'text' ? 'Text Value' : 'Numeric Value'}
		{value}
		on:input={onChange}
	/>
	<select name="cars" id="cars" on:input={onSelect}>
		<option value="A"><i>A</i></option>
		<option value="#">#</option>
	</select>
</div>

<style>
	.variableInputWrapper {
		display: flex;
		flex-direction: row;
		width: 60%;
		box-sizing: border-box;
	}

	.valueInput {
		width: 75%;
		padding-left: 15px;
	}

	input {
		border: none;
		outline: none;
		color: grey;
		font-size: 18px;
	}

	input::placeholder {
		color: lightgrey;
	}

	select {
		outline: none;
		border: none;
		border-left: 1px solid lightgrey;
		padding: 5px;
		padding-right: 2px;
		color: grey;
	}
</style>
