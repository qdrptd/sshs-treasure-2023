import { collection, doc, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce, useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Header, Loader, Message, Segment, Table, Form, Select, Button } from "semantic-ui-react";
import { auth, firestore, functions } from "../firebase";
import { Link } from "react-router-dom";
import Authstate from "../components/Authstate.js";
import { HttpsCallable, httpsCallable } from "firebase/functions";

export default function Locate() {
    return(
        <div>
            <Header as='h2'>
              보물찾기
            </Header>
            <Segment>
                지금은 지역을 바꿀 수 없어요!
            </Segment>
          </div>
        )
    // const navigate = useNavigate()

    // const [user, loading1] = useAuthState(auth)
    // const [loc, setLoc] = useState("대자연")
    // const [userdata, loading2] = useDocument(
    //     doc(firestore, 'users', user?.uid || "0")
    // )
    
    // // const checkAnswer = httpsCallable(functions, 'checkAnswer');
    // // checkAnswer({"CmCZaP3" "998"}).then((value) => {console.log(value)}).catch((e)=>{console.error(e)});
    
    // const location = userdata?.data().location;
    // console.log(location)
    // useEffect(() => {
    //     setLoc(location)
    // }, [location])

    // if (!loading1 && (user === undefined || user === null)) {
    //     return (
    //       <div>
    //         <Header as='h2'>
    //           보물찾기
    //         </Header>
    //         <Segment>
    //             <Link to="/login">로그인</Link> 후 이용할 수 있습니다.<br />
    //         </Segment>
    //       </div>
    //     )
    // }
    // const today = new Date().getDate();
    
    // if (loading1 || loading2) {
    //     return (
    //         <div>
    //             <Authstate/>
    //             <Segment>당신의 구역을 선택하세요! </Segment>
    //         </div>
    //     )
    // }
    // console.log(loc)

    // async function changeLocation(){
    //     if(loc!=='대자연') alert('당신의 구역은 ' + loc + '입니다.');
    //     else alert('당신은 구역을 선택하지 않았습니다.');
    //     await updateDoc(doc(firestore, "users", user.uid), {location: loc})
    // }
    // return (
    //     <div>
    //         <Header as='h2'>
    //             보물찾기
    //         </Header>
    //         <Authstate/>
    //         <Segment>당신의 구역을 선택하세요!<br/>
    //         확인 버튼을 눌러야 저장됩니다.</Segment>
    //         <Button color={loc==='우암관'?"black":"white"} onClick={()=>setLoc('우암관')}>우암관</Button>
    //         <Button color={loc==='예지관'?"black":"white"} onClick={()=>setLoc('예지관')}>예지관</Button>
    //         <Button color={loc==='인재관'?"black":"white"} onClick={()=>setLoc('인재관')}>인재관</Button>
    //         <Button color={loc==='대자연'?"black":"white"} onClick={()=>setLoc('대자연')}>미선택</Button>
    //         <br/>
    //         <br/>
    //         <Button color="green" onClick={changeLocation}>확인</Button>
    //         <Segment>
    //           <Header as='h4'>보상/능력 정리</Header>
    //           우암관 일반 보상: 임의의 난이도 별 1개 또는 2개인 문제의 정답<br/>
    //           예지관 일반 보상: 모든 구역의 선택자별 그 지역에서 푼 문제 수 리더보드<br/>
    //           인재관 일반 보상: 그날 공개될 힌트의 문제 번호<br/>
    //           대자연 일반 보상: 발견 횟수가 적은 문제 20개의 발견 횟수 및 소속 구역<br/>
    //         </Segment>
    //     </div>
    // )
}