<script lang="ts">
	export let contractAddress: string;
	const todoAscii = `
 _____          _       
/__   \\___   __| | ___  
  / /\\/ _ \\ / _\` |/ _ \\ 
 / / | (_) | (_| | (_) |
 \\/   \\___/ \\__,_|\\___/ 

 In the future you can 
 upload token metadata in 
 bulk via CSV here and the 
 metadata BaseURI will be 
 set accordingly



`;
</script>

<div>
	<pre>
    {todoAscii}
  </pre>
	<span
		>Before this UI is implemented, feel free to interact with the contract directly on <a
			href={`https://louper.dev/diamond/${contractAddress}?network=rinkeby`}>louper</a
		>.</span
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
