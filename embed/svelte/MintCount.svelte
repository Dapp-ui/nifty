<script lang="ts">
  import nifty from './niftyInstance';
  export let withLabel = true;
  export let textColor = '#000';
  type CountInfo = { numMinted: number; maxSupply: number };

  const getMintedDetails = async (): Promise<CountInfo> => {
    const numMintedPromise = nifty.totalNumMinted();
    const maxSupplyPromise = nifty.maxSupply();
    const [numMinted, maxSupply] = await Promise.all([
      numMintedPromise,
      maxSupplyPromise,
    ]);

    return {
      numMinted,
      maxSupply,
    };
  };

  const countInfo = getMintedDetails();
</script>

<div class="mintCount">
  {#if withLabel}
    <span>Total Minted</span>
    <hr />
  {/if}
  <div class="counts" style="color: {textColor}">
    {#await countInfo then { numMinted, maxSupply }}
      <span>{numMinted}</span>
      <span>/</span>
      <span>{maxSupply}</span>
    {/await}
  </div>
</div>

<style>
  .mintCount {
    padding: 10px 30px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .counts {
    font-size: 18px;
  }

  hr {
    width: 100%;
  }
</style>
