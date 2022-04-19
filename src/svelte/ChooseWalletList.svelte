<script lang="ts">
  import WalletChooserTile from './WalletChooserTile.svelte';
  import shortenAddress from '../utils/shortenAddress';
  import { getContext } from 'svelte';
  import nifty from './niftyInstance';
  import type { WalletType } from '../WalletConnector';
  import connectedAddressStore from './stores/connectedAddress';
  import { parseWalletConnectError } from '../utils/errorHandlers';
  import errMessage from './stores/errorMessage';

  let loadingWalletId = '';
  let connectedWalletAddress = '';

  const { close } = getContext('simple-modal');

  const handleWalletChoose = async (id: WalletType) => {
    try {
      loadingWalletId = id;
      const address = await nifty.connectWallet(id);
      loadingWalletId = '';
      connectedWalletAddress = address;
      connectedAddressStore.set(address);

      setTimeout(() => {
        close();
      }, 2000);
    } catch (e) {
      loadingWalletId = '';
      close();

      const parsedErr = parseWalletConnectError(e);
      errMessage.set(parsedErr);
    }
  };

  const wallets = [
    {
      walletId: 'metamask',
      name: 'Metamask',
      logoUrl:
        'https://storage.googleapis.com/niftyjs/wallet-logos/metamask.png',
    },
    {
      walletId: 'coinbase',
      name: 'Coinbase',
      logoUrl:
        'https://storage.googleapis.com/niftyjs/wallet-logos/coinbaseV2.png',
    },
  ];
</script>

<div class="chooseWalletList">
  {#each wallets as wallet}
    {#if (loadingWalletId === wallet.walletId || !loadingWalletId) && !connectedWalletAddress}
      <WalletChooserTile
        {...wallet}
        onChoose={handleWalletChoose}
        loading={loadingWalletId === wallet.walletId}
      />
    {/if}
  {/each}

  {#if connectedWalletAddress !== ''}
    <div class="center">
      <img
        style="margin-bottom: 30px;"
        class="check"
        alt="check mark"
        src="https://storage.googleapis.com/niftyjs/check.png"
      />
      <div class="bottomText">
        <span
          >Successfully connected wallet <br />
          {shortenAddress(connectedWalletAddress)}</span
        >
      </div>
    </div>
  {/if}
</div>

{#if loadingWalletId !== ''}
  <div class="bottomText">
    <span>Waiting for Connection...</span>
  </div>
{/if}

<style>
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chooseWalletList {
    justify-content: space-around;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 280px;
    padding: 0px 20px;
  }

  .check {
    width: 120px;
    height: 120px;
  }

  .bottomText {
    width: 100%;
    text-align: center;
  }
</style>
