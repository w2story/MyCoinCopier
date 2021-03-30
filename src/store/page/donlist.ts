import {
  voiceLastKeySearch,
  voiceListUpdata,
} from "~/store/database/voiceDonList";
import {
  videoListUpdata,
  videoLastKeySearch,
} from "~/store/database/videoDonList";

// 무제한 뷔페
export const donNewChk = async (voiceLastKey, videoLastKey) => {
  console.log("체커 작동");

  const voiceData = { lastKey: voiceLastKey };
  const voiceLastKeyChange = await voiceLastKeySearch(voiceData);
  if (voiceLastKeyChange) {
    console.log("새로 생성된 음성 도네 확인");
    voiceListUpdata.set(1);
  }
  const videoData = { lastKey: videoLastKey };
  const videoLastKeyChange = await videoLastKeySearch(videoData);
  if (videoLastKeyChange) {
    console.log("새로 생성된 영상 도네 확인");
    videoListUpdata.set(1);
  }
};