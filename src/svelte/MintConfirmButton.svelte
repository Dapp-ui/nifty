<script lang="ts">
  import LoaderButton from './parts/LoaderButton.svelte';
  import nifty from './niftyInstance';
  import mintCount from './stores/mintCount';
  import { parseMintError } from '../utils/errorHandlers';
  import { getContext } from 'svelte';
  import errorMessage from './stores/errorMessage';

  const { close } = getContext('simple-modal');

  export let onMintSuccess: (txnHash: string) => void;

  let isLoading = false;
  let numToMint = 1;

  mintCount.subscribe((value) => {
    numToMint = value;
  });

  const confirmMint = async () => {
    isLoading = true;

    try {
      const txnHash = await nifty.mint(numToMint);
      onMintSuccess(txnHash);
    } catch (e) {
      close();
      const parsed = parseMintError(e);
      errorMessage.set(parsed);
    }
  };
</script>

<LoaderButton handleClick={confirmMint} title={'Mint'} {isLoading} />
