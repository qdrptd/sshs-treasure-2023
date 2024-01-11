import { collection, doc, query, updateDoc, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce, useDocument, useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Checkbox, Header, Loader, Message, Table } from "semantic-ui-react";
import { auth, firestore, functions } from "../firebase";
import { noTocode } from "../temp";
import { codeTono } from "../temp";
import { httpsCallable } from "firebase/functions";
export default function Leaderboard() {
  const navigate = useNavigate()

  const [user, loading1] = useAuthState(auth)
  const [userdata, loading2] = useDocument(
    doc(firestore, 'users', user?.uid || "0")
  )
  const [userdatum, loading3] = useCollectionDataOnce(
    query(collection(firestore, "users"))
  )
  const [userdatam, loading4] = useCollectionData(
    query(collection(firestore,'users')),{
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )
  const [probdatum, l4] = useCollectionDataOnce(
    query(collection(firestore, 'problem'))
  )
  useEffect(() => {
    if (!loading1 && (user === undefined || user === null)) {alert('로그인 후 이용할 수 있습니다'); navigate('/');}
  })

  if (loading1 || loading2 || loading3) {
    return (
      <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white p-10 m-auto">
        <Header as='h2'>
          보물찾기
        </Header>
        <Message warning>
          <Message.Header>리더보드 업데이트에 관하여</Message.Header>
          <p>
            리더보드는 실시간으로 업데이트되지 않습니다. 정보 갱신을 위해서는 새로고침을 해 주시기 바랍니다.
          </p>
        </Message>
        <Loader active inline='centered' />
      </div>
    )
  }
  
  const userpoint = userdata?.data().point
  const phone = userdata?.data().phone
  const solved = userdata?.data().solved.length 
  const allpoints = userdatum.map((data) => {
    if(!data.found) return [0, 0, 0];
    let point = 200;
    point += 200 * data.found.length;
    if(!data.solved) return [point, data.found.length, 0];
    
    const s = data.solved.map((prob) => {
      const p = probdatum.find((data)=>{return data.no == codeTono.get(prob)})
      return (2000/p.count === Infinity ? 2000 : 2000/p.count) * (1-0.05*(data.error[prob] ? data.error[prob]: 0))
    }).reduce((a, b) => a+b, 0)
    point += s
    if(phone == data.phone){
      if(userpoint != point){
        updateDoc(doc(firestore, "users", user.uid), {point: point})
      }
    }
    return [point, data.found.length, data.solved.length, data.phone]
  }).sort(
    function (a, b) {
      if (b[0] !== a[0]) return a[0] - b[0]
      return a[2] - b[2]
    }
  )
  // const as = probdatum.map((prob) => {
  //   const solv = userdatum.map((u) => {
  //     return u.solvedno.includes(prob.no) ? 1:0;
  //   }).reduce((a,b) => a+b, 0)
  //   const f = userdatum.map((u) => {
  //     return u.foundno.includes(prob.no) ? 1:0;
  //   }).reduce((a,b) => a+b, 0)
  //   // updateDoc(doc(firestore,"problem", noTocode.get(String(prob.no)), {count: solv}));
  // })
  const rank = new Map(allpoints.map((x, i) => [x[0] * 1000 + x[2], allpoints.length - i]));
  console.log(userpoint * 1000 + solved, rank.get(userpoint * 1000 + solved))
  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white p-10 m-auto">
      <Header as='h2'>
        보물찾기
      </Header>
      <Message warning>
        <Message.Header>리더보드 업데이트에 관하여</Message.Header>
        <p>
          리더보드는 실시간으로 업데이트되지 않습니다. 정보 갱신을 위해서는 새로고침을 해 주시기 바랍니다.
        </p>
      </Message>
      <p>
        현재 <b>{Math.floor(userpoint)}</b> 포인트를 보유하고 있으며, 전체 <b>{rank.get(userpoint * 1000 + solved)}</b>위에요.
      </p>
      <Table basic bordered unstackable textAlign="center">
        
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>순위</Table.HeaderCell>
            <Table.HeaderCell>포인트</Table.HeaderCell>
            <Table.HeaderCell>찾은 문제</Table.HeaderCell>
            <Table.HeaderCell>푼 문제</Table.HeaderCell>
            <Table.HeaderCell>전화번호</Table.HeaderCell>
            <Table.HeaderCell>체크</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            allpoints.reverse().map((x, i) =>
              <Table.Row key={i} >
                <Table.Cell>{rank.get(x[0] * 1000 + x[2])}</Table.Cell>
                <Table.Cell>{Math.floor(x[0])}</Table.Cell>
                <Table.Cell>{x[1]}</Table.Cell>
                <Table.Cell>{x[2]}</Table.Cell>
                <Table.Cell>{x[3]}</Table.Cell>
                <Table.Cell>{rank.get(x[0] * 1000 + x[2])<=11 ? <Checkbox></Checkbox>: null}</Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    </div>
  )
}