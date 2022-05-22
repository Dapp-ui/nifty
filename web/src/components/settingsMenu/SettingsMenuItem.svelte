<script lang="ts">
	export let name: string;
	export let icon: string;
	export let index: number;
	export let selectedIndex: number;
	export let onSelect: (index: number) => void;

	const handleSelect = () => {
		onSelect(index);
	};
</script>

<!-- Item 1 -->
<input
	type="radio"
	name="menuItem"
	class="slide-toggle"
	id={`slide-item-${index}`}
	checked={index === selectedIndex}
/>
<label for={`slide-item-${index}`} on:click={handleSelect}>
	<p class="icon">{icon}</p>
	<span>{name}</span>
</label>

<style>
	label {
		width: 120px;
		text-align: center;
		display: block;
		float: left;
		color: #333;
		opacity: 0.2;
		transition: all 500ms ease-in-out;
	}

	label:hover {
		cursor: pointer;
		color: #666;
	}

	label span {
		display: block;
		padding: 10px;
		white-space: nowrap;
	}

	label .icon {
		font-size: 20px;
		border: solid 2px #333;
		text-align: center;
		height: 50px;
		width: 50px;
		display: block;
		margin: 0 auto;
		line-height: 50px;
		border-radius: 50%;
	}

	.slide-toggle {
		display: none;
	}

	.slide-toggle:checked + label {
		opacity: 1;
	}
</style>
