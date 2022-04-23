<script lang="ts">
  import { juiceOrange } from '../globalStyles';
  import InlineImageItem from './InlineImageItem.svelte';
</script>

<main>
  <div class="outerBorder" style="background: {juiceOrange}">
    <div class="innerBorder">
      <div class="mainSection">
        <div class="header">
          <h1>
            We are Juice<InlineImageItem imgUrl="/images/orangeBW.png" />Labs.
            <br />
            We Help<InlineImageItem imgUrl="/images/rocket.png" />Creators
            Launch NFTS on their <u>Own</u>
            Websites. No Code Needed.
          </h1>
        </div>
        <a href="https://discord.com" target="_blank">Join Our Discord</a>
      </div>
      <!-- <img alt="Juice Logo" src="/images/juiceMidRes.jpg" class="logoImage" /> -->
    </div>
  </div>
</main>

<style>
  .header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    word-wrap: break-word;
    align-items: center;
  }

  h1 {
    display: inline;
    margin: 0px;
    color: #1f271b;
    font-size: 85px;
    font-weight: black;
    text-align: center;
    line-height: 100px;
  }

  a {
    background: #1f271b;
    padding: 20px 100px;
    border: none;
    outline: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    font-family: NunitoSans;
    text-decoration: none;
    margin-top: 100px;
  }

  .innerBorder {
    border: 15px solid #1f271b;
    background: white;
    width: calc(100vw - 70px);
    height: calc(100vh - 70px);
    overflow: hidden;
  }

  .mainSection {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    padding: 0px 100px;
  }

  .outerBorder {
    backdrop-filter: blur(5px);
    z-index: -1;
    width: 100vw;
    height: 100vh;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
