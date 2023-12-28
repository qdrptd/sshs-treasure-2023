import { collection, doc, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce, useDocument, useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Header, Loader, Message, Table } from "semantic-ui-react";
import { auth, firestore } from "../firebase";
import { LocScore, LocIdx } from "../location";
export default function LocLeaderboard() {
  const navigate = useNavigate()

  const [user, loading1] = useAuthState(auth)
  const [userdata, loading2] = useDocument(
    doc(firestore, 'users', user?.uid || "0")
  )
  const [userdatum, loading3] = useCollectionDataOnce(
    query(collection(firestore, "users"),where("location", '==', userdata?.data().location||"0"))
  )

  // const uids = userdatam.map((data => {data.uid}))
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

  const point = userdata?.data().point
  const solved = userdata?.data().solved.length 
  const location = userdata?.data().location;
  const allRanks = userdatum.map((data) => {
    if(!data.found) return [0, 0, 0];
    const solvedEverywhere = LocScore(data.solvedno);
    const solvedhere = solvedEverywhere[LocIdx(location)]
    return [solvedhere, data.point, data.solved.length, data.phone]
  }).sort(
    function (a, b) {
      if (b[0] !== a[0]) return a[0] - b[0]
      return a[1] - b[1]
    }
  )
  console.log(allRanks)
  const rank = new Map(allRanks.map((x, i) => [x[1] * 1000 + x[0], allRanks.length - i]));
//   console.log(point * 1000 + solved, rank.get(point * 1000 + solved))
  console.log(point * 1000 + LocScore(userdata?.data().solvedno)[LocIdx(location)])
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
        현재 <b>{Math.floor(point)}</b> 포인트를 보유하고 있으며, 전체 <b>{rank.get(point * 1000 + LocScore(userdata?.data().solvedno)[LocIdx(location)])}</b>위에요.
      </p>
      <Table basic bordered unstackable textAlign="center">
        
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>순위</Table.HeaderCell>
            <Table.HeaderCell>{location}에서 푼 문제</Table.HeaderCell>
            <Table.HeaderCell>포인트</Table.HeaderCell>
            <Table.HeaderCell>푼 문제</Table.HeaderCell>
            <Table.HeaderCell>전화번호</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            allRanks.reverse().map((x, i) =>
              <Table.Row key={i} >
                <Table.Cell>{rank.get(x[1] * 1000 + x[0])}</Table.Cell>
                <Table.Cell>{Math.floor(x[0])}</Table.Cell>
                <Table.Cell>{Math.floor(x[1])}</Table.Cell>
                <Table.Cell>{x[2]}</Table.Cell>
                <Table.Cell>{x[3]}</Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    </div>
  )
}