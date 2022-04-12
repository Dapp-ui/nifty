<script lang="ts">
  import GenericButton from './parts/GenericButton.svelte';
  function handleClick() {
    console.log('BUTTON CLICKED!!!');
  }
</script>

<GenericButton {handleClick} />

<style>
</style>
