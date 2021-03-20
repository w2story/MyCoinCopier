<script lang="ts">
  import MyModal from "./tiempick.svelte";
  import { totoTime } from "~/store/totoTime";
  let showModal = false;

  const formatter = new Intl.DateTimeFormat("en", {
    hour12: false,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
</script>

<div class="content">
  <div class="components">
    <div class="title">
      <h1>토토 설정 / <small> Toto System</small></h1>
    </div>
    <div class="card">
      <div class="input-group">
        <h3 class="input-title">토토 제목</h3>
        <input value="100" />
      </div>
      <hr />
      <div class="input-group">
        <h3 class="input-title">토토 1번 값</h3>
        <input value="100" />
      </div>
      <hr />
      <div class="input-group">
        <h3 class="input-title">토토 2번 값</h3>
        <input value="100" />
      </div>
      <div class="supporting-text">
        <p>※ 토토는 명확한 참 거짓으로 나뉘는 값 설정 부탁드립니다.</p>
      </div>
      <div class="input-group">
        <h3 class="input-title">시간 제한</h3>
        <input
          value={formatter.format($totoTime)}
          on:click={() => {
            showModal = true;
          }}
        />
      </div>
    </div>
    <div class="card save-btn">
      <h3>토토 생성</h3>
    </div>
  </div>
</div>
{#if showModal}
  <MyModal bind:showModal />
{/if}

<style lang="scss">
  .components {
    width: 100%;
    .title {
      width: 100%;
      height: 32px;
      background-color: #1c2027;
      padding: 10px;
      h1 {
        font-size: 24px;
        font-weight: bolder;

        small {
          color: #ff4081;
          font-size: 20px;
          font-weight: normal;
        }
      }
    }
    .card {
      width: calc(100%);
      height: auto;
      background-color: #3a3f47;
      padding-top: 15px;

      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
      &.save-btn {
        width: calc(100% - 40px);
        background-color: #ff4081;
        padding: 20px;
        text-align: center;

        h3 {
          font-size: 20px;
          font-weight: bolder;
        }
      }
      hr {
        border-color: #36393f;
        margin-bottom: 15px;
      }
      .supporting-text {
        width: calc(100%);
        height: auto;
        background-color: #1c2027;
        padding: 15px;
        margin-bottom: 15px;

        p {
          font-size: 12px;
        }
      }
      // 입력 값 박스형
      .input-group {
        width: 100%;
        height: auto;
        display: flex;
        padding-bottom: 10px;
        flex-direction: column;

        input {
          width: calc(100% - 40px);
          height: 30px;
          color: #fff;
          background-color: #202225;
          margin: 0px 10px;

          border-radius: 5px;
          border: 0px;
          padding: 10px;
          font-size: 18px;
        }
        .input-title {
          width: 100%;
          height: 30px;
          color: #fff;
          font-size: 18px;
          line-height: 20px;
          padding: 10px;
        }
      }
    }
  }
</style>
