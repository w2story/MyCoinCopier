<script lang="ts">
  import { onMount } from "svelte";
  // 색상 선택기
  import { HsvPicker } from "svelte-color-picker";
  // input -> select 처리기
  import Select from "svelte-select";
  // 폰트 스토어
  import { fontItems } from "~/store/fontList";
  // 이미지 업로드 전처리기
  import Dropzone from "svelte-file-dropzone";
  // 보이스세팅 값
  import {
    getVoiceInfo,
    setVoiceToggle,
    setSupportSystem,
    setSysText,
    setSysColor,
  } from "~/store/database/voiceSetting";

  // 폰트어섬
  import Fa from "svelte-fa";
  import {
    faImage,
    faPalette,
    faFileImage,
    faTimes,
  } from "@fortawesome/free-solid-svg-icons";

  let voiceSet = {};
  let noticeLayoutSelected = "";

  // 색상 선택기
  let sysTextColor = {
    active: false,
    rgba: "rgba(32,34,37,1)",
  };
  let impactColor = {
    active: false,
    rgba: "rgba(32,34,37,1)",
  };

  onMount(async () => {
    const res = await getVoiceInfo(1);
    console.log(res);

    console.log(res.allim_layout);

    noticeLayoutSelected = res.allim_layout;
    sysTextColor.rgba = res.sys_text_color;
    impactColor.rgba = res.sys_emp_color;
  });

  getVoiceInfo(1).then((Response) => {
    voiceSet = Response;
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

  const sysTextColorCallback = (rgba) => {
    let ColorRGBA = "rgba(";
    ColorRGBA += rgba.detail.r + ", ";
    ColorRGBA += rgba.detail.g + ", ";
    ColorRGBA += rgba.detail.b + ", ";
    ColorRGBA += rgba.detail.a + ")";

    sysTextColor.rgba = ColorRGBA;
    voiceSet.sys_text_color = ColorRGBA;
    systemColorUpdate();
  };
  const impactColorCallback = (rgba) => {
    let ColorRGBA = "rgba(";
    ColorRGBA += rgba.detail.r + ", ";
    ColorRGBA += rgba.detail.g + ", ";
    ColorRGBA += rgba.detail.b + ", ";
    ColorRGBA += rgba.detail.a + ")";

    impactColor.rgba = ColorRGBA;
    voiceSet.sys_emp_color = ColorRGBA;
    systemColorUpdate();
  };
  const colorSelectAcitve = (colorSelect) => {
    switch (colorSelect) {
      case "sys":
        if (sysTextColor.active === true) {
          sysTextColor.active = false;
        } else {
          sysTextColor.active = true;
          impactColor.active = false;
        }
        break;
      case "impact":
        if (impactColor.active === true) {
          impactColor.active = false;
        } else {
          impactColor.active = true;
          sysTextColor.active = false;
        }
        break;
    }
  };

  // 폰트 처리기
  let fontSelected = { value: "RixYeoljeongdo_Regular", label: "Rix열정도체" };
  const groupBy = (item) => item.group;

  // 이미지 업로드 처리기
  let files = {
    accepted: [],
    rejected: [],
    tmpImgArr: [],
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        files.tmpImgArr.push(reader.result);
        console.log("file reading ok");
      };
    });
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    console.log(files);
  }

  // 토글 데이터 전처리
  const voiceToggleUpdate = () => {
    setVoiceToggle(voiceSet);
  };
  // 후원 설정 전처리
  const voiceSupportSystemUpdate = () => {
    setSupportSystem(voiceSet);
  };
  // 후원 시스템 전처리
  const systemTextUpdate = () => {
    setSysText(voiceSet);
  };
  // 후원 시스템 색상 전처리
  const systemColorUpdate = () => {
    setSysColor(voiceSet);
  };
  // 알람 레이아웃 처리
  const noticeLayoutChange = (event) => {
    console.log(event.currentTarget.value);
    noticeLayoutSelected = event.currentTarget.value;
    voiceSet.allim_layout = noticeLayoutSelected;
    voiceSupportSystemUpdate();
  };
  // 알람 소리 처리
  const allimSoundSelect = (event) => {
    voiceSet.allim_sound = event.detail.value;
    voiceSupportSystemUpdate();
  };
</script>

<div class="layout">
  <div class="container">
    <h1 class="page-title">음성후원 / <small> Voice Setup</small></h1>
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
              bind:checked={voiceSet.voice_use}
              on:change={voiceToggleUpdate}
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
              bind:checked={voiceSet.mycast_coin_use}
              on:change={voiceToggleUpdate}
            />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>이미지 후원 사용하기</h3>
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={voiceSet.custom_img_use}
              on:change={voiceToggleUpdate}
            />
            <span class="slider round" />
          </label>
        </div>
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>후원 설정 / <small> Support System</small></h1>
      </div>
      <div class="card">
        <div class="input-group">
          <h3 class="input-title">글자 제한</h3>
          <input
            bind:value={voiceSet.tts_text_size}
            on:change={voiceSupportSystemUpdate}
          />
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">알림 효과</h3>
          <input
            bind:value={voiceSet.allim_effect}
            on:change={voiceSupportSystemUpdate}
          />
        </div>
        <hr />
        <div class="thumbnail-group">
          <h3 class="thumbnail-title">알림 레이아웃</h3>
          <div class="thumbnail-btn">
            <label class="thumbnail">
              <input
                type="radio"
                name="layoutSelect"
                bind:group={noticeLayoutSelected}
                on:change={noticeLayoutChange}
                value="bottom"
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
                name="layoutSelect"
                bind:group={noticeLayoutSelected}
                on:change={noticeLayoutChange}
                value="center"
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
                name="layoutSelect"
                bind:group={noticeLayoutSelected}
                on:change={noticeLayoutChange}
                value="noimg"
              />
              <span class="radio-box nLayout-noimg">
                <h3>text</h3>
              </span>
            </label>
          </div>
        </div>
        <hr />
        <div class="imgUpload-group">
          <h3 class="imgUpload-title">알림 이미지</h3>
          <div class="imgUpload-box">
            <div class="imgUpload-btn">
              <Dropzone on:drop={handleFilesSelect}>
                <div class="upload-text">
                  <span class="icon">
                    <Fa icon={faFileImage} size="3x" />
                  </span>
                  <h3>드래그 or 클릭</h3>
                </div>
              </Dropzone>
            </div>
            <div class="imgUpload-list">
              {#if files.tmpImgArr}
                {#each files.tmpImgArr as item}
                  <div class="imgItme">
                    <img class="tmpimg" src={item} alt="d" />
                    <div class="img-btn-group">
                      <a class="close-btn">
                        <Fa icon={faTimes} size="" />
                      </a>
                    </div>
                  </div>
                {/each}
              {:else}
                <div class="imgItme">
                  <img class="tmpimg" src="a" alt="d" />
                  <div class="img-btn-group">
                    <a class="close-btn">
                      <Fa icon={faTimes} size="" />
                    </a>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
        <hr />
        <div class="select-group">
          <h3 class="select-title">알림 효과음</h3>
          <div class="selecter">
            <Select
              items={alarmItems}
              selectedValue={voiceSet.allim_sound}
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
    <div class="components">
      <div class="title">
        <h1>시스템 텍스트 / <small> System Text</small></h1>
      </div>
      <div class="card">
        <div class="btn-group">
          <h3>타이틀 TTS 사용하기</h3>
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={voiceSet.title_tts_use}
              on:change={voiceToggleUpdate}
            />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">타이틀 템플릿</h3>
          <input
            bind:value={voiceSet.sys_title_template}
            on:change={systemTextUpdate}
          />
        </div>
        <hr />
        <div class="select-group">
          <h3 class="select-title">글자 폰트</h3>
          <div class="selecter">
            <Select items={fontItems} selectedValue={fontSelected} {groupBy} />
          </div>
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">시스템 텍스트 크기(px)</h3>
          <input
            bind:value={voiceSet.sys_font_size}
            on:change={systemTextUpdate}
          />
        </div>
        <hr />
        <div class="color-group">
          <h3 class="color-title">시스템 텍스트 색상</h3>
          <label class="color-selecter">
            <input bind:value={sysTextColor.rgba} />
            <a
              on:click={() => colorSelectAcitve("sys")}
              style="background-color:{sysTextColor.rgba}"
            >
              <Fa icon={faPalette} size="lg" />
            </a>
            {#if sysTextColor.active}
              <div class="color-pick">
                <HsvPicker
                  on:colorChange={sysTextColorCallback}
                  startColor={"#202225"}
                />
              </div>
            {/if}
          </label>
        </div>
        <hr />
        <div class="color-group">
          <h3 class="color-title">닉네임, 금액 색상</h3>
          <label class="color-selecter">
            <input bind:value={impactColor.rgba} />
            <a
              on:click={() => colorSelectAcitve("impact")}
              style="background-color:{impactColor.rgba}"
            >
              <Fa icon={faPalette} size="lg" />
            </a>
            {#if impactColor.active}
              <div class="color-pick">
                <HsvPicker
                  on:colorChange={impactColorCallback}
                  startColor={"#202225"}
                />
              </div>
            {/if}
          </label>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../scss/inputBox.scss";
  @import "./scss/input.se.scss";

  :global(.imgUpload-btn > .dropzone) {
    height: 100% !important;
    background: #1c2027 !important;
    color: #fff !important;
    border: 0px !important;
  }

  // 이미지 업로드 박스
  .imgUpload-group {
    width: 100%;
    display: flex;
    padding-bottom: 10px;
    .imgUpload-title {
      width: 200px;
      height: inherit;
      color: #fff;
      float: left;
      font-size: 18px;
      line-height: 20px;
      padding: 10px;
    }
    .imgUpload-box {
      width: 80%;
      position: relative;
      .imgUpload-btn {
        width: 100%;
        height: 100px;
        position: relative;
        display: inline-block;
        overflow: hidden;
        float: none;

        background-color: #1c2027;
        border-radius: 10px;
        margin-right: 15px;
        margin-bottom: 15px;

        text-align: center;
        .icon {
          width: 50px;
          height: 50px;
          display: inline-block;
          padding: 10px 20px;
        }
        h3 {
          display: inline-block;
          font-size: 16px;
        }
      }
      .imgUpload-list {
        width: 100%;
        height: auto;
        display: inline-flex;
        flex-wrap: wrap;

        .imgItme {
          width: 189px;
          height: 189px;
          position: relative;
          display: inline-block;
          overflow: hidden;

          background-color: #1c2027;
          border-radius: 10px;

          margin-right: 15px;
          margin-bottom: 15px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .img-btn-group {
            width: 100%;
            height: 80px;

            position: absolute;
            top: 0px;
            left: 0px;
            /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+0,000000+100&0.8+0,0+75 */
            background: -moz-linear-gradient(
              top,
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 0) 100%
            ); /* FF3.6-15 */
            background: -webkit-linear-gradient(
              top,
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 0) 100%
            ); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 0) 100%
            ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cc000000', endColorstr='#00000000',GradientType=0 ); /* IE6-9 */

            .close-btn {
              width: 16px;
              height: 21px;
              border: 3px solid #fff;
              border-radius: 50%;
              display: block;
              padding: 2px 5px;
              padding-bottom: 3px;
              position: absolute;
              top: 5px;
              right: 5px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
