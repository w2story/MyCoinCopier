<script lang="ts">
  import Fa from "svelte-fa";
  import { faLink, faReply, faDeaf } from "@fortawesome/free-solid-svg-icons";
  import {
    videoList,
    videoListSearch,
    lastVideoDonKey,
    videoListUpdata,
  } from "~/store/database/videoDonList";

  let videoLastKey = 0;

  console.log($lastVideoDonKey);

  videoListSearch().then((res) => {
    videoList.set(res.videorow);
    videoLastKey = $lastVideoDonKey;
    console.log(videoLastKey);
  });

  $: if ($videoListUpdata > 0) {
    console.log($videoListUpdata);
    videoListUpdata.set(0);

    videoListSearch().then((res) => {
      videoList.set(res.videorow);
      voiceLastKey = $lastVideoDonKey;
      console.log(voiceLastKey);
    });
  }
</script>

<div class="don-component">
  <div class="don-list-title">
    <h3>영상도네이션</h3>
  </div>
  <div class="don-list don-video">
    {#each $videoList as item}
      <div class="don-item">
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
          <a href="#" class="btn-def reply-btn">
            <span class="icon">
              <Fa icon={faReply} />
            </span>
          </a>
          <a href="#" class="btn-def deaf-btn">
            <span class="icon">
              <Fa icon={faDeaf} />
            </span>
          </a>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "../../../scss/donListBox.scss";
</style>
