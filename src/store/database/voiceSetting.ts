
import axios from 'axios'

export async function getVoiceInfo(key) {
  let voiceArr = {};
  const res = await axios
    .get("http://127.0.0.1:3000/api/voiceSet/1", {})
    .then((Response) => {
      voiceArr = Response.data[0];
    })
    .catch((Error) => {
      console.log(Error);
    })
  return voiceArr;
}
export async function setVoiceToggle(data) {
  let ToggleUpateData = [
    data.voice_use,
    data.custom_img_use,
    data.mycast_coin_use,
    data.title_tts_use,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/voiceSet/toggle/", ToggleUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}
export async function setSupportSystem(data) {
  let SupportUpateData = [
    data.tts_text_size,
    data.allim_effect,
    data.allim_layout,
    data.allim_sound,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/voiceSet/support", SupportUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}

export async function setSysText(data) {
  let SysTextUpateData = [
    data.sys_title_template,
    data.sys_font_size,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/voiceSet/systext", SysTextUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}

export async function setSysColor(data) {
  let SysTextUpateData = [
    data.sys_text_color,
    data.sys_emp_color,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/voiceSet/syscolor", SysTextUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}