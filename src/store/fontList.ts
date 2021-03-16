import { writable } from 'svelte/store'

// 펜시 체 - 16종
// 손글씨 체 - 6종
// 명조 - 7종
// 고딕 - 7종
// 총 - 36종
export const fontItems = [
    {
      value: "GongGothicMedium",
      label: "이사만루 Medium",
      group: '고딕'
    },
    {
      value: "Cafe24Dangdanghae",
      label: "카페24 당당해",
      group: '고딕'
    },
    {
      value: "Cafe24Ohsquare",
      label: "카페24 아네모네",
      group: '고딕'
    },
    {
      value: "RIDIBatang",
      label: "리디바탕",
      group: '고딕'
    },
    {
      value: "BBTreeGB",
      label: "유토이미지고딕B",
      group: '고딕'
    },
    {
      value: "NanumBarunGothic",
      label: "나눔바른고딕",
      group: '고딕'
    },
    {
      value: "Jeju Gothic",
      label: "제주고딕",
      group: '고딕'
    },
    
    {
      value: "Eulyoo1945-SemiBold",
      label: "을유1945 SemiBold",
      group: '명조'
    },
    {
      value: "MaruBuri-Regular",
      label: "마루 부리",
      group: '명조'
    },
    {
      value: "HSBombaram3_Regular",
      label: "HS봄바람체 3.0",
      group: '명조'
    },
    {
      value: "SDKukdetopokki-Lt",
      label: "산돌국대떡볶이체 Light",
      group: '명조'
    },
    {
      value: "Chosunilbo_myungjo",
      label: "조선일보명조체",
      group: '명조'
    },
    {
      value: "Eulyoo1945-SemiBold",
      label: "을유1945 SemiBold",
      group: '명조'
    },
    {
      value: "ChosunGs",
      label: "조선궁서체",
      group: '명조'
    },

    {
      value: "RixYeoljeongdo_Regular",
      label: "Rix열정도체",
      group: '펜시'
    },
    {
      value: "Binggrae-Bold",
      label: "빙그레체II",
      group: '펜시'
    },
    {
      value: "SDSamliphopangche_Outline",
      label: "산돌 삼립호빵체 Outline",
      group: '펜시'
    },
    {
      value: "ELAND_Nice_M",
      label: "이랜드 나이스체",
      group: '펜시'
    },
    {
      value: "Y_Spotlight",
      label: "Y 너만을 비춤체",
      group: '펜시'
    },
    {
      value: "BMEULJIRO",
      label: "배민 을지로체",
      group: '펜시'
    },
    {
      value: "Jal_Onuel",
      label: "잘풀리는오늘체",
      group: '펜시'
    },
    {
      value: "KOTRA_BOLD-Bold",
      label: "코트라 볼드체",
      group: '펜시'
    },
    {
      value: "Wemakeprice-Bold",
      label: "위메프체 Bold",
      group: '펜시'
    },
    {
      value: "BinggraeSamanco-Bold",
      label: "빙그레 싸만코체 Bold",
      group: '펜시'
    },
    {
      value: "BinggraeMelona-Bold",
      label: "빙그레 메로나체 Bold",
      group: '펜시'
    },
    {
      value: "TmoneyRoundWindExtraBold",
      label: "티머니 둥근바람",
      group: '펜시'
    },
    {
      value: "MaplestoryOTFBold",
      label: "넥슨 메이플스토리 Bold",
      group: '펜시'
    },
    {
      value: "Recipekorea",
      label: "레코체",
      group: '펜시'
    },
    {
      value: "CookieRun-Regular",
      label: "쿠키런 Regular",
      group: '펜시'
    },
    {
      value: "LotteMartHappy",
      label: "롯데마트행복체",
      group: '펜시'
    },

    {
      value: "Independence_hall",
      label: "독립기념관체",
      group: '손글씨'
    },
    {
      value: "WandohopeB",
      label: "완도희망체 Bold",
      group: '손글씨'
    },
    {
      value: "Bazzi",
      label: "넥슨 배찌체",
      group: '손글씨'
    },
    {
      value: "Cafe24Ssukssuk",
      label: "카페24 쑥쑥",
      group: '손글씨'
    },
    {
      value: "KOTRA_SONGEULSSI",
      label: "코트라 손글씨체",
      group: '손글씨'
    },
    {
      value: "Goyang",
      label: "고양체",
      group: '손글씨'
    },
  ];
