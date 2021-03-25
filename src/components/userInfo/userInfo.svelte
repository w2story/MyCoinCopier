<script lang="ts">
  import Toast from "svelte-toast";
  // img 체크기
  import isImageUrl from "is-image-url";

  import {
    getUserInfo,
    setUserInfo,
    setUserPass,
    userNameChk,
  } from "~/store/database/userInfo";

  let ImgUrl = "https://i.imgur.com/XjsUghQ.gif";
  let userInfo = {};

  getUserInfo().then((Response) => {
    userInfo = Response;
    userInfo.user_pass = "";
    userInfo.user_pass_chk = "";
  });

  const userProfileUpdate = () => {
    setUserInfo(userInfo);
  };

  // 정보값 처리를 위한 구문
  let error = {
    user_img: "",
    user_name: "",
    user_content: "",
    user_pass: "",
  };

  // 토스트기 처리 구문
  const toast = new Toast({ position: "bottom-right" });

  // 이미지 처리기
  const userImgUrlUpate = async () => {
    if (!isImageUrl(userInfo.user_img)) {
      error.user_img = "주소값이 불분명 합니다.";
    } else {
      let user_data = {
        user_img: userInfo.user_img,
        user_key: userInfo.user_key,
      };
      const userInfoUpdate = await setUserInfo(user_data);
      if (userInfoUpdate.success) {
        error.user_img = "";
        toast.success("이미지 정보 변경 완료.");
      } else {
        error.user_img = userInfoUpdate.error;
        toast.error("이미지 정보 변경 불가.");
      }
    }
  };
  const userNameUpdate = async () => {
    const userName = userInfo.user_name.trim();
    if (userName.length == 0) {
      error.user_name = "닉네임을 설정해주세요.";
    } else if (userName.length > 16) {
      error.user_name = "16자 까지 입력됩니다.";
    } else {
      const nameChk = await userNameChk(userName);
      if (!nameChk) {
        error.user_name = "이미 사용중인 아이디입니다.";
      } else {
        let user_data = { user_name: userName, user_key: userInfo.user_key };
        const userInfoUpdate = await setUserInfo(user_data);
        if (userInfoUpdate.success) {
          error.user_name = "";
          toast.success("닉네임 변경 완료.");
        } else {
          error.user_name = userInfoUpdate.error;
          toast.error("닉네임 변경 불가.");
        }
      }
    }
  };
  const userContentUpdate = async () => {
    const userContent = userInfo.user_content.trim();
    if (userContent.length == 0) {
      error.user_content = "텍스트를 써주세요.";
    } else if (userContent.length > 32) {
      error.user_content = "32자 까지 입력됩니다.";
    } else {
      let user_data = {
        user_content: userContent,
        user_key: userInfo.user_key,
      };
      const userInfoUpdate = await setUserInfo(user_data);
      if (userInfoUpdate.success) {
        error.user_content = "";
        toast.success("텍스트 변경 완료.");
      } else {
        error.user_content = userInfoUpdate.error;
        toast.error("텍스트 변경 불가.");
      }
    }
  };
  const userPassUpdate = async () => {
    const userPass = userInfo.user_pass;
    const regExp = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

    if (userPass.length == 0) {
      error.user_pass = "비밀번호는 필수 입니다.";
    } else if (userPass.length > 20) {
      error.user_pass = "20자 까지 입력됩니다.";
    } else if (!regExp.test(userPass)) {
      error.user_pass = "숫자, 특수문자 1회 이상 입력바랍니다.";
    } else if (userPass != userInfo.user_pass_chk) {
      error.user_pass = "비밀번호가 맞지 않습니다.";
    } else {
      userInfo.user_pass = userPass;
      const userInfoUpdate = await setUserInfo(userInfo);
      if (userInfoUpdate.success) {
        error.user_pass = "";
        toast.success("텍스트 변경 완료.");
      } else {
        error.user_pass = userInfoUpdate.error;
        toast.error("텍스트 변경 불가.");
      }
    }
  };
  const userPassChkUpdate = async () => {
    const userPassChk = userInfo.user_pass_chk;
    const regExp = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

    if (userPassChk.length == 0) {
      error.user_pass = "비밀번호는 필수 입니다.";
    } else if (userPassChk.length > 20) {
      error.user_pass = "20자 까지 입력됩니다.";
    } else if (!regExp.test(userPassChk)) {
      error.user_pass = "숫자, 특수문자 1회 이상 입력바랍니다.";
    } else if (userPassChk != userInfo.user_pass) {
      error.user_pass = "비밀번호가 맞지 않습니다.";
    } else {
      userInfo.user_pass = userPassChk;
      const userInfoUpdate = await setUserPass(userInfo);
      if (userInfoUpdate.success) {
        error.user_pass = "";
        toast.success("비밀번호 변경 완료.");
      } else {
        error.user_pass = userInfoUpdate.error;
        toast.error("비밀번호 변경 불가.");
      }
    }
  };
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
            <div class="input-box">
              <input
                bind:value={userInfo.user_img}
                on:change={userImgUrlUpate}
                class="user-img-url"
              />
              {#if error.user_img}<p>{error.user_img}</p>{/if}
            </div>
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
          <div class="input-box">
            <input bind:value={userInfo.user_name} on:change={userNameUpdate} />
            {#if error.user_name}<p>{error.user_name}</p>{/if}
          </div>
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">하단 텍스트</h3>
          <div class="input-box">
            <input
              bind:value={userInfo.user_content}
              on:change={userContentUpdate}
            />
            {#if error.user_content}<p>{error.user_content}</p>{/if}
          </div>
        </div>
        <hr />
        <div class="input-group">
          <h3 class="input-title">비밀번호</h3>
          <div class="input-box">
            <div class="pass-input">
              <input
                bind:value={userInfo.user_pass}
                on:change={userPassUpdate}
                type="password"
                class="pass"
              />
              <input
                bind:value={userInfo.user_pass_chk}
                on:change={userPassChkUpdate}
                type="password"
                class="pass"
              />
            </div>
            {#if error.user_pass}<p>{error.user_pass}</p>{/if}
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div class="components">
      <div class="title">
        <h1>사용자 활동 기록 / <small> System Text</small></h1>
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
              width: 100%;
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
              .input-box {
                width: 80%;
                height: 70px;
                position: relative;
                input {
                  width: 100%;
                  height: 30px;
                  color: #fff;
                  float: left;
                  background-color: #202225;

                  border-radius: 5px;
                  border: 0px;
                  padding: 10px;
                  font-size: 18px;
                }
                p {
                  color: #ff4081 !important;
                  font-size: 12px !important;
                  padding-bottom: 5px;
                  position: absolute;
                  bottom: -5px;
                  left: 10px;
                }
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
