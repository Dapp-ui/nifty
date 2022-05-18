<script lang="ts">
  import errorMessage from '../stores/errorMessage';
  import GlobalStyles from './GlobalStyles.svelte';

  let errorText;
  let timeout;

  errorMessage.subscribe(({ humanReadableError }) => {
    errorText = humanReadableError;

    if (humanReadableError) {
      timeout = setTimeout(() => {
        errorMessage.set({ humanReadableError: '', fullError: '' });
        timeout = null;
      }, 4000);
    }
  });

  const dismiss = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    errorMessage.set({ humanReadableError: '', fullError: '' });
  };
</script>

<div class={errorText.length > 0 ? 'errorText shown' : 'errorText hidden'}>
  <div class="textWrapper">
    <div>{errorText}</div>
    <div class="dismissWrapper">
      <button class="dismissButton" on:click={dismiss}>dismiss</button>
    </div>
  </div>
</div>

<GlobalStyles />

<style>
  .errorText {
    position: fixed;
    width: 100vw;
    transition: all 150ms ease-out;
    height: 60px;
    font-size: 18px;
    background: #c32f27;
    color: white;
    left: 0px;
    right: 0px;
    z-index: 2147483647;
  }

  .textWrapper {
    position: relative;
    width: 100%;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
  }

  .dismissWrapper {
    position: absolute;
    right: 30px;
  }

  .shown {
    opacity: 1;
    top: 0px;
  }

  .hidden {
    opacity: 0;
    top: -60px;
  }

  .dismissButton {
    font-size: 16px;
    padding: 10px 30px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    color: white;
    background: #e47c77;
  }
</style>
