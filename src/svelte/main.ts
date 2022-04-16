import './global.css';

import ConnectWallet from './ConnectWalletFlow.svelte';
import MintFlow from './MintFlow.svelte';
import ErrorBanner from './parts/ErrorBanner.svelte';

// error container
const errorContainer = document.createElement('div');
document.body.appendChild(errorContainer);

// find all handles
const walletConnector = document.getElementById('connectWalletButton');
const mintButton = document.getElementById('mintButton');

const connectorShadow = walletConnector.attachShadow({ mode: 'open' });
const mintShadow = mintButton.attachShadow({ mode: 'open' });
const errorShadow = errorContainer.attachShadow({ mode: 'open' });

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

var css = new CSSStyleSheet();
// @ts-ignore
css.replaceSync(`
.bgBlur {
  backdrop-filter: blur(4px);
}

.window {
  width: 500px !important;
  height: 450px !important;
}
`);

// @ts-ignore
walletConnector.shadowRoot.adoptedStyleSheets = [css];
// @ts-ignore
errorContainer.shadowRoot.adoptedStyleSheets = [css];
// @ts-ignore
mintButton.shadowRoot.adoptedStyleSheets = [css];

export default { connectWallet, mint, errorText };
