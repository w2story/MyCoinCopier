import axios from 'axios';

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

// 유저 닉네임 중복값 체크
export async function userLoginChk(data) {

  let updateLog;
  let tokenChk;
  let loginchk
  await axios
    .post(url + "/auth/login", data)
    .then((Response) => {
      updateLog = Response.data;
      tokenChk = updateLog.loginchk;

      if (updateLog.loginchk == "true") {
        loginchk = true;
        sessionStorage.setItem('userKey', updateLog.user_key);
        sessionStorage.setItem('token', updateLog.token)
      } else {
        loginchk = false;
      }
      console.log(loginchk);

    }).catch((Error) => {
      console.log(Error);
      loginchk = false;
    });
  return loginchk;
}