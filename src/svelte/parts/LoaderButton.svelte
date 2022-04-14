<script lang="ts">
  import GenericButton from './GenericButton.svelte';
  import RotatorBorder from './RotatorBorder.svelte';

  export let isLoading = false;
  export let loadingText = 'waiting...';
  export let title = 'Mint';
  export let handleClick;
  export let width = 150;
  export let height = 50;
</script>

<RotatorBorder {width} {height} shouldShow={isLoading}>
  <GenericButton
    {width}
    {height}
    title={isLoading ? loadingText : title}
    {handleClick}
    styleType={isLoading ? 'secondary' : 'primary'}
  />
</RotatorBorder>

<style>
</style>
