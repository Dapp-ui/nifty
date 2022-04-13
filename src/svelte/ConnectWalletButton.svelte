<!-- Content.svelte -->
<script>
  import GenericButton from './parts/GenericButton.svelte';
  import { getContext } from 'svelte';
  import ConnectWalletPopup from './ConnectWalletPopup.svelte';
  const { open } = getContext('simple-modal');

  const showPopUp = () => open(ConnectWalletPopup);
</script>

<GenericButton handleClick={showPopUp} />
