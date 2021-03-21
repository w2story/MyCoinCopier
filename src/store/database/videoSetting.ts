
import axios from 'axios'

export async function getVideoInfo(key) {
  let videoArr = {};
  const res = await axios
    .get("http://127.0.0.1:3000/api/videoSet/1", {})
    .then((Response) => {
      videoArr = Response.data[0];
    })
    .catch((Error) => {
      console.log(Error);
    })
  return videoArr;
}
export async function setVideoInfo(data) {
  let videoUpateData = [
    data.user_pass,
    data.user_name,
    data.user_img,
    data.user_content,
    data.user_key
  ]
  let updateLog;

  /*const res = await axios
    .post("http://127.0.0.1:3000/api/userInfo/" + data.user_key, userUpateData)
    .then((Response) => {
    })
    .catch((Error) => {
      console.log(Error);
    })*/
  //return userArr;
}