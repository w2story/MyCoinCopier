import axios from 'axios'

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export async function getVoiceInfo() {
  const userKey = sessionStorage.getItem("userKey");
  let voiceArr = {};
  await axios
    .get(url + "/voiceset/" + userKey, {})
    .then((res) => {
      voiceArr = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
  return voiceArr.voiceSet;
}
export async function getDonVoiceInfo(userKey) {
  let voiceArr = {};
  await axios
    .get(url + "/voiceset/" + userKey, {})
    .then((res) => {
      voiceArr = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
  return voiceArr.voiceSet;
}
export async function setVoiceToggle(data) {
  let ToggleUpateData = {
    voice_use: data.voice_use,
    custom_img_use: data.custom_img_use,
    mycast_coin_use: data.mycast_coin_use,
    title_tts_use: data.title_tts_use,
    user_key: data.user_key
  }
  let updateLog = {};

  await axios
    .post(url + "/voiceset/toggle/", ToggleUpateData)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    })

  return updateLog;
}
export async function setSupportSystem(data) {
  let updateLog;

  await axios
    .post(url + "/voiceset/support", data)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    })
  return updateLog;
}

export async function setSysText(data) {
  let updateLog;

  await axios
    .post(url + "/voiceset/systext", data)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    })
  return updateLog;
}

export async function setSysColor(data) {
  let updateLog;

  const res = await axios
    .post(url + "/voiceSet/syscolor", data)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    })
  return updateLog;
}