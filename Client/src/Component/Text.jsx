import { useRemp, useSearch } from "../lib/store"
import ReactDOMServer from "react-dom/server"
import * as math from "mathjs"

export function Text({ style, text, rule }) {
    const remp = useRemp((s) => s.remp)
    const search = useSearch((s) => s.search)
    const size = parseInt(style?.fontSize) || 12
    return (<div style={style}>
        <span dangerouslySetInnerHTML={{ __html: format(text || "", size, remp, search, rule) }}></span>
    </div>)
}

export function Explication({ explication, ajout, afficher }) {
    const remp = useRemp((s) => s.remp)
    let s = explication || ""
    ajout.remp.forEach((elemCode) => {
        var elem = remp.filter(e => e.key === elemCode.toLowerCase())[0] || { val: "erreur remplacement", rule: "" }

        s += ReactDOMServer.renderToStaticMarkup(<p><b dangerouslySetInnerHTML={{ __html: elem.val }}></b>:{elem.rule}</p>)
    })
    ajout.lien.forEach((id) => {
        s += ReactDOMServer.renderToStaticMarkup(<p>{id}</p>)
    })
    return (<div><p>Explication</p>
        <Text style={{ fontSize: 11, paddingLeft: 2, lineHeight: 1.2 }} text={s} /> </div>)

}


export function format(s, size, remp, search, rule) {
    return replaceDiese(nameAff(replaceLink(buildImg(s, size), search, rule?.lien)), size, remp, rule?.remp)
}

function buildImg(s, size) {
    const regex = /#img\[([0-9a-zA-Z\/\-_ .]+)\]/g
    function replace(str, src) {
        return (ReactDOMServer.renderToStaticMarkup(
            <img style={{ height: size * 1.2, display: "inline", transform: "translate(0px," + size * 0.25 + "px)" }} src={"http://localhost:3000/public" + src} />
        ))
    }
    return s.replaceAll(regex, replace)
}


export function nameAff(name) {
    return name.lastIndexOf("::") === -1 ? name : name.substring(name.lastIndexOf("::") + 2)
}

function replaceLink(s, search, lien) {
    const regex = /\|([0-9]+)\|/g
    function replace(str, id) {
        var elem = search.filter(e => e.id == id)[0] || { name: "erreur lien", type: "null", id: 0, jeu: "null" }
        lien?.push(elem.id)
        return (ReactDOMServer.renderToStaticMarkup(
            <span style={{ fontWeight: 700 }}>{nameAff(removeDiese(elem.name))}</span>
        ))
    }
    return s.replaceAll(regex, replace)
}


function rebuildCSS(css, size) {
    let res = {}
    css.forEach(e => {
        res[e[0]] = e[1] && e[1].toString().indexOf("@") === -1 ? e[1] : math.evaluate(e[1].replaceAll("@", "s"), { s: size })
    });
    return res
}

function removeDiese(content) {
    const regex = /#([a-zA-Z_][a-zA-Z_]+)(?:\((\d+)(?:,\s*([A-Za-z0-9 /]+))?\))?/g
    var res = content.replaceAll(regex, () => "")

    return res

}

export function replaceDiese(content, size, remp, rule) {
    const regex = /#([a-zA-Z_][a-zA-Z_]+)(?:\((\d+)(?:,\s*([A-Za-z0-9 /]+))?\))?/g
    function replace(str, elemCode, num, mult) {
        var elem = remp.filter(e => e.key === elemCode.toLowerCase())[0] || { val: "erreur remplacement" }
        rule && elem.rule && rule.indexOf(elemCode) === -1 && rule.push(elemCode)

        return (ReactDOMServer.renderToStaticMarkup(
            <span style={rebuildCSS(elem.css || [], size)} dangerouslySetInnerHTML={{
                __html:
                    (num && elem.plural !== "repeat" && elem.plural !== "after" ? num + " " : "") +
                    ((num && num > 1) ?
                        (elem.plural === "repeat" ?
                            elem.val?.repeat(num) :
                            elem.plural === "after" ?
                                toMaj((elem.val || ""), isMaj(elemCode)) + " " + num + ((mult && !Number.isNaN(parseInt(mult))) ? "*".repeat(parseInt(mult)) : mult ? " " + mult : "") :
                                toMaj(elem.plural || (elem.val || "") + "s", isMaj(elemCode))) :
                        toMaj(elem.val || "", isMaj(elemCode)))
            }}>
            </span>))
    }
    var res = content.replaceAll(regex, replace)

    return res
}

function isMaj(s) {
    return s[0] === s[0].toUpperCase()
}

function toMaj(s, maj) {
    return maj ? s.charAt(0).toUpperCase() + s.slice(1) : s
}
