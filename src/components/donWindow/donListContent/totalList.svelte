<script lang="ts">
  import Fa from "svelte-fa";
  import { faLink, faReply, faDeaf } from "@fortawesome/free-solid-svg-icons";
  import {
    voiceList,
    voiceListSearch,
    lastVoiceDonKey,
    voiceListUpdata,
    voiceRePlay,
  } from "~/store/database/voiceDonList";
  import {
    videoList,
    videoListSearch,
    lastVideoDonKey,
    videoListUpdata,
    videoRePlay,
  } from "~/store/database/videoDonList";
  // 토스트기
  import Toast from "svelte-toast";

  // 후원 최종키
  let voiceLastKey = 0;
  let videoLastKey = 0;

  // 후원 리스트 처리
  let voiceListRow = [];
  let videoListRow = [];

  // 토스트기
  const toast = new Toast();

  voiceListSearch().then((res) => {
    voiceList.set(res.voicerow);
    voiceListRow = res.voicerow;
    voiceLastKey = $lastVoiceDonKey;
    console.log(voiceLastKey);
  });
  videoListSearch().then((res) => {
    videoList.set(res.videorow);
    videoListRow = res.videorow;
    videoLastKey = $lastVideoDonKey;
    console.log(videoLastKey);
  });

  $: if ($voiceListUpdata > 0) {
    console.log($voiceListUpdata);
    voiceListUpdata.set(0);

    voiceListSearch().then((res) => {
      voiceList.set(res.voicerow);
      voiceListRow = res.voicerow;
      voiceLastKey = $lastVoiceDonKey;
      console.log(voiceLastKey);
    });
  }
  $: if ($videoListUpdata > 0) {
    console.log($videoListUpdata);
    videoListUpdata.set(0);

    videoListSearch().then((res) => {
      videoList.set(res.videorow);
      videoListRow = res.videorow;
      voiceLastKey = $lastVideoDonKey;
      console.log(voiceLastKey);
    });
  }

  const voiceDonReplay = async (key) => {
    const rePlayChk = await voiceRePlay(key);
    if (rePlayChk) {
      toast.success("재송출 완료.");
    }
  };
  const videoDonReplay = async (key) => {
    const rePlayChk = await videoRePlay(key);
    if (rePlayChk) {
      toast.success("재송출 완료.");
    }
  };
</script>

<div class="don-component">
  <div class="don-list-title">
    <h3>음성도네이션</h3>
  </div>
  <div class="don-list don-text">
    {#each voiceListRow as item}
      <div class="don-item" class:see={item.active}>
        <div class="don-img">
          <img src={item.don_img_url} />
        </div>
        <div class="don-content">
          <h4 class="don-sender">
            {item.don_user_name} / <small>{item.se_user_name}</small>
          </h4>
          <p class="don-text">{item.don_text}</p>
        </div>
        <div class="don-btn">
          <div
            class="btn-def reply-btn"
            on:click={voiceDonReplay(item.voice_don_key)}
          >
            <span class="icon">
              <Fa icon={faReply} />
            </span>
          </div>
          <div class="btn-def reply-btn">
            <span class="icon">
              <Fa icon={faDeaf} />
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div class="don-list-title">
    <h3>영상도네이션</h3>
  </div>
  <div class="don-list don-video">
    {#each videoListRow as item}
      <div class="don-item" class:see={item.active}>
        <div class="don-img">
          <img
            src={"https://i.ytimg.com/vi/" + item.video_id + "/sddefault.jpg"}
          />
        </div>
        <div class="don-content">
          <h4 class="don-sender">
            {item.don_user_name} / <small>{item.se_user_name}</small>
          </h4>
          <p class="don-text">
            {item.video_title}
          </p>
        </div>
        <div class="don-btn">
          <a
            href="https://www.youtube.com/watch?v={item.video_id}"
            class="btn-def link-btn"
          >
            <span class="icon">
              <Fa icon={faLink} />
            </span>
          </a>
          <div
            class="btn-def reply-btn"
            on:click={videoDonReplay(item.video_don_key)}
          >
            <span class="icon">
              <Fa icon={faReply} />
            </span>
          </div>
          <div class="btn-def reply-btn">
            <span class="icon">
              <Fa icon={faDeaf} />
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "../../../scss/donListBox.scss";
  .don-list {
    height: calc(50% - 76px);
    .don-item {
      &.see {
        opacity: 0.5;
      }
    }
  }
</style>
