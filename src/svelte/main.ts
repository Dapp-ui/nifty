import './global.css';

import ConnectWallet from './ConnectWalletFlow.svelte';
import MintFlow from './MintFlow.svelte';

const walletConnector = document.getElementById('connectWalletButton');
const mintButton = document.getElementById('mintButton');

const connectWallet = new ConnectWallet({
  target: walletConnector,
});

const mint = new MintFlow({
  target: mintButton,
});

export default { connectWallet, mint };
