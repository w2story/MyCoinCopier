<script lang="ts">
    import Fa from 'svelte-fa'
    import { faBars } from '@fortawesome/free-solid-svg-icons'
</script>

<header>
    <a>
        <Fa icon={faBars} size="2x" pull="left"/>
    </a>
    <h2 class="title">MyCoinCopier</h2>
</header>

<style lang="scss">
    header{
      background-color: #2A2F38;
      width: 100%;
      height: 40px;
      padding: 10px;
      position: fixed;
      top: 0px;
      left: 0px;
      border-bottom: 1px solid #2B2B2B;
      // 영역 처리
      z-index: 900;
      // 그림자영역
      box-shadow: 
        0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%),
        0px 1px 3px 0px rgb(0 0 0 / 12%);
      
      a {
        width: 40px;
        height: 32px;
        display: inline-block;
        float: left;
        padding: 4px 0px;
        text-align: center;
      }

      .title {
        width: 200px;
        height: 30px;
        display: inline-block;
        float: left;
        padding-top: 4px;
        padding-left: 5px;
        font-size: 24px;
        font-weight: bolder;
      }
    }
</style>