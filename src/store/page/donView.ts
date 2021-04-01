import axios from 'axios'
import { writable } from 'svelte/store';

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export const donViewSelect = writable("");
export const userUUID = writable("");
export const donViewKey = writable(0);
export const donLimitTime = writable(1000);

export const donViewListChk = async (uuid: string) => {
  let donViewRow = {};
  let donVoiceRow = {};
  let donVideoRow = {};

  await axios
    .get(url + "/donview/video/" + uuid)
    .then((res) => {
      donVideoRow = res.data;
      console.log("donViewListChk 실행중 받은데이터 :", donVideoRow);
    })
    .catch((Error) => {
      console.log(Error);
    })
  if (donVideoRow.success) {
    // 도네이션 비디오 처리값 넘겨주기
    donViewRow = donVideoRow;
    donViewSelect.set("video");
  } else {
    //donViewSelect.set("");
    donViewRow.success = false;
  }
  // 최종값
  return donViewRow;
}
export const donViewList = async (uuid: string) => {
  let donViewRow = {};
  let donVoiceRow = {};
  let donVideoRow = {};

  await axios
    .get(url + "/donview/video/" + uuid)
    .then((res) => {
      donVideoRow = res.data;
      console.log("donViewList 실행중 받은데이터 :", donVideoRow);
    })
    .catch((Error) => {
      console.log(Error);
    })
  if (donVideoRow.success) {
    // 도네이션 비디오 처리값 넘겨주기
    donViewRow = donVideoRow.row;
    donViewKey.set(donViewRow.video_don_key);
    console.log("donViewList 찾은 리미트 값 : ", donVideoRow.row.video_limit * 1000 + 700);
    donLimitTime.set(donVideoRow.row.video_limit * 1000 + 700);
  }
  // 최종값
  console.log("donViewList 내보내는 값 :", donViewRow);
  return donViewRow;
}
export const donPrintUpdate = async (uuid: string, key: number) => {
  let sendData = {
    UUID: uuid,
    videoKey: key,
  }
  axios
    .post(url + "/donview/set/video/", sendData)
    .then((res) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
}

/*
export const donViewList = async (uuid: string) => {
  let donViewRow = {};
  let donVoiceRow = {};
  let donVideoRow = {};

  axios
    .get(url + "/donview/video/" + uuid)
    .then((res) => {
      donVideoRow = res.data;
      console.log("donViewListChk 실행중 받은데이터 :", donVideoRow);
    })
    .catch((Error) => {
      console.log(Error);
    })
  if (donVideoRow.success) {
    // 도네이션 비디오 처리값 넘겨주기
    donViewRow = donVideoRow;
    donViewRow.select = "video";
    donViewKey.set(donViewRow.video_don_key);
  }
  // 최종값
  console.log("donViewListChk 내보내는 값 :", donViewRow);
  return donViewRow;
}
export const donPrintUpdate = async (uuid: string, key: number) => {
  let sendData = {
    UUID: uuid,
    videoKey: key,
  }
  axios
    .post(url + "/donview/set/video/", sendData)
    .then((res) => {
    })
    .catch((Error) => {
      console.log(Error);
    })
}
*/