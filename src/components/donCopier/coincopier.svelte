<script lang="ts">
  import { location } from "svelte-spa-router";

  // 폰트어섬
  import Fa from "svelte-fa";
  import {
    faCommentAlt,
    faMicrophone,
    faVideo,
    faPaperPlane,
  } from "@fortawesome/free-solid-svg-icons";

  import Header from "~/components/header/header.svelte";

  const webLocation = $location;
  const webQuery = webLocation.split("/");

  const userId = webQuery[2];

  console.log(userId);

  let images = "images/20.png";

  let donImg = [
    "https://i.imgur.com/CbNEIjT.png",
    "https://i.imgur.com/iB6APSm.png",
    "https://i.imgur.com/mTHpv7j.png",
    "https://i.imgur.com/ezMNqf6.png",
    "https://i.imgur.com/RrmBkU1.png",
    "https://i.imgur.com/G9CPys6.png",
    "https://i.imgur.com/LrHbw3z.png",
    "https://i.imgur.com/lmzNTRV.png",
    "https://i.imgur.com/mxmUp5e.png",
    "https://i.imgur.com/aGyiIEq.png",
    "https://i.imgur.com/01JLu3F.png",
    "https://i.imgur.com/RV5kQLn.png",
    "https://i.imgur.com/6T0jh8c.png",
    "https://i.imgur.com/nosMONw.png",
    "https://i.imgur.com/CC3T8Km.png",
    "https://i.imgur.com/0epAzIi.png",
    "https://i.imgur.com/7Ff2y8Z.png",
    "https://i.imgur.com/5zIkFKq.png",
    "https://i.imgur.com/Mwa2Nod.png",
    "https://i.imgur.com/KFrU8s5.png",
  ];
</script>

<main>
  <Header />
  <div class="layout" style="background-image: url('{images}');">
    <div class="container">
      <h1 class="page-title text-shadow">
        이야기 / <small> 도네이션 페이지</small>
      </h1>
      <div class="components">
        <div class="card border-radius">
          <div class="don-card-top">
            <div class="exp-don">
              <h3>음성 도네이션을 공유했습니다</h3>
            </div>
          </div>
          <div class="don-menu">
            <div class="don-list active">
              <span class="icon">
                <Fa icon={faCommentAlt} size="lg" />
              </span>
              <h3>메세지</h3>
            </div>
            <div class="don-list">
              <span class="icon">
                <Fa icon={faVideo} size="lg" />
              </span>
              <h3>영상</h3>
            </div>
            <div class="don-list">
              <span class="icon">
                <Fa icon={faMicrophone} size="lg" />
              </span>
              <h3>OSU</h3>
            </div>
          </div>
          <div class="don-content">
            <div class="don-text-input">
              <textarea placeholder="후원과 함께 보낼 메시지를 입력해주세요." />
            </div>
            <div class="don-img-select">
              <h3>후원 이미지 선택</h3>
              <div class="don-img-list">
                {#each donImg as src}
                  <div class="don-img-item">
                    <img transition:fade {src} alt="" />
                  </div>
                {/each}
              </div>
            </div>
            <div class="don-sub">
              <span class="icon">
                <Fa icon={faPaperPlane} size="" />
              </span>
              <h3>후원 하기</h3>
            </div>
          </div>
          <!--<div class="input-group">
                  <input value="7887826671F1F91414BBFE29E7F7C17E"/>
                </div>
                <div class="btn-group">
                </div>-->
        </div>
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  @import "../../scss/inputBox.scss";
  :global(body, html) {
    width: 100%;
    height: 100%;
    margin: 0%;
    padding: 0% !important;
    overflow: hidden;
    line-height: 1.4;
    font-family: "Spoqa Han Sans Neo", "sans-serif";
  }

  * {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    color: #fff;
    user-select: none;
    &:focus {
      outline: none;
    }
  }

  main {
    width: 100%;
    height: 100%;
    background-color: #2a2f38;
    position: relative;
  }

  .layout {
    position: relative;
    background-size: cover;
    background-position: 50%;

    &:before {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      content: "";
      background-color: rgba($color: #2a2f38, $alpha: 0.6);
    }
    .container {
      position: relative;
      .page-title {
        small {
          font-weight: bolder !important;
        }
        &.text-shadow {
          text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
        }
      }
      .components {
        .card {
          &.border-radius {
            border-radius: 5px;
          }
          .don-card-top {
            width: 100%;
            height: 70px;
            padding-bottom: 15px;
            display: block;
            border-bottom: 1px solid #1c2027;
            .exp-don {
              min-width: 300px;
              width: 40%;
              height: 100%;
              display: table;
              margin-right: 15px;
              float: right;
              border-radius: 5px;
              text-align: center;

              background-color: #81858a;

              h3 {
                display: table-cell;
                text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
                font-size: 20px;
                font-weight: bolder;
                vertical-align: middle;
              }
            }
          }
          .don-menu {
            margin-top: 25px;
            width: calc(100% - 20px);
            height: 40px;
            padding-left: 15px;
            margin-bottom: 20px;
            display: flex;

            .don-list {
              width: 150px;
              height: 35px;
              border-bottom: 5px solid #3a3f47;
              text-align: center;
              &.active {
                border-bottom-color: #ff4081;
                span {
                  color: #ff4081;
                }
                h3 {
                  color: #ff4081;
                }
              }
              span {
                display: inline-block;
                width: 35px;
                height: 35px;
              }
              h3 {
                display: inline-block;
                font-size: 18px;
                font-weight: bolder;
              }
            }
          }
          // 여기서 부터 컴포넌트 분기
          .don-content {
            width: 100%;
            height: auto;
            // tts 도네
            .don-text-input {
              width: 100%;
              textarea {
                width: calc(100% - 30px);
                height: 100px;
                padding: 15px;
                font-size: 16px;
                line-height: 1.5;
                border-radius: 5px;

                background-color: #202225;
                resize: none;
                border: 0px;
              }
            }
            .don-img-select {
              width: 100%;
              height: 220px;
              margin-top: 15px;
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

                .don-img-item {
                  width: auto;
                  height: 150px;
                  margin-right: 10px;
                  border-radius: 5px;
                  overflow: hidden;
                  flex: 0 0 auto;
                  border: 3px solid #3a3f47;
                  background-color: #202225;

                  &:hover {
                    border: 3px solid #ff4081;
                  }
                  img {
                    height: 100%;
                    object-fit: contain;
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
        }
      }
    }
  }
</style>
