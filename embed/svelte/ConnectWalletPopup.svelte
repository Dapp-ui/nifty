<script>
  import Popup from './parts/Popup.svelte';
  import ChooseWalletList from './ChooseWalletList.svelte';
</script>

<Popup header={'Choose Wallet'}>
  <div slot="content">
    <ChooseWalletList />
  </div>
</Popup>
