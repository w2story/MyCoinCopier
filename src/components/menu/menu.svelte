<script lang="ts">
    import Fa from 'svelte-fa'
    import { faChalkboard, faBolt, faCommentAlt, faDollarSign, faPiggyBank, faUserCog, faAngleDown, faExternalLinkAlt, faTimesCircle} from '@fortawesome/free-solid-svg-icons'

    const menus = [
      {
        href: '/',
        name: 'Search'
      },
      {
        href: '/movie/tt4520988',
        name: 'Movie',
        path: '/movie/*'
      },
      {
        href: '/about',
        name: 'About',
        path: /^\/about/ // 정규표현식 사용!
      }
    ]
</script>

<nav>
    <div class="userInfo">
      <div class="userImg">
        <img src="https://i.imgur.com/XjsUghQ.gif">
      </div>
      <div class="userSet">
        <h3>간텔라리스</h3>
        <p>ap만년볼베 이렐 비아 오른 케넨 뽀삐 나르 럼블</p>
      </div>
    </div>
    <ul class="don-nav">
      <li class="nav-li">
        <span class="nav-icon"><Fa icon={faChalkboard} fw size="lg" pull="left"/></span>
        <h3>대시보드</h3>
      </li>
      <li class="nav-li">
        <span class="nav-icon"><Fa icon={faBolt} fw size="lg" pull="left"/></span>
        <h3>간편설정</h3>
      </li>
      <li class="nav-li">
        <span class="nav-icon"><Fa icon={faUserCog} fw size="lg" pull="left"/></span>
        <h3>회원설정</h3>
        <span class="down-up"><Fa icon={faAngleDown} size="1x" /></span>
      </li>
      <li class="nav-li">
        <span class="nav-icon"><Fa icon={faCommentAlt} fw size="lg" pull="left"/></span>
        <h3>채팅설정</h3>
        <span class="down-up"><Fa icon={faAngleDown} size="1x" /></span>
      </li>
      <li class="nav-li">
        <span class="nav-icon"><Fa icon={faDollarSign} fw size="lg" pull="left"/></span>
        <h3>후원설정</h3>
        <span class="down-up"><Fa icon={faAngleDown} size="1x"/></span>
      </li>
      <li class="nav-li">
        <span class="nav-icon"><Fa icon={faPiggyBank} fw size="lg" pull="left"/></span>
        <h3>후원확인</h3>
        <span class="down-up"><Fa icon={faExternalLinkAlt} size="1x"/></span>
      </li>
      <li class="nav-li logout">
        <span class="nav-icon"><Fa icon={faTimesCircle} fw size="lg" pull="left"/></span>
        <h3>로그아웃</h3>
      </li>
    </ul>
  </nav>

<style lang="scss">
  nav {
    width: 250px;
    min-height: 1080px;
    height: calc(100% - 60px);
    float: left;
    background-color: #2A2F38;
    padding-top: 60px;
    border-right: 1px solid #2B2B2B;

    // 그림자 영역
    box-shadow: 
      2px 0px 1px -1px rgb(0 0 0 / 20%),
      1px 0px 1px 0px rgb(0 0 0 / 14%),
      1px 0px 3px 0px rgb(0 0 0 / 12%);

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
        border: 4px solid #2A2F38;
        // 그림자 영역
        box-shadow: 
          2px 0px 1px -1px rgb(0 0 0 / 20%),
          1px 0px 1px 0px rgb(0 0 0 / 14%),
          1px 0px 3px 0px rgb(0 0 0 / 12%);
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
        width: calc(100% - 20px);
        height: 30px;
        border-bottom: 1px solid #232323;
        padding: 10px;

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
          height: 10px;
          text-align: center;
          padding-right: 5px;
          float: right;
          padding-top: 4px;
        }
        &.logout {
          position: absolute;
          bottom: 50px;
          left:0px;
          background-color: #FF4081;
        }
      }
    }
  }
</style>