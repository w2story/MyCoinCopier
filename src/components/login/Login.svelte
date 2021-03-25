<script lang="ts">
  import { fade } from "svelte/transition";
  import { containerSections } from "../../store/page/login";

  import JoinForm from "../../components/login/joinForm.svelte";
  import LoginForm from "../../components/login/loginForm.svelte";

  let images = [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.png",
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
    "./images/14.jpg",
    "./images/15.jpg",
    "./images/16.png",
    "./images/17.jpg",
    "./images/18.png",
    "./images/19.png",
    "./images/20.png",
  ];

  let index = 0;
  let interval;

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
    interval = setInterval(nextImg, 4000);
  };
  const stopPlay = () => {
    clearInterval(interval);
  };
</script>

<main>
  <div class="layout" transition:fade>
    {#if $containerSections == "login"}
      <LoginForm />
    {:else if $containerSections == "join"}
      <JoinForm />
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
        opacity: 0.35;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
</style>
