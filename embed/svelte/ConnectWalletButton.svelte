<script>
  import CustomStylesButton from './parts/CustomStylesButton.svelte';
  import { getContext } from 'svelte';
  import ConnectWalletPopup from './ConnectWalletPopup.svelte';
  import connectedAddress from './stores/connectedAddress';
  import shortenAddress from '../utils/shortenAddress';
  const { open } = getContext('simple-modal');
  import params from '../utils/params';

  const { connectWalletButtonCustomStyles } = params;

  const showPopUp = () => open(ConnectWalletPopup);

  let buttonTitle;

  connectedAddress.subscribe((value) => {
    buttonTitle = shortenAddress(value);
  });
</script>

<CustomStylesButton
  handleClick={showPopUp}
  title={buttonTitle || 'Connect Wallet'}
  customStyles={connectWalletButtonCustomStyles}
/>
