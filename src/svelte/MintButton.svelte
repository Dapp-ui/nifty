<!-- Content.svelte -->
<script>
  import GenericButton from './parts/GenericButton.svelte';
  import { getContext } from 'svelte';
  import MintPopUp from './MintPopUp.svelte';
  const { open } = getContext('simple-modal');

  const showPopUp = () => {
    open(MintPopUp);
  };
</script>

<GenericButton handleClick={showPopUp} title={'Mint'} />
