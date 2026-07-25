import { Navigate, Outlet, useLoaderData, useNavigate, useParams } from "react-router";
import { getHandler,Displayeur } from "../Game/games";
import { useState } from "react";
import { updateElement } from "../lib/fetch";

export default function Edit() {
    const elem=useLoaderData().element
    let [element, setElement] = useState(elem|| { meta: null, content: null })
    let navigate = useNavigate();
    let jeu = useParams().jeu


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

    function save(e) {
        let f = async () => {
            let res = await updateElement(element.id, element)
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
