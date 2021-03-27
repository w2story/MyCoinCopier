
import axios from 'axios'

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export async function getMapSettingInfo(key) {
  const userKey = sessionStorage.getItem("userKey");
  let osuMapArr = {};
  await axios
    .get(url + "/osusetting/" + userKey, {})
    .then((res) => {
      osuMapArr = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
  return osuMapArr.osuMapSet;
}
export async function setMapSettingToggle(data) {
  let ToggleUpateData = {
    osumap_use: data.osumap_use,
    mycast_coin_use: data.mycast_coin_use,
    user_key: data.user_key
  }
  let updateLog;

  await axios
    .post(url + "/osusetting/toggle/", ToggleUpateData)
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
    .post(url + "/osusetting/support", data)
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