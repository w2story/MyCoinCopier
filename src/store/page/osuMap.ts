import axios from 'axios'
import { writable } from 'svelte/store';

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

const userKey = sessionStorage.getItem("userKey");
const userToken = sessionStorage.getItem('token');
const config = {
  headers: { "x-access-token": userToken },
}

export const osuMapSearch = async (data) => {
  // API 참조
  // https://chimu.moe/docs
  // Search를 참조
  let osuMapList = {};
  await axios.get('https://api.chimu.moe/v1/search?amount=400&offset=0&query=' + data).then((res) => {
    console.log("검색결과");
    osuMapList.success = true;
    res.data.data.forEach(item => {
      let PalyCount = 0;
      item.ChildrenBeatmaps.forEach(map => {
        PalyCount += map.Playcount;
        if (map.DifficultyRating < 2) {
          map.DiffNewName = "easy";
        } else if (map.DifficultyRating < 3) {
          map.DiffNewName = "normal";
        } else if (map.DifficultyRating < 4) {
          map.DiffNewName = "hard";
        } else if (map.DifficultyRating < 5.3) {
          map.DiffNewName = "insane";
        } else if (map.DifficultyRating < 6.3) {
          map.DiffNewName = "extreme";
        } else {
          map.DiffNewName = "ultra";
        }
      });
      item.Playcount = PalyCount;
    });
    osuMapList.data = res.data.data;
  }).catch((err) => {
    console.log("에러");
    osuMapList.success = false;
  })

  return osuMapList;
};
export const osuMapSend = async (data) => {
  let sendData = {};
  sendData = data;
  sendData.se_user_key = userKey;
  await axios.post(url + '/donsend/osu/', sendData, config)
    .then((res) => {
      osuMapList.success = true;
    }).catch((err) => {
      console.log("에러");
      osuMapList.success = false;
    })

  return osuMapList;
}