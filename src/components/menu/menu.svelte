<script lang="ts">
  import { slide } from "svelte/transition";
  // 라우터
  import { link, push } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  // 폰트어섬
  import Fa from "svelte-fa";
  import {
    faChalkboard,
    faBolt,
    faCommentAlt,
    faDollarSign,
    faPiggyBank,
    faUserCog,
    faAddressCard,
    faBroadcastTower,
    faCommentDots,
    faCogs,
    faMicrophone,
    faVideo,
    faMusic,
    faDice,
    faTicketAlt,
    faAngleDown,
    faExternalLinkAlt,
    faTimesCircle,
  } from "@fortawesome/free-solid-svg-icons";
  // 회원 정보 받아오기
  import { getUserInfo, userUpate } from "~/store/database/userInfo";
  let userInfo = {};

  const hostName = window.location.hostname;
  const url = "http://" + hostName + ":3000/api";

  getUserInfo().then((Response) => {
    userInfo = Response;
  });

  $: if ($userUpate > 0) {
    console.log($userUpate);
    userUpate.set(0);

    getUserInfo().then((Response) => {
      userInfo = Response;
    });
  }

  let visible = true;
  let sections = [
    {
      id: 1,
      title: "회원설정",
      icon: faUserCog,
      submenu: [
        {
          id: 1,
          href: "/userinfo",
          title: "회원정보",
          icon: faAddressCard,
          path: "/userinfo",
        },

        {
          id: 2,
          href: "/castset",
          title: "방송설정",
          icon: faBroadcastTower,
          path: "/castset",
        },
      ],
      active: false,
      click: false,
      rotate: 0,
    },
    {
      id: 2,
      title: "채팅설정",
      icon: faCommentAlt,
      submenu: [
        {
          id: 1,
          href: "/chatQset",
          title: "채팅 간편설정",
          icon: faCommentDots,
          path: "/chatQset",
        },

        {
          id: 2,
          href: "/chatSet",
          title: "채팅 세부설정",
          icon: faCogs,
          path: "/chatSet",
        },
      ],
      active: false,
      click: false,
      rotate: 0,
    },
    {
      id: 3,
      title: "후원설정",
      icon: faDollarSign,
      submenu: [
        {
          id: 1,
          href: "/voiceDonSet",
          title: "음성후원",
          icon: faMicrophone,
          path: "/voiceDonSet",
        },
        {
          id: 2,
          href: "/videoDonSet",
          title: "영상후원",
          icon: faVideo,
          path: "/videoDonSet",
        },
        {
          id: 3,
          href: "/osuDonSet",
          title: "OSU후원",
          icon: faMusic,
          path: "/osuDonSet",
        },
        {
          id: 4,
          href: "/totoService",
          title: "토토서비스",
          icon: faTicketAlt,
          path: "/totoService",
        },
      ],
      active: false,
      click: false,
      rotate: 0,
    },
  ];
  const expand = (section) => {
    sections = sections.map((s) => {
      s.active = false;
      if (s.id !== section.id) {
        if (s.click === true) {
          s.click = false;
          s.rotate = 0;
        }
      }
      if (s.id === section.id) {
        console.log(s.submenu);

        if (s.click === false) {
          s.active = true;
          s.click = true;
          s.rotate = 180;
        } else {
          s.active = false;
          s.click = false;
          s.rotate = 0;
        }
      }
      return s;
    });
  };
  // 모달 윈도우 처리
  const openModalWindow = () => {
    var modal = window.open(
      "http://" + hostName + "/#/donChk",
      "MCC::후원체크창",
      "width=400,height=800,resizable,scrollbars=yes,status=1",
      false
    );
    modal.focus();
  };
</script>

<nav>
  <div class="userInfo">
    <div class="userImg">
      <img src={userInfo.user_img} />
    </div>
    <div class="userSet">
      <h3>{userInfo.user_name}</h3>
      <p>{userInfo.user_content}</p>
    </div>
  </div>
  <ul class="don-nav">
    <li class="nav-li">
      <a use:link use:active={"/"} href="/">
        <span class="nav-icon">
          <Fa icon={faChalkboard} fw size="lg" pull="left" />
        </span>
        <h3>대시보드</h3>
      </a>
    </li>
    <li class="nav-li">
      <a use:link use:active={"/qsetup"} href="/qsetup">
        <span class="nav-icon">
          <Fa icon={faBolt} fw size="lg" pull="left" />
        </span>
        <h3>간편설정</h3>
      </a>
    </li>
    {#each sections as section}
      <li class="nav-li">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={() => expand(section)}>
          <span class="nav-icon">
            <Fa icon={section.icon} fw size="lg" pull="left" />
          </span>
          <h3>{section.title}</h3>
          <span class="down-up"
            ><Fa
              icon={faAngleDown}
              size="1x"
              rotate={section.rotate}
              pull="right"
            />
          </span>
        </a>
        {#if section.active}
          <ul class="sub-nav">
            {#each section.submenu as menu}
              <li class="sub-nav-li">
                <a use:link use:active={menu.path} href={menu.href}>
                  <span class="nav-icon">
                    <Fa icon={menu.icon} fw pull="left" />
                  </span>
                  <h3>{menu.title}</h3>
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </li>
    {/each}
    <li class="nav-li">
      <a on:click={openModalWindow}>
        <span class="nav-icon">
          <Fa icon={faPiggyBank} fw size="lg" pull="left" />
        </span>
        <h3>후원확인</h3>
        <span class="down-up"
          ><Fa icon={faExternalLinkAlt} size="1x" pull="right" />
        </span>
      </a>
    </li>
    <li class="nav-li logout">
      <a use:link use:active={"/logout"} href="/logout">
        <span class="nav-icon">
          <Fa icon={faTimesCircle} fw size="lg" pull="left" />
        </span>
        <h3>로그아웃</h3>
      </a>
    </li>
  </ul>
</nav>

<style lang="scss">
  :global(nav .don-nav .nav-li a.active) {
    font-weight: bold;
    text-decoration: underline;
    border-left-color: #ff4081 !important;
  }

  a:link,
  a:visited {
    color: #fff;
    text-decoration: underline;
  }

  nav {
    width: 250px;
    min-height: 1080px;
    height: calc(100% - 60px);
    float: left;
    background-color: #2a2f38;
    padding-top: 60px;
    border-right: 1px solid #2b2b2b;

    // 그림자 영역
    box-shadow: 2px 0px 1px -1px rgb(0 0 0 / 20%),
      1px 0px 1px 0px rgb(0 0 0 / 14%), 1px 0px 3px 0px rgb(0 0 0 / 12%);

    .userInfo {
      width: calc(100% - 40px);
      height: 170px;
      padding: 20px;
      padding-top: 30px;
      position: relative;
      // 하단선
      border-bottom: 1px solid #232323;

      .userImg {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        // 외곽선
        border: 4px solid #2a2f38;
        // 그림자 영역
        box-shadow: 2px 0px 1px -1px rgb(0 0 0 / 20%),
          1px 0px 1px 0px rgb(0 0 0 / 14%), 1px 0px 3px 0px rgb(0 0 0 / 12%);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .userSet {
        width: 100%;
        height: 80px;
        padding-top: 15px;
        // 글자 색
        color: #fff;

        h3 {
          width: 100%;
          font-size: 20px;
          font-weight: bold;
        }
        p {
          width: 100%;
          font-size: 14px;
          font-weight: normal;
        }
      }
    }

    .don-nav {
      width: 100%;
      height: calc(100% - 170px);
      position: relative;

      .nav-li {
        width: 100%;

        &.logout {
          position: absolute;
          bottom: 50px;
          left: 0px;

          a {
            background-color: #ff4081;
          }
        }

        a {
          width: calc(100% - 25px);
          height: 30px;
          padding: 10px;
          display: block;
          border-left: 5px solid #2a2f38;
          border-bottom: 1px solid #232323;

          .nav-icon {
            width: 30px;
            height: 30px;
            float: left;
            padding-top: 3px;
            text-align: center;
          }
          h3 {
            width: calc(100% - 80px);
            height: 29px;
            padding-left: 10px;
            padding-top: 1px;

            float: left;
            font-size: 18px;
          }
          .down-up {
            width: 20px;
            height: 16px;
            text-align: center;
            padding-right: 5px;
            float: right;
            padding-top: 4px;
          }
        }
        .sub-nav {
          width: 100%;
          background-color: #3a3f47;
          li.sub-nav-li {
            width: 100%;
            a {
              width: calc(100% - 25px);
              height: 24px;
              padding: 10px;
              display: block;
              border-bottom: 1px solid #232323;
              padding-left: 15px;

              .nav-icon {
                width: 24px;
                height: 24px;
                float: left;
                padding-top: 3px;
                text-align: center;
              }
              h3 {
                width: calc(100% - 80px);
                height: 24px;
                padding-left: 10px;
                padding-top: 2px;

                float: left;
                font-size: 14px;
              }
              .down-up {
                width: 20px;
                height: 16px;
                text-align: center;
                padding-right: 5px;
                float: right;
                padding-top: 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
