<script lang="ts">
  import GenericButton from './GenericButton.svelte';
  import RotatorBorder from './RotatorBorder.svelte';

  export let isLoading = false;
  export let loadingText = 'minting...';
  export let title = 'Mint';
  export let handleClick;
</script>

<RotatorBorder>
  <GenericButton
    title={isLoading ? loadingText : title}
    {handleClick}
    styleType={isLoading ? 'secondary' : 'primary'}
  />
</RotatorBorder>

<style>
</style>
