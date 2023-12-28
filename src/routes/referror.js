import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Image, Input, List, Loader, Segment } from "semantic-ui-react";
import Authstate from "../components/Authstate";
import { auth, firestore, functions } from "../firebase";


export default function RefError() {
  return ( 
    <div>
    <Authstate/>
    <Image src = {require('./../problems/이런거.png')}/>
    </div>
  )
}