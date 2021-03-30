import axios from 'axios';
import { writable } from 'svelte/store';

const userKey = sessionStorage.getItem("userKey");
const userToken = sessionStorage.getItem('token');
const config = {
  headers: { "x-access-token": userToken },
}

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export const lastVideoDonKey = writable(0);
export const videoList = writable([]);
export const videoListUpdata = writable(0);

export async function videoListSearch() {
  let donListRow = {};

  await axios
    .get(url + "/donlist/video/list/" + userKey, config)
    .then((Response) => {
      donListRow = Response.data;
      lastVideoDonKey.set(donListRow.videorow[0].video_don_key);
    }).catch((Error) => {
      console.log(Error);
      donListRow.success = false;
    });
  return donListRow;
}

export async function videoLastKeySearch(data) {
  let donListRow = {};
  let sendData = data;
  sendData.ukey = userKey

  await axios
    .post(url + "/donlist/video/search/", sendData, config)
    .then((Response) => {
      donListRow = Response.data;
    }).catch((Error) => {
      console.log(Error);
      donListRow.success = false;
    });
  return donListRow.success;
}