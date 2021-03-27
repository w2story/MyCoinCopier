<script lang="ts">
  import { onMount } from "svelte";
  import Toast from "svelte-toast";
  // input -> select 처리기
  import Select from "svelte-select";
  // 비디오세팅 값
  import {
    getVideoInfo,
    setVideoToggle,
    setSupportSystem,
    setSysText,
  } from "~/store/database/videoSetting";
  // 폰트어섬
  import Fa from "svelte-fa";
  import {
    faImage,
    faFemale,
    faMale,
    faPalette,
  } from "@fortawesome/free-solid-svg-icons";
  // 스토어 : 알람 / 폰트
  import { alarmItems } from "~/store/alarm";
  import { fontItems } from "~/store/fontList";

  let videoSet = {};

  let noticeLayoutSelected = "";

  onMount(async () => {
    const res = await getVideoInfo();
    console.log(res);

    noticeLayoutSelected = String(res.allim_layout);
  });

  getVideoInfo().then((Response) => {
    videoSet = Response;
  });

  // 사용자 정보값 업데이트 처리
  // 정보값 처리를 위한 구문
  let error = {
    sys_title_template: "",
  };

  // 폰트 처리기
  let fontSelected = { value: "RixYeoljeongdo_Regular", label: "Rix열정도체" };
  const groupBy = (item) => item.group;

  // 토스트기 처리 구문
  const toast = new Toast({ position: "bottom-right" });

  // 토글 데이터 전처리
  const videoToggleUpdate = async () => {
    const ToggleUpae = await setVideoToggle(videoSet);
    if (ToggleUpae.success) {
      toast.success("후원 설정 변경 완료.");
    } else {
      toast.error("후원 설정 변경 불가.");
    }
  };

  // 후원 설정 전처리
  // 알람 레이아웃 처리
  const noticeLayoutChange = async (event) => {
    noticeLayoutSelected = event.currentTarget.value;
    videoSet.allim_layout = noticeLayoutSelected;
    const videoData = {
      allim_layout: noticeLayoutSelected,
      user_key: videoSet.user_key,
    };
    const voiceUpate = await setSupportSystem(videoData);
    if (voiceUpate.success) {
      toast.success("정보 변경 완료.");
    } else {
      toast.error("정보 변경 불가.");
    }
  };
  // 알람 소리 처리
  const allimSoundSelect = async (event) => {
    videoSet.allim_sound = event.detail.value;
    const videoData = {
      allim_sound: event.detail.value,
      user_key: videoSet.user_key,
    };
    const voiceUpate = await setSupportSystem(videoData);
    if (voiceUpate.success) {
      toast.success("정보 변경 완료.");
    } else {
      toast.error("정보 변경 불가.");
    }
  };
  // 후원 시스템 전처리
  const TitleTemplateUpdate = async () => {
    const sysTitleTemplate = videoSet.sys_title_template.trim();
    if (sysTitleTemplate.length == 0) {
      error.sys_title_template = "템플릿 내용을 넣어주세요.";
    } else if (sysTitleTemplate.length > 32) {
      error.sys_title_template = "32자 까지 입력됩니다.";
    } else {
      const voiceData = {
        sys_title_template: sysTitleTemplate,
        user_key: videoSet.user_key,
      };
      const voiceUpate = await setSysText(voiceData);
      if (voiceUpate.success) {
        toast.success("정보 변경 완료.");
        error.sys_title_template = "";
      } else {
        toast.error("정보 변경 불가.");
      }
    }
  };
</script>

<div class="layout">
  <div class="container">
    <h1 class="page-title">영상후원 / <small> Video Setup</small></h1>
    <div class="components">
      <div class="title">
        <h1>후원 설정 / <small> Support Setting</small></h1>
      </div>
      <div class="card">
        <div class="btn-group">
          <h3>도네이션 사용하기</h3>
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={videoSet.video_use}
              on:change={videoToggleUpdate}
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
              bind:checked={videoSet.mycast_coin_use}
              on:change={videoToggleUpdate}
            />
            <span class="slider round" />
          </label>
        </div>
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>후원 영상 설정 / <small> Support Video System</small></h1>
      </div>
      <div class="card">
        <!--<div class="input-group">
          <h3 class="input-title">알림 효과</h3>
          <input
            bind:value={videoSet.allim_effect}
            on:change{videoSupportSystemUpdate}
          />
        </div>
        <hr />-->
        <div class="thumbnail-group">
          <h3 class="thumbnail-title">알림 레이아웃</h3>
          <div class="thumbnail-btn">
            <label class="thumbnail">
              <input
                type="radio"
                value="bottom"
                bind:group={noticeLayoutSelected}
                on:change={noticeLayoutChange}
              />
              <span class="radio-box">
                <span class="icon">
                  <Fa icon={faImage} size="3x" />
                </span>
                <h3>text</h3>
              </span>
            </label>
            <label class="thumbnail">
              <input
                type="radio"
                value="center"
                bind:group={noticeLayoutSelected}
                on:change={noticeLayoutChange}
              />
              <span class="radio-box nLayout-center">
                <span class="icon">
                  <Fa icon={faImage} size="3x" />
                </span>
                <h3>text</h3>
              </span>
            </label>
            <label class="thumbnail">
              <input
                type="radio"
                value="noimg"
                bind:group={noticeLayoutSelected}
                on:change={noticeLayoutChange}
              />
              <span class="radio-box nLayout-noimg">
                <h3>text</h3>
              </span>
            </label>
          </div>
        </div>
        <hr />
        <div class="select-group">
          <h3 class="select-title">알림 효과음</h3>
          <div class="selecter">
            <Select
              items={alarmItems}
              selectedValue={videoSet.allim_sound}
              on:select={allimSoundSelect}
            />
          </div>
        </div>
      </div>
      <div class="components">
        <div class="title">
          <h1>시스템 텍스트 / <small> System Text</small></h1>
        </div>
        <div class="card">
          <div class="input-group">
            <h3 class="input-title">내용 템플릿</h3>
            <div class="input-box">
              <input
                bind:value={videoSet.sys_title_template}
                on:change={TitleTemplateUpdate}
              />
              {#if error.sys_title_template}<p>
                  {error.sys_title_template}
                </p>{/if}
            </div>
          </div>
          <hr />
          <div class="select-group">
            <h3 class="select-title">글자 폰트</h3>
            <div class="selecter">
              <Select
                items={fontItems}
                selectedValue={fontSelected}
                {groupBy}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../scss/inputBox.scss";

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
