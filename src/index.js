import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import Fakemain from './routes/fakemain';
import Leaderboard from './routes/leaderboard';
import Login from './routes/login';
import Main from './routes/main';
import Problem from './routes/problem';
import Mypage from './routes/mypage';
import Location from './routes/locate.js';
import Reward from './routes/reward.js';
import LocLeaderboard from './routes/locleaderboard.js';
import Hint from './routes/hint.js';
import NotFound from './routes/notfound.js';
import Bonus from './routes/bonus.js';
import RefError from './routes/referror.js';
import Admin from './routes/admin.js';
import { query, collection } from 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { setDoc, doc } from 'firebase/firestore';
import {firestore} from './firebase.js';
import {PidData, ProblemData} from './temp.js';
import { Segment } from 'semantic-ui-react';
// function addProblem(){
//   const n = ProblemData.length;
//   for(let i=0;i<n;i+=1){
//     setDoc(doc(firestore, 'problem', PidData[i]), ProblemData[i])
//   }
// }
// addProblem();



const root = document.getElementById('root');
const todayDate = new Date().getDate();

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="mypage" element={<Mypage />} />
      <Route path="problem/:pid" element={<Problem />} />
      <Route path="locate" element = {<Location/>} />
      <Route path="reward" element = {<Reward/>} />
      <Route path="locleaderboard" element = {<LocLeaderboard/>}/>
      <Route path="hint/:hid" element={<Hint/>}/>
      <Route path="/bonus/:bid" element={<Bonus/>}/>
      <Route path="dElEtEpRoBlEm" element ={<RefError/>}/>
      <Route path="adminqdrptdasdf" element={<Admin/>}/>
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

