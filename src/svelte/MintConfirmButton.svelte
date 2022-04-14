<script lang="ts">
  import LoaderButton from './parts/LoaderButton.svelte';
  import nifty from './niftyInstance';
  import mintCount from './stores/mintCount';

  export let onMintSuccess: (txnHash: string) => void;

  let isLoading = false;
  let numToMint = 1;

  mintCount.subscribe((value) => {
    numToMint = value;
  });

  const confirmMint = async () => {
    isLoading = true;

    const txnHash = await nifty.mint(numToMint);

    onMintSuccess(txnHash);
  };
</script>

<LoaderButton handleClick={confirmMint} title={'Mint'} {isLoading} />
