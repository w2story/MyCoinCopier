<script lang="ts">
  import Fa from "svelte-fa";
  import {
    faVideo,
    faMusic,
    faThList,
  } from "@fortawesome/free-solid-svg-icons";

  // 컴포넌트
  import totalList from "./donListContent/totalList.svelte";
  import voiceList from "./donListContent/voiceList.svelte";
  import videoList from "./donListContent/videoList.svelte";

  // 검색 처리 구문
  import { lastVoiceDonKey } from "~/store/database/voiceDonList";
  import { lastVideoDonKey } from "~/store/database/videoDonList";
  // 스토어
  import { donNewChk } from "~/store/page/donlist";
  import { onMount } from "svelte";

  let containerSections = [
    {
      id: 1,
      title: "통합",
      icon: faThList,
      selected: true,
      component: totalList,
    },
    {
      id: 2,
      title: "음성",
      icon: faMusic,
      selected: false,
      component: voiceList,
    },
    {
      id: 3,
      title: "영상",
      icon: faVideo,
      selected: false,
      component: videoList,
    },
  ];

  let containerSelected = {
    id: 1,
    title: "통합",
    icon: faThList,
    selected: false,
    component: totalList,
  };

  const toggleContainer = (section) => {
    containerSections = containerSections.map((s) => {
      s.selected = false;
      if (s.id === section.id) {
        containerSelected = section;
        s.selected = true;
      }
      return s;
    });
  };

  onMount(() => {
    const repeatDonNewChk = setInterval(() => {
      donNewChk($lastVoiceDonKey, $lastVideoDonKey);
    }, 700);
  });
</script>

<div class="content">
  <div class="don-list-menu">
    {#each containerSections as section}
      <div
        class="don-btn"
        class:active={section.selected}
        on:click={() => toggleContainer(section)}
      >
        <span class="icon">
          <Fa icon={section.icon} size="lg" />
        </span>
        <h3>{section.title}</h3>
      </div>
    {/each}
  </div>
  <svelte:component this={containerSelected.component} />
</div>

<style lang="scss">
  a:link,
  a:visited {
    color: #fff;
    text-decoration: none;
  }

  .content {
    width: 100%;
    height: 100%;
  }
  .don-list-menu {
    width: 100%;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    border-bottom: 1px solid #1c2027;
    // 그림자영역
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    .don-btn {
      width: auto;
      height: 45px;
      display: flex;
      padding-left: 10px;
      padding-right: 20px;
      border-bottom: 5px solid #2a2f38;

      &.active {
        border-bottom-color: #ff4081;
      }

      .icon {
        height: 22px;
        width: 50px;
        padding-top: 12px;
        text-align: center;
      }
      h3 {
        padding-top: 12px;
      }
    }
  }
</style>
