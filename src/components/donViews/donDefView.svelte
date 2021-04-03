<script lang="ts">
  import { onMount, afterUpdate, beforeUpdate, tick } from "svelte";
  import { location } from "svelte-spa-router";

  // 스토어 처리
  import {
    userUUID,
    donViewSelect,
    donViewListChk,
    donLimitTime,
    donPrintUpdate,
    donViewKey,
  } from "~/store/page/donView";
  import Video from "./video.svelte";
  import Voice from "./voice.svelte";

  // 사용자 uuid 확인
  const webLocation = $location;
  const webQuery = webLocation.split("/");
  userUUID.set(webQuery[3]);

  // 시간 설정, 타이머 설정
  let limitTime = $donLimitTime;
  let limitTimeDiscord = false;

  // 페이지 업데이트 수 체크
  let updateNum = 0;
  let loopNum = 0;
  let donViewRow = {};
  let donViewShow = 0;
  let delectLoop = 0;
  let totalDelectLoop = 0;
  let donViewReset = 0;
  let donStream = 0;
  let loopStartNum = 0;

  // 도네이션 받은 값
  let donViewShowRow = {};

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function waitDonView() {
    console.log("루프문");
    console.log("-----------------");
    console.log("0. 작동중인  루프문 수 :", loopStartNum);
    console.log("0. 총 - 제거된 루프문 수 :", totalDelectLoop);
    console.log("0. 메인 페이지 업데이트 수 :", updateNum);
    console.log("0. 리미트가 참조값 :", limitTimeDiscord);
    donViewSelect;
    console.log("0. 도네 확인 참조값 :", donViewRow.success);
    console.log("0. 도네 연속 재생 값 :", donStream);
    console.log("0. 도네 셀렉트 값 :", $donViewSelect);
    console.log("...............................");
    if (loopStartNum > 1) {
      console.time("시간 체크");
      loopStartNum = 0;
      totalDelectLoop += 1;
      console.log("1. 2개 이상의 루프문 작동으로 인한 제거");
      console.log("1. 제거된 루프문 수 :", totalDelectLoop);
      console.timeEnd("시간 체크");
      console.log("-----------------");
      return false;
      //throw new Error("페이지 업데이트로 제거");
    } else {
      if (donViewRow.success && limitTimeDiscord) {
        limitTimeDiscord = false;
        updateNum = 1;
        console.time("시간 체크");
        donViewReset = 0;
        console.log("3. 루프돈다,", limitTime);
        console.log("3. 메인 페이지 업데이트 수 :", updateNum);
        donViewRow = await donViewListChk($userUUID);
        console.log("3. 리스트 키값 확인 :", $donViewKey);
        console.log("3. 선택기:", $donViewSelect);
        loopNum += 1;
        await wait(limitTime);
        // 시간 지연 후 처리
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        updateNum = 1;
        if (donViewRow.success) {
          loopStartNum += 1;
        } else {
          loopStartNum += 1;
        }
        console.log("3. 리트스 키값 확인 :", $donViewKey);
        console.log("3. 리셋 업데이트 확인 :", donViewReset);
        await donPrintUpdate($userUUID, $donViewKey);
        await tick();
        donLimitTime.set(1000);
        donViewSelect.set("");
        donViewKey.set(0);
        // 체크 후 재처리
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("3. 루프 완료", loopNum);
        console.timeEnd("시간 체크");
        console.log("-----------------");
        waitDonView();
        //}
      } else {
        console.time("시간 체크");
        console.log("1. 루프돈다,", limitTime);
        console.log("1. 메인 페이지 업데이트 수 :", updateNum);
        donViewRow = await donViewListChk($userUUID);
        console.log("1. 리스트 키값 확인 :", $donViewKey);
        console.log("1. 선택기:", $donViewSelect);
        loopNum += 1;
        await wait(limitTime);
        console.log("1. 루프 완료", loopNum);
        console.timeEnd("시간 체크");
        console.log("-----------------");
        waitDonView();
      }
    }
  }

  beforeUpdate(async () => {
    console.log("///");
    console.log("1. 재처리중");
    console.log("1. beforeUpdate");
    updateNum += 1;
    console.log("2. 메인 페이지 업데이트 수 :", updateNum);
    console.log("3. 내부 값:", limitTime);
    console.log("4. 스토어 값:", $donLimitTime);
    loopStartNum += 1;
    console.log("///");
    await waitDonView()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  });

  afterUpdate(async () => {
    console.log("///");
    console.log("1. 재처리중");
    console.log("1. afterUpdate");
    loopStartNum += 1;
    console.log("///");
    if (!limitTimeDiscord && donViewRow.success && donStream == 1) {
      await waitDonView()
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
    /*
    console.log("1. 재처리중");
    updateNum += 1;
    console.log("2. 메인 페이지 업데이트 수 :", updateNum);
    if (updateNum > 3) {
      console.log("2-1. 업데이트 수 초과");
    }
    console.log("3. 내부 값:", limitTime);
    console.log("4. 스토어 값:", $donLimitTime);
    console.log("///");
    await waitDonView()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
      */
  });

  $: if ($donLimitTime !== limitTime && updateNum >= 1) {
    console.log("///");
    console.log("리미트 타임 어긋남");
    limitTime = $donLimitTime;
    limitTimeDiscord = true;
  }
  $: if ($donViewKey == 0) {
    console.log("///");
    console.log("도네이션 송출 완료");
    console.log("///");
  }

  //오토 플레이 처리 - ?autoplay=1
</script>

<div class="components">
  {#if $donViewSelect == "video"}
    <Video mainUpadeNum={updateNum} {limitTimeDiscord} />
  {:else if $donViewSelect == "voice"}
    <Voice mainUpadeNum={updateNum} {limitTimeDiscord} />
  {/if}
</div>

<style lang="scss">
</style>
