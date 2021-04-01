import axios from 'axios'

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export async function getVideoInfo() {
  const userKey = sessionStorage.getItem("userKey");
  let videoArr = {};
  await axios
    .get(url + "/videoset/" + userKey, {})
    .then((res) => {
      videoArr = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
  return videoArr.videoSet;
}
export async function getDonVideoInfo(key) {
  let videoArr = {};
  await axios
    .get(url + "/videoset/" + key, {})
    .then((res) => {
      videoArr = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
  return videoArr.videoSet;
}
export async function setVideoToggle(data) {
  let ToggleUpateData = {
    video_use: data.video_use,
    mycast_coin_use: data.mycast_coin_use,
    user_key: data.user_key
  };
  let updateLog;

  await axios
    .post(url + "/videoset/toggle/", ToggleUpateData)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    })
  console.log(updateLog);

  return updateLog;
}
export async function setSupportSystem(data) {
  let updateLog;
  await axios
    .post(url + "/videoset/support", data)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    })
  console.log(updateLog);

  return updateLog;
}
export async function setSysText(data) {
  let updateLog;

  await axios
    .post(url + "/videoset/systext", data)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    })
  console.log(updateLog);

  return updateLog;
}