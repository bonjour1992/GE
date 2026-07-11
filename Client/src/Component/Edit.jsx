import { Navigate, Outlet, useLoaderData, useNavigate,useParams } from "react-router";
import { getHandler } from "../Game/games";
import { useState } from "react";
import { updateElement } from "../lib/fetch";

export default function Edit() {
    let [element, setElement] = useState(useLoaderData().element || { meta: null, content: null })
    let navigate = useNavigate();
        let jeu =useParams().jeu


    const split={width:"50%", float:"left"}

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

    function save(e) {
        let f = async () => {
            let res = await updateElement(element.id, element)
            navigate("./..")
        }
        f()
        e.preventDefault()
    }


    let Display = getHandler(jeu,element.meta.type).display.default
    let Form = getHandler(jeu,element.meta.type).form
    return (<>
        <div>Edition</div>
        <Form content={element.content} onChange={handleInputChange} onSubmit={save} style={split} />
        <Display content={element.content} explication={true} style={split} />
        <p style={{ clear: "both" }}>{JSON.stringify(element)}</p>
    </>)
}
