import axios from 'axios';
import { writable } from 'svelte/store';

const userKey = sessionStorage.getItem("userKey");
const userToken = sessionStorage.getItem('token');
const config = {
  headers: { "x-access-token": userToken },
}

const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";

export const lastOsuDonKey = writable(0);
export const osuList = writable([]);
export const osuListUpdate = writable(0);

export async function osuListSearch() {
  let donListRow = {};

  await axios
    .get(url + "/donlist/osu/list/" + userKey, config)
    .then((res) => {
      donListRow = res.data;
      donListRow.osuMapRow.forEach(item => {
        let PalyCount = 0;
        item.osu_data = JSON.parse(item.osu_data);
        //console.log(item.osu_data.ChildrenBeatmaps);
        item.osu_data.ChildrenBeatmaps.forEach(map => {
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
        item.osu_data.Playcount = PalyCount;
        //console.log(item.osu_data);
      });
      lastOsuDonKey.set(donListRow.osuMapRow[donListRow.osuMapRow.length - 1].osumap_don_key);
    }).catch((Error) => {
      console.log(Error);
      donListRow.success = false;
    });
  return donListRow;
}

export async function osuLastKeySearch(data) {
  let donListRow = {};
  let sendData = data;
  sendData.ukey = userKey

  await axios
    .post(url + "/donlist/osu/search/", sendData, config)
    .then((Response) => {
      donListRow = Response.data;
    }).catch((Error) => {
      console.log(Error);
      donListRow.success = false;
    });
  return donListRow.success;
}