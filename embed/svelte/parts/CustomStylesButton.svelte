<script lang="ts">
  export let handleClick: () => void;
  export let title = 'Connect Wallet';
  export let customStyles = '';
</script>

<button style={customStyles} class={'genericButton'} on:click={handleClick}
  >{title}</button
>

<style>
  .genericButton {
    background: black;
    color: white;
    padding: 15px 30px;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    font-size: 16px;
  }
</style>
