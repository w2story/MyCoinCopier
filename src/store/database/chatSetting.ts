
import axios from 'axios'

export async function getChatSetInfo(key) {
  let Arr = {};
  const res = await axios
    .get("http://127.0.0.1:3000/api/chatSet/1", {})
    .then((Response) => {
      Arr = Response.data[0];
    })
    .catch((Error) => {
      console.log(Error);
    })
  return Arr;
}
export async function setSysText(data) {
  let SysTextUpateData = [
    data.style_title_size,
    data.style_text_size,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/chatSet/systext", SysTextUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}

export async function setSysColor(data) {
  let SysTextUpateData = [
    data.style_bg,
    data.style_title_color,
    data.style_text_color,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/chatSet/syscolor", SysTextUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}