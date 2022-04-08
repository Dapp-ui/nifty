<script lang="ts">
  function handleClick() {
    console.log('THE BUTTON WAS CLICKED');
  }
</script>

<button class="connectButton" onclick={handleClick}>Connect Wallet</button>

<style>
  .connectButton {
    background: red;
    border: 1px solid black;
    color: white;
    padding: 30px 10px;
  }
</style>
