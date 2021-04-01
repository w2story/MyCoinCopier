<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";
  // 스토어 처리
  import { uuidSearch } from "~/store/database/userInfo";
  import { donViewList, userUUID, donLimitTime } from "~/store/page/donView";

  export let mainUpadeNum = 0;
  export let limitTimeDiscord = false;

  let donViewRow = {};
  let limitTime = 3000;
  let updateNum = 0;

  let video_key = 0;

  onMount(async () => {
    console.log("//   videopage-onMount   //////////");
    console.log("스토어 리미트 타임 값 : ", $donLimitTime);
    console.log("자식 리미트 타임 값 : ", limitTime);
    console.log("메인 페이지 업데이트 : ", mainUpadeNum);
    console.log("리미트 타임 참조값 : ", limitTimeDiscord);
    console.log("//   videopage-onMount   //////////");
    donViewList($userUUID).then((res) => {
      console.log("처리 결과 값", res);
      donViewRow = res;
    });
  });

  //오토 플레이 처리 - ?autoplay=1
  $: if ($donLimitTime !== limitTime && mainUpadeNum > 1 && !limitTimeDiscord) {
    console.log("//   videopage-시간체커   //////////");
    console.log("데이터 송출 준비");
    console.log("메인페이지 업데이트 수 :", mainUpadeNum);
    limitTime = $donLimitTime;
    console.log("비디오 페이지 업데이트 수 :", updateNum);
    updateNum += 1;
    donViewList($userUUID).then((res) => {
      console.log("처리 결과 값", res);
      donViewRow = res;
    });
  }
</script>

<div class="video">
  <iframe
    id="player"
    type="text/html"
    width="1280"
    height="720"
    src="http://www.youtube.com/embed/{donViewRow.video_id}?autoplay=1"
    frameborder="0"
  />
  <div class="slide-right">
    <h3>{donViewRow.don_user_name} - {donViewRow.video_title}</h3>
  </div>
</div>

<style lang="scss">
  .video {
    width: 1280px;
    height: 800px;
    overflow: hidden;

    .slide-right {
      width: 100%;
      padding: 0.5em 0;
      overflow: hidden;
      margin-bottom: 10px;
      position: relative;
      h3:after {
        content: "";
        white-space: nowrap;
        padding-right: 50px;
      }
      h3 {
        font-size: 48px;
        font-weight: bolder;
        color: #fff;

        text-shadow: 0 1px 3px rgb(0 0 0 / 75%);

        margin: 0;
        padding-left: 1280px;
        display: inline-block;
        white-space: nowrap;
        -webkit-animation-name: marquee;
        -webkit-animation-timing-function: linear;
        -webkit-animation-duration: 10s;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-name: marquee;
        -moz-animation-timing-function: linear;
        -moz-animation-duration: 10s;
        -moz-animation-iteration-count: infinite;
        -ms-animation-name: marquee;
        -ms-animation-timing-function: linear;
        -ms-animation-duration: 10s;
        -ms-animation-iteration-count: infinite;
        -o-animation-name: marquee;
        -o-animation-timing-function: linear;
        -o-animation-duration: 10s;
        -o-animation-iteration-count: infinite;
        animation-name: marquee;
        animation-timing-function: linear;
        animation-duration: 10s;
        animation-iteration-count: infinite;
      }
    }
    @-webkit-keyframes marquee {
      from {
        -webkit-transform: translate(0%);
      }
      99%,
      to {
        -webkit-transform: translate(-100%);
      }
    }
    @-moz-keyframes marquee {
      from {
        -moz-transform: translate(0%);
      }
      99%,
      to {
        -moz-transform: translate(-100%);
      }
    }
    @-ms-keyframes marquee {
      from {
        -ms-transform: translate(0%);
      }
      99%,
      to {
        -ms-transform: translate(-100%);
      }
    }
    @-o-keyframes marquee {
      from {
        -o-transform: translate(0%);
      }
      99%,
      to {
        -o-transform: translate(-100%);
      }
    }
    @keyframes marquee {
      from {
        transform: translate(0%);
      }
      99%,
      to {
        transform: translate(-100%);
      }
    }
  }
</style>
