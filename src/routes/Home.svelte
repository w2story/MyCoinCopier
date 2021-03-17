<script lang="ts">
  // 트랜스 구문
  import { fade } from "svelte/transition";
  // 메뉴, 상단바 상속 처리
</script>

<article>
  <div in:fade>
    <div class="layout">
      <div class="container">
        <h1>START SVEICE</h1>
      </div>
    </div>
  </div>
</article>

<style lang="scss">
  div {
    width: calc(100% - 251px);
    height: 100%;
    float: left;
  }
</style>
