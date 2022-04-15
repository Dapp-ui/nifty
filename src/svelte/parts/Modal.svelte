<svelte:options tag="generic-modal" />

<script>
  import modalVisibility from '../stores/modalVisibility';

  export let modalId = 'modal';

  let isShown;

  modalVisibility.subscribe((visibilityObj) => {
    isShown = visibilityObj[modalId];
  });
</script>

<div class={isShown ? 'modalWrapper shown' : 'modalWrapper hidden'}>
  <div class="modalContent">
    <slot>No modal content!</slot>
  </div>
</div>

<style>
  .modalWrapper {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    width: 100vw;
    height: 100vh;
  }

  .modalContent {
    border-radius: 5px;
    width: 500px;
    height: 500px;
  }

  .hidden {
    display: none;
  }

  .shown {
    display: block;
  }
</style>
