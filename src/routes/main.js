import { Link } from "react-router-dom";
import { Header, List, Segment, Button } from "semantic-ui-react";
import { doc } from "firebase/firestore";
import Authstate from "../components/Authstate";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Main() {
  const [user, loading1] = useAuthState(auth);
  const [userdata, loading3] = useDocument(
    doc(firestore, 'users', user?.uid || "0")
  )
  return (
    <div>
      <Header as='h2'>
        보물찾기
      </Header>
      <Authstate />
      <Segment>
        <p>
          <b>보물찾기에 오신 것을 환영합니다!</b><br />
          여러분은 직접 문제를 찾고 해결해 포인트를 얻게 됩니다.<br/>
          가장 많은 포인트를 얻어 <b>설곽의 지배자</b>가 되세요!
          <b>***12/28자 공지 : 5A부터 5D까지의 힌트QR을 새로 부착했습니다.<br />
          마지막 날입니다!!!!! 모두 화이팅!!!<br /></b>
        </p>
        <h3>규칙</h3>
        <ul>
          <li>4개의 구역에 1번부터 80번까지의 문제가 담긴 QR코드가 숨겨져 있습니다.</li>
          <li>문제를 발견하면 200포인트를 얻습니다. <br/></li>
          <li>문제를 해결할 시에 floor(2000/문제를 해결한 사람의 수) 포인트를 받습니다.<br/></li>
          <li>자정마다 자신이 속하는 지역의 보상을 받습니다(1시 이후에 받는 것을 권장합니다.)</li>
          <ul><li>우암관: 임의의 난이도 ★☆☆☆☆ 또는 ★★☆☆☆ 문제의 정답 (어떤 문제인지는 공개되지 않습니다.) </li><li>예지관: 자정의 구역 별 문제 수 리더보드</li><li>인재관: 오늘 공개될 힌트 문제의 번호</li><li>대자연: 구역별 미발견된 QR코드의 수</li></ul>
          <li>지역을 2번 이상 변경할 시에 불이익이 있을 수 있습니다.</li>
        </ul>
        

        <p>
          <Link to="/leaderboard"><Button>리더보드</Button></Link>
          <Link to="/mypage"><Button>MyPage</Button></Link>
          <Link to='/locate'><Button>지역 변경하기</Button></Link>
          <Link to='/reward'><Button icon='shopping bag'></Button></Link>
        </p>
      </Segment>
    </div>
  )
}