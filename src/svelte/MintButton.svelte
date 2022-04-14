<!-- Content.svelte -->
<script>
  import GenericButton from './parts/GenericButton.svelte';
  import { getContext } from 'svelte';
  const { open } = getContext('simple-modal');

  const showPopUp = () => {};
</script>

<GenericButton handleClick={showPopUp} title={'Mint'} />
