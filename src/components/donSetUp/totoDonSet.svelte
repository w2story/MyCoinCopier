<script lang="ts">
  // input -> select 처리기
  import Select from "svelte-select";

  import Fa from "svelte-fa";
  import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

  let videoChecked = false;
  let coinChecked = false;

  let noticeLayoutSelected = "bottom";
  // 알람 처리
  let alarmSelected = { value: "무음", label: "무음" };
  function handleSelect(event) {
    console.log("selected item", event.detail);
    // .. do something here 🙂
  }
  const alarmItems = [
    {
      value: "무음",
      label: "무음",
    },
    {
      value: "안녕로봇",
      label: "안녕로봇",
    },
    {
      value: "디바",
      label: "디바",
    },
    {
      value: "아이폰",
      label: "아이폰",
    },
    {
      value: "기상나팔",
      label: "기상나팔",
    },
    {
      value: "어서일어나",
      label: "어서일어나",
    },
  ];
</script>

<div class="layout">
  <div class="container">
    <h1 class="page-title">
      토토 서비스 설정 / <small> Toto Service Setup</small>
    </h1>
    <div class="components">
      <div class="title">
        <h1>토토 설정 / <small> Toto Setting</small></h1>
      </div>
      <div class="card">
        <div class="btn-group">
          <h3>도네이션 사용하기</h3>
          <label class="switch">
            <input type="checkbox" bind:checked={videoChecked} />
            <span class="slider round" />
          </label>
        </div>
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>토토 설정 / <small> Toto System</small></h1>
      </div>
      <div class="card">
        <div class="input-group">
          <h3 class="input-title">최대 코인 제한</h3>
          <input value="100" />
        </div>
        <hr />
        <div class="supporting-text">
          <p>※ 최댓값을 설정 하는 구간 입니다.</p>
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
          .select-group {
            .selecter {
              width: 80%;
            }
          }
        }
      }
    }
  }
</style>
