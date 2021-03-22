
import axios from 'axios'

export async function getVideoInfo(key) {
  let videoArr = {};
  const res = await axios
    .get("http://127.0.0.1:3000/api/videoSet/1", {})
    .then((Response) => {
      videoArr = Response.data[0];
    })
    .catch((Error) => {
      console.log(Error);
    })
  return videoArr;
}
export async function setVideoToggle(data) {
  let ToggleUpateData = [
    data.video_use,
    data.mycast_coin_use,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/videoSet/toggle/", ToggleUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}
export async function setSupportSystem(data) {
  let SupportUpateData = [
    data.allim_effect,
    data.allim_layout,
    data.allim_sound,
    data.user_key
  ]
  console.log(SupportUpateData);

  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/videoSet/support", SupportUpateData)
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
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/videoSet/systext", SysTextUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}