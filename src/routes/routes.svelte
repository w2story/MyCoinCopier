<script lang="ts">
  import { userTokenChk, pageReplace } from "~/store/auth/index";

  import { fade } from "svelte/transition";
  import Router, { location } from "svelte-spa-router";
  import routes from "~/routes";
  import Header from "~/components/header/header.svelte";
  import Menu from "~/components/menu/menu.svelte";

  const userToken = sessionStorage.getItem("token");

  console.log($location);

  console.log($location.indexOf("donChk"));
  console.log($location.indexOf("login"));
  console.log($location.indexOf("coincopier"));

  if (!userToken && $location != "/login") {
    console.log("not login");
    pageReplace("#/login");
    sessionStorage.setItem("backurl", $location);
  } else if (userToken && $location == "/login") {
    console.log("login use");
    const backurl = sessionStorage.getItem("backurl");
    pageReplace("#" + backurl);
  } else if (!userToken && $location == "/login") {
    console.log("login");
  } else {
    console.log("login token chk");
    let tokenUse = userTokenChk();
    console.log("tokenUse", tokenUse);
    if (!tokenUse) {
      pageReplace("#/login");
    }
  }
</script>

{#if $location.indexOf("donChk") == -1 && $location.indexOf("login") == -1 && $location.indexOf("coincopier") == -1}
  <main>
    <Header />
    <Menu />
    {#key $location}
      <div in:fade>
        <Router {routes} restoreScrollState={true} />
      </div>
    {/key}
  </main>
{:else}
  <Router {routes} restoreScrollState={true} />
{/if}

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
