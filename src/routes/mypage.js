import { doc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Header, Loader, Segment, Table, List, ListItem } from "semantic-ui-react";
import Authstate from "../components/Authstate";
import { auth, firestore } from "../firebase";
import { location } from "../location.js";
import { getDoc } from "firebase/firestore";


export default function Mypage() {
  const navigate = useNavigate()

  const [user, loading1] = useAuthState(auth)
  const [userdata, loading2] = useDocument(
    doc(firestore, 'users', user?.uid || "0")
  )
  
  
  useEffect(() => {
    if (!loading1 && (user === undefined || user === null)) {alert('로그인 후 이용할 수 있습니다');navigate('/')}
  })
  if (userdata === undefined) return <></>

  if (loading1 || loading2) {
    return (
      <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white p-10 m-auto">
        <Header as='h2'>
          Mypage
        </Header>
        <Authstate />
        <Loader active inline='centered' />
      </div>
    )
  }

  const { found, solved } = userdata?.data()
  const { foundno, solvedno } = userdata?.data()
  
  
  const probs = !found ? [] : found.filter((item) =>
    !solved.includes(item)
  )
  const nos = !foundno ? [] : foundno.filter((item) =>
    !solvedno.includes(item)
  )
  let probsNos = [];
  for(let i=0;i<nos.length;i++){
    probsNos.push([probs[i], nos[i]])
  }
  probsNos = probsNos.sort((a, b) => {
    return  a[1] - b[1];
  })
  console.log(probsNos)
  console.log(probsNos.map((item, i) => {
    console.log(item, i);
    return item[0]
  }))
  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white p-10 m-auto">
      <Header as='h2'>
        Mypage
      </Header>
      <Authstate />
      <Segment>
        일부 문제나 사이트 자체가 오류로 인해 잠수함 패치되는 경우가 가끔 있습니다.
        가끔 새로고침을 눌러 주세요.
        이외에도 문제 오류가 의심되거나 사이트 자체의 버그가 생겼다면 망설이지 말고 DM해주세요!<br/>
        특히 맞았는데 왜 틀렸지??하면 DM해서 확인해보는 것도 좋은 방법이에요...
      </Segment>
      <Table basic bordered unstackable textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>저장 문제</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            probsNos.map((item, i)=> item[0]).map((item, i) => {
              if (!item) return null
              return (<Table.Row>
                <Table.Cell><a href={"problem/" + item}>{probsNos[i][1]}번 문제 - {location.get(probsNos[i][1])}</a></Table.Cell>
              </Table.Row>)
            }
            )
          }
        </Table.Body>
      </Table>

    </div>
  )
}