import { doc, updateDoc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Image, Input, List, Loader, Segment } from "semantic-ui-react";
import Authstate from "../components/Authstate";
import { auth, firestore, functions } from "../firebase";


export default function Hint() {
  const navigate = useNavigate()
  const params = useParams()
  const hid = params.hid
  const [user, loading1] = useAuthState(auth)
  console.log('./hints/'+hid+'.png');
  return ( 
    <div>
    <Authstate/>
    <Image src = {require('./../hints/'+hid+'.png')} size='huge'/>
    </div>
  )
}