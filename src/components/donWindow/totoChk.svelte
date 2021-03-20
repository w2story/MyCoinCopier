<script lang="ts">
  import Fa from "svelte-fa";
  import {
    faCoins,
    faBalanceScale,
    faUsers,
    faTree,
    faCheckCircle,
  } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="content">
  <div class="components">
    <div class="title">
      <h1>이야기 랭크 승급 예상<br /><small>제출 마감전</small></h1>
    </div>
    <div class="card prediction-box possible">
      <div class="prediction-title">
        <h1>가능</h1>
      </div>
      <div class="item-list">
        <div class="item">
          <span class="icon">
            <Fa icon={faCoins} size="lg" />
          </span>
          <p>3,000,000</p>
        </div>
        <div class="item">
          <span class="icon">
            <Fa icon={faBalanceScale} size="lg" />
          </span>
          <p>1:17.29</p>
        </div>
        <div class="item">
          <span class="icon">
            <Fa icon={faUsers} size="lg" />
          </span>
          <p>531</p>
        </div>
        <div class="item">
          <span class="icon">
            <Fa icon={faTree} size="lg" />
          </span>
          <p>3,000,000</p>
        </div>
      </div>
      <div class="percentage">
        <h1>6%</h1>
      </div>
      <div class="sub-btn possible-btn">
        <Fa icon={faCheckCircle} size="3x" />
      </div>
    </div>
    <div class="middle-bar">
      <hr />
      <h2>VS</h2>
    </div>
    <div class="card prediction-box impossible">
      <div class="prediction-title">
        <h1>불가능</h1>
      </div>
      <div class="item-list">
        <div class="item">
          <span class="icon">
            <Fa icon={faCoins} size="lg" />
          </span>
          <p>3,000,000</p>
        </div>
        <div class="item">
          <span class="icon">
            <Fa icon={faBalanceScale} size="lg" />
          </span>
          <p>1:1.06</p>
        </div>
        <div class="item">
          <span class="icon">
            <Fa icon={faUsers} size="lg" />
          </span>
          <p>2,004</p>
        </div>
        <div class="item">
          <span class="icon">
            <Fa icon={faTree} size="lg" />
          </span>
          <p>3,000,000</p>
        </div>
      </div>
      <div class="percentage">
        <h1>94%</h1>
      </div>
      <div class="sub-btn impossible-btn">
        <Fa icon={faCheckCircle} size="3x" />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .components {
    width: 100%;
    .title {
      width: 100%;
      height: auto;
      padding: 15px 0px;
      background-color: #1c2027;
      text-align: center;
      h1 {
        font-size: 24px;
        font-weight: bolder;
        line-height: 26px;
        small {
          color: #ff4081;
          font-size: 16px;
          font-weight: normal;
        }
      }
    }
    .middle-bar {
      width: 100%;
      height: 5px;
      padding: 15px 0px;
      position: relative;
      margin: 20px 0px;
      hr {
        border-color: #36393f;
        border-width: 2px;
        margin: 0px;
      }
      h2 {
        position: absolute;
        top: calc(50% - 23px);
        left: calc(50% - 30px);
        font-size: 25px;
        padding: 5px 15px;
        font-weight: bolder;
        background-color: #2a2f38;
      }
    }
    .prediction-box {
      width: calc(100% - 20px);
      height: auto;
      background-color: #3a3f47;
      position: relative;
      padding: 10px;
      padding-top: 15px;
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

      &.possible {
        .prediction-title,
        .percentage > h1,
        .sub-btn.acitve,
        .item-list > .item > .icon {
          color: #3bc0f8;
        }
      }
      &.impossible {
        .prediction-title,
        .percentage > h1,
        .sub-btn.acitve,
        .item-list > .item > .icon {
          color: #ff4081;
        }
      }
      .prediction-title {
        width: calc(100% - 70px);
        padding: 10px;
        padding-top: 0px;
        border-bottom: 3px solid #1c2027;
        margin-bottom: 10px;
        padding-right: 50px;
        font-size: 36px;
        font-weight: bolder;
        text-shadow: 0 1px 1px rgb(0 0 0 / 75%);
      }
      .item-list {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        .item {
          width: calc(100% - 20px);
          height: 25px;
          padding: 10px;
          display: flex;

          .icon {
            width: 25px;
            height: 25px;
            text-align: center;
          }
          p {
            width: calc(100% - 35px);
            height: auto;
            padding-left: 20px;
            font-size: 18px;
          }
        }
      }
      .percentage {
        width: auto;
        height: auto;
        position: absolute;
        bottom: 10px;
        right: 20px;

        h1 {
          font-size: 60px;
          font-weight: bolder;
          text-shadow: 0 1px 1px rgb(0 0 0 / 75%);
        }
      }
      .sub-btn {
        width: 48px;
        height: 48px;

        color: #1c2027;

        position: absolute;
        top: 15px;
        right: 20px;

        &:hover {
          color: #8895ab;
        }
      }
    }
  }
</style>
