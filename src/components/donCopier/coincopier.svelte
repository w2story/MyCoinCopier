<script lang="ts">
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";

  // 폰트어섬
  import Fa from "svelte-fa";
  import {
    faCommentAlt,
    faMicrophone,
    faVideo,
  } from "@fortawesome/free-solid-svg-icons";
  import Header from "~/components/header/header.svelte";

  // 스토어 처리
  import { userIdSearch } from "~/store/database/userInfo";
  import { userID } from "~/store/donSend/userid";
  // 컴포넌트 처리
  import voiceComponent from "./voice.svelte";
  import videoComponent from "./video.svelte";

  // 배경 처리
  let images = "images/20.png";

  // 사용자 아이디 확인
  const webLocation = $location;
  const webQuery = webLocation.split("/");
  userID.set(webQuery[2]);

  // 처리값을 위한 변수
  let reUserInfo = {};

  onMount(async () => {
    const reUser = await userIdSearch($userID);
    if (reUser.success) {
      reUserInfo = reUser.userRow;
    } else {
    }
  });

  let containerSections = [
    {
      id: 1,
      title: "메세지",
      icon: faCommentAlt,
      selected: true,
      component: voiceComponent,
    },
    {
      id: 2,
      title: "영상",
      icon: faVideo,
      selected: false,
      component: videoComponent,
    },
    {
      id: 3,
      title: "OSU",
      icon: faMicrophone,
      selected: false,
      component: voiceComponent,
    },
  ];

  let containerSelected = {
    id: 1,
    title: "메세지",
    icon: faCommentAlt,
    selected: true,
    component: voiceComponent,
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
</script>

<main>
  <Header />
  <div class="layout" style="background-image: url('{images}');">
    <div class="container">
      <h1 class="page-title text-shadow">
        도네이션 페이지 / <small> 도네이션 페이지</small>
      </h1>
      <div class="components">
        <div class="card border-radius">
          <div class="don-card-top">
            <div class="user-info">
              <div class="user-img">
                <img src={reUserInfo.user_img} />
              </div>
              <div class="user-content">
                <h3>{reUserInfo.user_name}</h3>
                <p>{reUserInfo.user_content}</p>
              </div>
            </div>
            <div class="exp-don">
              <h3>음성 도네이션을 공유했습니다</h3>
            </div>
          </div>
          <div class="don-menu">
            {#each containerSections as section}
              <div
                class="don-list"
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
          <div class="don-content">
            <svelte:component this={containerSelected.component} />
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
</main>

<style lang="scss">
  @import "../../scss/inputBox.scss";
  :global(body, html) {
    width: 100%;
    height: 100%;
    margin: 0%;
    padding: 0% !important;
    overflow: hidden;
    line-height: 1.4;
    font-family: "Spoqa Han Sans Neo", "sans-serif";
  }
  * {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    color: #fff;
    user-select: none;
    &:focus {
      outline: none;
    }
  }
  main {
    width: 100%;
    height: 100%;
    background-color: #2a2f38;
    position: relative;
  }
  .layout {
    position: relative;
    background-size: cover;
    background-position: 50%;

    &:before {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      content: "";
      background-color: rgba($color: #2a2f38, $alpha: 0.6);
    }
    .container {
      position: relative;
      .page-title {
        small {
          font-weight: bolder !important;
        }
        &.text-shadow {
          text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
        }
      }
      .components {
        .card {
          &.border-radius {
            border-radius: 5px;
          }
          .don-card-top {
            width: 100%;
            height: 70px;
            padding-bottom: 15px;
            display: block;
            border-bottom: 1px solid #1c2027;
            position: relative;

            .user-info {
              min-width: 300px;
              width: 30%;
              height: 100%;
              display: flex;
              flex-wrap: wrap;
              margin-left: 15px;
              float: left;

              .user-img {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 15px;
                position: relative;
                text-shadow: 0 1px 3px rgb(0 0 0 / 75%);

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .user-content {
                width: calc(100% - 100px);
                height: 100%;

                h3 {
                  padding-top: 5px;
                  font-size: 24px;
                  font-weight: bolder;
                  text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                p {
                  width: 100%;
                  height: 22px;
                  font-size: 16px;
                  text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
            .exp-don {
              min-width: 300px;
              width: 40%;
              height: 100%;
              display: table;
              margin-right: 15px;
              float: right;
              border-radius: 5px;
              text-align: center;

              background-color: #81858a;

              h3 {
                display: table-cell;
                text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
                font-size: 20px;
                font-weight: bolder;
                vertical-align: middle;
              }
            }
          }
          .don-menu {
            margin-top: 25px;
            width: calc(100% - 20px);
            height: 40px;
            padding-left: 15px;
            margin-bottom: 20px;
            display: flex;

            .don-list {
              width: 150px;
              height: 35px;
              border-bottom: 5px solid #3a3f47;
              text-align: center;
              &.active {
                border-bottom-color: #ff4081;
                span {
                  color: #ff4081;
                }
                h3 {
                  color: #ff4081;
                }
              }
              span {
                display: inline-block;
                width: 35px;
                height: 35px;
              }
              h3 {
                display: inline-block;
                font-size: 18px;
                font-weight: bolder;
              }
            }
          }
          // 여기서 부터 컴포넌트 분기
          .don-content {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
</style>
