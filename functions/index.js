/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onCall} = require("firebase-functions/v2/https");

exports.checkAnswer = onCall(async (data, context) => {
  const pidToAnswer = new Map([["iT9r9E7rAsbbh", "FALL"], ["yxvyR50n0zlpi", "260"], ["r49mGE4Hwegxh", "시장"], ["Y8NEFS9igeevL", "56000"], ["ii9ZfnCghgHVw", "창동"], ["7LyVZJMQYo856", "포켓몬스터"], ["fognJIoHsNllm", "VariationonawaltzbyDiabelli"], ["9u7ELf5TmNjFO", "12"], ["9pZEAsd8N5jS4", "925"], ["0Q6e38lxEEx8y", "21304"], ["uoLlc1VBf2AIG", "롯데리아"], ["WViPImJHfBQsP", "宮"], ["kdVl6bkURna4u", "광주원주고속도로"], ["tdOIOeq9vZlf4", "51"], ["vCj6LRPbgjCXW", "에델바이스"], ["YjsEyAQhcQ4hz", "꽁"], ["Vkt1V5NLS8xG0", "IATA"], ["LC8Pmuu9TX30m", "음"], ["Q27pkG84HIgdo", "Black"], ["9SraShJBWNV1l", "THREE"], ["PgPWXYvUNTqgA", "ㄷ$ㄷ^"], ["DJ41Xl7kx74aL", "나이트"], ["YO5BSs5hJO2Vn", "대황"], ["L4pCo6v0FTfSR", "huckel"], ["XCglSprRSzdKL", "8"], ["IhhWNjDd8eMFH", "간체자"], ["Uw9gcnxPCI9DZ", "6"], ["QyrsyxOLg1h8j", "丑"], ["8BExfkq0hmQO1", "아데닌"], ["uU1JOUXMBLxey", "TimesSquare"], ["gl0GNY3aTIQAv", "코소보"], ["AfPQTXQz8GJ7k", "229680"], ["IOd99arvEz41J", "꽃"], ["ks3Pl46KIkFMG", "3408"], ["M8ESWfTrwsDiq", "Promise"], ["fAek5IuIwY2J8", "이승만"], ["qc9qy2Yttw4S5", "82"], ["22zwmxYRcV5V6", "광복절"], ["dDmgIGiU1Uv1S", "UP"], ["ADfQkUc3QAYQS", "January"], ["ZmdXLhMtHq7YT", "Eunoia"], ["wAcazx0gIcfuP", "가장넓은길"], ["wRc5PA6ZXPDOQ", "51"], ["pUPDDtWVNshaU", "I116"], ["EtP5Z7LGX2BFf", "41"], ["JVzs9kK7swlVd", "베텔게우스"], ["t0M4Y1Xzrrd01", "수학"], ["22gPUqrt2SasV", "DRIVE"], ["4i9ka2f4XrcNK", "하이바라"], ["0iXj2U5pnz013", "참치"], ["lE5fGe95eXcRu", "19480815"], ["BYwG2M6fQK5fU", "998"], ["Gy09KbDCVTkAV", "국제시장"], ["hr9cSp6WeAndg", "3205"], ["dEakX4GkTTUqY", "H1ntC0d3"], ["dwmovkC9bpUv2", "물보"], ["OLwAW5W8kNaJb", "예술사"], ["6xixIEVeTovAV", "lecoqsportif"], ["cdJLo2W1GVPmB", "금식은물도금합니다"], ["G8nWFjQz5FBhd", "38"], ["Ayc2P8tDMQ97f", "SwimSwim"], ["BQ6H3sGgchtcX", "오렌지"], ["UjJmxZw6cH1KE", "150"], ["xDTGFIuRAOftw", "아이템"], ["yznAFnTbu6Jvz", "1"], ["Mh6XS525kbNnb", "순신"], ["hY62HFP3mV7TR", "2529"], ["ZukvY5oC7hzf6", "%茶비타여명"], ["SF2tH249oTfep", "111"], ["DzzQpmzpoZp3G", "SPADE"], ["BpaCdNYnKY3WT", "reopen"], ["qEyPivIXR2z2X", "버드나무"], ["8BpqlfY4PTvY5", "coral"], ["n7G4vvywclovD", "television"], ["bgrsTaRawXjak", "바지락"], ["zFwrYR0Hz86rM", "25355253"], ["dxNSa50vFDb5q", "약학대학"], ["Z5OUdLQjLulkk", "6720"], ["IzZVH0sI0RI2g", "LILAC"], ["CNxsJnJJAPbRa", "TheValleyofFear"], ["DbAGgc5h1U9YN", "Adequate"], ["FT6AtM9QZosHX", "1488565"], ["WKlSe48uAtKHQ", "DNDI"], ["C7Wizh5Yl4e6S", "WhoWhenWhereWhatHowWhy"], ["JyFbCou097Zrs", "50"], ["Lh2QlxebsK74S", "sshs1sshs!"], ["9S9FODLW6PSFP", "I"], ["Q9g3LSbuHWbx2", "8.504"], ["HN1gOaN0qyYpG", "77760"], ["b5fbbw3InSSgW", "59%"], ["dElEtEpRoBlEm", "ERROR"], ["vGFOe9rpKzr5S", "꽃밥"], ["3xtmM9Z38HVlm", "아타고"], ["qiL9AYsXhqpMJ", "알데바란"], ["VLDA3omogrKUn", "의행관"], ["eAfydRGlBCK1f", "공인회계사"], ["5FufiWmJwJeZb", "13"], ["TaeaVXtOw3rNH", "시작"], ["SXvckTdvawqhp", "런던"], ["I4kqd6vEhBSnV", "제임스웹우주망원경"]]);
  const { uid, pid, useranswer } = data.data;

  const result = pidToAnswer.get(pid).toLowerCase().replaceAll(' ', '')===useranswer.toLowerCase().replaceAll(' ', '');

  return result;
})

exports.pidToNo = onCall(async (data, context) => {
  const PTN = new Map([["iT9r9E7rAsbbh", "1"], ["yxvyR50n0zlpi", "2"], ["r49mGE4Hwegxh", "3"], ["Y8NEFS9igeevL", "4"], ["ii9ZfnCghgHVw", "5"], ["7LyVZJMQYo856", "6"], ["fognJIoHsNllm", "7"], ["9u7ELf5TmNjFO", "8"], ["9pZEAsd8N5jS4", "9"], ["0Q6e38lxEEx8y", "10"], ["uoLlc1VBf2AIG", "11"], ["WViPImJHfBQsP", "12"], ["kdVl6bkURna4u", "13"], ["tdOIOeq9vZlf4", "14"], ["vCj6LRPbgjCXW", "15"], ["YjsEyAQhcQ4hz", "16"], ["Vkt1V5NLS8xG0", "17"], ["LC8Pmuu9TX30m", "18"], ["Q27pkG84HIgdo", "19"], ["9SraShJBWNV1l", "20"], ["PgPWXYvUNTqgA", "21"], ["DJ41Xl7kx74aL", "22"], ["YO5BSs5hJO2Vn", "23"], ["L4pCo6v0FTfSR", "24"], ["XCglSprRSzdKL", "25"], ["IhhWNjDd8eMFH", "26"], ["Uw9gcnxPCI9DZ", "27"], ["QyrsyxOLg1h8j", "28"], ["8BExfkq0hmQO1", "29"], ["uU1JOUXMBLxey", "30"], ["gl0GNY3aTIQAv", "31"], ["AfPQTXQz8GJ7k", "32"], ["IOd99arvEz41J", "33"], ["ks3Pl46KIkFMG", "34"], ["M8ESWfTrwsDiq", "35"], ["fAek5IuIwY2J8", "36"], ["qc9qy2Yttw4S5", "37"], ["22zwmxYRcV5V6", "38"], ["dDmgIGiU1Uv1S", "39"], ["ADfQkUc3QAYQS", "40"], ["ZmdXLhMtHq7YT", "41"], ["wAcazx0gIcfuP", "42"], ["wRc5PA6ZXPDOQ", "43"], ["pUPDDtWVNshaU", "44"], ["EtP5Z7LGX2BFf", "45"], ["JVzs9kK7swlVd", "46"], ["t0M4Y1Xzrrd01", "47"], ["22gPUqrt2SasV", "48"], ["4i9ka2f4XrcNK", "49"], ["0iXj2U5pnz013", "50"], ["lE5fGe95eXcRu", "51"], ["BYwG2M6fQK5fU", "52"], ["Gy09KbDCVTkAV", "53"], ["hr9cSp6WeAndg", "54"], ["dEakX4GkTTUqY", "55"], ["dwmovkC9bpUv2", "56"], ["OLwAW5W8kNaJb", "57"], ["6xixIEVeTovAV", "58"], ["cdJLo2W1GVPmB", "59"], ["G8nWFjQz5FBhd", "60"], ["Ayc2P8tDMQ97f", "61"], ["BQ6H3sGgchtcX", "62"], ["UjJmxZw6cH1KE", "63"], ["xDTGFIuRAOftw", "64"], ["yznAFnTbu6Jvz", "65"], ["Mh6XS525kbNnb", "66"], ["hY62HFP3mV7TR", "67"], ["ZukvY5oC7hzf6", "68"], ["SF2tH249oTfep", "69"], ["DzzQpmzpoZp3G", "70"], ["BpaCdNYnKY3WT", "71"], ["qEyPivIXR2z2X", "72"], ["8BpqlfY4PTvY5", "73"], ["n7G4vvywclovD", "74"], ["bgrsTaRawXjak", "75"], ["zFwrYR0Hz86rM", "76"], ["dxNSa50vFDb5q", "77"], ["Z5OUdLQjLulkk", "78"], ["IzZVH0sI0RI2g", "79"], ["CNxsJnJJAPbRa", "80"], ["DbAGgc5h1U9YN", "4.3"], ["FT6AtM9QZosHX", "1.01"], ["WKlSe48uAtKHQ", "1/10"], ["C7Wizh5Yl4e6S", "6.1"], ["JyFbCou097Zrs", "9.6"], ["Lh2QlxebsK74S", "null"], ["9S9FODLW6PSFP", "e"], ["Q9g3LSbuHWbx2", "π"], ["HN1gOaN0qyYpG", "4π"], ["b5fbbw3InSSgW", "0"], ["dElEtEpRoBlEm", "ReferenceERROR"], ["vGFOe9rpKzr5S", "10.3683"], ["3xtmM9Z38HVlm", "34.37"], ["qiL9AYsXhqpMJ", "1.2"], ["VLDA3omogrKUn", "2/3"], ["eAfydRGlBCK1f", "3.91"], ["5FufiWmJwJeZb", "12.1"], ["TaeaVXtOw3rNH", "√2020"], ["SXvckTdvawqhp", "37.127"], ["I4kqd6vEhBSnV", "12.25"]]);
  const { pid } = data.data;
  return PTN.get(pid);
})

const pidToLocation = new Map([["CmCZaP3", "우암관"], ["HF4r7X4", "인재관"], ['O4v9WDk', '인재관'], ['QJZGy0R', '예지관'], ["RxZ4zns", "예지관"], ['zVmwcZK', '우암관']]);
exports.LocScore = onCall(async (data, context) =>{
  const { probList } = data.data;
  return probList.length
})
//rawRequest, auth, data

exports.checkQR = onCall(async (data, context) => {
  const No2Check = new Map([['38', 'NgxtX'], ['9', 'MniPi'], ['12.25', 'e2pVz'], ['18', 'MFCDb'], ['63', 'zKk7A'], ['55', '57l5U'], ['ReferenceERROR', 'h2NqV'], ['13', 'gqeW9'], ['6', 'Y0jIg'], ['9.6', 'FURt6'], ['56', 'hfrN2'], ['50', 'TzqFt'], ['2', 'TONj6'], ['6.1', 'HEkD1'], ['44', 'xkShI'], ['e', 'KvJkJ'], ['60', 'QZpCY'], ['π', '6CDgi'], ['42', 'c3DBn'], ['31', 'yZWsM']]);
  const { no, useranswer } = data.data;
  if(!useranswer) return false;
  const result = (useranswer == No2Check.get(String(no)));
  return result;
})