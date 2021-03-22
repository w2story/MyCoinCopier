<script lang="ts">
  // OSU맵 후원 세팅 값
  import {
    getTotoInfo,
    setMapSettingToggle,
    setSupportSystem,
  } from "~/store/database/totoSetting";

  let totoSet = {};

  getTotoInfo(1).then((Response) => {
    totoSet = Response;
  });
  // 토글 데이터 전처리
  const totoToggleUpdate = () => {
    setMapSettingToggle(totoSet);
  };
  // 후원 설정 전처리
  const totoSupportSystemUpdate = () => {
    setSupportSystem(totoSet);
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
          <input
            bind:value={totoSet.toto_max_coin}
            on:change={totoSupportSystemUpdate}
          />
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
  @import "./scss/def.scss";

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
