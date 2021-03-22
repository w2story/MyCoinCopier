<script lang="ts">
  import { onMount } from "svelte";
  // input -> select 처리기
  import Select from "svelte-select";
  // 폰트 스토어
  import { fontItems } from "~/store/fontList";
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

  let videoSet = {};

  let noticeLayoutSelected = "";

  onMount(async () => {
    const res = await getVideoInfo(1);
    console.log(res);

    noticeLayoutSelected = String(res.allim_layout);
  });

  getVideoInfo(1).then((Response) => {
    videoSet = Response;
  });

  // 알람 처리
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

  // 폰트 처리기
  let fontSelected = { value: "RixYeoljeongdo_Regular", label: "Rix열정도체" };
  const groupBy = (item) => item.group;

  // 토글 데이터 전처리
  const videoToggleUpdate = () => {
    setVideoToggle(videoSet);
  };
  // 후원 설정 전처리
  const videoSupportSystemUpdate = () => {
    setSupportSystem(videoSet);
  };
  // 후원 시스템 전처리
  const systemTextUpdate = () => {
    setSysText(videoSet);
  };
  // 알람 레이아웃 처리
  const noticeLayoutChange = (event) => {
    console.log(event.currentTarget.value);
    noticeLayoutSelected = event.currentTarget.value;
    videoSet.allim_layout = noticeLayoutSelected;
    videoSupportSystemUpdate();
  };
  // 알람 소리 처리
  const allimSoundSelect = (event) => {
    videoSet.allim_sound = event.detail.value;
    videoSupportSystemUpdate();
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
        <div class="input-group">
          <h3 class="input-title">알림 효과</h3>
          <input
            bind:value={videoSet.allim_effect}
            on:change{videoSupportSystemUpdate}
          />
        </div>
        <hr />
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
            <input
              bind:value={videoSet.sys_title_template}
              on:change={systemTextUpdate}
            />
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
