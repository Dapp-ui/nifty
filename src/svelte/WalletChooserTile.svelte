<script lang="ts">
  import RotatorBorder from './parts/RotatorBorder.svelte';

  export let logoUrl = '';
  export let name = '';
  export let walletId = '';
  export let onChoose = (id: string) => {};
  export let loading = false;
</script>

<div>
  <RotatorBorder shouldShow={loading}>
    <button
      class={loading ? 'walletChooserTile loading' : 'walletChooserTile'}
      on:click={() => onChoose(walletId)}
    >
      <img class="walletTileImage" src={logoUrl} alt={`${name} wallet`} />
      <p class="walletTileName">{name}</p>
    </button>
  </RotatorBorder>
</div>

<style>
  .walletChooserTile {
    outline: 1px solid black;
    width: 130px;
    height: 150px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: white;
    flex-direction: column;
  }

  .walletChooserTile:hover {
    outline: 2px solid black;
    cursor: pointer;
  }

  .walletChooserTile,
  .loading:hover {
    outline: 1px solid black;
    cursor: default;
  }

  .walletTileImage {
    width: 100px;
    height: 100px;
  }

  .walletTileName {
    font-size: 18px;
    margin: 0px;
  }
</style>
