import axios from 'axios';
import { writable } from 'svelte/store';

const userKey = sessionStorage.getItem("userKey");
const userToken = sessionStorage.getItem('token');
const config = {
  headers: { "x-access-token": userToken },
}

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export async function youtubeShow(youID: string) {
  let youtubeRow = {};
  let youtubeChk = false;

  await axios
    .get(url + "/videosearch/youtube/" + youID)
    .then((Response) => {
      youtubeRow = Response.data;
      youtubeChk = youtubeRow.success;
    }).catch((Error) => {
      console.log(Error);
    });
  return youtubeRow;
}

export async function voiceDonSend(data) {
  let donSend = data;
  donSend.se_user_key = Number(userKey);
  let donSendUpadata = {};
  let donSendChk = false;

  console.log(donSend);

  await axios
    .post(url + "/donsend/voice/", donSend, config)
    .then((Response) => {
      donSendUpadata = Response.data;
      donSendChk = donSendUpadata.success;
    }).catch((Error) => {
      console.log(Error);
      donSendChk = false;
    });

  console.log(donSendChk);

  return donSendChk;
}