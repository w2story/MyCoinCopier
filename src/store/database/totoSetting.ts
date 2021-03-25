
import axios from 'axios'

export async function getTotoInfo() {
  let Arr = {};
  const userKey = sessionStorage.getItem("userKey");
  const res = await axios
    .get("http://127.0.0.1:3000/api/totoset/" + userKey, {})
    .then((Response) => {
      Arr = Response.data[0];
    })
    .catch((Error) => {
      console.log(Error);
    })
  return Arr;
}
export async function setMapSettingToggle(data) {
  let ToggleUpateData = [
    data.toto_use,
    data.mycast_coin_use,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/totoset/toggle/", ToggleUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}
export async function setSupportSystem(data) {
  let SupportUpateData = [
    data.toto_max_coin,
    data.user_key
  ]
  console.log(SupportUpateData);

  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/totoset/support", SupportUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}