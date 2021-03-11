<script lang="ts">
  import Fa from "svelte-fa";
  import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

  let voiceChecked = false;
  let videoChecked = false;
  let osuChecked = false;
  let rouletteChecked = false;
  let totoServiceChecked = false;
  let color = "#2196F3";
</script>

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
          <p>
            ※사용방법 : "http://subwiti.net/mds/streamer_obs.php?str_tok="주소
            뒤에 스트림키를 붙여 OBS 브라우저 URL에 추가
          </p>
          <p>※화면크기 : 1280 * 720 // 필히 준수해주시길 바랍니다.</p>
        </div>
        <hr />
        <div class="link-group">
          <h3 class="link-text">4A838E705489860A5EFC99CCE27898AF</h3>
          <span class="btn-group">
            <button class="icon-btn">
              <Fa icon={faPaperclip} fw size="2x" pull="left" />
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
            <input type="checkbox" bind:checked={voiceChecked} />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>영상 도네</h3>
          <label class="switch">
            <input type="checkbox" bind:checked={videoChecked} />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>OSU 도네</h3>
          <label class="switch">
            <input type="checkbox" bind:checked={osuChecked} />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>룰렛 도네</h3>
          <label class="switch">
            <input type="checkbox" bind:checked={rouletteChecked} />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>토토서비스</h3>
          <label class="switch">
            <input type="checkbox" bind:checked={totoServiceChecked} />
            <span class="slider round" />
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
          <h3 class="link-text">
            http://subwiti.net/mcc/streamer/4A838E705489860A5EFC99CCE27898AF
          </h3>
          <span class="btn-group">
            <button class="icon-btn">
              <Fa icon={faPaperclip} fw size="2x" pull="left" />
            </button>
            <button class="text-btn">
              <p>이동</p>
            </button>
          </span>
        </div>

        <hr />
        <div class="supporting-text">
          <p>※해당 스트림키는 남에게 보여주시면 안됩니다.</p>
          <p>
            ※사용방법 : "http://subwiti.net/mds/streamer_obs.php?str_tok="주소
            뒤에 스트림키를 붙여 OBS 브라우저 URL에 추가
          </p>
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
              <Fa icon={faPaperclip} fw size="2x" pull="left" />
            </button>
            <button class="text-btn">
              <p>이동</p>
            </button>
          </span>
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
  </div>
</div>

<style lang="scss">
  @import "./scss/def.scss";
</style>
