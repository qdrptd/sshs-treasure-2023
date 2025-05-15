import { doc, updateDoc, getDoc, query, collection } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Image, Input, List, Loader, Segment } from "semantic-ui-react";
import Authstate from "../components/Authstate";
import { auth, firestore, functions } from "../firebase";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
// import { ProblemData, UserData } from "../lib/types";

const checkList = ['38', '9', '12.25', '18', '63', '55', 'ReferenceERROR', '13', '6', '9.6', '56', '50', '2', '6.1', '44', 'e', '60', 'π', '42', '31']
const calculatePoint = (S, N) => {
  if (N === 0) return S
  return Math.floor(S / N)
}



const calcMulti = (userdata, pid) => {
  if (userdata === undefined) return 0
  
  let { error } = userdata.data()
  let errors = error[pid]
  if(!errors) errors = 0
  const ans = 1 - (userdata.data().revealed?.includes(pid) ? 0.2 : 0) - (errors ? errors : 0) * 0.05
  if (ans > 0.5) return ans
  return 0.5
}

export default function Problem() {
  const navigate = useNavigate()
  const params = useParams()
  const pid = params.pid
  const [user, loading1] = useAuthState(auth)
  const [problem, loading2] = useDocument(
    doc(firestore, 'problem', pid)
  )
  console.log(problem)
  const [userdata, loading3] = useDocument(
    doc(firestore, 'users', user?.uid || "0")
  )

  const [checksum, setChecksum] = useState("")
  const [useranswer, setUseranswer] = useState("")
  const checkAnswer = httpsCallable(functions, 'checkAnswer');
  const checkQR = httpsCallable(functions, 'checkQR');
  useEffect(() => {
    if (!loading1 && (user === undefined || user === null)) return
    if (!loading2 && problem !== undefined && !problem.exists()) navigate('/')
    
  })

  const [userdatum, loading5] = useCollectionDataOnce(
    query(collection(firestore, "users"))
  )

  if (loading1 || loading2 || loading3 || loading5) {
    return (
      <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white p-10 m-auto">
        <Header as='h2'>
          보물찾기
        </Header>
        <Loader active inline='centered' />
      </div>
    )
  }

  if (!loading1 && (user === undefined || user === null)) {
    return (
      <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white p-10 m-auto">
        <Header as='h2'>
          보물찾기
        </Header>
        <Segment>
          <p>
            문제를 보기 위해서는 <Link className="mx-auto text-violet-600 font-medium underline hover:text-violet-800 hover:underline cursor-pointer transition-all" to="/login">로그인</Link>이 필요해요!<br />
            로그인을 한 후 다시 QR코드를 인식해주세요!
          </p>
        </Segment>
      </div>
    )
  }
  const { count, hint, find, no, location, difficulty } = problem?.data()
  const newfind = userdatum?.map((data) =>{ 
    return data.found.includes(pid)? 1:0;
  }).reduce((a, b) => a+b, 0)

  const solvepoint = 2000
  const discoverpoint = 200
  const { solved, solvedno, error } = userdata?.data()
  const imagePath = "/img/"+pid+".jpg";
  const url = "../problems/"+pid+".jpg";
  let { found } = userdata?.data() 
  let { foundno } = userdata?.data()
  const not_discovered = (found.filter((item) => item === pid)).length === 0
  if (solved.includes(pid)) {
    return (
      <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white p-10 m-auto">
        <Header as='h2'>
          보물찾기
        </Header>
        <Authstate />
        <Segment>
          <p>이미 해결한 문제에요!</p>
        </Segment>
        <Segment>
        <p><b>문제</b></p>
        <Image className="mt-3" src={require("./../problems/"+pid+".png")} size = "huge"/>
      </Segment>   
      </div>
    )
  }
  const todayDate = new Date().getDate();
  if(todayDate == 29){
    return(<h1>보물찾기가 끝났습니다!</h1>);
  }
  const { revealed } = userdata?.data()
  const dif2Star = new Map([['VE', 1], ['E', 2], ['N', 3], ['H', 4], ['VH', 5]]);
  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white p-10 m-auto">
      <Header as='h2'>
        보물찾기
      </Header>

      <Authstate />

      <Segment>
        <List bulleted>
          <List.Item>
            <b>{no}</b>번 문제  (난이도 {difficulty=='?' ? '?' : "★".repeat(dif2Star.get(String(difficulty))) + "☆".repeat(5-dif2Star.get(String(difficulty)))})
          </List.Item>
          <List.Item>
            이 문제는 <b>{location}</b>의 문제입니다.
          </List.Item>
          <List.Item>
            발견자 <b>{newfind}</b>명
          </List.Item>

          <List.Item>
            해결자 <b>{count}</b>명
          </List.Item>
          <List.Item>
            {7-error[pid]||7}번 더 틀리면 문제를 풀 수 없습니다.
          </List.Item>
          {
            not_discovered &&
            <List.Item>
              발견 보너스로 <b>{discoverpoint}</b> 포인트 획득
            </List.Item>
          }

          <List.Item>
            해결시 최대 <b>{calculatePoint(solvepoint, count + 1)}</b> 포인트 획득 가능
          </List.Item>
        </List>
        {
          not_discovered &&(
            (checkList.includes(String(no))) ? 
            <div><p>QR 위에 적혀 있는 확인 문자를 입력해주세요.</p>
            <Input onChange={(event, value) => {
              setChecksum(value.value)
            }}></Input>
            <Button color="violet" onClick={async () => {
              const cQR = await checkQR({no: no, useranswer:checksum}).then((res)=>{return res.data;})
              if(!cQR){
                alert('확인 문자가 틀렸습니다.');
                navigate('/')
                return;
              }
              const today = new Date().getDate();
              if(today == 29){
                alert('보물찾기가 끝났습니다!');
                navigate('/');
                return;
              }
              const { point } = userdata?.data()
              const receivePoint = discoverpoint;
              const newPoint = Number(point) + Number(receivePoint);
              await updateDoc(doc(firestore, "users", user.uid), {point: newPoint})
  
              const { foundList } = problem?.data();
  
              found.push(pid);
              foundno.push(no);
              const newFind = Number(find)+1;
              let newError = error;
              newError[pid] = 0;
              await updateDoc(doc(firestore, "users", user.uid), {found: found});
              await updateDoc(doc(firestore, "users", user.uid), {foundno: foundno});
              await updateDoc(doc(firestore, "problem", pid), {find: newFind});
              await updateDoc(doc(firestore, "users", user.uid), {error: error});
  
              let newFoundList = foundList;
              newFoundList.push(user.uid);
              await updateDoc(doc(firestore, "problem", pid), {foundList: newFoundList});
            }}>
              발견 보너스 획득하기!
            </Button></div>
            :
          <Button color="violet" onClick={async () => {
            const today = new Date().getDate();
              if(today == 29){
                alert('보물찾기가 끝났습니다!');
                navigate('/');
                return;
              }
            const { point } = userdata?.data()
            const receivePoint = discoverpoint;
            const newPoint = Number(point) + Number(receivePoint);
            await updateDoc(doc(firestore, "users", user.uid), {point: newPoint})

            const { foundList } = problem?.data();

            found.push(pid);
            foundno.push(no);
            const newFind = Number(find)+1;
            let newError = error;
            newError[pid] = 0;
            await updateDoc(doc(firestore, "users", user.uid), {found: found});
            await updateDoc(doc(firestore, "users", user.uid), {foundno: foundno});
            await updateDoc(doc(firestore, "problem", pid), {find: newFind});
            await updateDoc(doc(firestore, "users", user.uid), {error: error});

          }}>
            발견 보너스 획득하기!
          </Button>)
        }
      </Segment>
      
      <Segment>
        <p><b>문제</b></p>
        <Image className="mt-3" src={require("./../problems/"+pid+".png")} size = "huge"/>
      </Segment>      

      {
        <Segment> 
          <p><b>제출</b></p>
          
          <Input className="my-3" fluid placeholder='답' onChange={(event, value) => {
            setUseranswer(value.value)
          }} />
          {(!not_discovered && error[pid]<7) ?
            <div>
            <Button basic color="violet"
              onClick={async () => {
                const today = new Date().getDate();
              if(today == 29){
                alert('보물찾기가 끝났습니다!');
                navigate('/');
                return;
              }
                const uid = user.uid;
                const result = await checkAnswer({uid:uid, pid:pid, useranswer:useranswer}).then((res)=>{return res.data;});
                console.log(result)
                if(result){
                  const { point } = userdata?.data();
                  const receivePoint = calculatePoint(solvepoint, count + 1) * calcMulti(userdata, pid);
                  const newPoint = Number(point) + Number(receivePoint);
               
                  await updateDoc(doc(firestore, "users", user.uid), {point: newPoint})
                  console.log(location)
                  
                  const { solvedList } = problem?.data();
                  
                  solvedList.forEach(async (uid) => {
                    if(uid === ''){
                      return;
                    }
                    const otherUserData = doc(firestore, 'users', uid || "0")
                    const promise = await getDoc(otherUserData)
                    const { point } = promise.data()
                    const oldReceivePoint = calculatePoint(solvepoint, count) * calcMulti(promise, pid);
                    const newReceivePoint = calculatePoint(solvepoint, count + 1) * calcMulti(promise, pid);
                    await updateDoc(doc(firestore, "users", uid), {point: point - oldReceivePoint + newReceivePoint});
                  })

                  let newSolved = solved;
                  newSolved.push(pid);
                  let newSolvedNo = solvedno;
                  if(!newSolvedNo) newSolvedNo = [];
                  newSolvedNo.push(no);
                  const newCount = Number(count)+1;
                  await updateDoc(doc(firestore, "users", user.uid), {solved: newSolved});
                  await updateDoc(doc(firestore, "users", user.uid), {solvedno: newSolvedNo});
                  await updateDoc(doc(firestore, "problem", pid), {count: newCount});

                  let newSolvedList = solvedList;
                  newSolvedList.push(user.uid);
                  await updateDoc(doc(firestore, "problem", pid), {solvedList: newSolvedList});
                  
                  

                  alert('정답입니다!');
                }
                else{
                  error[pid] = Number(error[pid]) + 1;
                  await updateDoc(doc(firestore, "users", user.uid), {error: error})
                  alert('오답입니다');
                }
              }}>
              정답 제출하기!
            </Button>
            </div>
            :(error[pid]>=7?<Segment>이 문제를 더는 풀 수 없어요...</Segment>:<p></p>)
          }
          {
            <h3>이 문제를 풀면 {parseInt(calculatePoint(solvepoint, count + 1) * calcMulti(userdata, pid))}점을 획득할 수 있어요!</h3>
          }
          {not_discovered &&
            <p><b>제출하기 위해 발견 보너스를 받아주세요!</b></p>
          }
        </Segment>
      }
    </div >
  )
}