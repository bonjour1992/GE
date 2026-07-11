import { Outlet, useLoaderData, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useRemp } from "../lib/store"
import { getRemp } from "../lib/fetch";
import { games } from "../Game/games";

let jeu

export default function HeaderBar() {

    const setterRemp = useRemp((state) => state.setRemp)
    jeu = useParams().jeu
    let f = async () => setterRemp(await getRemp(jeu))
    f()

    return (<>
        <Search />
        <Add />
        <Outlet />
    </>)
}

function Search() {
    return (<div style={{ position: "fixed", top: 0, width: "20%", marginLeft: "40%", height: 40, borderBottomWidth: 2, borderBottomStyle: "solid" }}>
        <p>Recherche</p>
    </div>)
}

function Add() {
  return (  <div style={{ position: "fixed", top: 0, width: "20%", marginLeft: "60%", height: 40, borderBottomWidth: 2, borderBottomStyle: "solid" }}>
        {Object.keys(games[jeu].handler).map((e, i) => {
            return (<button key={i}>{games[jeu].handler[e].name}</button>)
        }
        )}
    </div>)
}