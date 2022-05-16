<script lang="ts">
  export let imgUrl = '';
  export let animation = 'rotate';
</script>

<div class="inlineImageWrapper">
  <div
    class={animation === 'scroll' ? 'inner scroll' : 'inner rotate'}
    style="background-image: url({imgUrl})"
  />
</div>

<style>
  .inlineImageWrapper {
    margin: 0px 10px;
    position: relative;
    padding: 10px 10px;
    background: transparent;
  }

  .inner {
    border: 5px solid #1f271b;
    overflow: hidden;
  }

  .rotate {
    background-size: contain;
    animation: spin 30s linear infinite;
  }

  .scroll {
    background-position: 0px 0px;
    background-repeat: repeat-y;
    background-size: 100% 99%;
    animation: animatedBackground 100000s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(-360deg);
    }
  }

  @keyframes animatedBackground {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 0 100000000%;
    }
  }

  @media only screen and (min-width: 1585px) {
    .inner {
      border-radius: 70px;
      width: 70px;
      height: 70px;
    }
  }

  @media only screen and (min-width: 1350px) and (max-width: 1584px) {
    .inner {
      border-radius: 65px;
      width: 65px;
      height: 65px;
    }
  }

  @media only screen and (min-width: 1055px) and (max-width: 1350px) {
    .inner {
      border-radius: 55px;
      width: 55px;
      height: 55px;
      border: 4px solid #1f271b;
    }
  }

  @media only screen and (min-width: 800px) and (max-width: 1055px) {
    .inner {
      border-radius: 40px;
      width: 40px;
      height: 40px;
      border: 3px solid #1f271b;
    }
  }

  @media only screen and (min-width: 700px) and (max-width: 800px) {
    .inner {
      border-radius: 40px;
      width: 40px;
      height: 40px;
      border: 3px solid #1f271b;
    }

    .inlineImageWrapper {
      padding: 0px 10px;
    }
  }

  @media only screen and (max-width: 700px) {
    .inner {
      border-radius: 40px;
      width: 40px;
      height: 40px;
      border: 3px solid #1f271b;
      display: flex;
    }
  }

  @media only screen and (max-width: 450px) {
    .inlineImageWrapper {
      padding: 0px;
      margin-top: -25px;
    }
  }
</style>
