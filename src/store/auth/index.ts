import axios from 'axios';
import { writable } from 'svelte/store';

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export async function userTokenChk() {
  const userToken = sessionStorage.getItem('token');
  const userKey = sessionStorage.getItem("userKey")
  const config = {
    headers: { "x-access-token": userToken },
  }
  let TokenChk = false;
  let updateLog = {};

  await axios
    .get(url + "/auth/token/" + userKey, config)
    .then((Response) => {
      updateLog = Response.data;
      TokenChk = updateLog.success;
    }).catch((Error) => {
      console.log(Error);
      TokenChk = false;
    });
  if (TokenChk) {
    await sessionStorage.setItem('userKey', updateLog.info.user_key);
  } else {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userKey')
  }
  return TokenChk;
}

export function pageReplace(page: string) {
  let link = document.location.href.split("#");
  window.location.replace(link[0] + page);
}