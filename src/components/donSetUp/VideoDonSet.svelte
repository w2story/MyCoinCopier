<script lang="ts">
  import Fa from "svelte-fa";
  import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

  let videoChecked = false;
  let coinChecked = false;
</script>

<div class="layout">
  <div class="container">
    <h1 class="page-title">영상후원 / <small> Video Setup</small></h1>
    <div class="components">
      <div class="title">
        <h1>후원 설정 / <small> Support Setting</small></h1>
      </div>
      <div class="card">
        <div class="btn-group">
          <h3>도네이션 사용하기</h3>
          <label class="switch">
            <input type="checkbox" bind:checked={videoChecked} />
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
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>후원 영상 설정 / <small> Support Video System</small></h1>
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
          <div class="switch-btn">
            <label class="switch">
              <input type="checkbox" bind:checked={videoChecked} />
              <span class="slider round" />
            </label>
            <label class="switch">
              <input type="checkbox" bind:checked={videoChecked} />
              <span class="slider round" />
            </label>
            <label class="switch">
              <input type="checkbox" bind:checked={videoChecked} />
              <span class="slider round" />
            </label>
          </div>
        </div>
        <hr />
        <div class="thumbnail-group">
          <h3 class="thumbnail-title">알림 효과음</h3>
          <div class="switch-btn">
            <label class="switch">
              <input type="checkbox" bind:checked={videoChecked} />
              <span class="slider round" />
            </label>
            <label class="switch">
              <input type="checkbox" bind:checked={videoChecked} />
              <span class="slider round" />
            </label>
            <label class="switch">
              <input type="checkbox" bind:checked={videoChecked} />
              <span class="slider round" />
            </label>
          </div>
        </div>
        <hr />
        <div class="thumbnail-group">
          <h3 class="thumbnail-title">TTS 음성</h3>
          <div class="switch-btn">
            <label class="switch">
              <input type="checkbox" bind:checked={videoChecked} />
              <span class="slider round" />
            </label>
            <label class="switch">
              <input type="checkbox" bind:checked={videoChecked} />
              <span class="slider round" />
            </label>
            <label class="switch">
              <input type="checkbox" bind:checked={videoChecked} />
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
            <input value="32" />
          </div>
          <hr />
          <div class="input-group">
            <h3 class="input-title">시스템 텍스트 크기(px)</h3>
            <input value="32" />
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
</div>

<style lang="scss">
  @import "./scss/def.scss";

  .layout {
    .container {
      .components {
        .card {
          .input-group {
            width: 100%;
            float: left;
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
            float: left;
            padding-bottom: 10px;
            .thumbnail-title {
              width: 200px;
              height: 30px;
              color: #fff;
              float: left;
              font-size: 18px;
              line-height: 20px;
              padding: 10px;
            }
          }
        }
      }
    }
  }
</style>
