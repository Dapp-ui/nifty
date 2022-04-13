<!-- Popup.svelte -->
<script>
  export let header = 'Hi';
</script>

<div class="popupWrapper">
  <h1>{header}</h1>
  <hr />
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
  }
</style>
