<script lang="ts">
  export let imgUrl = '';
  export let borderColor = '#000';
</script>

<div class="inlineImageWrapper">
  <div class="inner" style="background-image: url({imgUrl})" />
</div>

<style>
  .inlineImageWrapper {
    margin: 0px 10px;
    position: relative;
    display: inline;
    padding: 10px;
    height: 70px;
    border-radius: 70px;
    width: 40px;
    background: transparent;
  }

  .inner {
    background-size: cover;
    border-radius: 70px;
    display: inline-flex;
    width: 70px;
    height: 70px;
    border: 5px solid #1f271b;
    overflow: hidden;
    margin-bottom: -12px;
  }
</style>
