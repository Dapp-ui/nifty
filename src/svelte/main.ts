import './global.css';

import ConnectWallet from './ConnectWalletFlow.svelte';
import MintFlow from './MintFlow.svelte';
import ErrorBanner from './parts/ErrorBanner.svelte';

const walletConnector = document.getElementById('connectWalletButton');
const mintButton = document.getElementById('mintButton');

const connectWallet = new ConnectWallet({
  target: walletConnector,
});

const mint = new MintFlow({
  target: mintButton,
});

const errorText = new ErrorBanner({
  target: document.body,
});

export default { connectWallet, mint, errorText };
