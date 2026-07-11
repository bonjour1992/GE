import { useRemp, search } from "../lib/store"
import ReactDOMServer from "react-dom/server"

export function Text({ style, text, rule }) {
    const remp = useRemp((s) => s.remp)

    const size = parseInt(style.fontSize) || 12

    return (<div style={style}>
        <span dangerouslySetInnerHTML={{ __html: format(text, size, remp, rule) }}></span>
    </div>)
}

export function Explication({ explication, ajout, afficher }) {
    const remp = useRemp((s) => s.remp)
    let s = explication || ""
    ajout.forEach((elemCode) => {
        var elem = remp.filter(e => e.key === elemCode.toLowerCase())[0] || { val: "erreur remplacement", rule: "" }

        s += ReactDOMServer.renderToStaticMarkup(<p><b dangerouslySetInnerHTML={{ __html:elem.val}}></b>:{elem.rule}</p>)
    })

    return afficher ? (<><p>Explication</p>
        <Text style={{ fontSize: 11, paddingLeft: 2, lineHeight: 1.2 }} text={s} /> </>)
        : ""
}


export function format(s, size, remp, rule) {
    return replaceDiese(nameAff(replaceLink(s)), size, remp, rule)
}


export function nameAff(name) {
    return name.lastIndexOf("::") === -1 ? name : name.substring(name.lastIndexOf("::") + 2)
}

function replaceLink(s) {
    const regex = /\|([0-9]+)\|/g
    function replace(str, id) {
        var elem = search.filter(e => e.id == id)[0] || { name: "erreur lien", type: "null", id: 0, jeu: "null" }
        return (ReactDOMServer.renderToStaticMarkup(
            <span>{elem.name}</span>
        ))
    }
    return s.replaceAll(regex, replace)
}


function rebuildCSS(css) {
    let res = {}
    css.forEach(e => {
        res[e[0]] = e[1]
    });
    return res
}

export function replaceDiese(content, size, remp, rule) {
    const regex = /#([a-zA-Z_][a-zA-Z_]+)(?:\((\d+)(?:,\s*([A-Za-z0-9 /]+))?\))?/g
    function replace(str, elemCode, num, mult) {
        var elem = remp.filter(e => e.key === elemCode.toLowerCase())[0] || { val: "erreur remplacement" }
        rule && elem.rule && rule.indexOf(elemCode) === -1 && rule.push(elemCode)

        return (ReactDOMServer.renderToStaticMarkup(
            <span style={rebuildCSS(elem.css || [])} dangerouslySetInnerHTML={{
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
