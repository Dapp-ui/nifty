<script lang="ts">
  export let txnHash: string = '';
</script>

<div class="successWrapper">
  <img
    style="margin-bottom: 30px;"
    class="check"
    alt="check mark"
    src="https://storage.googleapis.com/niftyjs/check.png"
  />
  <div>Your mint is complete</div>
  <div>
    Check out the transaction <a
      target="_blank"
      href="https://etherscan.io/tx/{txnHash}">here</a
    >
  </div>
</div>

<style>
  .check {
    width: 120px;
    height: 120px;
  }

  .successWrapper {
    display: flex;
    flex-direction: column;
    height: 220px;
    align-items: center;
    justify-content: center;
  }
</style>
