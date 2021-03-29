import axios from "axios";


/*
import { ImgurClient } from 'imgur';
let client;
client = new ImgurClient({
  accessToken: "b36fdf382282b657671c9acfafab6c1328865af4"
});
*/
const hostName = window.location.hostname;
const url = "http://" + hostName + ":3000/api";
const imgurl = "http://" + hostName + ":3000";
const userKey = sessionStorage.getItem("userKey");

export const imgUpload = async (files) => {
  const formData = new FormData();
  formData.append('userKey', userKey);
  formData.append('image', files);

  let imgurl = {}

  await axios.post(url + "/image/register/", formData)
    .then((res) => {
      imgurl = res.data
    }).catch((err) => {
      imgurl = err
    })

  return imgurl;
}

export const imgLoad = async () => {
  let imgList = {}
  await axios.get(url + "/image/search/" + userKey)
    .then((res) => {
      console.log(res.data);
      for (const row of res.data.imgurl) {
        row.img_url = imgurl + row.img_url;
        console.log(row);

      }
      imgList = res.data.imgurl
    }).catch((err) => {
      imgList = err
    })

  return imgList;
}

export const donImageLoad = async (key) => {
  let imgList = {}
  await axios.get(url + "/image/search/" + key)
    .then((res) => {
      console.log(res.data);
      for (const row of res.data.imgurl) {
        row.img_url = imgurl + row.img_url;
        row.img_select = false;
        console.log(row);
      }
      imgList = res.data.imgurl
    }).catch((err) => {
      imgList = err
    })

  return imgList;
}