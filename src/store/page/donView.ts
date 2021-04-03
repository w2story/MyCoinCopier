import axios from 'axios'
import { writable } from 'svelte/store';

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export const donViewSelect = writable("");
export const userUUID = writable("");
export const donViewKey = writable(0);
export const donLimitTime = writable(1000);
//export const donVoiceSeeking = writable

let inside_DonViewKey = 0;
let inside_DonViewSelected = "";

export const donViewListChk = async (uuid: string) => {
  let donViewRow = {};

  await axios
    .get(url + "/donview/list/" + uuid)
    .then((res) => {
      donViewRow = res.data;
      console.log("donViewListChk 실행중 받은데이터 :", donViewRow);
    })
    .catch((Error) => {
      console.log(Error);
    })
  if (donViewRow.success) {
    // 도네이션 비디오 처리값 넘겨주기
    donViewSelect.set(donViewRow.row.don_use_table);
    inside_DonViewSelected = donViewRow.row.don_use_table;

    // 도네이션 테이블 이용값 체크 후 내부 데이터 처리
    if (donViewRow.row.don_use_table == "video") {
      inside_DonViewKey = donViewRow.row.don_list_key
    } else if (donViewRow.row.don_use_table == "voice") {
      inside_DonViewKey = donViewRow.row.don_list_key
    }
  } else {
    // 오류시 1순위 제거 처리
    donViewSelect.set("");
    donViewRow.success = false;
  }
  // 최종값
  return donViewRow;
}
export const donViewList = async (uuid: string) => {
  let tmpDonViewRow = {};
  let donViewRow = {};

  if (inside_DonViewSelected == "video") {
    await axios
      .get(url + "/donview/video/" + uuid)
      .then((res) => {
        tmpDonViewRow = res.data;
        console.log("donViewList 비디오 실행중 받은데이터 :", tmpDonViewRow);
      })
      .catch((Error) => {
        console.log(Error);
      })
    if (tmpDonViewRow.success) {
      // 도네이션 비디오 처리값 넘겨주기
      donViewRow = tmpDonViewRow.row;
      donViewKey.set(inside_DonViewKey);
      let don_Limit = donViewRow.video_limit * 1000 + 700;
      console.log("donViewList 비디오 찾은 리미트 값 : ", don_Limit);
      donLimitTime.set(don_Limit);
    }
    // 최종값
    console.log("donViewList 비디오 내보내는 값 :", donViewRow);
    return donViewRow;
  } else if (inside_DonViewSelected == "voice") {
    await axios
      .get(url + "/donview/voice/" + uuid)
      .then((res) => {
        tmpDonViewRow = res.data;
        console.log("donViewList 오디오 실행중 받은데이터 :", donViewRow);
      })
      .catch((Error) => {
        console.log(Error);
      })
    if (tmpDonViewRow.success) {
      // 도네이션 비디오 처리값 넘겨주기
      donViewRow = tmpDonViewRow.row;
      console.log("넘겨 받은 데이터 :", donViewRow);

      donViewKey.set(inside_DonViewKey);
      let don_Limit = donViewRow.voice_duration + 700;
      console.log("donViewList 비디오 찾은 리미트 값 : ", don_Limit);
      donLimitTime.set(don_Limit);
    }
    // 최종값
    console.log("donViewList 오디오 내보내는 값 :", donViewRow);
    return donViewRow;
  }


}
export const donPrintUpdate = async (uuid: string, key: number) => {
  let sendData = {
    UUID: uuid,
    listKey: key,
  }
  console.log("donPrintUpdate 받은 데이터 값", sendData);

  await axios
    .post(url + "/donview/set/list/", sendData)
    .then((res) => {
      console.log("donPrintUpdate  받은 값", res);

    })
    .catch((Error) => {
      console.log(Error);
    })
}