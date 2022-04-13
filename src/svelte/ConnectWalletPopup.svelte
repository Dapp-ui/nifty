<!-- Content.svelte -->
<script>
  import Popup from './parts/Popup.svelte';
  import ChooseWalletList from './ChooseWalletList.svelte';

  // https://storage.googleapis.com/niftyjs/wallet-logos/metamask.png
  // https://storage.googleapis.com/niftyjs/wallet-logos/coinbase.png
</script>

<Popup header={'Choose Wallet'}>
  <div slot="content">
    <ChooseWalletList />
  </div>
</Popup>
