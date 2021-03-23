
import axios from 'axios'
import { update_keyed_each } from 'svelte/internal';
import { writable } from 'svelte/store';

export const userUpate = writable(0);

export async function getUserInfo(key) {
  let userArr = {};
  const res = await axios
    .get("http://127.0.0.1:3000/api/userInfo/1", {})
    .then((Response) => {
      userArr = Response.data[0];
    })
    .catch((Error) => {
      console.log(Error);
    })
  return userArr;
}
export async function setUserInfo(data) {
  let userUpateData = [
    data.user_name,
    data.user_img,
    data.user_content,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/userInfo/profile/" + data.user_key, userUpateData)
    .then((Response) => {
      console.log(Response.data);
      userUpate.set(1);
    })
    .catch((Error) => {
      console.log(Error);
      userUpate.set(0);
    })
  console.log(userUpate);

}

export async function setUserPass(data) {
  let userUpateData = [
    data.user_pass,
    data.user_key
  ]
  let updateLog;

  const res = await axios
    .post("http://127.0.0.1:3000/api/userInfo/pass/" + data.user_key, userUpateData)
    .then((Response) => {
      console.log(Response.data);
      updateLog = Response.data;
    })
    .catch((Error) => {
      console.log(Error);
    })
  //return userArr;
}

export async function createUser(data) {
  let userCreateData = data;
  let updateLog;
  const res = await axios.post("http://localhost:3000/api/auth/join", userCreateData).then((Response) => {
    console.log(Response.data);
    updateLog = Response.data;
  }).catch((Error) => {
    console.log(Error);
  })
}