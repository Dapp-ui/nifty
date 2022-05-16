<script lang="ts">
  import MintChooseQuantity from './MintChooseQuantity.svelte';
  import MintConfirmButton from './MintConfirmButton.svelte';
  import MintCount from './MintCount.svelte';
  import MintPrice from './MintPrice.svelte';
  import MintSuccess from './MintSuccess.svelte';
  import Popup from './parts/Popup.svelte';

  let txn;
  let title = 'Choose Amount';

  const handleMintSuccess = (txnHash: string) => {
    title = 'Congrats!';
    txn = txnHash;
  };
</script>

<Popup header={title}>
  <div slot="content">
    {#if txn}
      <MintSuccess txnHash={txn} />
    {:else}
      <div class="mintCheckoutContainer">
        <MintCount />
        <MintChooseQuantity />
        <MintPrice />
        <MintConfirmButton onMintSuccess={handleMintSuccess} />
      </div>
    {/if}
  </div>
</Popup>

<style>
  .mintCheckoutContainer {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-height: 400px;
  }
</style>
