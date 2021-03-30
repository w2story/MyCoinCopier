import axios from 'axios';
import { writable } from 'svelte/store';

const userKey = sessionStorage.getItem("userKey");
const userToken = sessionStorage.getItem('token');
const config = {
  headers: { "x-access-token": userToken },
}

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export const lastVoiceDonKey = writable(0);
export const voiceList = writable([]);
export const voiceListUpdata = writable(0);

export async function voiceListSearch() {
  let donListRow = {};

  await axios
    .get(url + "/donlist/voice/list/" + userKey, config)
    .then((Response) => {
      donListRow = Response.data;
      lastVoiceDonKey.set(donListRow.voicerow[0].voice_don_key);
    }).catch((Error) => {
      console.log(Error);
      donListRow.success = false;
    });
  return donListRow;
}

export async function voiceLastKeySearch(data) {
  let donListRow = {};
  let sendData = data;
  sendData.ukey = userKey

  await axios
    .post(url + "/donlist/voice/search/", sendData, config)
    .then((Response) => {
      donListRow = Response.data;
    }).catch((Error) => {
      console.log(Error);
      donListRow.success = false;
    });
  return donListRow.success;
}