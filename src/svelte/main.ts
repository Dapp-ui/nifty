import './global.css';

import ConnectWallet from './ConnectWallet.svelte';

const walletConnector = document.getElementById('connectWalletButton');

const connectWallet = new ConnectWallet({
  target: walletConnector,
});

export default { connectWallet };
