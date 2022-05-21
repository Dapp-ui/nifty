<script>
  import Popup from './parts/Popup.svelte';
  import ChooseWalletList from './ChooseWalletList.svelte';
</script>

<Popup header={'Choose Wallet'} shrinkHr={true}>
  <div slot="content">
    <ChooseWalletList />
  </div>
</Popup>
