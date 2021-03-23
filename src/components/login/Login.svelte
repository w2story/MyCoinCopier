<script lang="ts">
  import { fade } from "svelte/transition";
  //import JoinForm from "./joinForm.svelte";
  //import LoginForm from "./loginForm.svelte";
  import { createUser } from "../../store/database/userInfo";

  let images = [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.png",
    "./images/5.jpg",
    "./images/6.png",
    "./images/7.jpg",
    "./images/8.png",
    "./images/9.png",
    "./images/10.jpg",
    "./images/11.jpg",
    "./images/12.jpg",
    "./images/13.jpg",
  ];

  let index = 0;
  let interval;
  let userJoinData = {
    user_id: "",
    user_pass: "",
    user_name: "",
    user_img: "https://i.imgur.com/yuZAiEs.jpg",
    user_content: "",
    user_stream_token: "",
  };
  let containerSelected = "login";

  const nextImg = () => {
    const preIndex = index;
    let tmp_index = Math.floor(Math.random() * images.length);
    if (preIndex == tmp_index) {
      tmp_index = Math.floor(Math.random() * images.length);
    }
    index = tmp_index;
    console.log(index);
  };

  const autoPlay = () => {
    interval = setInterval(nextImg, 5000);
  };
  const stopPlay = () => {
    clearInterval(interval);
  };
  function createUserSet() {
    createUser(userJoinData);
  }
</script>

<main>
  <div class="layout" transition:fade>
    {#if containerSelected == "login"}
      <div class="login">
        <h1 class="title">
          <strong class="point">M</strong>y<br />
          <strong class="point">C</strong>oin<br />
          <strong class="point">C</strong>opier
        </h1>
        <div class="form">
          <input class="login-input" placeholder="아이디" />
          <input class="login-input" type="password" placeholder="비밀번호" />
          <button class="login-sub-btn">로그인</button>
        </div>
        <hr />
        <div class="join">
          <a
            on:click={() => {
              containerSelected = "join";
            }}
          >
            <p>회원가입</p>
          </a>
          <a href="#">
            <p>비밀번호찾기</p>
          </a>
        </div>
      </div>
    {:else}
      <div class="join">
        <h1 class="title">
          <strong class="point">M</strong>y<br />
          <strong class="point">C</strong>oin<br />
          <strong class="point">C</strong>opier<br />
        </h1>
        <div class="form">
          <input
            class="login-input"
            placeholder="아이디"
            bind:value={userJoinData.user_id}
          />
          <input
            class="login-input"
            type="password"
            placeholder="비밀번호"
            bind:value={userJoinData.user_pass}
          />
          <input
            class="login-input"
            type="password"
            placeholder="비밀번호 확인"
          />
          <input
            class="login-input"
            placeholder="닉네임"
            bind:value={userJoinData.user_name}
          />
          <button class="login-sub-btn" on:click={() => createUserSet()}
            >회원가입</button
          >
          <button
            class="login-btn"
            on:click={() => {
              containerSelected = "login";
            }}>취소</button
          >
        </div>
      </div>
    {/if}
  </div>
  <div class="bg" on:mouseover={stopPlay} on:mouseleave={autoPlay}>
    <div class="slider">
      {#each [images[index]] as src (index)}
        <img transition:fade {src} alt="" />
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35;
  }
  * {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    color: #fff;
    user-select: none;
    &:focus {
      outline: none;
    }
  }
  body {
    width: 100%;
  }
  main {
    background-color: #2a2f38;
    width: 100%;
    height: 100%;
    display: flex;
    .layout {
      width: 440px;
      padding: 0px 30px;
      padding-top: 10%;
      background-color: #1c2027;
      // 그림자 영역
      box-shadow: 2px 0px 1px -1px rgb(0 0 0 / 40%),
        1px 0px 1px 0px rgb(0 0 0 / 30%), 1px 0px 3px 0px rgb(0 0 0 / 30%);
    }
    .bg {
      width: calc(100% - 500px);
      height: 100%;
      .slider {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .join {
      width: 100%;
      height: 100%;
      .title {
        width: calc(100% - 15px);
        height: auto;
        font-size: 72px;
        line-height: 80px;
        font-weight: bolder;
        margin-bottom: 30px;
        margin-left: 15px;
        strong.point {
          color: #ff4081;
        }
        small {
          font-size: 36px;
          padding-left: 15px;
        }
      }
      .form {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        .login-input {
          width: calc(100% - 20px);
          height: 30px;
          color: #fff;
          background-color: #2a2f38;
          border-radius: 5px;
          border: 0px;
          padding: 10px;
          font-size: 18px;
          margin-bottom: 15px;
        }
        .login-btn {
          width: calc(100% - 0px);
          height: 70px;
          color: #fff;
          border-radius: 5px;
          border: 0px;
          font-size: 24px;
          font-weight: bolder;
          margin-top: 10px;
          margin-bottom: 15px;
          background-color: #2a2f38;
          padding: 20px;
          text-align: center;
        }
        .login-sub-btn {
          width: calc(100% - 0px);
          height: 70px;
          color: #fff;
          border-radius: 5px;
          border: 0px;
          font-size: 24px;
          font-weight: bolder;
          margin-top: 10px;
          margin-bottom: 15px;
          background-color: #ff4081;
          padding: 20px;
          text-align: center;
        }
      }
    }
    .login {
      width: 100%;
      height: 100%;
      .title {
        width: calc(100% - 15px);
        height: auto;
        font-size: 72px;
        line-height: 80px;
        font-weight: bolder;
        margin-bottom: 30px;
        margin-left: 15px;
        strong.point {
          color: #ff4081;
        }
      }
      .form {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        .login-input {
          width: calc(100% - 20px);
          height: 30px;
          color: #fff;
          background-color: #2a2f38;
          border-radius: 5px;
          border: 0px;
          padding: 10px;
          font-size: 18px;
          margin-bottom: 15px;
        }
        .login-sub-btn {
          width: calc(100% - 0px);
          height: 70px;
          color: #fff;
          border-radius: 5px;
          border: 0px;
          font-size: 24px;
          font-weight: bolder;
          margin-top: 10px;
          margin-bottom: 15px;
          background-color: #ff4081;
          padding: 20px;
          text-align: center;
        }
      }
      hr {
        border-color: #36393f;
        margin: 30px 0px;
      }
      .join {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;

        a {
          margin-left: 15px;
          text-decoration: none;
          p {
            color: #484e58;
          }
          &:hover {
            p {
              color: #ff4081;
            }
          }
        }
      }
    }
  }
</style>
