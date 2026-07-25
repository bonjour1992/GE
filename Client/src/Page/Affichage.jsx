import { Outlet, useLoaderData,Link,useParams } from "react-router";
import { getHandler,Displayeur } from "../Game/games";
import { Button } from "../Component/Button";

export default function Affichage() {
    let jeu =useParams().jeu
    let element = useLoaderData().element ||{ meta: null, content: null }

    let Display=getHandler(jeu,element.meta.type).display.default

    return (<>
        <div>Affichage</div>
        <Link to="./edit" >Editer </Link>
        <Displayeur jeu={jeu} type={element.meta.type} content={element.content} explication={true}/>
        <p>{JSON.stringify(element)}</p>
    </>)
}