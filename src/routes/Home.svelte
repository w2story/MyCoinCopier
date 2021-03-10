<script lang="ts">
  import Fa from 'svelte-fa'
  import { faPaperclip } from '@fortawesome/free-solid-svg-icons'

  import QuickSetup from '~/components/quickSetup/QuickSetup.svelte'

  let voiceChecked = false;
  let videoChecked = false;
  let osuChecked = false;
  let rouletteChecked = false;
  let totoServiceChecked = false;
  let color = "#2196F3";
</script>
  
<style lang="scss">
    .layout {
        width: calc(100% - 30px);
        float: left;
        padding: 0px 15px;
        margin-top: 60px;

        overflow-x: hidden;
        overflow-y: scroll;

        .container{
            min-width: 900px;
            max-width: 1300px;
            margin: auto;

            h1.page-title {
              font-size: 32px;
              font-weight: bolder;

              margin-top: 15px;

              small {
                color: #FF4081;
                font-size: 26px;
                font-weight: normal;
              }
            }

            .components {
              width: 100%;
              margin-top: 20px;

              .title{
                width: 500px;
                height: 32px;
                background-color: #1C2027;
                padding: 10px;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                h1 {                  
                  font-size: 24px;
                  font-weight: bolder;

                  small {
                    color: #FF4081;
                    font-size: 20px;
                    font-weight: normal;
                  }
                }
              }
              .card {
                width: calc(100% - 20px);
                height: auto;
                background-color: #3A3F47;
                padding: 10px;
                padding-top: 15px;

                border-top-right-radius: 5px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;

                box-shadow: 
                  0px 2px 1px -1px rgb(0 0 0 / 20%),
                  0px 1px 1px 0px rgb(0 0 0 / 14%),
                  0px 1px 3px 0px rgb(0 0 0 / 12%);

                .supporting-text {
                  width: 100%;
                  height: auto;

                  padding-bottom: 15px;

                  p {
                    font-size: 14px;
                    font-weight: 300;
                    padding-bottom: 5px;
                  }
                }

                hr {
                  border-color: #36393F;
                  margin-bottom: 15px;
                }
              }
              .link-group {
                width: 100%;
                min-height: 40px;
                height: auto;
                padding-bottom: 15px;
                
                h3.link-text {
                  font-size: 18px;
                  line-height: 40px;
                  padding-left: 10px;
                  display: inline-block;
                }

                .btn-group {
                  width: auto;
                  height: 40px;
                  float: right;

                  button {
                    width: auto;
                    height: auto;

                    float: right;
                    display: inline-block;
                    margin-right: 10px;

                    color: #fff;
                    text-align: center;

                    background-color: #FF4081;
                    border: 0px;
                    border-radius: 40px;
                    box-shadow: 
                      0px 2px 1px -1px rgb(0 0 0 / 20%),
                      0px 1px 1px 0px rgb(0 0 0 / 14%),
                      0px 1px 3px 0px rgb(0 0 0 / 12%);

                    &.icon-btn {
                      width: 40px;
                      height: 40px;
                      padding: 3px;
                    }
                    &.text-btn {
                      width: auto;
                      height: 40px;

                      p {
                        font-size: 16px;
                        padding: 0px 10px;
                      }
                    }
                  }
                }
              }
              .input-group {
                width: 100%;
                height: auto;

                input {
                  width: 80%;
                  height: 30px;
                  color: #fff;
                  background-color: #202225;

                  border-radius: 5px;
                  border: 0px;
                  padding: 10px;
                  font-size: 18px;
                }
              }
              .btn-group {
                width: 100%;
                min-height: 40px;
                height: auto;
                padding-bottom: 10px;
                h3 {
                  font-size: 18px;
                  font-weight: bolder;
                  line-height: 40px;
                  padding-left: 10px;
                  display: inline-block;
                }
                
                /* The switch - the box around the slider */
                .switch {
                  width: 60px;
                  height: 34px;
                  position: relative;
                  display: inline-block;
                  float: right;
                  input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                  }
                  /* The slider */
                  .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #1C2027;
                    -webkit-transition: .4s;
                    transition: .4s;
                  }

                  .slider:before {
                    position: absolute;
                    content: "";
                    height: 26px;
                    width: 26px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    -webkit-transition: .4s;
                    transition: .4s;
                  }
                  input:checked + .slider {
                    background-color: #FF4081;
                  }
                  input:focus + .slider {
                    box-shadow: 0 0 1px #FF4081;
                  }
                  input:checked + .slider:before {
                    -webkit-transform: translateX(26px);
                    -ms-transform: translateX(26px);
                    transform: translateX(26px);
                  }
                  /* Rounded sliders */
                  .slider.round {
                    border-radius: 34px;
                  }
                  .slider.round:before {
                    border-radius: 50%;
                  }
                }

                button {
                    width: auto;
                    height: auto;

                    float: right;
                    display: inline-block;
                    margin-right: 10px;

                    color: #fff;
                    text-align: center;

                    background-color: #FF4081;
                    border: 0px;
                    border-radius: 40px;
                    box-shadow: 
                      0px 2px 1px -1px rgb(0 0 0 / 20%),
                      0px 1px 1px 0px rgb(0 0 0 / 14%),
                      0px 1px 3px 0px rgb(0 0 0 / 12%);

                    &.icon-btn {
                      width: 40px;
                      height: 40px;
                      padding: 3px;
                    }
                    &.text-btn {
                      width: auto;
                      height: 40px;

                      p {
                        font-size: 16px;
                        padding: 0px 10px
                      }
                    }
                  }
              }
            }
        }
    }
</style>
<div class="layout">
    <div class="container">
      <h1 class="page-title">간편설정 / <small> Easy Setup</small></h1>
        <div class="components">
            <div class="title">
              <h1>도네이션 스트림키 / <small> Donation Stream Key</small></h1>
            </div>
            <div class="card">
              <div class="supporting-text">
                <p>※해당 스트림키는 남에게 보여주시면 안됩니다.</p>
                <p>※사용방법 : "http://subwiti.net/mds/streamer_obs.php?str_tok="주소 뒤에 스트림키를 붙여 OBS 브라우저 URL에 추가</p>
                <p>※화면크기 : 1280 * 720 // 필히 준수해주시길 바랍니다.</p>
              </div>
              <hr/>
              <div class="link-group">
                <h3 class="link-text">4A838E705489860A5EFC99CCE27898AF</h3>
                <span class="btn-group">
                  <button class="icon-btn">
                    <Fa icon={faPaperclip} fw size="2x" pull="left"/>
                  </button>
                  <button class="text-btn">
                    <p>이동</p>
                  </button>
                </span>
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
            <h1>후원 설정 / <small> Support Setting</small></h1>
          </div>
          <div class="card">
            <div class="btn-group">
              <h3>음성 도네</h3>
              <label class="switch">
                <input type="checkbox" bind:checked={voiceChecked}>
                <span class="slider round"></span>
              </label>
            </div>
            <hr/>
            <div class="btn-group">
              <h3>영상 도네</h3>
              <label class="switch">
                <input type="checkbox" bind:checked={videoChecked}>
                <span class="slider round"></span>
              </label>
            </div>
            <hr/>
            <div class="btn-group">
              <h3>OSU 도네</h3>
              <label class="switch">
                <input type="checkbox" bind:checked={osuChecked}>
                <span class="slider round"></span>
              </label>
            </div>
            <hr/>
            <div class="btn-group">
              <h3>룰렛 도네</h3>
              <label class="switch">
                <input type="checkbox" bind:checked={rouletteChecked}>
                <span class="slider round"></span>
              </label>
            </div>
            <hr/>
            <div class="btn-group">
              <h3>토토서비스</h3>
              <label class="switch">
                <input type="checkbox" bind:checked={totoServiceChecked}>
                <span class="slider round"></span>
              </label>
            </div>
          </div>
      </div>
        <div class="components">
          <div class="title">
            <h1>후원 링크 / <small> Support Link</small></h1>
          </div>
          <div class="card">
            <div class="link-group">
              <h3 class="link-text">http://subwiti.net/mcc/streamer/4A838E705489860A5EFC99CCE27898AF</h3>
              <span class="btn-group">
                <button class="icon-btn">
                  <Fa icon={faPaperclip} fw size="2x" pull="left"/>
                </button>
                <button class="text-btn">
                  <p>이동</p>
                </button>
              </span>
            </div>
            
            <hr/>
            <div class="supporting-text">
              <p>※해당 스트림키는 남에게 보여주시면 안됩니다.</p>
              <p>※사용방법 : "http://subwiti.net/mds/streamer_obs.php?str_tok="주소 뒤에 스트림키를 붙여 OBS 브라우저 URL에 추가</p>
              <p>※화면크기 : 1280 * 720 // 필히 준수해주시길 바랍니다.</p>
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
          <h1>채팅창 링크 / <small> Chatting Link</small></h1>
        </div>
        <div class="card">
          <div class="link-group">
            <h3 class="link-text">http://subwiti.net/mcc/chat/w2story</h3>
            <span class="btn-group">
              <button class="icon-btn">
                <Fa icon={faPaperclip} fw size="2x" pull="left"/>
              </button>
              <button class="text-btn">
                <p>이동</p>
              </button>
            </span>
          </div>
          
          <hr/>
          <div class="supporting-text">
            <p>※해당 스트림키는 남에게 보여주시면 안됩니다.</p>
            <p>※사용방법 : "http://subwiti.net/mds/streamer_obs.php?str_tok="주소 뒤에 스트림키를 붙여 OBS 브라우저 URL에 추가</p>
            <p>※화면크기 : 720 * 1280 // 필히 준수해주시길 바랍니다.</p>
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