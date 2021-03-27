<script lang="ts">
  import Toast from "svelte-toast";
  // input -> select 처리기
  import Select from "svelte-select";

  // OSU맵 후원 세팅 값
  import {
    getMapSettingInfo,
    setMapSettingToggle,
    setSupportSystem,
  } from "~/store/database/osuMapSetting";

  // 스토어 : 알람 / 폰트
  import { alarmItems } from "~/store/alarm";

  let osuMapSet = {};

  getMapSettingInfo().then((Response) => {
    osuMapSet = Response;
  });

  let error = {
    osumap_total_list: "",
  };

  // 토스트기 처리 구문
  const toast = new Toast({ position: "bottom-right" });

  // 토글 데이터 전처리
  const mapSettingToggleUpdate = async () => {
    const ToggleUpae = await setMapSettingToggle(osuMapSet);
    if (ToggleUpae.success) {
      toast.success("후원 설정 변경 완료.");
    } else {
      toast.error("후원 설정 변경 불가.");
    }
  };
  // 후원 설정 전처리
  // 후원 글자 제한
  const MapSizeUpdate = async () => {
    let mpaTotalSize = osuMapSet.osumap_total_list.trim();
    if (isNaN(mpaTotalSize)) {
      error.osumap_total_list = "숫자가 아닙니다.";
    } else {
      mpaTotalSize = Number(mpaTotalSize.replace(/(^0+)/, ""));
      if (mpaTotalSize <= 0) {
        error.osumap_total_list = "최대 맵 수를 넣어주세요.";
      } else if (mpaTotalSize > 100) {
        error.osumap_total_list = "100이 최대 수 입니다.";
      } else {
        let osuMapData = {
          osumap_total_list: mpaTotalSize,
          user_key: osuMapSet.user_key,
        };
        const mapSetUpate = await setSupportSystem(osuMapData);
        if (mapSetUpate.success) {
          error.osumap_total_list = "";
          toast.success("정보 변경 완료.");
        } else {
          error.osumap_total_list = "업데이트 미 처리";
          toast.error("정보 변경 불가.");
        }
      }
    }
  };
  // 알람 소리 처리
  const allimSoundSelect = async (event) => {
    osuMapSet.allim_sound = event.detail.value;
    const osuMapData = {
      allim_sound: event.detail.value,
      user_key: osuMapSet.user_key,
    };
    const mapSetUpate = await setSupportSystem(osuMapData);
    if (mapSetUpate.success) {
      toast.success("정보 변경 완료.");
    } else {
      toast.error("정보 변경 불가.");
    }
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
          <div class="input-box">
            <input
              bind:value={osuMapSet.osumap_total_list}
              on:change={MapSizeUpdate}
            />
            {#if error.osumap_total_list}<p>{error.osumap_total_list}</p>{/if}
          </div>
        </div>
        <hr />
        <!--<div class="input-group">
          <h3 class="input-title">알림 효과</h3>
          <input bind:value={osuMapSet.allim_effect} />
        </div>
        <hr />-->
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
