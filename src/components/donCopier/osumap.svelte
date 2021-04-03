<script lang="ts">
  import { onMount } from "svelte";
  // 토스트기
  import Toast from "svelte-toast";
  // 폰트어섬
  import Fa from "svelte-fa";
  import {
    faPaperPlane,
    faSearch,
    faPlayCircle,
    faPlay,
    faCheckSquare,
  } from "@fortawesome/free-solid-svg-icons";
  // SVG 처리
  import InlineSVG from "svelte-inline-svg";

  // 스토어
  import { getUserInfo, userIdSearch } from "~/store/database/userInfo";
  import { osuMapSearch, osuMapSend } from "~/store/page/osuMap";
  import { userID } from "~/store/donSend/userid";
  import { children } from "svelte/internal";

  //osu 아이콘 src
  const osuSrc = "../svg/osu.svg";
  const taikoSrc = "../svg/taiko.svg";
  const catchSrc = "../svg/catch.svg";
  const maniaSrc = "../svg/mania.svg";

  // 토스트기
  const toast = new Toast();

  // 유저 정보 처리
  let reUserInfo = {};

  // 값 처리
  let donSend = {
    osuMapSearchVar: "",
    osuMapData: {},
  };
  // 에러값 처리
  let error = {
    osuMap: "",
  };

  // 검색결과 값 받아오기
  let osuMapList = [];

  onMount(async () => {
    const reUser = await userIdSearch($userID);
    if (reUser.success) {
      reUserInfo = reUser.userRow;
      const myInfo = await getUserInfo();
      donSend.tmpUserName = myInfo.user_name;
    } else {
    }
  });

  // 검색 부분 앤터 입력시
  const onKeyPress = (e) => {
    if (e.charCode === 13) onOsuSearch();
  };

  // osu 맵 검색
  const onOsuSearch = async () => {
    console.log("검색 텍스트:", donSend.osuMapSearchVar);
    const mapSearchList = await osuMapSearch(donSend.osuMapSearchVar);
    console.log("검색 활동중");
    if (mapSearchList.success) {
      osuMapList = mapSearchList.data;
      console.log(osuMapList);
    }
  };
  // 오디오 플레이어 처리 구문
  const audioPlay = (dataId) => {
    var audio = document.getElementById(dataId);
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };
  // 데이터 처리
  const selectOsuMap = (data) => {
    donSend.osuMapData = data;
    console.log("선택 완료", donSend);
  };
  // 버튼 클릭시 처리
  const sendOsuMap = () => {
    console.log("보내기 버튼 클릭");

    if (!donSend.osuMapData) {
      error.osuMap = "선택된 맵 데이터가 없습니다.";
    } else {
      let DonData = {
        re_user_key: reUserInfo.user_key,
        osuMapData: donSend.osuMapData,
      };

      const sendOsu = osuMapSend(DonData);
      if (sendOsu) {
        error.osuMap = "";
      } else {
        error.osuMap = "오류로 인해 처리 되지 않았습니다.";
      }
    }
  };
</script>

<div class="don-content">
  <div class="don-input">
    <h3 class="input-title">OSU 맵 검색</h3>
    <div class="input-box">
      <input
        type="text"
        bind:value={donSend.osuMapSearchVar}
        on:keypress={onKeyPress}
      />
      <div class="search-btn" on:click={onOsuSearch}>
        <span class="icon">
          <Fa icon={faSearch} size="2x" />
        </span>
      </div>
      {#if error.osuMap}<p>{error.osuMap}</p>{/if}
    </div>
  </div>
  <div class="osu-map-list">
    {#if osuMapList}
      {#each osuMapList as item}
        <div class="osu-map-item">
          <div class="map-panel">
            <img
              src="https://assets.ppy.sh/beatmaps/{item.SetId}/covers/cover.jpg"
              class="map-img"
            />
            <div class="map-overlay" />
            <div class="map-status">
              <h3>
                {#if item.RankedStatus > 0}RANKED{:else}무덤에 감{/if}
              </h3>
            </div>
            <div class="map-title">
              <h3 class="song-title">{item.Title}</h3>
              <p class="song-singer">{item.Artist}</p>
            </div>
            <div class="map-counts">
              <div class="paly-count">
                <p>{item.Playcount.toLocaleString("ko-KR")}</p>
                <span class="icon">
                  <Fa icon={faPlayCircle} size="sm" />
                </span>
              </div>
            </div>
          </div>
          <div class="map-content">
            <div class="progress" id="progress-{item.SetId}" />
            <div class="map-diff">
              {#each item.ChildrenBeatmaps as childernItem}
                <div class="osu-diff osu-diff-{childernItem.DiffNewName}">
                  {#if childernItem.Mode == 0}
                    <InlineSVG src={osuSrc} />
                  {:else if childernItem.Mode == 1}
                    <InlineSVG src={taikoSrc} />
                  {:else if childernItem.Mode == 2}
                    <InlineSVG src={catchSrc} />
                  {:else if childernItem.Mode == 3}
                    <InlineSVG src={maniaSrc} />
                  {/if}
                </div>
              {/each}
            </div>
            <div class="map-dw-btn" on:click={selectOsuMap(item)}>
              <Fa icon={faCheckSquare} size="3x" />
            </div>
            <div class="map-preview">
              <audio
                src="https://b.ppy.sh/preview/{item.SetId}.mp3"
                width="1"
                height="1"
                controls
                id="audio-{item.SetId}"
              />
              <div
                class="map-play-btn"
                on:click={audioPlay("audio-" + item.SetId)}
              >
                <Fa icon={faPlay} size="3x" />
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  <div class="don-sub" on:click={sendOsuMap}>
    <span class="icon">
      <Fa icon={faPaperPlane} />
    </span>
    <h3>후원 하기</h3>
  </div>
</div>

<style lang="scss">
  @font-face {
    font-family: "TmoneyRoundWindExtraBold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/TmoneyRoundWindExtraBold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  .don-content {
    width: 100%;
    height: auto;
    // 입력 값 박스형
    .don-input {
      width: 100%;
      height: auto;
      display: flex;
      flex-flow: column;
      padding-bottom: 20px;
      // 현재 처리기
      .input-box {
        width: calc(100% - 20px);
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
        .search-btn {
          width: auto;
          height: 50px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;

          display: flex;

          background-color: #ff4081;
          position: absolute;
          bottom: 10px;
          right: -20px;
          padding: 0px 20px;

          .icon {
            width: 30px;
            height: 32px;
            padding: 8px 10px;
            text-align: center;
          }
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
        font-size: 20px;
        font-weight: bolder;
        line-height: 20px;
        padding: 5px 10px;
        padding-bottom: 0px;
      }
    }
    .don-sub {
      width: 100%;
      margin: -10px;
      height: 50px;
      padding: 10px;
      margin-top: 20px;
      display: block;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: #ff4081;
      color: #fff;
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
    .osu-map-list {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;

      .osu-map-item {
        width: calc(50% - 15px);
        height: 240px;
        position: relative;
        box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 15px;
        &:nth-child(odd) {
          margin-right: 15px;
        }
        .map-panel {
          width: 100%;
          height: 180px;
          display: block;
          color: #fff;
          text-decoration: none;
          text-shadow: 0 1px 1px rgb(0 0 0 / 75%);

          background-image: url("https://osu.ppy.sh/assets/images/default-bg.7594e945.png");
          background-size: auto auto;
          background-position: 50%;
          background-size: cover;

          font-weight: 400;
          overflow: hidden;
          position: relative;
          .map-img {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            -o-object-fit: cover;
            object-fit: cover;
          }
          .map-overlay {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: block;
            background-color: rgba(0, 0, 0, 0.4);
          }
          .map-status {
            display: flex;
            position: absolute;
            margin: 5px;
            margin-top: 10px;
            transition: all 0.15s ease-in-out;

            h3 {
              background-color: rgba(42, 47, 56, 0.7);
              padding: 6px 15px;
              border-radius: 10000px;
              font-size: 12px;
              font-style: normal;
              font-weight: 600;
              text-transform: uppercase;
              color: #fff;
              font-family: TmoneyRoundWindExtraBold;
            }
          }
          .map-title {
            position: absolute;
            left: 10px;
            bottom: 10px;
            width: calc(100% - 20px);
            h3.song-title {
              font-size: 1.3em;
              display: flex;
              align-items: center;
              font-weight: bolder;
              font-family: TmoneyRoundWindExtraBold;
            }
            p.song-singer {
              font-weight: 400;
              font-size: 14px;
              font-family: TmoneyRoundWindExtraBold;
            }
          }
          .map-counts {
            position: absolute;
            right: 10px;
            top: 10px;
            display: flex;
            .paly-count {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              margin-left: 16px;
              .icon {
                margin-left: 5px;
              }
            }
          }
        }
        .map-content {
          width: 100%;
          height: 60px;
          background-color: #202225;

          .progress {
            width: 1px;
            height: 4px;
            background: #202225;
            transition: width 0.1s linear;
          }

          .map-preview {
            position: absolute;
            bottom: 70px;
            right: 20px;
            display: flex;
            align-items: center;
            font-size: 12px;

            audio {
              display: none;
            }
            .map-play-btn {
              display: flex;
              align-items: center;
              font-size: 12px;
              &:hover {
                color: #ff4081;
              }
            }
          }
          .map-dw-btn {
            position: absolute;
            bottom: 10px;
            right: 20px;
            display: flex;
            align-items: center;
            font-size: 12px;
            &:hover {
              color: #ff4081;
            }
          }
          .map-diff {
            position: absolute;
            overflow: hidden;
            bottom: 15px;
            left: 10px;
            display: flex;
            align-items: center;
            font-size: 12px;
            .osu-diff {
              width: 25px;
              height: 25px;
              margin-right: 8px;
              &.osu-diff-easy {
                color: #88b300;
                fill: #88b300;
              }
              &.osu-diff-normal {
                color: #66ccff;
                fill: #66ccff;
              }
              &.osu-diff-hard {
                color: #ffcc22;
                fill: #ffcc22;
              }
              &.osu-diff-insane {
                color: #ff66aa;
                fill: #ff66aa;
              }
              &.osu-diff-extreme {
                color: #aa88ff;
                fill: #aa88ff;
              }
              &.osu-diff-ultra {
                color: #121415;
                fill: #121415;
              }
            }
          }
        }
      }
    }
  }
</style>
