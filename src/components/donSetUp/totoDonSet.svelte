<script lang="ts">
  import Toast from "svelte-toast";
  // 토토 세팅 값
  import {
    getTotoInfo,
    setTotoToggle,
    setSupportSystem,
  } from "~/store/database/totoSetting";

  let totoSet = {};

  getTotoInfo().then((res) => {
    totoSet = res;
  });

  let error = {
    toto_max_coin: "",
  };

  // 토스트기 처리 구문
  const toast = new Toast({ position: "bottom-right" });

  // 토글 데이터 전처리
  const totoToggleUpdate = async () => {
    const ToggleUpae = await setTotoToggle(totoSet);
    if (ToggleUpae.success) {
      toast.success("후원 설정 변경 완료.");
    } else {
      toast.error("후원 설정 변경 불가.");
    }
  };
  // 토토 배팅 제한
  const totoSupportSystemUpdate = async () => {
    let totoMaxCoin = totoSet.toto_max_coin.trim();
    if (isNaN(totoMaxCoin)) {
      error.toto_max_coin = "숫자가 아닙니다.";
    } else {
      totoMaxCoin = Number(totoMaxCoin.replace(/(^0+)/, ""));
      if (totoMaxCoin <= 99) {
        error.toto_max_coin = "최소 100 이상을 넣어주세요.";
      } else if (totoMaxCoin > 500000) {
        error.toto_max_coin = "오십만이 최대 수 입니다.";
      } else {
        let Data = {
          toto_max_coin: totoMaxCoin,
          user_key: totoSet.user_key,
        };
        const voiceUpate = await setSupportSystem(Data);
        if (voiceUpate.success) {
          error.toto_max_coin = "";
          toast.success("정보 변경 완료.");
        } else {
          error.toto_max_coin = "업데이트 미 처리";
          toast.error("정보 변경 불가.");
        }
      }
    }
  };
</script>

<div class="layout">
  <div class="container">
    <h1 class="page-title">
      토토 서비스 설정 / <small> Toto Service Setup</small>
    </h1>
    <div class="components">
      <div class="title">
        <h1>토토 설정 / <small> Toto Setting</small></h1>
      </div>
      <div class="card">
        <div class="btn-group">
          <h3>토토서비스 사용하기</h3>
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={totoSet.toto_use}
              on:change={totoToggleUpdate}
            />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>마캐코인 사용하기</h3>
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={totoSet.mycast_coin_use}
              on:change={totoToggleUpdate}
            />
            <span class="slider round" />
          </label>
        </div>
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>토토 설정 / <small> Toto System</small></h1>
      </div>
      <div class="card">
        <div class="input-group">
          <h3 class="input-title">최대 코인 제한</h3>
          <div class="input-box">
            <input
              bind:value={totoSet.toto_max_coin}
              on:change={totoSupportSystemUpdate}
            />
            {#if error.toto_max_coin}<p>{error.toto_max_coin}</p>{/if}
          </div>
        </div>
        <hr />
        <div class="supporting-text">
          <p>※ 최댓값을 설정 하는 구간 입니다.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../scss/inputBox.scss";
  @import "./scss/input.se.scss";

  .layout {
    .container {
      .components {
        .card {
          .select-group {
            .selecter {
              width: 80%;
            }
          }
        }
      }
    }
  }
</style>
