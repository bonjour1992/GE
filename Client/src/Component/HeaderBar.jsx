import { NavLink, Outlet, useLocation } from "react-router";
import { games } from "../Game/games";


export default function HeaderBar() {
    const loc = useLocation()
    return (<>
        <Location location={loc} />
        <User />
        <div style={{ height: 40 }}></div>
        <Outlet />
    </>)
}

const page = {
    remp: "Remplacement",
    edit: "Edition"
}

function Location({ location }) {

    const fil = [["Acceuil", "/"]]

    const part = location.pathname.split("/")


    if (false) false
    else part[1]&&fil.push([games[part[1]].name, "/" + part[1]])

    if (part[2] === "remp") fil.push(["Remplacement", ""])
    else part[2]&&fil.push([games[part[1]].handler[part[2]].name, "/" + part[1] + "/" + part[2]])


    return (<div style={{ position: "fixed", top: 0, marginRight: "60%", width: "40%", height: 40, borderBottomWidth: 2, borderBottomStyle: "solid" }}>
        {fil.map((e, i) => {
            return (<div key={i} style={{ float: "left" }}><NavLink to={e[1]}>{e[0]}</NavLink></div>)
        })}
    </div>)
}

function User({ }) {
    return (<div style={{ position: "fixed", top: 0, width: "20%", marginLeft: "80%", height: 40, borderBottomWidth: 2, borderBottomStyle: "solid" }}>
        <p>User</p>
    </div>)
}

