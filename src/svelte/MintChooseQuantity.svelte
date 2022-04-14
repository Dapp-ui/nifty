<script>
  import mintCount from './stores/mintCount';

  let count = 1;

  mintCount.subscribe((value) => {
    count = value;
  });

  const increment = () => {
    mintCount.update((val) => val + 1);
  };

  const decrement = () => {
    mintCount.update((val) => val - 1);
  };
</script>

<div class="mintQuantityWrapper">
  <button disabled={count === 1} class="changeButton" on:click={decrement}
    >-</button
  >
  <div class="count">{count}</div>
  <button class="changeButton" on:click={increment}>+</button>
</div>

<style>
  .mintQuantityWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .count {
    font-size: 80px;
    padding: 0px 40px;
    min-width: 100px;
  }

  .changeButton {
    font-family: system-ui;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    color: white;
    outline: none;
    border: none;
    background: rgba(0, 0, 0);
    width: 50px;
    height: 50px;
    font-weight: bold;
    font-size: 30px;
  }
</style>
