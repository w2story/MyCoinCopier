
import axios from 'axios'

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export async function getChatSetInfo() {
  const userKey = sessionStorage.getItem("userKey");
  let Arr = {};
  await axios
    .get(url + "/chatset/" + userKey, {})
    .then((res) => {
      Arr = res.data;
    })
    .catch((Error) => {
      console.log(Error);
    })
  return Arr.chateSet;
}

export async function setSysText(data) {
  let updateLog;

  await axios
    .post(url + "/chatSet/systext", data)
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

  await axios
    .post(url + "/chatSet/syscolor", data)
    .then((res) => {
      updateLog = res.data;
    })
    .catch((Error) => {
      console.log(Error);
      updateLog.success = false;
    });

  return updateLog;
}