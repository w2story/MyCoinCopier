<script lang="ts">
  import Fa from "svelte-fa";
  import { faLink, faReply, faDeaf } from "@fortawesome/free-solid-svg-icons";
  import { voiceListSearch } from "~/store/database/voiceDonList";
  import { videoListSearch } from "~/store/database/videoDonList";

  let voiceRow = [];
  let videoRow = [];

  voiceListSearch().then((res) => {
    voiceRow = res.voicerow;
    console.log(voiceRow);
  });
  videoListSearch().then((res) => {
    videoRow = res.videorow;
    console.log(videoRow);
  });
</script>

<div class="don-component">
  <div class="don-list-title">
    <h3>음성도네이션</h3>
  </div>
  <div class="don-list don-text">
    {#each voiceRow as item}
      <div class="don-item">
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
          <a href="#" class="btn-def reply-btn">
            <span class="icon">
              <Fa icon={faReply} />
            </span>
          </a>
          <a href="#" class="btn-def reply-btn">
            <span class="icon">
              <Fa icon={faDeaf} />
            </span>
          </a>
        </div>
      </div>
    {/each}
  </div>
  <div class="don-list-title">
    <h3>영상도네이션</h3>
  </div>
  <div class="don-list don-video">
    {#each videoRow as item}
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
  .don-list {
    height: calc(50% - 76px);
  }
</style>
