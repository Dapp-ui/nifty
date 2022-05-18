<script lang="ts">
	import SettingsMenuItem from './SettingsMenuItem.svelte';

	const menuItems = [
		{
			name: 'Tokens',
			icon: '᯽'
		},
		{
			name: 'Add Ons',
			icon: '+'
		},
		{
			name: 'Meta',
			icon: '⚙'
		}
	];

	let selectedIndex = 0;
	let marginLeft = 0;
	$: marginLeft = (selectedIndex * 100) / menuItems.length;

	const onSelect = (index: number) => {
		console.log('on select just happened', index);
		selectedIndex = index;
	};
</script>

<div class="slidemenuWrapper">
	<div class="slidemenu" style="width: {menuItems.length * 120}px;">
		{#each menuItems as menuItem, index}
			<SettingsMenuItem {...menuItem} {index} {onSelect} />
		{/each}
		<div class="clear" />

		<!-- Bar -->
		<div class="slider" style="width: {menuItems.length * 120}px;">
			<div class="bar" style="width: {100 / menuItems.length}%; margin-left: {marginLeft}%;" />
		</div>
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.clear {
		clear: both;
	}

	.slidemenuWrapper {
		position: relative;
		max-width: 600px;
		overflow-x: scroll;
	}

	.slidemenuWrapper::-webkit-scrollbar {
		display: none;
	}

	/*Bar Style*/

	.slider {
		height: 5px;
		display: block;
		background: #ccc;
		margin-top: 10px;
		border-radius: 5px;
	}

	.slider .bar {
		height: 5px;
		background: #333;
		border-radius: 5px;
		transition: all 500ms ease-in-out;
	}
</style>
