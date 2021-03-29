<script lang="ts">
  import { onMount } from "svelte";
  // img 체크기
  import isImageUrl from "is-image-url";
  // 토스트기
  import Toast from "svelte-toast";
  // 폰트어섬
  import Fa from "svelte-fa";
  import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

  // 스토어
  import { imgUpload, donImageLoad } from "~/store/database/imgSetting";
  import { userIdSearch } from "~/store/database/userInfo";
  import { getVoiceInfo } from "~/store/database/voiceSetting";
  import { voiceDonSend } from "~/store/donSend/voice";
  import { userID } from "~/store/donSend/userid";
  import { bind } from "svelte/internal";

  // 토스트기
  const toast = new Toast();

  // 처리값을 위한 변수
  let reUserInfo = {};
  let donImg = [];
  let tmpUserName = "";
  let imgSelect = "";
  let donText = "";
  let limitLen = 0;
  let limitText = false;
  let lenText = 0;
  let error = {
    textarea: "",
    userName: "",
    imgselected: "",
  };

  onMount(async () => {
    const reUser = await userIdSearch($userID);
    if (reUser.success) {
      reUserInfo = reUser.userRow;
      donImg = await donImageLoad(reUserInfo.user_key);
      tmpUserName = reUserInfo.user_name;
      imgSelect = donImg[0].img_url;
      console.log(imgSelect);
      const voiceSetting = await getVoiceInfo(reUserInfo.user_key);
      console.log(voiceSetting);

      limitLen = Number(voiceSetting.tts_text_size);
      console.log(limitLen);
    } else {
    }
  });

  const donNameChk = (e) => {
    let str = e.target.value;
    lenText = 0;
    for (var i = 0; i < str.length; i++) {
      lenText++;
    }
    if (16 < lenText) {
      error.userName = "16자 까지 입력됩니다.";
    } else {
    }
  };
  const donTextChk = (e) => {
    let str = e.target.value;
    lenText = 0;
    for (var i = 0; i < str.length; i++) {
      lenText++;
    }
    if (limitLen < lenText) {
      limitText = true;
      error.textarea = "후원 텍스트 길이가 초과 했습니다.";
    } else {
      limitText = false;
    }
  };

  const donVoiceSub = async () => {
    const donTextChk = donText.trim();
    const donImageSelect = imgSelect.trim();
    const userName = tmpUserName.trim();

    if (userName.length == 0) {
      error.userName = "닉네임을 설정해주세요.";
    } else if (userName.length > 16) {
      error.userName = "16자 까지 입력됩니다.";
    } else if (donTextChk.length == 0) {
      error.textarea = "후원 텍스트를 넣어주세요.";
    } else if (donTextChk.length > lenText) {
      error.textarea = lenText + "자 까지 입력됩니다.";
    } else if (!isImageUrl(donImageSelect)) {
      error.imgselected = "주소값이 불분명 합니다.";
    } else {
      const donSend = {
        re_user_key: reUserInfo.user_key,
        don_img_url: donImageSelect,
        don_text: donTextChk,
        don_user_name: userName,
      };
      const DonSendChk = await voiceDonSend(donSend);
      if (DonSendChk) {
        donText = "";
        limitText = false;
        error.textarea = "";
        error.imgselected = "";
        toast.success("도네이션 전달 완료.");
      } else {
        toast.error("도네이션 전달 불가.");
      }
    }
  };
</script>

<div class="don-content">
  <div class="don-input">
    <h3 class="input-title">닉네임</h3>
    <div class="input-box">
      <input type="text" bind:value={tmpUserName} on:keyup={donNameChk} />
      {#if error.userName}<p>{error.userName}</p>{/if}
    </div>
  </div>
  <div class="don-text-input">
    <textarea
      class:limit={limitText}
      placeholder="후원과 함께 보낼 메시지를 입력해주세요."
      bind:value={donText}
      on:keyup={donTextChk}
    />
    {#if error.textarea}
      <p class="error-show">
        {error.textarea}
      </p>
    {/if}
    <div class="limitLen" class:limit={limitText}>
      <p>{lenText}/{limitLen}</p>
    </div>
  </div>
  <div class="don-img-select">
    <h3>후원 이미지 선택</h3>
    <div class="don-img-list">
      {#each donImg as item}
        <label class="thumbnail">
          <input type="radio" value={item.img_url} bind:group={imgSelect} />
          <span class="radio-box">
            <img src={item.img_url} />
          </span>
        </label>
      {/each}
    </div>
  </div>
  <div class="don-sub" on:click={donVoiceSub}>
    <span class="icon">
      <Fa icon={faPaperPlane} size="" />
    </span>
    <h3>후원 하기</h3>
  </div>
</div>

<style lang="scss">
  .don-content {
    width: 100%;
    height: auto;
    // 입력 값 박스형
    .don-input {
      width: 100%;
      height: auto;
      display: flex;
      flex-flow: column;
      padding-bottom: 20px;
      // 현재 처리기
      .input-box {
        width: calc(100% - 20px);
        height: 60px;
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
          bottom: -15px;
          left: 10px;
        }
      }
      .input-title {
        width: 200px;
        height: 30px;
        color: #fff;
        font-size: 18px;
        line-height: 20px;
        padding: 10px;
      }
    }
    // tts 도네
    .don-text-input {
      width: 100%;
      position: relative;
      textarea {
        width: calc(100% - 30px);
        height: 100px;
        padding: 15px;
        padding-bottom: 25px;
        margin-bottom: 25px;
        font-size: 16px;
        line-height: 1.5;
        border-radius: 5px;

        color: #ffffff;

        background-color: #202225;
        resize: none;
        border: 0px;
        &.limit {
          color: #ff4081;
        }
      }
      .limitLen {
        width: auto;
        height: auto;
        position: absolute;
        bottom: 35px;
        right: 15px;
        p {
          font-size: 16px;
        }
        &.limit > p {
          color: #ff4081;
        }
      }
      p.error-show {
        width: auto;
        height: auto;
        position: absolute;
        bottom: 5px;
        left: 15px;
        color: #ff4081;
      }
    }
    .don-img-select {
      width: 100%;
      height: 220px;
      margin-top: 15px;
      margin-bottom: 45px;
      h3 {
        width: calc(100% - 15px);
        padding-left: 15px;
        font-size: 20px;
        font-weight: bolder;
        text-align: left;
      }
      .don-img-list {
        padding: 0px 15px;
        padding-top: 15px;
        padding-bottom: 10px;
        display: flex;
        flex-wrap: no-wrap;
        overflow-x: auto;
        overflow-y: hidden;

        &::-webkit-scrollbar {
          height: 14px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #202225;
          border-radius: 10px;
          background-clip: padding-box;
          border: 4px solid transparent;
        }
        &::-webkit-scrollbar-track {
          background-color: #3a3f47;
          border-radius: 10px;
          box-shadow: inset 0px 0px 0px white;
        }

        .thumbnail {
          width: auto;
          height: 156px;
          margin-right: 10px;
          flex: 0 0 auto;

          input {
            opacity: 0;
            width: 0%;
            height: 0%;
            position: absolute;
            top: 0;
            left: 0;
          }
          input:checked + .radio-box {
            border-color: #ff4081;
          }
          input:focus + .radio-box {
            box-shadow: 0 0 1px #ff4081;
          }

          .radio-box {
            width: auto;
            height: 100%;
            display: block;
            border-radius: 5px;
            overflow: hidden;
            border: 3px solid #3a3f47;
            background-color: #202225;
            img {
              height: 100%;
              object-fit: contain;
            }
          }
        }

        .don-img-item {
          width: auto;
          height: 150px;
          margin-right: 10px;
          border-radius: 5px;
          overflow: hidden;
          flex: 0 0 auto;
          border: 3px solid #3a3f47;
          background-color: #202225;

          &:hover,
          &.active {
            border: 3px solid #ff4081;
          }
          img {
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
    .don-sub {
      width: 100%;
      margin: -10px;
      height: 50px;
      padding: 10px;
      margin-top: 20px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: #ff4081;
      font-size: 36px;
      text-align: center;

      .icon {
        width: auto;
        height: auto;
        text-align: center;
        display: inline-block;
        margin-right: 10px;
      }
      h3 {
        font-size: 28px;
        font-weight: bolder;
        display: inline-block;
      }
    }
  }
</style>
