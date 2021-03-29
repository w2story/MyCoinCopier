<script lang="ts">
  import { onMount } from "svelte";
  // 유튜브 주소 체커
  import youtubeUrl from "youtube-url";
  // 토스트기
  import Toast from "svelte-toast";
  // 폰트어섬
  import Fa from "svelte-fa";
  import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

  // 스토어
  import { userIdSearch } from "~/store/database/userInfo";
  import { getVideoInfo } from "~/store/database/videoSetting";
  import { userID } from "~/store/donSend/userid";
  import { youtubeShow } from "~/store/donSend/video";

  // 토스트기
  const toast = new Toast();

  // 처리값을 위한 변수
  let reUserInfo = {};
  let videoViewRow = {};
  // 세팅용
  let DonDefSet = {
    limit: 0,
    preview: false,
  };
  // 결과 값 처리용
  let videoDonSet = {
    user_name: "",
    start: 0,
    limit: 10,
    url: "",
    urlId: "",
    duration: "",
  };
  // 에러 송출용
  let error = {
    userName: "",
    videoUrl: "",
    videoEndSe: "",
    videoStart: "",
  };

  console.log($userID);

  onMount(async () => {
    const reUser = await userIdSearch($userID);
    if (reUser.success) {
      reUserInfo = reUser.userRow;
      videoDonSet.user_name = reUserInfo.user_name;
      const videoSetting = await getVideoInfo(reUserInfo.user_key);
      DonDefSet.limit = Number(videoSetting.video_limit);
    } else {
    }
  });

  // 닉네임 체커
  const donNameChk = (e) => {
    let str = e.target.value;
    let lenText = 0;
    for (var i = 0; i < str.length; i++) {
      lenText++;
    }
    if (16 < lenText) {
      error.userName = "16자 까지 입력됩니다.";
    } else {
      error.userName = "";
    }
  };
  const donVideoUrlChk = async () => {
    const youtubeUrlTest = youtubeUrl.extractId(videoDonSet.url);
    if (!youtubeUrlTest) {
      error.videoUrl = "정상적인 유튜브 주소가 아닙니다.";
    } else {
      videoDonSet.urlId = youtubeUrlTest;
      const videoRow = await youtubeShow(videoDonSet.urlId);
      if (videoRow.success) {
        DonDefSet.preview = true;
        videoViewRow = videoRow.youtubeRow;
        let videoTime = videoRow.youtubeDuration;
        let videoMMSS = videoTime.replace("PT", "");
        let videoArr = videoMMSS.replace("S", "").split("M");
        videoDonSet.duration = Number(videoArr[0] * 60) + Number(videoArr[1]);
        error.videoUrl = "";
      } else {
        error.videoUrl = "정상적인 유튜브 주소가 아닙니다.";
      }
    }
  };
  // 비디오 체커
  const donVideoLimitChk = () => {
    let tmp_videoLimit = videoDonSet.limit;
    if (isNaN(tmp_videoLimit)) {
      error.videoEndSe = "숫자가 아닙니다.";
    } else {
      tmp_videoLimit = Number(tmp_videoLimit.replace(/(^0+)/, ""));
      if (tmp_videoLimit > DonDefSet.limit) {
        error.videoEndSe = DonDefSet.limit + "이 최대 수 입니다.";
      } else if (tmp_videoLimit <= 0) {
        error.videoEndSe = "0보다 큰 수를 넣어주세요.";
      } else {
        error.videoEndSe = "";
      }
    }
  };
  // 비디오 체커
  const donVideoStartChk = () => {
    let tmp_videoStart = videoDonSet.start;
    let tmp_videoLimit = videoDonSet.limit;
    if (isNaN(tmp_videoStart)) {
      error.videoStart = "숫자가 아닙니다.";
    } else if (isNaN(tmp_videoLimit)) {
      error.videoEndSe = "숫자가 아닙니다.";
    } else {
      tmp_videoLimit.trim();
      tmp_videoStart.trim();
      tmp_videoLimit = Number(tmp_videoLimit.replace(/(^0+)/, ""));
      tmp_videoStart = Number(tmp_videoStart.replace(/(^0+)/, ""));
      if (Number(videoDonSet.duration) - tmp_videoLimit < tmp_videoStart) {
        error.videoStart =
          Number(videoDonSet.duration) -
          tmp_videoLimit +
          "초가 최대 수 입니다.";
      } else if (tmp_videoStart <= 0) {
        error.videoStart = "0보다 큰 수를 넣어주세요.";
      } else {
        error.videoStart = "";
      }
    }
  };

  const donVoiceSub = async () => {};
</script>

<div class="don-content">
  <div class="don-input">
    <h3 class="input-title">닉네임</h3>
    <div class="input-box">
      <input
        type="text"
        bind:value={videoDonSet.user_name}
        on:keyup={donNameChk}
      />
      {#if error.userName}<p>{error.userName}</p>{/if}
    </div>
  </div>
  <div class="don-input">
    <h3 class="input-title">비디오 주소</h3>
    <div class="input-box">
      <input
        type="text"
        bind:value={videoDonSet.url}
        on:keyup={donVideoUrlChk}
      />
      {#if error.videoUrl}<p>{error.videoUrl}</p>{/if}
    </div>
  </div>
  <div class="don-input">
    <h3 class="input-title">비디오 길이</h3>
    <div class="input-box">
      <input
        type="text"
        bind:value={videoDonSet.limit}
        on:keyup={donVideoLimitChk}
      />
      {#if error.videoEndSe}<p>{error.videoEndSe}</p>{/if}
    </div>
  </div>
  <div class="don-input">
    <h3 class="input-title">비디오 시작지점</h3>
    <div class="input-box">
      <input
        type="text"
        bind:value={videoDonSet.start}
        on:keyup={donVideoStartChk}
      />
      {#if error.videoStart}<p>{error.videoStart}</p>{/if}
    </div>
  </div>
  {#if DonDefSet.preview}
    <div class="video-view">
      <hr />
      <div class="video-view-title">
        <h3>보낼 비디오 정보 표기</h3>
      </div>
      <div class="video-box">
        <div class="video-thumbnails">
          <img src={videoViewRow.thumbnails.standard.url} />
        </div>
        <div class="video-info">
          <h3 class="video-title">{videoViewRow.title.trim()}</h3>
          <p class="channel-title">{videoViewRow.channelTitle.trim()}</p>
          <div class="video-tag">
            {#each videoViewRow.tags as item}
              <p class="tag-box">{item}</p>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!--<div class="don-input">
    <h3 class="input-title">비디오 시작 지점</h3>
    <div class="input-box">
      <input type="text" bind:value={tmpUserName} on:keyup={donNameChk} />
      {#if error.userName}<p>{error.userName}</p>{/if}
    </div>
  </div>-->
  <div class="don-sub" on:click={donVoiceSub}>
    <span class="icon">
      <Fa icon={faPaperPlane} size="" />
    </span>
    <h3>후원 하기</h3>
  </div>
</div>

<style lang="scss">
  :global(p.tag-box) {
    width: auto;
    height: auto;
    font-size: 14px;
    padding: 8px 18px;
    margin-bottom: 5px;
    margin-right: 10px;
    border-radius: 18px;
    background-color: #202225;
    text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
  }
  .don-content {
    width: 100%;
    height: auto;
    // 입력 값 박스형
    .don-input {
      width: 100%;
      height: auto;
      display: flex;
      flex-flow: wrap;
      padding-bottom: 20px;
      // 현재 처리기
      .input-box {
        width: calc(80% - 20px);
        height: 60px;
        position: relative;
        input {
          width: 100%;
          height: 30px;
          color: #fff;
          float: left;
          background-color: #202225;

          border-radius: 5px;
          border: 0px;
          padding: 10px;
          font-size: 18px;
        }
        p {
          color: #ff4081 !important;
          font-size: 12px !important;
          padding-bottom: 5px;
          position: absolute;
          bottom: -15px;
          left: 10px;
        }
      }
      .input-title {
        width: 200px;
        height: 30px;
        color: #fff;
        font-size: 18px;
        line-height: 20px;
        padding: 10px;
      }
    }
    .don-img-select {
      width: 100%;
      height: 220px;
      margin-top: 15px;
      margin-bottom: 45px;
      h3 {
        width: calc(100% - 15px);
        padding-left: 15px;
        font-size: 20px;
        font-weight: bolder;
        text-align: left;
      }
      .don-img-list {
        padding: 0px 15px;
        padding-top: 15px;
        padding-bottom: 10px;
        display: flex;
        flex-wrap: no-wrap;
        overflow-x: auto;
        overflow-y: hidden;

        &::-webkit-scrollbar {
          height: 14px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #202225;
          border-radius: 10px;
          background-clip: padding-box;
          border: 4px solid transparent;
        }
        &::-webkit-scrollbar-track {
          background-color: #3a3f47;
          border-radius: 10px;
          box-shadow: inset 0px 0px 0px white;
        }

        .thumbnail {
          width: auto;
          height: 156px;
          margin-right: 10px;
          flex: 0 0 auto;

          input {
            opacity: 0;
            width: 0%;
            height: 0%;
            position: absolute;
            top: 0;
            left: 0;
          }
          input:checked + .radio-box {
            border-color: #ff4081;
          }
          input:focus + .radio-box {
            box-shadow: 0 0 1px #ff4081;
          }

          .radio-box {
            width: auto;
            height: 100%;
            display: block;
            border-radius: 5px;
            overflow: hidden;
            border: 3px solid #3a3f47;
            background-color: #202225;
            img {
              height: 100%;
              object-fit: contain;
            }
          }
        }

        .don-img-item {
          width: auto;
          height: 150px;
          margin-right: 10px;
          border-radius: 5px;
          overflow: hidden;
          flex: 0 0 auto;
          border: 3px solid #3a3f47;
          background-color: #202225;

          &:hover,
          &.active {
            border: 3px solid #ff4081;
          }
          img {
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
    .video-view {
      width: 100%;
      height: 220px;
      margin-top: 15px;
      margin-bottom: 35px;

      hr {
        border-color: #36393f;
        margin-bottom: 15px;
      }
      .video-view-title {
        width: calc(100% - 15px);
        height: auto;
        margin-left: 15px;
        padding-bottom: 10px;
        font-size: 18px;
        font-weight: bolder;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
      }
      .video-box {
        width: 100%;
        height: 153px;
        display: flex;
        margin-left: 15px;

        .video-thumbnails {
          width: 272px;
          height: 100%;
          margin-right: 20px;
          background-color: #3a3f47;
          box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
            0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .video-info {
          width: calc(100% - 292px);
          height: 100%;
          .video-title {
            width: 100%;
            height: auto;
            padding-bottom: 5px;
            font-size: 24px;
            font-weight: bolder;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
          }
          .channel-title {
            width: 100%;
            height: auto;
            padding-bottom: 8px;
            font-size: 18px;
            font-weight: bolder;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
          }
          .video-tag {
            width: 100%;
            max-height: 80px;
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
          }
        }
      }
    }
    .don-sub {
      width: 100%;
      margin: -10px;
      height: 50px;
      padding: 10px;
      margin-top: 20px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: #ff4081;
      font-size: 36px;
      text-align: center;

      .icon {
        width: auto;
        height: auto;
        text-align: center;
        display: inline-block;
        margin-right: 10px;
      }
      h3 {
        font-size: 28px;
        font-weight: bolder;
        display: inline-block;
      }
    }
  }
</style>
