<script lang="ts">
  import Fa from "svelte-fa";
  import {
    faImage,
    faChevronUp,
    faChevronDown,
  } from "@fortawesome/free-solid-svg-icons";

  let voiceChecked = false;
  let coinChecked = false;
  let imgSupportChecked = false;
  let noticeLayoutSelected = "bottom";
  let questions = [
    { id: 1, text: `Where did you go to school?` },
    { id: 2, text: `What is your mother's name?` },
    {
      id: 3,
      text: `What is another personal fact that an attacker could easily find with Google?`,
    },
  ];

  let selected;

  let answer = "";

  function handleSubmit() {
    alert(
      `answered question ${selected.id} (${selected.text}) with "${answer}"`
    );
  }
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
            <input type="checkbox" bind:checked={voiceChecked} />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>마캐코인 사용하기</h3>
          <label class="switch">
            <input type="checkbox" bind:checked={coinChecked} />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>이미지 후원 사용하기</h3>
          <label class="switch">
            <input type="checkbox" bind:checked={imgSupportChecked} />
            <span class="slider round" />
          </label>
        </div>
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>후원 음성 설정 / <small> Support Voice System</small></h1>
      </div>
      <div class="card">
        <div class="input-group">
          <h3 class="input-title">글자 제한</h3>
          <input value="100" />
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">알림 효과</h3>
          <input value="100" />
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
              />
              <span class="radio-box nLayout-noimg">
                <h3>text</h3>
              </span>
            </label>
          </div>
        </div>
        <hr />
        <div class="thumbnail-group">
          <h3 class="thumbnail-title">알림 이미지</h3>
        </div>
        <hr />
        <div class="select-group">
          <h3 class="select-title">알림 효과음</h3>
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
        <div class="thumbnail-group">
          <h3 class="thumbnail-title">TTS 음성</h3>
          <div class="switch-btn">
            <label class="switch">
              <input type="checkbox" bind:checked={voiceChecked} />
              <span class="slider round" />
            </label>
            <label class="switch">
              <input type="checkbox" bind:checked={voiceChecked} />
              <span class="slider round" />
            </label>
            <label class="switch">
              <input type="checkbox" bind:checked={voiceChecked} />
              <span class="slider round" />
            </label>
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
        <!--<div class="input-group">
              <input value="7887826671F1F91414BBFE29E7F7C17E"/>
            </div>
            <div class="btn-group">
            </div>-->
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>시스템 텍스트 / <small> System Text</small></h1>
      </div>
      <div class="card">
        <div class="input-group">
          <h3 class="input-title">내용 템플릿</h3>
          <input value="(name)님이 음성 도네이션을 공유했습니다." />
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">시스템 텍스트 폰트</h3>
          <input value="100" />
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">시스템 텍스트 크기(px)</h3>
          <input value="100" />
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">시스템 텍스트 색상</h3>
          <input value="100" />
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">닉네임, 금액 색상</h3>
          <input value="100" />
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./scss/def.scss";

  .layout {
    .container {
      .components {
        .card {
          .input-group {
            width: 100%;
            display: flex;
            padding-bottom: 10px;
            input {
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
              width: 60%;
              position: relative;
              display: inline-block;
              float: left;

              .thumbnail {
                width: 158px;
                height: 88px;
                display: inline-block;
                float: left;
                padding: 0%;
                margin: 0%;
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
                  height: 80px;
                  position: relative;
                  display: inline-block;

                  background-color: #1c2027;
                  border: 4px solid #1c2027;
                  border-radius: 10px;

                  text-align: center;

                  .icon {
                    width: 50px;
                    height: 50px;
                    display: block;
                    padding: 0px 50px;
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
                  border-color: #ff4081;
                }
                input:focus + .radio-box {
                  box-shadow: 0 0 1px #ff4081;
                }
              }
            }
          }
          .select-group {
            width: 100%;
            float: left;
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
</style>
