<script lang="ts">
	export let contractAddress: string;
	const todoAscii = `
 _____          _       
/__   \\___   __| | ___  
  / /\\/ _ \\ / _\` |/ _ \\ 
 / / | (_) | (_| | (_) |
 \\/   \\___/ \\__,_|\\___/ 

 In the future you can get 
 a script here to embed a 
 minting experience 
 in your website.



`;
</script>

<div>
	<pre>
    {todoAscii}
  </pre>
	<span
		>For now, feel free to reach out in <a href={`https://discord.gg/tA3STyuV`}>discord</a> and we can
		get you an embed script for your contract</span
	>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40vh;
		flex-direction: column;
	}

	span {
		text-align: center;
		color: #1f271b;
		max-width: 350px;
	}

	a {
		cursor: pointer;
		color: #e79621;
	}
</style>
