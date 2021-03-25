import axios from 'axios'
import { writable } from 'svelte/store';

export const userUpate = writable(0);

// 유저 정보 값
export async function getUserInfo() {
  const userKey = sessionStorage.getItem("userKey");
  let userArr = {};
  const res = await axios
    .get("http://127.0.0.1:3000/api/userinfo/user/" + userKey, {})
    .then((res) => {
      userArr = res.data;
    })
    .catch((Error) => {
      console.log(Error);
    })
  return userArr.userinfo;
}

// 유저 정보 값 업데이트
export async function setUserInfo(data) {
  const userUpateData = data
  let updateLog;

  await axios
    .post("http://127.0.0.1:3000/api/userinfo/profile/", userUpateData)
    .then((res) => {
      console.log(res.data);
      updateLog = res.data;
      userUpate.set(1);
    })
    .catch((err) => {
      console.log(err);
      updateLog.success = false;
      userUpate.set(0);
    })
  console.log(updateLog);
  return updateLog;
}

// 유저 비빔번호 값 업데이트
export async function setUserPass(data) {
  const userUpateData = {
    user_pass: data.user_pass,
    user_key: data.user_key
  }
  console.log(userUpateData);

  let updateLog;

  await axios
    .post("http://127.0.0.1:3000/api/userinfo/pass/", userUpateData)
    .then((res) => {
      console.log(res.data);
      updateLog = res.data;
    })
    .catch((err) => {
      console.log(err);
      updateLog.success = false;
    })
  return updateLog;
}

// 유저 정보 생성
export async function createUser(data) {
  let userCreateData = data;
  let updateLog;
  await axios.post("http://localhost:3000/api/auth/join", userCreateData).then((Response) => {
    console.log(Response.data);
    updateLog = Response.data;
  }).catch((Error) => {
    console.log(Error);
  })
  return updateLog;
}

// 유저 id 중복값 체크
export async function userIdChk(data) {
  let updateLog;
  await axios
    .get("http://127.0.0.1:3000/api/userinfo/chk/id/" + data)
    .then((Response) => {
      updateLog = Response.data;
    }).catch((Error) => {
      console.log(Error);
    });
  return updateLog;
}

// 유저 닉네임 중복값 체크
export async function userNameChk(data) {
  let updateLog;
  await axios
    .get("http://127.0.0.1:3000/api/userinfo/chk/name/" + data)
    .then((Response) => {
      updateLog = Response.data;
    }).catch((Error) => {
      console.log(Error);
    });
  return updateLog;
}
