<script lang="ts">
  import Fa from "svelte-fa";
  import { onMount } from "svelte";
  import Toast from "svelte-toast";

  import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
  import { getUserInfo } from "~/store/database/userInfo";

  //토글 체크
  import { userDonToggleUse, userDonToggleChk } from "~/store/page/qsetUp";

  let userInfo = {};
  let toggleArr = {};
  let userStreamToken = "";

  onMount(async () => {
    userInfo = await getUserInfo();
    toggleArr = await userDonToggleUse();
    userStreamToken = userInfo.user_stream_token;
  });

  userDonToggleUse().then((res) => {
    toggleArr = res;
  });

  const toast = new Toast({ position: "bottom-right" });

  const userDonToggleSelect = async (select: string, data: object) => {
    const toggleUpdate = await userDonToggleChk(select, data);
    if (toggleUpdate.success) {
      toast.success("후원 설정 변경 완료.");
    } else {
      toast.error("후원 설정 변경 불가.");
    }
  };

  console.log(userInfo);
  //let rouletteChecked = false;
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
          <h3 class="link-text">{userStreamToken}</h3>
          <span class="btn-group">
            <button class="icon-btn">
              <Fa icon={faPaperclip} fw size="2x" pull="left" />
            </button>
            <button class="text-btn">
              <p>재발급</p>
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
            <input
              type="checkbox"
              bind:checked={toggleArr.voice_use}
              on:change={userDonToggleSelect("voice", toggleArr.voice_use)}
            />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>영상 도네</h3>
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={toggleArr.video_use}
              on:change={userDonToggleSelect("video", toggleArr.video_use)}
            />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <div class="btn-group">
          <h3>OSU 도네</h3>
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={toggleArr.osumap_use}
              on:change={userDonToggleSelect("osumap", toggleArr.osumap_use)}
            />
            <span class="slider round" />
          </label>
        </div>
        <hr />
        <!--<div class="btn-group">
          <h3>룰렛 도네</h3>
          <label class="switch">
            <input type="checkbox" bind:checked={rouletteChecked} />
            <span class="slider round" />
          </label>
        </div>
        <hr />-->
        <div class="btn-group">
          <h3>토토서비스</h3>
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={toggleArr.toto_use}
              on:change={userDonToggleSelect("toto", toggleArr.toto_use)}
            />
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
            http://subwiti.net/mcc/streamer/{userStreamToken}
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
          <h3 class="link-text">
            http://subwiti.net/mcc/chat/{userStreamToken}
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
  @import "../../scss/inputBox.scss";
  @import "./scss/input.se.scss";
</style>
