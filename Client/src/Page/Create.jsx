import { Navigate, Outlet, useLoaderData, useNavigate, useParams } from "react-router";
import { getHandler,Displayeur } from "../Game/games";
import { useState } from "react";
import { createElement, updateElement } from "../lib/fetch";

export default function Create() {
        let jeu = useParams().jeu
    let type = useParams().type
    let [element, setElement] = useState( { meta: null, content: null })
    let navigate = useNavigate();
element.meta.type ||setElement({meta: {type:type}, content: null})

    const split = { width: "50%", float: "left" }

    function handleInputChange(name, value, index) {
        if (index !== undefined) {
            let table = (element.content)[name]
            table[index] = value
            setElement({ ...element, content: { ...element.content, [name]: table } });
        }
        else {
            setElement({ ...element, content: { ...element.content, [name]: value } });
        }
    }
//TODO: go to id
    function save(e) {
        let f = async () => {
            let res = await createElement(element, element)
            navigate("./..")
        }
        f()
        e.preventDefault()
    }


    let Display = getHandler(jeu, element.meta.type).display.default
    let Form = getHandler(jeu, element.meta.type).form
    return (<>
        <div>Edition</div>
        <div style={split}>
            <Form content={element.content} onChange={handleInputChange} onSubmit={save} />
        </div>
        <div style={split}>
           {<Displayeur jeu={jeu} type={element.meta.type} content={element.content} explication={true}/>}
        </div >
        <p style={{ clear: "both" }}>{JSON.stringify(element)}</p>
    </>)
}
