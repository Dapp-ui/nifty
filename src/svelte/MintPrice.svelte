<script>
  import mintCount from './stores/mintCount';

  let count = 1;

  mintCount.subscribe((value) => {
    count = value;
  });

  let price = 10;
</script>

<div class="mintPrice">
  {count * price} ETH + Gas
</div>

<style>
  .mintPrice {
    padding: 20px;
  }
</style>
