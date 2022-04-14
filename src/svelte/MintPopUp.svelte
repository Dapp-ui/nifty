<script>
  import MintChooseQuantity from './MintChooseQuantity.svelte';
  import MintConfirmButton from './MintConfirmButton.svelte';
  import MintCount from './MintCount.svelte';
  import MintPrice from './MintPrice.svelte';
  import Popup from './parts/Popup.svelte';
</script>

<Popup header={'Choose Amount'}>
  <div slot="content">
    <div class="mintCheckoutContainer">
      <MintCount />
      <MintChooseQuantity />
      <MintPrice />
      <MintConfirmButton />
    </div>
  </div>
</Popup>

<style>
  .mintCheckoutContainer {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
