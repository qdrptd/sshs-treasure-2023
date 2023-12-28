export const location = new Map([['1', '예지관'], ['2', '대자연'], ['3', '우암관'], ['4', '우암관'], ['5', '인재관'], ['6', '인재관'], ['7', '우암관'], ['8', '예지관'], ['9', '예지관'], ['10', '예지관'], ['11', '예지관'], ['12', '대자연'], ['13', '대자연'], ['14', '대자연'], ['15', '우암관'], ['16', '인재관'], ['17', '예지관'], ['18', '인재관'], ['19', '인재관'], ['20', '대자연'], ['21', '대자연'], ['22', '대자연'], ['23', '대자연'], ['24', '인재관'], ['25', '우암관'], ['26', '우암관'], ['27', '예지관'], ['28', '우암관'], ['29', '우암관'], ['30', '대자연'], ['31', '우암관'], ['32', '예지관'], ['33', '예지관'], ['34', '우암관'], ['35', '인재관'], ['36', '우암관'], ['37', '예지관'], ['38', '예지관'], ['39', '인재관'], ['40', '인재관'], ['41', '인재관'], ['42', '인재관'], ['43', '대자연'], ['44', '대자연'], ['45', '대자연'], ['46', '우암관'], ['47', '우암관'], ['48', '예지관'], ['49', '우암관'], ['50', '우암관'], ['51', '예지관'], ['52', '우암관'], ['53', '예지관'], ['54', '대자연'], ['55', '예지관'], ['56', '예지관'], ['57', '인재관'], ['58', '인재관'], ['59', '대자연'], ['60', '예지관'], ['61', '대자연'], ['62', '인재관'], ['63', '인재관'], ['64', '대자연'], ['65', '대자연'], ['66', '우암관'], ['67', '예지관'], ['68', '인재관'], ['69', '우암관'], ['70', '대자연'], ['71', '인재관'], ['72', '대자연'], ['73', '인재관'], ['74', '인재관'], ['75', '인재관'], ['76', '예지관'], ['77', '인재관'], ['78', '대자연'], ['79', '예지관'], ['80', '우암관'], ['4.3', '인재관'], ['1.01', '예지관'], ['1/10', '예지관'], ['6.1', '우암관'], ['9.6', '인재관'], ['null', '인재관'], ['e', '우암관'], ['π', '우암관'], ['4π', '예지관'], ['0', '예지관'], ['ReferenceERROR', '예지관'], ['10.3683', '우암관'], ['34.37', '대자연'], ['1.2', '우암관'], ['2/3', '대자연'], ['3.91', '인재관'], ['12.1', '우암관'], ['√2020', '대자연'], ['37.127', '대자연'], ['12.25', '대자연']])
export function LocScore(probList){
    if(!probList) return [0, 0, 0, 0];
    let lscore=[0, 0, 0, 0];
    probList.forEach((x)=>{
        console.log(x)
        switch(location.get(String(x))){
            case '우암관':
                lscore[0] += 1;
                break;
            case '예지관':
                lscore[1] += 1;
                break;
            case '인재관':
                lscore[2] += 1;
                break;
            case '대자연':
                lscore[3] += 1;
                break;
        }
    })
    return lscore;
}
export function LocIdx(loc){
    if(loc=='우암관') return 0;
    if(loc=='예지관') return 1;
    if(loc=='인재관') return 2;
    if(loc=='대자연') return 3;
}