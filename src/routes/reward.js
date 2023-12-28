import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Header, Loader, Segment, Table, List, ListItem, Button, Image} from "semantic-ui-react";
import Authstate from "../components/Authstate";
import { auth, firestore } from "../firebase";
import { getDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Reward() {
    const navigate = useNavigate();
    const [user, userLoading] = useAuthState(auth);
    const [userdata, dataLoading] = useDocument(doc(firestore, 'users', user?.uid || "0") || "0")
    console.log(user?.uid)
    const uid = user?.uid
    useEffect(() => {
        if (userLoading || dataLoading) return;
    })
    // const { reward } = userdata?.data();
    
    const today = new Date().getDate();
    console.log(userdata)


    // return (
    //     <div>
    //         <Header as='h2'>
    //         보물찾기
    //         </Header>
    //         <Segment>
    //             보상은 오늘 정오 이후 받을 수 있습니다.
    //         </Segment>
    //     </div>
    // )

    
    if (!userLoading && (user === undefined || user === null)) {
        return (
          <div>
            <Header as='h2'>
              보물찾기
            </Header>
            <Segment>
                <Link to="/login">로그인</Link> 후 이용할 수 있습니다.<br />
            </Segment>
          </div>
        )
    }
    if (userLoading || dataLoading) {
        console.log('as')
        return (
          <div>
            <Header as='h2'>
                보상 받기
            </Header>
            <Authstate />
          </div>
        )
      }
    
    const {location} = userdata.data();
    function Receive(){
        return(
            <div>
                <p>당신의 지역은 {userdata.data().location}입니다.<br/>
                </p> 
                {/* <Button onClick={async ()=>{
                        await updateDoc(doc(firestore, "users", uid), {reward: today})
                        setCansee(true)
                }
                }>보상 받기</Button> */}
            </div>
        )
        
    }
    console.log(today)
    return(
        
        <div>
            <Header as='h2'>
                보상 받기
            </Header>
            <Authstate/>
            <Image src = {require('../rewards/'+String(today)+String(location)+'.png')}/>
            {/* {
                !userdata || !userdata.data() || 
                <div>
                    userdata.data().location == '우암관'?
                    <Segment>어떤 문제의 답은 </Segment>
                </div>
            } */}
        </div>
    )
}