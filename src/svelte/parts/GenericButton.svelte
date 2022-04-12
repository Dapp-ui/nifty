<script lang="ts">
  export let handleClick: () => void;
</script>

<button class="connectButton" on:click={handleClick}>Connect Wallet</button>

<style>
  .connectButton {
    background: black;
    color: white;
    padding: 15px 30px;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    font-size: 16px;
  }
</style>
