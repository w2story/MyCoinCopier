<script lang="ts">
  import { onMount } from "svelte";
  import InlineSVG from "svelte-inline-svg";

  import Fa from "svelte-fa";
  import {
    faPlayCircle,
    faCircle,
    faDownload,
  } from "@fortawesome/free-solid-svg-icons";

  // 스토어 처리
  import {
    osuListSearch,
    osuLastKeySearch,
    lastOsuDonKey,
    osuListUpdate,
    osuList,
  } from "~/store/database/osuDonList";

  //osu 아이콘 src
  const osuSrc = "../svg/osu.svg";
  const taikoSrc = "../svg/taiko.svg";
  const catchSrc = "../svg/catch.svg";
  const maniaSrc = "../svg/mania.svg";

  let osuLastKey = 0;

  onMount(() => {
    const repeatDonNewChk = setInterval(() => {
      donNewChk($lastOsuDonKey);
    }, 700);
  });

  // 무제한 뷔페
  export const donNewChk = async (osuLastKey) => {
    console.log("체커 작동");

    const osuData = { lastKey: osuLastKey };
    const osuLastKeyChange = await osuLastKeySearch(osuData);
    if (osuLastKeyChange) {
      console.log("새로 생성된 음성 도네 확인");
      osuListUpdate.set(1);
    }
  };

  osuListSearch().then((res) => {
    osuList.set(res.osuMapRow);
    osuLastKey = $lastOsuDonKey;
    console.log(osuLastKey);
    console.log($osuList[0].osu_data);
  });

  $: if ($osuListUpdate > 0) {
    console.log($osuListUpdate);
    osuListUpdate.set(0);

    osuListSearch().then((res) => {
      osuList.set(res.osuMapRow);
      osuLastKey = $lastOsuDonKey;
      console.log(osuLastKey);

      console.log($osuList[0].ous_data);
    });
  }

  let osuMapList = [];
</script>

<div class="content">
  <div class="osu-map-list">
    {#each $osuList as item}
      <div class="osu-map-item">
        <div class="map-panel">
          <img
            src="https://assets.ppy.sh/beatmaps/{item.osu_data
              .SetId}/covers/cover.jpg"
            class="map-img"
          />
          <div class="map-overlay" />
          <div class="map-status">
            <h3>
              {#if item.osu_data.RankedStatus > 0}RANKED{:else}무덤에 감{/if}
            </h3>
          </div>
          <div class="map-title">
            <h3 class="song-title">{item.osu_data.Title}</h3>
            <p class="song-singer">{item.osu_data.Artist}</p>
          </div>
          <div class="map-counts">
            <div class="paly-count">
              <p>{item.osu_data.Playcount.toLocaleString("ko-KR")}</p>
              <span class="icon">
                <Fa icon={faPlayCircle} size="sm" />
              </span>
            </div>
          </div>
        </div>
        <div class="map-content">
          <div class="progress" id="progress-{item.osu_data.SetId}" />
          <div class="map-diff">
            {#each item.osu_data.ChildrenBeatmaps as childernItem}
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
          <div class="map-dw-btn" on:click={selectOsuMap(item.osu_data)}>
            <Fa icon={faDownload} size="2x" />
          </div>
        </div>
      </div>
    {/each}
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

  a:link,
  a:visited {
    color: #fff;
    text-decoration: none;
  }
  .content {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: AUTO;

    &::-webkit-scrollbar {
      width: 14px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ff4081;
      border-radius: 10px;
      background-clip: padding-box;
      border: 4px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #2a2f38;
      border-radius: 10px;
      box-shadow: inset 0px 0px 0px white;
    }
  }

  .osu-map-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .osu-map-item {
      width: 100%;
      height: 240px;

      position: relative;
      box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
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
            font-weight: 600;
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
        .map-dw-btn {
          position: absolute;
          bottom: 20px;
          right: 10px;
          display: flex;
          align-items: center;
          font-size: 12px;
        }
        .map-diff {
          position: absolute;
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
</style>
