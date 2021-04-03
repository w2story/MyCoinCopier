<script lang="ts">
  import { onMount } from "svelte";
  // 스토어 처리
  import { donViewList, userUUID, donLimitTime } from "~/store/page/donView";

  export let mainUpadeNum = 0;
  export let limitTimeDiscord = false;

  let donViewRow = {};
  let limitTime = 3000;
  let updateNum = 0;

  const hostName = window.location.hostname;
  const url = "http://" + hostName + ":3000";

  onMount(async () => {
    console.log("//   voicepage-onMount   //////////");
    console.log("스토어 리미트 타임 값 : ", $donLimitTime);
    console.log("자식 리미트 타임 값 : ", limitTime);
    console.log("메인 페이지 업데이트 : ", mainUpadeNum);
    console.log("리미트 타임 참조값 : ", limitTimeDiscord);
    console.log("//   voicepage-onMount   //////////");
    console.log("음성 주소 : ", url + donViewRow.don_tts_url);
    console.log("아직 찾는중인가 :", seeking);

    console.log("//   voicepage-onMount   //////////");
    donViewList($userUUID).then((res) => {
      console.log("처리 결과 값", res);
      donViewRow = res;
    });
  });

  //오토 플레이 처리 - ?autoplay=1
  $: if ($donLimitTime !== limitTime && mainUpadeNum > 1 && !limitTimeDiscord) {
    console.log("//   voicepage-시간체커   //////////");
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
  // 오디오 태그 처리
  let time = 0;
  let duration;
  let seeking;
  console.log("//   voicepage-onMount   //////////");
  console.log("음성 주소 : ", url + donViewRow.don_tts_url);
  console.log("아직 찾는중인가 :", seeking);
</script>

<div class="voice">
  <div class="don-img">
    <img src={donViewRow.don_img_url} />
  </div>
  <div class="don-text">
    <h3 class="title">
      {@html donViewRow.title_template}
    </h3>
    <p class="text">{donViewRow.don_text}</p>
  </div>
  <audio
    src={url + donViewRow.don_tts_url}
    controls
    autoplay
    preload="auto|metadata"
    width="400"
    bind:currentTime={time}
    bind:duration
    bind:seeking
  />
</div>

<style lang="scss">
  .voice {
    width: 1280px;
    height: 800px;
    overflow: hidden;
    .don-img {
      width: 1280px;
      height: 300px;
      overflow: hidden;
      margin-bottom: 25px;
      margin-top: 150px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .don-text {
      width: 1200px;
      height: 200px;
      padding: 0px 40px;
      padding-bottom: 25px;
      text-align: center;
      overflow: hidden;

      h3.title {
        font-size: 52px;
        font-weight: bolder;
        color: #ffffff;
        text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
        padding-bottom: 15px;
      }
      p.text {
        font-size: 72px;
        color: #fff;
        text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
      }
    }
    audio {
      width: 1px;
      height: 1px;
    }
  }
</style>
