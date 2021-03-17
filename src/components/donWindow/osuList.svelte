<script lang="ts">
  import Fa from "svelte-fa";
  import {
    faPlayCircle,
    faCircle,
    faDownload,
  } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="content">
  <div class="osu-map-list">
    <div class="osu-map-item">
      <div class="map-panel">
        <img
          src="https://assets.ppy.sh/beatmaps/1008155/covers/cover.jpg?1615061029"
          class="map-img"
        />
        <div class="map-overlay" />
        <div class="map-status">
          <h3>Ranked</h3>
        </div>
        <div class="map-title">
          <h3 class="song-title">Soundscape</h3>
          <p class="song-singer">TRUE</p>
        </div>
        <div class="map-counts">
          <div class="paly-count">
            <p>3,852</p>
            <span class="icon">
              <Fa icon={faPlayCircle} size="sm" />
            </span>
          </div>
        </div>
      </div>
      <div class="map-content">
        <div class="map-diff">
          <div class="osu-diff osu-diff-mode-osu osu-diff-easy">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-normal">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-hard">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-insane">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-extreme">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-ultra">
            <Fa icon={faCircle} size="2x" />
          </div>
        </div>
        <div class="map-dw-btn">
          <Fa icon={faDownload} size="2x" />
        </div>
      </div>
    </div>
    <div class="osu-map-item">
      <div class="map-panel">
        <img
          src="https://assets.ppy.sh/beatmaps/1248952/covers/cover.jpg"
          class="map-img"
        />
        <div class="map-overlay" />
        <div class="map-status">
          <h3>Ranked</h3>
        </div>
        <div class="map-title">
          <h3 class="song-title">KING</h3>
          <p class="song-singer">Kizuna AI</p>
        </div>
        <div class="map-counts">
          <div class="paly-count">
            <p>3,852</p>
            <span class="icon">
              <Fa icon={faPlayCircle} size="sm" />
            </span>
          </div>
        </div>
      </div>
      <div class="map-content">
        <div class="map-diff">
          <div class="osu-diff osu-diff-mode-osu osu-diff-easy">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-normal">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-hard">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-insane">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-extreme">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-ultra">
            <Fa icon={faCircle} size="2x" />
          </div>
        </div>
        <div class="map-dw-btn">
          <Fa icon={faDownload} size="2x" />
        </div>
      </div>
    </div>
    <div class="osu-map-item">
      <div class="map-panel">
        <img
          src="https://assets.ppy.sh/beatmaps/596704/covers/cover.jpg?1521163453"
          class="map-img"
        />
        <div class="map-overlay" />
        <div class="map-status">
          <h3>Ranked</h3>
        </div>
        <div class="map-title">
          <h3 class="song-title">Hitorigoto -TV MIX-</h3>
          <p class="song-singer">ClariS</p>
        </div>
        <div class="map-counts">
          <div class="paly-count">
            <p>3,852</p>
            <span class="icon">
              <Fa icon={faPlayCircle} size="sm" />
            </span>
          </div>
        </div>
      </div>
      <div class="map-content">
        <div class="map-diff">
          <div class="osu-diff osu-diff-mode-osu osu-diff-easy">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-normal">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-hard">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-insane">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-extreme">
            <Fa icon={faCircle} size="2x" />
          </div>
          <div class="osu-diff osu-diff-mode-osu osu-diff-ultra">
            <Fa icon={faCircle} size="2x" />
          </div>
        </div>
        <div class="map-dw-btn">
          <Fa icon={faDownload} size="2x" />
        </div>
      </div>
    </div>
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
    overflow-y: scroll;

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

    .osu-map-item {
      width: 100%;
      height: 230px;

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
        height: 50px;
        background-color: #202225;

        padding-bottom: 15px;
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
            margin-right: 5px;
            &.osu-diff-mode-osu:before {
            }
            &.osu-diff-easy {
              color: #88b300;
            }
            &.osu-diff-normal {
              color: #66ccff;
            }
            &.osu-diff-hard {
              color: #ffcc22;
            }
            &.osu-diff-insane {
              color: #ff66aa;
            }
            &.osu-diff-extreme {
              color: #aa88ff;
            }
            &.osu-diff-ultra {
              color: #121415;
            }
          }
        }
      }
    }
  }
</style>
