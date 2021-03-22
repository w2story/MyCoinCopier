<script lang="ts">
  // input -> select 처리기
  import Select from "svelte-select";

  // OSU맵 후원 세팅 값
  import {
    getMapSettingInfo,
    setMapSettingToggle,
    setSupportSystem,
  } from "~/store/database/osuMapSetting";

  let osuMapSet = {};

  getMapSettingInfo(1).then((Response) => {
    osuMapSet = Response;
  });

  // 알람 처리
  function handleSelect(event) {
    console.log("selected item", event.detail);
    // .. do something here 🙂
  }
  const alarmItems = [
    {
      value: "무음",
      label: "무음",
    },
    {
      value: "안녕로봇",
      label: "안녕로봇",
    },
    {
      value: "디바",
      label: "디바",
    },
    {
      value: "아이폰",
      label: "아이폰",
    },
    {
      value: "기상나팔",
      label: "기상나팔",
    },
    {
      value: "어서일어나",
      label: "어서일어나",
    },
  ];

  // 토글 데이터 전처리
  const mapSettingToggleUpdate = () => {
    setMapSettingToggle(osuMapSet);
  };
  // 후원 설정 전처리
  const mapSupportSystemUpdate = () => {
    setSupportSystem(osuMapSet);
  };
  // 알람 소리 처리
  const allimSoundSelect = (event) => {
    osuMapSet.allim_sound = event.detail.value;
    mapSupportSystemUpdate();
  };
</script>

<div class="layout">
  <div class="container">
    <h1 class="page-title">Osu 맵 후원 / <small> Osu Map Support</small></h1>
    <div class="components">
      <div class="title">
        <h1>후원 세부 설정 / <small> Support Setting</small></h1>
      </div>
      <div class="card">
        <div class="btn-group">
          <h3>도네이션 사용하기</h3>
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={osuMapSet.osumap_use}
              on:change={mapSettingToggleUpdate}
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
              bind:checked={osuMapSet.mycast_coin_use}
              on:change={mapSettingToggleUpdate}
            />
            <span class="slider round" />
          </label>
        </div>
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>Osu 후원 설정 / <small> Osu Support System</small></h1>
      </div>
      <div class="card">
        <div class="input-group">
          <h3 class="input-title">총 맵 제한</h3>
          <input
            bind:value={osuMapSet.osumap_total_list}
            on:change={mapSupportSystemUpdate}
          />
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">알림 효과</h3>
          <input bind:value={osuMapSet.allim_effect} />
        </div>
        <hr />
        <div class="select-group">
          <h3 class="select-title">알림 효과음</h3>
          <div class="selecter">
            <Select
              items={alarmItems}
              selectedValue={osuMapSet.allim_sound}
              on:select={allimSoundSelect}
            />
          </div>
        </div>
        <hr />
        <div class="supporting-text">
          <p>※해당 스트림키는 남에게 보여주시면 안됩니다.</p>
          <p>
            ※사용방법 : "http://subwiti.net/mds/streamer_obs.php?str_tok="주소
            뒤에 스트림키를 붙여 OBS 브라우저 URL에 추가
          </p>
          <p>※화면크기 : 720 * 1280 // 필히 준수해주시길 바랍니다.</p>
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
