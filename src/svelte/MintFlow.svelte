<script lang="ts">
  import MintButton from './MintButton.svelte';
  import Modal from 'svelte-simple-modal';
  import GlobalStyles from './parts/GlobalStyles.svelte';
  import MintCount from './MintCount.svelte';
</script>

<div class="mintWrapper">
  <Modal classBg="bgBlur"><MintButton /></Modal>
  <MintCount withLabel={false} />
</div>
<GlobalStyles />

<style>
  .mintWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
