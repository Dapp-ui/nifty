<script>
  import GenericButton from './parts/GenericButton.svelte';
  import { getContext } from 'svelte';
  import ConnectWalletPopup from './ConnectWalletPopup.svelte';
  import connectedAddress from './stores/connectedAddress';
  import shortenAddress from '../utils/shortenAddress';
  const { open } = getContext('simple-modal');
  import params from '../utils/params';

  const { buttonBgColor, buttonTextColor } = params;

  const showPopUp = () => open(ConnectWalletPopup);

  let buttonTitle;

  connectedAddress.subscribe((value) => {
    buttonTitle = shortenAddress(value);
  });
</script>

<GenericButton
  textColor={buttonTextColor}
  backgroundColor={buttonBgColor}
  handleClick={showPopUp}
  title={buttonTitle || 'Connect Wallet'}
/>
