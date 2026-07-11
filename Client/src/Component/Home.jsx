import { NavLink, Outlet } from "react-router";
import { games } from "../Game/games";
export default function Home()
{
    
    return (<>
    <div>Home</div>
{
    Object.keys(games).map((e,i)=>{
        return (<NavLink key={i} to={e} >{games[e].name} </NavLink>)
    })
}
    </>)
}