<script>
  export let shouldShow = true;
  export let borderWidth = 2;
  export let width = 150;
  export let height = 175;
</script>

<div
  class="rotatorParent"
  style="width: {width + 2 * borderWidth}px; height: {height +
    2 * borderWidth}px;"
>
  <div class={shouldShow ? 'rotator' : 'hidden'}>
    <span />
    <span />
  </div>
  <div
    style="width: {width + 2 * borderWidth}px; height: {height +
      2 * borderWidth}px;"
    class="content"
  >
    <slot>No children!</slot>
  </div>
</div>

<style>
  .hidden {
    display: none;
  }

  .content {
    position: absolute;
    bottom: 0px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* opacity: 0.1; */
  }

  .rotator {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0px;
    top: 0px;
    animation: o-rotate-360 linear 6s infinite;
  }

  .rotatorParent {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }

  span {
    /* border: 1px solid red; */
    display: block;
    width: 100%;
    height: 200%;
    position: relative;
    transform: translate(-50%, -75%);
  }

  span:after {
    /* border: 1px solid green; */
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 100%;
  }

  span:first-child {
    background: black;
  }

  span:first-child:after {
    background: black;
  }

  span:last-child {
    background: white;
  }

  span:last-child:after {
    background: white;
  }

  @keyframes o-rotate-360 {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
