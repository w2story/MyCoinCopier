import axios from 'axios'

// 보이스세팅 값
import { setVoiceToggle } from "~/store/database/voiceSetting";
import { setVideoToggle } from "~/store/database/videoSetting";
import { setMapSettingToggle } from "~/store/database/osuMapSetting";
import { setTotoToggle } from "~/store/database/totoSetting";

const userKey = sessionStorage.getItem("userKey");

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export const userDonToggleUse = async () => {
  let Arr = {};
  const res = await axios
    .get(url + "/userinfo/toggle/" + userKey, {})
    .then((res) => {
      Arr = res.data;
    })
    .catch((Error) => {
      console.log(Error);
    })
  return Arr.toggleArr;
}
export const userDonToggleChk = async (select, data) => {
  let updateLog;
  let updata = { user_key: userKey, }
  switch (select) {
    case "voice":
      updata.voice_use = data;
      updateLog = await setVoiceToggle(updata)
      break;
    case "video":
      updata.video_use = data;
      updateLog = await setVideoToggle(updata)
      break;
    case "osumap":
      updata.osumap_use = data;
      updateLog = await setMapSettingToggle(updata)
      break;
    case "toto":
      updata.toto_use = data;
      updateLog = await setTotoToggle(updata)
      break;
  }
  return updateLog;
}