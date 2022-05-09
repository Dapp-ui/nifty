<script>
  import GenericButton from './parts/GenericButton.svelte';
  import { getContext } from 'svelte';
  import MintPopUp from './MintPopUp.svelte';
  import nifty from './niftyInstance';
  import errorMessage from './stores/errorMessage';
  import params from '../utils/params';

  const { buttonBgColor, buttonTextColor } = params;

  const { open } = getContext('simple-modal');

  const showPopUp = () => {
    const connectedAddress = nifty.getConnectedAddress();
    if (!connectedAddress) {
      const err = 'You must connect your wallet before minting!';
      errorMessage.set({ humanReadableError: err, fullError: err });
      return;
    }

    open(MintPopUp);
  };
</script>

<GenericButton
  textColor={buttonTextColor}
  backgroundColor={buttonBgColor}
  handleClick={showPopUp}
  title={'Mint'}
  customStyles={params.mintButtonCustomStyles}
/>
