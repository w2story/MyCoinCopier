<script lang="ts">
  import { fade } from "svelte/transition";

  import DonList from "~/components/donWindow/donList.svelte";
  import OsuList from "~/components/donWindow/osuList.svelte";
  import TotoSet from "~/components/donWindow/totoSet.svelte";
  import DonSetting from "~/components/donWindow/donSetting.svelte";

  import Fa from "svelte-fa";
  import {
    faMoneyBillWave,
    faMusic,
    faTools,
    faTicketAlt,
    faBars,
  } from "@fortawesome/free-solid-svg-icons";

  let containerActive = false;
  let containerSections = [
    {
      id: 1,
      title: "도네이션 리스트",
      icon: faMoneyBillWave,
      component: DonList,
    },
    {
      id: 2,
      title: "OSU 도네이션 리스트",
      icon: faMusic,
      component: OsuList,
    },
    {
      id: 3,
      title: "토토 서비스 환경설정",
      icon: faTicketAlt,
      component: TotoSet,
    },
    {
      id: 4,
      title: "도네이션 환경설정",
      icon: faTools,
      component: DonSetting,
    },
  ];

  let containerSelected = {};

  const toggleContainer = (section) => {
    containerSections = containerSections.map((s) => {
      containerActive = false;
      if (s.id === section.id) {
        if (containerActive === false) {
          containerActive = true;
          containerSelected = section;
        }
      }
      return s;
    });
    containerActive = true;
  };
  const closeContainer = () => {
    containerSelected = {};
    containerActive = false;
  };
</script>

<main>
  <header>
    <a on:click={() => closeContainer()}>
      <Fa icon={faBars} size="2x" pull="left" />
    </a>
    <h2 class="title">MyCC Setting</h2>
  </header>
  <div>
    <div class="layout">
      <div class="container" in:fade>
        {#if containerActive === false}
          <div class="btn-group">
            {#each containerSections as section}
              <div class="btn-item" on:click={() => toggleContainer(section)}>
                <span class="icon">
                  <Fa icon={section.icon} size="2.5x" />
                </span>
                <h3>{section.title}</h3>
              </div>
            {/each}
          </div>
        {/if}
        <svelte:component this={containerSelected.component} />
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  * {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    color: #fff;
    user-select: none;
    &:focus {
      outline: none;
    }
  }
  body {
    background-color: #2a2f38;
  }

  main {
    width: 100%;
    height: 100%;
    background-color: #2a2f38;
    position: relative;

    div {
      width: calc(100%);
      height: 100%;
      background-color: #2a2f38;

      .container {
        width: 100%;
        height: calc(100% - 60px);
        padding-top: 60px;
        overflow-x: hidden;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          width: 14px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #ff4081;
          border-radius: 10px;
          background-clip: padding-box;
          border: 4px solid transparent;
        }
        &::-webkit-scrollbar-track {
          background-color: #2a2f38;
          border-radius: 10px;
          box-shadow: inset 0px 0px 0px white;
        }
        .btn-group {
          width: calc(100% - 40px);
          height: auto;
          padding: 0px 20px;
          padding-top: 20px;
          display: flex;
          flex-wrap: wrap;
          .btn-item {
            width: calc(50% - 30px);
            height: 130px;
            background-color: #ff4081;
            margin-bottom: 20px;
            border-radius: 5px;
            padding: 10px;
            &:nth-child(even) {
              margin-left: 20px;
            }
            .icon {
              width: 50px;
              height: 50px;
              display: block;
              padding-top: 20px;
              padding-bottom: 15px;
            }
          }
        }
      }
    }
    header {
      background-color: #2a2f38;
      width: 100%;
      height: 40px;
      padding: 10px;
      position: fixed;
      top: 0px;
      left: 0px;
      border-bottom: 1px solid #2b2b2b;
      // 영역 처리
      z-index: 900;
      // 그림자영역
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
      a {
        width: 40px;
        height: 32px;
        display: inline-block;
        float: left;
        padding: 4px 0px;
        text-align: center;
      }
      .title {
        width: 200px;
        height: 30px;
        display: inline-block;
        float: left;
        padding-top: 4px;
        padding-left: 5px;
        font-size: 24px;
        font-weight: bolder;
        margin: 0%;
      }
    }
  }
</style>
