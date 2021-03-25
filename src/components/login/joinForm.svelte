<script lang="ts">
  import Toast from "svelte-toast";
  import { joinSchema } from "../../store/schema/joinSchema";
  import { createUser } from "../../store/database/userInfo";
  import { containerSections } from "../../store/page/login";

  // join
  // form 처리 구문
  let fields = {};
  let userCreateData = {};
  let errors = {};

  // 토스트기 처리 구문
  const toast = new Toast({ position: "bottom-left" });

  const extractErrors = (err) => {
    return err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message };
    }, {});
  };

  const submitHandler = async () => {
    try {
      await joinSchema.validate(fields, { abortEarly: false });
      userCreateData = {
        user_id: fields.user_id,
        user_pass: fields.user_pass,
        user_name: fields.user_name,
        user_img: "https://i.imgur.com/yuZAiEs.jpg",
        user_content: "안녕하세요." + fields.user_name + "입니다",
        user_stream_token: "",
      };
      const userCreateChk = await createUser(userCreateData);
      if (userCreateChk == true) {
        toast.success("가입이 완료 되었습니다.");
        containerSections.set("login");
      }
      //alert(JSON.stringify(fields, null, 2));
      errors = {};
    } catch (err) {
      errors = extractErrors(err);
      console.log(errors);
    }
  };
</script>

<div class="join">
  <h1 class="title">
    <strong class="point">M</strong>y<br />
    <strong class="point">C</strong>oin<br />
    <strong class="point">C</strong>opier<br />
  </h1>
  <form class="form" on:submit|preventDefault={submitHandler}>
    <div class="input-group">
      <input
        class="login-input"
        placeholder="아이디"
        bind:value={fields.user_id}
      />
      {#if errors.user_id}<p>{errors.user_id}</p>{/if}
    </div>
    <div class="input-group">
      <input
        class="login-input"
        type="password"
        placeholder="비밀번호"
        bind:value={fields.user_pass}
      />
      {#if errors.user_pass}<p>{errors.user_pass}</p>{/if}
    </div>
    <div class="input-group">
      <input
        class="login-input"
        type="password"
        placeholder="비밀번호 확인"
        bind:value={fields.user_pass_chk}
      />
      {#if errors.user_pass_chk}<p>{errors.user_pass_chk}</p>{/if}
    </div>
    <div class="input-group">
      <input
        class="login-input"
        placeholder="닉네임"
        bind:value={fields.user_name}
      />
      {#if errors.user_name}<p>{errors.user_name}</p>{/if}
    </div>
    <hr />
    <button class="login-sub-btn" type="submit">회원가입</button>
    <button
      class="login-btn"
      on:click={() => {
        containerSections.set("login");
      }}
    >
      취소
    </button>
  </form>
</div>

<style lang="scss">
  :global(.input-group > p) {
    color: #ff4081 !important;
    font-size: 12px !important;
    padding-bottom: 5px;
    position: absolute;
    bottom: 4px;
    left: 10px;
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

      hr {
        border-color: #36393f;
        margin: 30px 0px;
      }
      .input-group {
        position: relative;
        .login-input {
          width: calc(100% - 20px);
          height: 30px;
          color: #fff;
          background-color: #2a2f38;
          border-radius: 5px;
          border: 0px;
          padding: 10px;
          font-size: 18px;
          margin-bottom: 30px;
        }
        p {
          color: #ff4081 !important;
          font-size: 12px !important;
          padding-bottom: 5px;
          position: absolute;
          bottom: 4px;
          left: 10px;
        }
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
</style>
