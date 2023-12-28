import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Button, Segment, Input, Table, Grid } from "semantic-ui-react";
import { auth, firestore, functions } from "../firebase";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from 'react-device-detect'
import { HttpsCallable, httpsCallable } from "firebase/functions";
import { LocScore, location } from "../location";

export default function Authstate() {
  
  const navigate = useNavigate()
  const [user, loading1] = useAuthState(auth);
  
  const [userdata, loading2] = useDocument(
    doc(firestore, 'users', user?.uid || "0")
  )
  
  const [name, setName] = useState("");
  const solvedno = userdata?.data().solvedno;
  console.log(solvedno)
  if (loading1 || loading2) {
    return (
      <Segment loading><br /><br /><br /><br /><br /></Segment>
    )
  } else if (user === null || user === undefined || userdata === undefined) {
    return (
      <Segment>
        <Button color="violet" onClick={() => { navigate('/login') }}>로그인</Button>
      </Segment>
    )
  } else if(!user.displayName){
    return (
      <Segment>
        <p>이름(실명 권장)을 입력해 주세요.</p>
        <Input type = 'text' onChange = {(e, v)=>{setName(v.value);}}></Input>
        <Button onClick = {()=>{updateProfile(user, {displayName:name});navigate('/')}}>확인</Button>
      </Segment>
    )
  }
  else{
    const locationScore = LocScore(solvedno);
    return (
      <Segment>
        <Grid>
          <Grid.Column width = {5}>
          <b>{user.displayName}</b>님의 탐험 기록입니다.<br/>
          <Table celled striped collapsing padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">찾은 문제 수</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">푼 문제 수</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">포인트</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">소속</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            
            <Table.Row>
              <Table.Cell textAlign="center">{userdata.data().found.length}</Table.Cell>
              <Table.Cell textAlign="center">{userdata.data().solved.length}</Table.Cell>
              <Table.Cell textAlign="center">{Math.floor(userdata.data().point)}</Table.Cell>
              <Table.Cell textAlign="center">{userdata.data().location}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">우암관</Table.Cell>
              <Table.Cell textAlign="center">예지관</Table.Cell>
              <Table.Cell textAlign="center">인재관</Table.Cell>
              <Table.Cell textAlign="center">대자연</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">{locationScore[0]}</Table.Cell>
              <Table.Cell textAlign="center">{locationScore[1]}</Table.Cell>
              <Table.Cell textAlign="center">{locationScore[2]}</Table.Cell>
              <Table.Cell textAlign="center">{locationScore[3]}</Table.Cell>
            </Table.Row>
          </Table.Body>
          </Table>
          </Grid.Column>
          
        </Grid>
        <br/>
        <Link to="/mypage"><Button>MyPage</Button></Link>
        <Button color='red' className='mt-15' onClick={() => { document.body.style.backgroundColor='white';auth.signOut() }}>로그아웃</Button>
      </Segment>
    )
  }
}