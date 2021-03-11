<script lang="ts">
  import { fade } from "svelte/transition";
  import Router, { location } from "svelte-spa-router";

  import routes from "~/routes";
  import Header from "~/components/header/header.svelte";
  import Menu from "~/components/menu/menu.svelte";

  console.log($location);
</script>

<main>
  <Header />
  <Menu />
  {#key $location}
    <div in:fade>
      <Router {routes} restoreScrollState={true} />
    </div>
  {/key}
</main>

<style lang="scss">
  :global(body, html) {
    width: 100%;
    height: 100%;
    margin: 0%;
    padding: 0% !important;
    overflow: hidden;
    line-height: 1.4;
    font-family: "Spoqa Han Sans Neo", "sans-serif";
  }

  * {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    color: #fff;
    user-select: none;
    &:focus {
      outline: none;
    }
  }

  main {
    width: 100%;
    height: 100%;
    background-color: #2a2f38;
    position: relative;

    div {
      width: calc(100% - 251px);
      height: 100%;
      float: left;
    }
  }
</style>
