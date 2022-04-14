<script lang="ts">
  type StyleType = 'primary' | 'secondary';
  export let handleClick: () => void;
  export let title = 'Connect Wallet';
  export let styleType: StyleType = 'primary';
  export let width;
  export let height;
</script>

<button
  style="width: {width}px; height: {height}px;"
  class={styleType === 'primary'
    ? 'connectButton primary'
    : 'connectButton secondary'}
  on:click={handleClick}>{title}</button
>

<style>
  .connectButton {
    padding: 15px 30px;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    font-size: 16px;
  }

  .primary {
    background: black;
    color: white;
  }

  .secondary {
    color: black;
    background: white;
    border: 1px solid black;
  }
</style>
