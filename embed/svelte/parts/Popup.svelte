<!-- Popup.svelte -->
<script>
  export let header = 'Hi';
  export let shrinkHr = false;
</script>

<div class="popupWrapper">
  <h1 class={shrinkHr ? 'shrinked' : ''}>{header}</h1>
  <hr class={shrinkHr ? 'hidden' : ''} />
  <slot name="content">
    <span> no content was provided! </span>
  </slot>
</div>

<style>
  h1 {
    text-align: center;
  }
  .popupWrapper {
    padding: 10px 30px;
    max-height: 400px;
  }

  .hidden {
    display: none;
  }

  .shrinked {
    margin: 5px;
  }
</style>
