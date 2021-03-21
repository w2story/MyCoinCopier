
import axios from 'axios'

export async function getVoiceInfo(key) {
  let voiceArr = {};
  const res = await axios
    .get("http://127.0.0.1:3000/api/voiceSet/1", {})
    .then((Response) => {
      voiceArr = Response.data[0];
    })
    .catch((Error) => {
      console.log(Error);
    })
  return voiceArr;
}
export async function setVoiceInfo(data) {
  let voiceUpateData = [
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