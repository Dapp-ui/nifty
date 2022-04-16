<script lang="ts">
  export let handleClick: () => void;
  export let title = 'Connect Wallet';
  export let width;
  export let height;
  export let textColor = '#ffffff';
  export let backgroundColor = '#000000';
  export let border = 'transparent';
</script>

<button
  style="width: {width}px; height: {height}px; color: {textColor}; background: {backgroundColor}; border: 1px solid {border}"
  class={'genericButton'}
  on:click={handleClick}>{title}</button
>

<style>
  .genericButton {
    padding: 15px 30px;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    font-size: 16px;
  }
</style>
