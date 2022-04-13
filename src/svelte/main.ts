import './global.css';

import ConnectWallet from './ConnectWalletFlow.svelte';

const walletConnector = document.getElementById('connectWalletButton');

const connectWallet = new ConnectWallet({
  target: walletConnector,
});

export default { connectWallet };
