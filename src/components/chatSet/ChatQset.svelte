<script lang="ts">
  import { onMount } from "svelte";
  // 색상 선택기
  import { HsvPicker } from "svelte-color-picker";
  // input -> select 처리기
  import Select from "svelte-select";
  // 폰트 스토어
  import { fontItems } from "~/store/fontList.ts";
  // 폰트어섬
  import Fa from "svelte-fa";
  import { faPalette } from "@fortawesome/free-solid-svg-icons";
  // 채팅 db 불러오기
  import {
    getChatSetInfo,
    setSysText,
    setSysColor,
  } from "~/store/database/chatSetting";

  let chatSet = {};

  // 색상 선택기
  let backColor = {
    active: false,
    rgba: "rgba(32,34,37,1)",
  };
  let titleFontColor = {
    active: false,
    rgba: "rgba(32,34,37,1)",
  };
  let textFontColor = {
    active: false,
    rgba: "rgba(32,34,37,1)",
  };

  onMount(async () => {
    const res = await getChatSetInfo(1);
    console.log(res);

    backColor.rgba = res.style_bg;
    titleFontColor.rgba = res.style_title_color;
    textFontColor.rgba = res.style_text_color;
  });

  getChatSetInfo(1).then((Response) => {
    chatSet = Response;
  });

  let chatQset = "def";

  let fontSelected = { value: "RixYeoljeongdo_Regular", label: "Rix열정도체" };
  const groupBy = (item) => item.group;

  function handleSelect(event) {
    console.log("selected item", event.detail);
    // .. do something here 🙂
  }

  function backColorCallback(rgba) {
    let ColorRGBA = "rgba(";
    ColorRGBA += rgba.detail.r + ", ";
    ColorRGBA += rgba.detail.g + ", ";
    ColorRGBA += rgba.detail.b + ", ";
    ColorRGBA += rgba.detail.a + ")";

    backColor.rgba = ColorRGBA;
    chatSet.style_bg = ColorRGBA;
    systemColorUpdate();
  }
  const titleFontColorCallback = (rgba) => {
    let ColorRGBA = "rgba(";
    ColorRGBA += rgba.detail.r + ", ";
    ColorRGBA += rgba.detail.g + ", ";
    ColorRGBA += rgba.detail.b + ", ";
    ColorRGBA += rgba.detail.a + ")";

    titleFontColor.rgba = ColorRGBA;
    chatSet.style_title_color = ColorRGBA;
    systemColorUpdate();
  };
  const textFontColorCallback = (rgba) => {
    let ColorRGBA = "rgba(";
    ColorRGBA += rgba.detail.r + ", ";
    ColorRGBA += rgba.detail.g + ", ";
    ColorRGBA += rgba.detail.b + ", ";
    ColorRGBA += rgba.detail.a + ")";

    textFontColor.rgba = ColorRGBA;
    chatSet.style_text_color = ColorRGBA;
    systemColorUpdate();
  };

  const colorSelectAcitve = (colorSelect) => {
    switch (colorSelect) {
      case "back":
        if (backColor.active === true) {
          backColor.active = false;
        } else {
          backColor.active = true;
          titleFontColor.active = false;
          textFontColor.active = false;
        }
        break;
      case "title":
        if (titleFontColor.active === true) {
          titleFontColor.active = false;
        } else {
          titleFontColor.active = true;
          textFontColor.active = false;
          backColor.active = false;
        }
        break;
      case "text":
        if (textFontColor.active === true) {
          textFontColor.active = false;
        } else {
          textFontColor.active = true;
          titleFontColor.active = false;
          backColor.active = false;
        }
        break;
    }
  };
  // 후원 시스템 전처리
  const ChatTextUpdate = () => {
    setSysText(chatSet);
  };
  // 후원 시스템 색상 전처리
  const systemColorUpdate = () => {
    setSysColor(chatSet);
  };
</script>

<div class="layout">
  <h1 class="page-title">채팅 간편설정 / <small> Easy Chat setup</small></h1>
  <div class="container-box">
    <div class="container">
      <div class="components">
        <div class="title">
          <h1>채팅 설정 / <small> Support Setting</small></h1>
        </div>
        <div class="card">
          <div class="thumbnail-group">
            <h3 class="thumbnail-title">채팅 스타일</h3>
            <div class="thumbnail-btn">
              <label class="thumbnail">
                <input type="radio" value="def" bind:group={chatQset} />
                <span class="radio-box">
                  <span class="img">
                    <img src="https://i.imgur.com/qcN7fpp.gif" />
                  </span>
                  <h3>기본</h3>
                </span>
              </label>
              <label class="thumbnail">
                <input type="radio" value="def2" bind:group={chatQset} />
                <span class="radio-box">
                  <span class="img">
                    <img src="https://i.imgur.com/qcN7fpp.gif" />
                  </span>
                  <h3>기본2</h3>
                </span>
              </label>
              <label class="thumbnail">
                <input type="radio" value="dc" bind:group={chatQset} />
                <span class="radio-box">
                  <span class="img">
                    <img src="https://i.imgur.com/qcN7fpp.gif" />
                  </span>
                  <h3>DC스타일</h3>
                </span>
              </label>
              <label class="thumbnail">
                <input type="radio" value="kakao" bind:group={chatQset} />
                <span class="radio-box">
                  <span class="img">
                    <img src="https://i.imgur.com/qcN7fpp.gif" />
                  </span>
                  <h3>카카오스타일</h3>
                </span>
              </label>
              <label class="thumbnail">
                <input type="radio" value="material" bind:group={chatQset} />
                <span class="radio-box">
                  <span class="img">
                    <img src="https://i.imgur.com/qcN7fpp.gif" />
                  </span>
                  <h3>머테리얼</h3>
                </span>
              </label>
              <label class="thumbnail">
                <input type="radio" value="simple" bind:group={chatQset} />
                <span class="radio-box">
                  <span class="img">
                    <img src="https://i.imgur.com/qcN7fpp.gif" />
                  </span>
                  <h3>심플</h3>
                </span>
              </label>
              <label class="thumbnail">
                <input type="radio" value="simple2" bind:group={chatQset} />
                <span class="radio-box">
                  <span class="img">
                    <img src="https://i.imgur.com/qcN7fpp.gif" />
                  </span>
                  <h3>심플2</h3>
                </span>
              </label>
              <label class="thumbnail">
                <input type="radio" value="mycast" bind:group={chatQset} />
                <span class="radio-box">
                  <span class="img">
                    <img src="https://i.imgur.com/qcN7fpp.gif" />
                  </span>
                  <h3>마캐2</h3>
                </span>
              </label>
              <label class="thumbnail">
                <input type="radio" value="mycast" bind:group={chatQset} />
                <span class="radio-box">
                  <span class="img">
                    <img src="https://i.imgur.com/qcN7fpp.gif" />
                  </span>
                  <h3>커스텀CSS</h3>
                </span>
              </label>
            </div>
          </div>
          <hr />
          <div class="color-group">
            <h3 class="color-title">배경 색상</h3>
            <label class="color-selecter">
              <input bind:value={backColor.rgba} />
              <a
                on:click={() => colorSelectAcitve("back")}
                style="background-color:{backColor.rgba}"
              >
                <Fa icon={faPalette} size="lg" />
              </a>
              {#if backColor.active}
                <div class="color-pick">
                  <HsvPicker
                    on:colorChange={backColorCallback}
                    startColor={"#202225"}
                  />
                </div>
              {/if}
            </label>
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
          <hr />
          <div class="color-group">
            <h3 class="color-title">타이틀 폰트 색상</h3>
            <label class="color-selecter">
              <input bind:value={titleFontColor.rgba} />
              <a
                on:click={() => colorSelectAcitve("title")}
                style="background-color:{titleFontColor.rgba}"
              >
                <Fa icon={faPalette} size="lg" />
              </a>
              {#if titleFontColor.active}
                <div class="color-pick">
                  <HsvPicker
                    on:colorChange={titleFontColorCallback}
                    startColor={"#202225"}
                  />
                </div>
              {/if}
            </label>
          </div>
          <hr />
          <div class="input-group">
            <h3 class="input-title">타이틀 폰트 크기</h3>
            <input
              bind:value={chatSet.style_title_size}
              on:change={ChatTextUpdate}
            />
          </div>
          <hr />
          <div class="color-group">
            <h3 class="color-title">내용 폰트 색상</h3>
            <label class="color-selecter">
              <input bind:value={textFontColor.rgba} />
              <a
                on:click={() => colorSelectAcitve("text")}
                style="background-color:{textFontColor.rgba}"
              >
                <Fa icon={faPalette} size="lg" />
              </a>
              {#if textFontColor.active}
                <div class="color-pick">
                  <HsvPicker
                    on:colorChange={textFontColorCallback}
                    startColor={"#202225"}
                  />
                </div>
              {/if}
            </label>
          </div>
          <hr />
          <div class="input-group">
            <h3 class="input-title">내용 폰트 크기</h3>
            <input
              bind:value={chatSet.style_text_size}
              on:change={ChatTextUpdate}
            />
          </div>
        </div>
      </div>
    </div>
    <div class="chat-test">
      <div class="components">
        <div class="title">
          <h1>채팅 테스트/ <small> Chat Test</small></h1>
        </div>
        <div class="card" />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  :global(.selectContainer > div > .listContainer) {
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
      background-color: #202225;
      border-radius: 10px;
      box-shadow: inset 0px 0px 0px white;
    }
  }
  .layout {
    min-width: 1100px;
    width: calc(100% - 30px);
    height: calc(100% - 60px);
    padding: 0px 15px;
    margin-top: 60px;

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

    h1.page-title {
      width: 100%;
      height: 50px;
      padding-bottom: 20px;
      flex: none;
      font-size: 32px;
      font-weight: bolder;

      margin-top: 15px;

      small {
        color: #ff4081;
        font-size: 26px;
        font-weight: normal;
      }
    }
    .container-box {
      display: flex;
      .chat-test {
        min-width: 300px;
        width: calc(30% - 50px);
        margin-top: 20px;
        display: inline-block;
        margin-left: 15px;
        .components {
          .title {
            width: 240px;
            height: 32px;
            background-color: #1c2027;
            padding: 10px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            h1 {
              font-size: 24px;
              font-weight: bolder;

              small {
                color: #ff4081;
                font-size: 20px;
                font-weight: normal;
              }
            }
          }
          .card {
            min-width: 240px;
            width: calc(100% - 20px);
            height: auto;
            background-color: #3a3f47;
            padding: 10px;
            padding-top: 15px;

            border-top-right-radius: 5px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;

            box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          }
        }
      }
      .container {
        width: 70%;
        margin-top: 20px;
        display: inline-block;
        .components {
          .title {
            width: 500px;
            height: 32px;
            background-color: #1c2027;
            padding: 10px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            h1 {
              font-size: 24px;
              font-weight: bolder;

              small {
                color: #ff4081;
                font-size: 20px;
                font-weight: normal;
              }
            }
          }
          .card {
            width: calc(100% - 20px);
            height: auto;
            background-color: #3a3f47;
            padding: 10px;
            padding-top: 15px;

            border-top-right-radius: 5px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;

            box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

            .supporting-text {
              width: 100%;
              height: auto;
              padding-left: 10px;
              padding-bottom: 15px;

              p {
                font-size: 14px;
                font-weight: 300;
                padding-bottom: 5px;
              }
            }
            hr {
              border-color: #36393f;
              margin-bottom: 15px;
            }
            .input-group {
              width: 100%;
              height: auto;
              display: flex;

              input {
                width: 40%;
                height: 30px;
                color: #fff;
                float: left;
                background-color: #202225;

                border-radius: 5px;
                border: 0px;
                padding: 10px;
                font-size: 18px;
              }
              .input-title {
                width: 200px;
                height: 30px;
                color: #fff;
                float: left;
                font-size: 18px;
                line-height: 20px;
                padding: 10px;
              }
            }

            .thumbnail-group {
              width: 100%;
              display: flex;
              padding-bottom: 10px;
              .thumbnail-title {
                width: 200px;
                height: inherit;
                color: #fff;
                float: left;
                font-size: 18px;
                line-height: 20px;
                padding: 10px;
              }
              .thumbnail-btn {
                width: calc(100% - 220px);
                position: relative;
                display: inline-block;
                float: left;

                .thumbnail {
                  width: 158px;
                  height: 138px;
                  display: inline-block;
                  float: left;
                  padding: 0%;
                  margin: 0%;
                  margin-bottom: 15px;
                  margin-right: 15px;

                  input {
                    opacity: 0;
                    width: 0%;
                    height: 0%;
                    position: absolute;
                    top: 0;
                    left: 0;
                  }

                  .radio-box {
                    width: 150px;
                    height: 130px;
                    position: relative;
                    display: inline-block;

                    background-color: #1c2027;
                    border-radius: 10px;

                    text-align: center;

                    .img {
                      width: 140px;
                      height: 90px;
                      overflow: hidden;
                      display: block;
                      border-radius: 5px;
                      margin-top: 5px;
                      margin-bottom: 5px;
                      margin-left: 5px;

                      img {
                        width: 100%;
                      }
                    }
                    h3 {
                      font-size: 16px;
                    }

                    &.nLayout-center {
                      .icon {
                        opacity: 0.1;
                        padding-top: 15px;
                      }
                      h3 {
                        position: absolute;
                        top: 26px;
                        left: 60px;
                      }
                    }
                    &.nLayout-noimg {
                      h3 {
                        position: absolute;
                        top: 26px;
                        left: 60px;
                      }
                    }
                  }
                  input:checked + .radio-box {
                    background-color: #ff4081;
                  }
                  input:focus + .radio-box {
                    box-shadow: 0 0 1px #ff4081;
                  }
                }
              }
            }
            .color-group {
              width: 100%;
              height: auto;
              display: flex;

              .color-selecter {
                width: 40%;
                height: 47px;

                position: relative;

                input {
                  width: 100%;
                  color: #fff;
                  float: left;
                  background-color: #202225;

                  border-radius: 5px;
                  border: 0px;
                  padding: 10px;
                  font-size: 18px;
                }
                a {
                  width: 30px;
                  height: 27px;
                  padding: 10px;
                  display: block;
                  position: absolute;
                  border-top-right-radius: 5px;
                  border-bottom-right-radius: 5px;
                  right: -20px;
                  top: 0px;
                  border-left: 1px solid #3a3f47;
                  text-align: center;
                }
                .color-pick {
                  position: absolute;
                  bottom: -220px;
                  right: -270px;
                  z-index: 100;
                  border-radius: 5px;
                  overflow: hidden;

                  color: #1c2027;
                }
              }
              .color-title {
                width: 200px;
                height: 30px;
                color: #fff;
                float: left;
                font-size: 18px;
                line-height: 20px;
                padding: 10px;
              }
            }
            .select-group {
              width: 100%;
              display: flex;
              padding-bottom: 10px;

              .select-title {
                width: 200px;
                height: inherit;
                color: #fff;
                float: left;
                font-size: 18px;
                line-height: 20px;
                padding: 10px;
              }
              .selecter {
                width: 42%;

                --background: #202225;
                --border: 0px;
                --listBackground: #202225;
                --itemHoverBG: #a13157;
                --borderRadius: 5px;
                --placeholderColor: #fff;
                --spinnerWidth: 40%;
                --padding: 10px 16px;
                --height: 47px;
                --inputFontSize: 18px;
                --itemIsActiveBG: #ff4081;
                --clearSelectFocusColor: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
