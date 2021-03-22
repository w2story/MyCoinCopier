
import axios from 'axios'

export async function getMapSettingInfo(key) {
  let Arr = {};
  const res = await axios
    .get("http://127.0.0.1:3000/api/osusetting/1", {})
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
    data.osumap_use,
    data.mycast_coin_use,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/osusetting/toggle/", ToggleUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}
export async function setSupportSystem(data) {
  let SupportUpateData = [
    data.osumap_total_list,
    data.allim_effect,
    data.allim_sound,
    data.user_key
  ]
  console.log(SupportUpateData);

  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/osusetting/support", SupportUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}