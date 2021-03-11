<script lang="ts">
  import Fa from "svelte-fa";
  import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="layout">
  <div class="container">
    <h1>START SVEICE</h1>
  </div>
</div>

<style lang="scss">
  .layout {
    width: calc(100% - 30px);
    float: left;
    padding: 0px 15px;
    margin-top: 60px;

    overflow-x: hidden;
    overflow-y: scroll;

    .container {
      min-width: 900px;
      max-width: 1300px;
      margin: auto;
    }
  }
</style>
