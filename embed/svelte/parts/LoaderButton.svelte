<script lang="ts">
  import GenericButton from './GenericButton.svelte';
  import RotatorBorder from './RotatorBorder.svelte';

  export let isLoading = false;
  export let loadingText = 'waiting...';
  export let title = 'Mint';
  export let handleClick;
  export let width = 150;
  export let height = 50;
  export let borderColor = '#000';
</script>

<RotatorBorder {width} {height} shouldShow={isLoading}>
  <GenericButton
    {width}
    {height}
    title={isLoading ? loadingText : title}
    {handleClick}
    textColor={isLoading ? borderColor : '#fff'}
    backgroundColor={isLoading ? '#fff' : borderColor}
    border={isLoading ? borderColor : 'transparent'}
  />
</RotatorBorder>

<style>
</style>
