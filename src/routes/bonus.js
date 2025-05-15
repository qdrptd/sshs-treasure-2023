import { doc, updateDoc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Image, Input, List, Loader, Segment } from "semantic-ui-react";
import Authstate from "../components/Authstate";
import { auth, firestore, functions } from "../firebase";


export default function Bonus() {
  const navigate = useNavigate()
  const params = useParams()
  const bid = params.bid
  const [user, loading1] = useAuthState(auth);
  const [userdata, loading3] = useDocument(
    doc(firestore, 'users', user?.uid || "0")
  )

  if(!user){
    return(
        <Segment>
          <p>
            <Link to="/login">로그인</Link>을 한 후 이용할 수 있습니다!
          </p>
        </Segment>
    )
  }
  async function getBonus(){
    
    let { found } = userdata?.data() 
    let { foundno } = userdata?.data()
    let { solved, solvedno } = userdata?.data();
    found.push(bid);
    foundno.push(12345);
    solved.push(bid);
    solvedno.push(12345);
    await updateDoc(doc(firestore, "users", user.uid), {found: found});
    await updateDoc(doc(firestore, "users", user.uid), {foundno: foundno});
    await updateDoc(doc(firestore, "users", user.uid), {solved: found});
    await updateDoc(doc(firestore, "users", user.uid), {solvedno: foundno});
    
  }
  return ( 
    <div>
    <Authstate/>
    <Button>보너스 받기!</Button>
    </div>
  )
}