<script lang="ts">
	import { juiceOrange } from '../globalStyles';
	import InlineImageItem from '../components/landing/InlineImageItem.svelte';
	import RocketSlash from '../components/landing/RocketSlash.svelte';

	// for mobile responsiveness on safari
	// where the nav bar resizes frequently
	const convertStyle = () => {
		const height = window.innerHeight;
		const el = document.getElementById('outerBorder');

		if (el) {
			el.style.height = `${height}px`;
		}
	};
</script>

<svelte:window on:resize={convertStyle} />

<main>
	<div id="outerBorder" class="outerBorder" style="background: {juiceOrange}">
		<div class="innerBorder">
			<div class="mainSection">
				<div class="header">
					<h1>
						<div class="row">
							<InlineImageItem imgUrl="/images/test.jpg" />We&nbsp;are Juice&nbsp;Labs.
							<InlineImageItem imgUrl="/images/test.jpg" />
						</div>
						<br class="mobileShown" />
						We&nbsp;Help&nbsp;Creators Sell&nbsp;NFTs<br class="mobileHidden" />
						<span class="lowerMobile">On</span> their
						<u>Own</u>
						Website and Contract.<br /><br class="mobileShown" />
						<div class="row">
							<InlineImageItem animation="scroll" imgUrl="/images/test2.jpg" />No&nbsp;Code
							Required.<InlineImageItem animation="scroll" imgUrl="/images/test2.jpg" />
						</div>
					</h1>
				</div>
				<div class="ctaWrapper">
					<RocketSlash />

					<a href="https://discord.gg/zfEfeaBK" target="_blank"
						><div class="skew">Get Started</div></a
					>
					<RocketSlash />
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.header {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		word-wrap: break-word;
		align-items: center;
	}

	.ctaWrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 50px;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	h1 {
		display: inline;
		margin: 0px;
		color: #1f271b;
		font-weight: black;
		text-align: center;
	}

	a {
		background: #1f271b;
		padding: 15px 0px;
		width: 340px;
		display: flex;
		justify-content: center;
		border: none;
		max-width: 30vw;
		outline: none;
		color: white;
		font-size: 24px;
		cursor: pointer;
		font-family: NunitoSans;
		text-decoration: none;
	}

	.innerBorder {
		background: white;
		border: 15px solid #1f271b;
		width: calc(100% - 70px);
		height: calc(100% - 70px);
		overflow: hidden;
	}

	.mainSection {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		padding: 0px 30px;
	}

	.outerBorder {
		z-index: -1;
		width: 100vw;
		height: 100vh;
		top: 0px;
		right: 0px;
		left: 0px;
		bottom: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media only screen and (min-width: 1585px) {
		h1 {
			font-size: 85px;
			line-height: 100px;
		}
	}

	@media only screen and (min-width: 1350px) and (max-width: 1584px) {
		h1 {
			font-size: 70px;
			line-height: 90px;
		}
	}

	@media only screen and (min-width: 1055px) and (max-width: 1350px) {
		h1 {
			font-size: 55px;
			line-height: 70px;
		}
	}

	@media only screen and (min-width: 800px) and (max-width: 1055px) {
		h1 {
			font-size: 40px;
			line-height: 53px;
		}

		a {
			font-size: 20px;
		}
	}

	.mobileShown {
		display: none;
	}

	@media only screen and (max-width: 700px) {
		h1 {
			font-size: 30px;
			line-height: 38px;
		}

		.innerBorder {
			border: 7px solid #1f271b;
			width: calc(100% - 40px);
			height: calc(100% - 40px);
		}

		a {
			font-size: 18px;
		}

		.mobileHidden {
			display: none;
		}

		.mobileShown {
			display: block;
		}

		.lowerMobile {
			text-transform: lowercase;
		}
	}
</style>
