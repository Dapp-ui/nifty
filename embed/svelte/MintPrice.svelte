<script lang="ts">
  import mintCount from './stores/mintCount';
  import nifty from './niftyInstance';

  let count = 1;

  mintCount.subscribe((value) => {
    count = value;
  });

  const pricePromise = nifty.mintPrice('ether');
</script>

<div class="mintPrice">
  {#await pricePromise then price}
    {(count * 100000 * parseFloat(price)) / 100000}
  {/await}
  ETH + Gas
</div>

<style>
  .mintPrice {
    padding: 20px;
  }
</style>
