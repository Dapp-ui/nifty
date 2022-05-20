<script lang="ts">
	export let name: string;
	export let icon: string;
	export let toggleItem: (index: number) => void;
	export let onHover: (index: number) => void;
	export let selected: boolean;
	export let index: number;
	export let comingSoon: boolean = false;

	const handleToggle = () => {
		if (!comingSoon) toggleItem(index);
	};
	const handleHover = () => onHover(index);
</script>

<div
	class={`${selected ? 'addOnItem selected' : 'addOnItem'} ${comingSoon && 'comingSoon'}`}
	on:click={handleToggle}
	on:mouseenter={handleHover}
>
	<div class="check">
		<svg
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width="78.369px"
			height="78.369px"
			viewBox="0 0 78.369 78.369"
			style="enable-background:new 0 0 78.369 78.369;"
			xml:space="preserve"
		>
			<g>
				<path
					d="M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704
     c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704
     C78.477,17.894,78.477,18.586,78.049,19.015z"
					stroke="#fff"
					fill="#fff"
				/>
			</g>
		</svg>
	</div>
	<div class="icon">{icon}</div>
	<h3 class={comingSoon ? 'hoverHide' : ''}>{name}</h3>
	<h3 class={comingSoon ? 'hoverShow' : 'hidden'}>Coming Soon!</h3>
</div>

<style>
	.addOnItem {
		position: relative;
		cursor: pointer;
		color: #1f271b;
		border-radius: 10px;
		border: 1px solid lightgrey;
		display: flex;
		flex-direction: column;
		margin: 15px;
		width: 120px;
		text-align: center;
		height: 200px;
		user-select: none;
	}

	.comingSoon {
		cursor: not-allowed;
	}

	.addOnItem:hover > .hoverHide {
		display: none;
	}

	.hoverShow {
		display: none;
	}

	.addOnItem:hover > .hoverShow {
		display: flex;
	}

	.hidden {
		display: none;
	}

	.check {
		position: absolute;
		width: 22px;
		height: 22px;
		box-sizing: border-box;
		padding: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		top: -5px;
		right: -5px;
		color: #fff;
		border-radius: 50%;
		background-color: #1f271b;
		display: none;
	}

	.selected > .check {
		display: flex;
	}

	.selected > .icon {
		color: #1f271b;
	}

	.addOnItem.selected {
		border: 1px solid #1f271b;
	}

	h3 {
		height: 45%;
		margin: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
		box-sizing: border-box;
	}

	.icon {
		color: grey;
		height: 55%;
		font-size: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px dashed lightgrey;
	}
</style>
