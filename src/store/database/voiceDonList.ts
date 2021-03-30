import axios from 'axios';

const userKey = sessionStorage.getItem("userKey");
const userToken = sessionStorage.getItem('token');
const config = {
  headers: { "x-access-token": userToken },
}

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export async function voiceListSearch() {
  let donListRow = {};

  await axios
    .get(url + "/donlist/voice/list/" + userKey, config)
    .then((Response) => {
      donListRow = Response.data;
    }).catch((Error) => {
      console.log(Error);
      donListRow.success = false;
    });
  return donListRow;
}