<script lang="ts">
  // 색상 선택기
  import { HsvPicker } from "svelte-color-picker";
  import Fa from "svelte-fa";
  import { faPalette } from "@fortawesome/free-solid-svg-icons";

  let chatQset = "def";
  let backColorActive = false;
  let fontColorActive = false;

  function colorCallback(rgba) {
    console.log(rgba.detail);
  }

  const colorSelectAcitve = (colorSelect) => {
    switch (colorSelect) {
      case "back":
        if (backColorActive === true) {
          backColorActive = false;
        } else {
          backColorActive = true;
        }
        break;
      case "font":
        if (fontColorActive === true) {
          fontColorActive = false;
        } else {
          fontColorActive = true;
        }
        break;
    }
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
            </div>
          </div>
          <hr />
          <div class="color-group">
            <h3 class="color-title">배경 색상</h3>
            <label class="color-selecter">
              <input value="100" />
              <a on:click={() => colorSelectAcitve("back")}>
                <Fa icon={faPalette} size="lg" />
              </a>
              {#if backColorActive}
                <div class="color-pick">
                  <HsvPicker
                    on:colorChange={colorCallback}
                    startColor={"#FBFBFB"}
                  />
                </div>
              {/if}
            </label>
          </div>
          <hr />
          <div class="select-group">
            <h3 class="select-title">글자 폰트</h3>
            <div class="select" tabindex="1">
              <input
                class="selectopt"
                name="test"
                type="radio"
                id="opt1"
                checked
              />
              <label for="opt1" class="option">Oranges</label>
              <input class="selectopt" name="test" type="radio" id="opt2" />
              <label for="opt2" class="option">Apples</label>
              <input class="selectopt" name="test" type="radio" id="opt3" />
              <label for="opt3" class="option">Grapefruit</label>
              <input class="selectopt" name="test" type="radio" id="opt4" />
              <label for="opt4" class="option">Bananas</label>
              <input class="selectopt" name="test" type="radio" id="opt5" />
              <label for="opt5" class="option">Watermelon</label>
            </div>
          </div>
          <hr />
          <div class="color-group">
            <h3 class="color-title">배경 색상</h3>
            <label class="color-selecter">
              <input value="100" />
              <a on:click={() => colorSelectAcitve("font")}>
                <Fa icon={faPalette} size="lg" />
              </a>
              {#if fontColorActive}
                <div class="color-pick">
                  <HsvPicker
                    on:colorChange={colorCallback}
                    startColor={"#FBFBFB"}
                  />
                </div>
              {/if}
            </label>
          </div>
          <hr />
          <div class="input-group">
            <h3 class="input-title">폰트크기</h3>
            <input value="100" />
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
                  padding: 12px 10px;
                  display: block;
                  position: absolute;
                  right: -20px;
                  top: 0px;
                  border-left: 1px solid #3a3f47;
                  text-align: center;
                }
                .color-pick {
                  position: absolute;
                  bottom: -275px;
                  right: -20px;
                  z-index: 100;

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

              .select {
                display: flex;
                flex-direction: column;
                position: relative;
                width: 40%;
                height: 50px;
                border-radius: 5px;
              }
              .option {
                padding: 0 30px 0 10px;
                min-height: 50px;
                display: flex;
                align-items: center;
                background: #202225;
                border-top: #3a3f47 solid 1px;
                position: absolute;
                top: 0;
                width: 100%;
                pointer-events: none;
                order: 2;
                z-index: 1;
                transition: background 0.4s ease-in-out;
                box-sizing: border-box;
                overflow: hidden;
                white-space: nowrap;
              }

              .option:hover {
                background: #ff4081;
              }

              .select:focus .option {
                position: relative;
                pointer-events: all;
              }

              input {
                opacity: 0;
                position: absolute;
                left: -99999px;
                border-style: inset;
                outline-color: orange;
              }

              input:checked + label {
                order: 1;
                z-index: 2;
                background: #202225;
                border-top: none;
                position: relative;
              }

              input:checked + label:after {
                content: "";
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid white;
                position: absolute;
                right: 10px;
                top: calc(50% - 2.5px);
                pointer-events: none;
                z-index: 3;
              }

              input:checked + label:before {
                position: absolute;
                right: 0;
                height: 50px;
                width: 40px;
                content: "";
                background: #202225;
              }
            }
          }
        }
      }
    }
  }
</style>
