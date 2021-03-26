<script lang="ts">
  import Toast from "svelte-toast";

  import { containerSections } from "~/store/page/login";
  import { loginSchema } from "~/store/schema/loginSchema";
  import { userLoginChk } from "~/store/auth/userLogin";

  // 토스트기 처리
  const toast = new Toast({ position: "bottom-left" });

  let fields = {};
  let errors = {};

  const extractErrors = (err) => {
    return err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message };
    }, {});
  };

  const submitHandler = async () => {
    try {
      await loginSchema.validate(fields, { abortEarly: false });

      const userCreateChk = await userLoginChk(fields);
      console.log(userCreateChk);

      if (userCreateChk == true) {
        // 로그인 확인 후 이동
        let link = document.location.href.split("#");
        location.replace(link[0]);
      } else {
        toast.error("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
      }
      errors = {};
    } catch (err) {
      errors = extractErrors(err);
      console.log(errors);
    }
  };
</script>

<div class="login">
  <h1 class="title">
    <strong class="point">M</strong>y<br />
    <strong class="point">C</strong>oin<br />
    <strong class="point">C</strong>opier
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
        placeholder="비밀번호"
        type="password"
        bind:value={fields.user_pass}
      />
      {#if errors.user_pass}<p>{errors.user_pass}</p>{/if}
    </div>
    <button class="login-sub-btn" type="submit">로그인</button>
  </form>
  <hr />
  <div class="join">
    <a
      on:click={() => {
        containerSections.set("join");
      }}
    >
      <p>회원가입</p>
    </a>
    <a href="#">
      <p>비밀번호찾기</p>
    </a>
  </div>
</div>

<style lang="scss">
  // 토스터기 관련 글로벌 선언
  :global(.toast) {
    padding: 10px 20px !important;
    max-width: 400px !important;
  }
  :global(.toast.error) {
    background-color: #ff4081 !important;
  }
  :global(.toast.success) {
    background-color: #00c850 !important;
  }
  :global(.toast.info) {
    background-color: #3bc0f8 !important;
  }
  :global(.toast.default) {
    background-color: #ffffff !important;
    color: #484e58 !important;
  }

  // 입력값 하단 error 표기 처리
  :global(.input-group > p) {
    color: #ff4081 !important;
    font-size: 12px !important;
    padding-bottom: 5px;
    position: absolute;
    bottom: 4px;
    left: 10px;
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
</style>
