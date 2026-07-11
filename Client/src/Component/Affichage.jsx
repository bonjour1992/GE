import { Outlet, useLoaderData,Link,useParams } from "react-router";
import { getHandler } from "../Game/games";

export default function Affichage() {
    let jeu =useParams().jeu
    let element = useLoaderData().element ||{ meta: null, content: null }

    let Display=getHandler(jeu,element.meta.type).display.default

    return (<>
        <div>Affichage</div>
        <Link to="./edit" >Editer </Link>
        <Display content={element.content} explication={true}/>
        <p>{JSON.stringify(element)}</p>
    </>)
}