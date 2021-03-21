<script lang="ts">
  import Fa from "svelte-fa";
  import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
  import axios from "axios";
  import { onMount } from "svelte";
  import { getUserInfo, setUserInfo } from "~/store/database/userInfo";

  let ImgUrl = "https://i.imgur.com/XjsUghQ.gif";
  let userInfo = {};

  getUserInfo().then((Response) => {
    userInfo = Response;
  });

  function userimg() {
    setUserInfo(userInfo);
  }
</script>

<div class="layout">
  <div class="container">
    <h1 class="page-title">회원정보 / <small> User Info</small></h1>
    <div class="components">
      <div class="title">
        <h1>회원 이미지 설정 / <small> User Img Setting</small></h1>
      </div>
      <div class="card">
        <div class="img-group">
          <h3 class="img-title">이미지 업로드</h3>
          <div class="imgUpload-box url-img">
            <div class="img-list">
              {#if ImgUrl}
                <div class="img-box original">
                  <img src={userInfo.user_img} alt="userimg" />
                  <p>원본</p>
                </div>
                <div class="img-box">
                  <img src={userInfo.user_img} alt="userimg" />
                  <p>200x200 (PC)</p>
                </div>
                <div class="img-box hfXhf">
                  <img src={userInfo.user_img} alt="userimg" />
                  <p>150x150</p>
                </div>
                <div class="img-box hXh">
                  <img src={userInfo.user_img} alt="userimg" />
                  <p>100x100 (M)</p>
                </div>
              {/if}
            </div>
            <input
              bind:value={userInfo.user_img}
              on:change={userimg}
              class="user-img-url"
            />
          </div>
        </div>
        <hr />
        <div class="supporting-text">
          <p>※도네이션 페이지에 사용될 이미지를 세팅 합니다.</p>
          <p>※사용방법 : 이미지 URL을 입력해 주세요.</p>
          <p>※이미지는 정사각형으로 잘려서 나오게 됩니다.</p>
        </div>
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>회원 정보 설정 / <small> User Info Setting</small></h1>
      </div>
      <div class="card">
        <div class="input-group">
          <h3 class="input-title">닉네임</h3>
          <input value={userInfo.user_name} />
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">하단 텍스트</h3>
          <input value={userInfo.user_content} />
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">비밀번호</h3>
          <div class="pass-input">
            <input value={userInfo.user_pass} type="password" class="pass" />
            <input value={userInfo.user_pass} type="password" class="pass" />
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>시스템 텍스트 / <small> System Text</small></h1>
      </div>
      <div class="card" />
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../scss/inputBox.scss";

  .layout {
    .container {
      .components {
        .card {
          .select-group {
            .selecter {
              width: 100%;
            }
          }
          .color-group {
            .color-selecter {
              width: 80%;
              .color-pick {
                right: 30px;
                bottom: 0px;
              }
            }
          }
          .input-group {
            .pass-input {
              width: 80%;
              display: flex;
              input {
                width: calc(50% - 10px);
                margin-right: 10px;
              }
            }
          }
          .img-group {
            width: 100%;
            height: auto;
            display: flex;
            padding-bottom: 10px;
            .imgUpload-box {
              width: calc(100% - 20px);
              padding: 0px 10px;
              .img-list {
                width: 100%;
                height: auto;
                padding-bottom: 10px;
                display: flex;

                .img-box {
                  width: 200px;
                  height: 230px;
                  text-align: center;
                  margin-right: 15px;
                  align-self: flex-end;

                  img {
                    width: 100%;
                    height: calc(100% - 30px);
                    border-radius: 5px;
                    overflow: hidden;
                    object-fit: cover;
                  }
                  p {
                    font-size: 16px;
                    font-weight: bolder;
                  }

                  &.hfXhf {
                    width: 150px;
                    height: 180px;
                  }
                  &.hXh {
                    width: 100px;
                    height: 130px;
                  }
                  &.original {
                    width: 200px;
                    height: 230px;
                    img {
                      width: 100%;
                      object-fit: contain;
                      background-color: #202225;
                    }
                  }
                }
              }
              input {
                width: 80%;
                height: 30px;
                color: #fff;
                float: left;
                background-color: #202225;

                border-radius: 5px;
                border: 0px;
                padding: 10px;
                font-size: 18px;
              }
            }

            .img-title {
              width: 200px;
              height: 30px;
              color: #fff;
              float: left;
              font-size: 18px;
              line-height: 20px;
              padding: 10px;
            }
          }
        }
      }
    }
  }
</style>
