import './global.css';

import ConnectWallet from './ConnectWalletFlow.svelte';
import MintFlow from './MintFlow.svelte';
import ErrorBanner from './parts/ErrorBanner.svelte';
import params from '../utils/params';

// error container
const errorContainer = document.createElement('div');
document.body.appendChild(errorContainer);

// find all handles
const walletConnector = document.querySelector(params.connectButtonSelector);
const mintButton = document.querySelector(params.mintButtonSelector);

const connectorShadow = walletConnector.attachShadow({ mode: 'closed' });
const mintShadow = mintButton.attachShadow({ mode: 'closed' });
const errorShadow = errorContainer.attachShadow({ mode: 'closed' });

const walletConnectTarget = document.createElement('div');
const mintButtonTarget = document.createElement('div');
const errorTarget = document.createElement('div');

connectorShadow.appendChild(walletConnectTarget);
mintShadow.appendChild(mintButtonTarget);
errorShadow.appendChild(errorTarget);

const connectWallet = new ConnectWallet({
  target: walletConnectTarget,
});

const mint = new MintFlow({
  target: mintButtonTarget,
});

const errorText = new ErrorBanner({
  target: errorTarget,
});

export default { connectWallet, mint, errorText };
