
import axios from 'axios'

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export async function getTotoInfo() {
  const userKey = sessionStorage.getItem("userKey");
  let Arr = {};

  await axios
    .get(url + "/totoset/" + userKey, {})
    .then((res) => {
      Arr = res.data;
    })
    .catch((Error) => {
      console.log(Error);
    })
  return Arr.totoSet;
}
export async function setTotoToggle(data) {
  let ToggleUpateData = {
    toto_use: data.toto_use,
    mycast_coin_use: data.mycast_coin_use,
    user_key: data.user_key
  }
  let updateLog;

  await axios
    .post(url + "/totoset/toggle/", ToggleUpateData)
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
    .post(url + "/totoset/support", data)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    })
  return updateLog;
}