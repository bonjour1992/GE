import { Outlet, useLoaderData, useParams, Link } from "react-router";
import { getHandler } from "../Game/games";


export default function Liste() {
    let Display = getHandler(useParams().elem).display.default
    return (<>
        <div>Liste</div>
        <div style={{}}>
        {useLoaderData().element.map((e,i) =>
            <Display style={{float:"left",margin:2}} key={i} content={e.content} />

        )}
        </div>
    </>)
}