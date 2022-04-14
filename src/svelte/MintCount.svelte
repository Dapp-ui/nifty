<script lang="ts">
  import nifty from './niftyInstance';
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
  <span>Total Minted</span>
  <hr />
  <div class="counts">
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
  }

  .counts {
    font-size: 18px;
  }
</style>
