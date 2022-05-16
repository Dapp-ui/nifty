<script lang="ts">
  import ConnectWalletButton from './ConnectWalletButton.svelte';
  import Modal from 'svelte-simple-modal';
  import GlobalStyles from './parts/GlobalStyles.svelte';
</script>

<Modal classBg="bgBlur"><ConnectWalletButton /></Modal>

<GlobalStyles />
