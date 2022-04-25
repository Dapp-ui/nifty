<div
  class="rocketSlash"
  style="background-image: url(/images/rocketAnimated.png)"
/>

<style>
  .rocketSlash {
    width: 40px;
    height: 100px;
    background: white;
    z-index: 10;
    margin: 0px 40px;
    border-bottom: 4px solid black;
    border-top: 4px solid black;
    background-size: 75px 140px;
    background-position: 47% 50%;
    animation: animatedBackground 2000s linear infinite;
    border-radius: 20px;
  }

  @keyframes animatedBackground {
    from {
      background-position: 47% 50%;
    }
    to {
      background-position: 47% 100000%;
    }
  }
</style>
