
import axios from 'axios'

export async function getVoiceInfo() {
  const userKey = sessionStorage.getItem("userKey");
  let voiceArr = {};
  const res = await axios
    .get("http://127.0.0.1:3000/api/voiceset/" + userKey, {})
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

  const res = await axios
    .post("http://127.0.0.1:3000/api/voiceset/toggle/", ToggleUpateData)
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

  const res = await axios
    .post("http://127.0.0.1:3000/api/voiceset/support", data)
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

  const res = await axios
    .post("http://127.0.0.1:3000/api/voiceset/systext", data)
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
    .post("http://127.0.0.1:3000/api/voiceSet/syscolor", data)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    })
  return updateLog;
}