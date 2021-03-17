<script lang="ts">
  import { fade } from "svelte/transition";

  import Fa from "svelte-fa";
  import {
    faMoneyBillWave,
    faMusic,
    faTools,
    faTicketAlt,
  } from "@fortawesome/free-solid-svg-icons";
</script>

<main>
  <header>
    <h2 class="title">MyCoinCopier</h2>
  </header>
  <div in:fade>
    <div class="layout">
      <div class="container">
        <div class="btn-group">
          <div class="btn-item">
            <span class="icon">
              <Fa icon={faMoneyBillWave} size="2.5x" />
            </span>
            <h3>도네이션 리스트</h3>
          </div>
          <div class="btn-item">
            <span class="icon">
              <Fa icon={faMusic} size="2.5x" />
            </span>
            <h3>OSU 도네이션<br />리스트</h3>
          </div>
          <div class="btn-item">
            <span class="icon">
              <Fa icon={faTicketAlt} size="2.5x" />
            </span>
            <h3>토토 서비스<br />환경설정</h3>
          </div>
          <div class="btn-item">
            <span class="icon">
              <Fa icon={faTools} size="2.5x" />
            </span>
            <h3>도네이션 환경설정</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  * {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    color: #fff;
    user-select: none;
    &:focus {
      outline: none;
    }
  }
  body {
    background-color: #2a2f38;
  }

  main {
    width: 100%;
    height: 100%;
    background-color: #2a2f38;
    position: relative;

    div {
      width: calc(100%);
      height: 100%;
      background-color: #2a2f38;

      .container {
        width: 100%;
        height: auto;
        padding-top: 60px;
        .btn-group {
          width: calc(100% - 40px);
          height: auto;
          padding: 0px 20px;
          padding-top: 20px;
          display: flex;
          flex-wrap: wrap;
          .btn-item {
            width: calc(50% - 30px);
            height: 130px;
            background-color: #ff4081;
            margin-bottom: 20px;
            border-radius: 5px;
            padding: 10px;
            &:nth-child(even) {
              margin-left: 20px;
            }
            .icon {
              width: 50px;
              height: 50px;
              display: block;
              padding-top: 20px;
              padding-bottom: 15px;
            }
          }
        }
      }
    }
    header {
      background-color: #2a2f38;
      width: 100%;
      height: 40px;
      padding: 10px;
      position: fixed;
      top: 0px;
      left: 0px;
      border-bottom: 1px solid #2b2b2b;
      // 영역 처리
      z-index: 900;
      // 그림자영역
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
      .title {
        width: 200px;
        height: 30px;
        display: inline-block;
        float: left;
        padding-top: 4px;
        padding-left: 5px;
        font-size: 24px;
        font-weight: bolder;
        margin: 0%;
      }
    }
  }
</style>
