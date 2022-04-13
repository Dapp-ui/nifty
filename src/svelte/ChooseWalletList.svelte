<!-- Content.svelte -->
<script lang="ts">
  import WalletChooserTile from './WalletChooserTile.svelte';

  let chosenId = '';
  const handleWalletChoose = (id: string) => {
    chosenId = id;
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
    {#if chosenId === wallet.walletId || chosenId === ''}
      <WalletChooserTile
        {...wallet}
        onChoose={handleWalletChoose}
        loading={chosenId === wallet.walletId}
      />
    {/if}
  {/each}
</div>

{#if chosenId !== ''}
  <div class="waitingDisplay">
    <span>Waiting For Connection...</span>
  </div>
{/if}

<style>
  .chooseWalletList {
    justify-content: space-around;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 280px;
    padding: 0px 20px;
  }

  .waitingDisplay {
    width: 100%;
    text-align: center;
  }
</style>
