import { doc, updateDoc, getDoc, query, collection } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Image, Input, List, Loader, Segment, Table } from "semantic-ui-react";
import Authstate from "../components/Authstate";
import { auth, firestore, functions } from "../firebase";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { location } from "../location";

export default function Admin() {
  const navigate = useNavigate()
  const params = useParams()
  const bid = params.bid
  const [user, loading1] = useAuthState(auth);
  const [userdata, loading3] = useDocument(
    doc(firestore, 'users', user?.uid || "0")
  )
  const [probdatum, loading4] = useCollectionDataOnce(
    query(collection(firestore, "problem"))
  )
  const [userdatum, l] = useCollectionDataOnce(
    query(collection(firestore, "users"))
  )
  
//   const point = probdatum?.data()
  const allprobs = probdatum?.map((data) => {
    const find = userdatum?.map((asdf) =>{
        if(!asdf.found) return 0;
        return asdf.foundno.includes(data.no) ? 1:0;
      }).reduce((a, b) => a+b, 0)
    const count = userdatum?.map((asdf) =>{
      if(!asdf.solved) return 0;
      return asdf.solvedno.includes(data.no) ? 1:0;
    }).reduce((a, b) => a+b, 0)
    return [data.no, count, find]
  }).sort(
    function (a, b) {
      if (b[2] !== a[2]) return a[2] - b[2]
      return a[1] - b[1]
    }
  )


  return ( 
    <Table basic bordered unstackable textAlign="center">
        
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>순위</Table.HeaderCell>
            <Table.HeaderCell>번호</Table.HeaderCell>
            <Table.HeaderCell>구역</Table.HeaderCell>
            <Table.HeaderCell>푼 사람 수</Table.HeaderCell>
            <Table.HeaderCell>찾은 사람 수</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            allprobs?.reverse().map((x, i) =>
              <Table.Row key={i} >
                <Table.Cell>{i+1}</Table.Cell>
                <Table.Cell>{x[0]}</Table.Cell>
                <Table.Cell>{location.get(x[0])}</Table.Cell>
                <Table.Cell>{x[1]}</Table.Cell>
                <Table.Cell>{x[2]}</Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
  )
}