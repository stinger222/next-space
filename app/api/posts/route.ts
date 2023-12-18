import { IPost } from "../../../types/types"
import { NextResponse } from "next/server"

export const GET = async () => {
  return NextResponse.json(posts)
}

const posts: IPost[] = [
  {
    date: "them4/3/2044",
    author: "Cody_Stanley",
    title: "yard",
    id: 89
  },
  {
    date: "thou3/27/2089",
    author: "Calvin_Burgess",
    title: "within",
    id: 35
  },
  {
    date: "leg9/20/2110",
    author: "Sally_Newton",
    title: "wore",
    id: 44
  },
  {
    date: "piano1/16/2059",
    author: "Georgie_Allen",
    title: "scared",
    id: 48
  },
  {
    date: "arm3/25/2088",
    author: "Douglas_Black",
    title: "pen",
    id: 33
  },
  {
    date: "finally6/17/2061",
    author: "Chris_Simmons",
    title: "decide",
    id: 88
  },
  {
    date: "seat6/21/2051",
    author: "Joshua_Weaver",
    title: "supper",
    id: 82
  }
]
