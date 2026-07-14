import { ElementContent } from "../../lib/datatype"
import { divider } from "../../lib/styleUtils"
import { EnumInput } from "../../Input/EnumInput"
import { TagInput } from "../../Input/TagInput"
import { TextInput } from "../../Input/TextInput"
import { NumberInput } from "../../Input/NumberInput"
import { EditorInput } from "../../Input/EditorInput"
import { techType } from "./ti5"
import { Text, Explication } from "../../Component/Text"
import ReactDOMServer from "react-dom/server"
import { MiniPa, SmallPa } from "../../Component/Size"
import { borderColor } from "./ti5"
import { backgroundColor } from "./ti5"

//TODO: gestion image  
const shipClasse = {
    fs: "Vaisseau amiral",
    cruiser: "Croiseur",
    dn: "Cuirassé",
    dest: "Destroyeur",
    mech: "Mecha",
    pds: "Systéme de défense",
    com: "Commerce",
    fact: "Usine",
    dock: "Dock",
    sun: "Soleil de geurre",
    inf: "Infanterie",
    mon: "Monument",
    trans: "Transport"

}

const tag = {
    ship: "Vaisseau",
    struc: "Structure",
    sattelite: "Sattelite",
    mil: "Militaire",
    civ: "Civil",
    com: "Commercial",
    science: "Scientifique",
    trans: "Transport",
    terre: "Terrestre",
    space: "Spatiale",
    bio: "Biologique",
    transportable: "Transportable",


}


class Ship extends ElementContent {
    type = "inf"
    habilite = ""
    move
    combat
    combat_touche = 1
    cout
    prod = 1
    capacite
    PV = 1
    mot_cle = []
    techType = "spa";
    tier = 1;
}



//TODO: prerequis tech
//TODO: affichage ***
function Display({ content, explication, style }) {

    let ajout = []



    return content !== undefined ? (
        <>
            <div
                style={{
                    ...MiniPa,
                    ...style,
                    borderWidth: 4,
                    ...borderColor,
                    borderStyle: "solid",
                    borderRadius: 16,
                   ...backgroundColor,
                    position: "relative",
                    color: "#FFFFCC"

                }}>
                <Text style={{ borderBottomWidth: 4, paddingLeft: 4, fontSize: 15, fontWeight: "bold", borderBottomStyle: "solid", ...borderColor }}
                    text={content.name} />
                <Text style={{ fontSize: 10, paddingLeft: 2, width: "100%", borderBottomWidth: 2, borderBottomStyle: "solid", ...borderColor }}
                    text={content.mot_cle.reduce((res, e, k, { length }) => {
                        return res + ReactDOMServer.renderToStaticMarkup(<span key={e} >{tag[e] + (k === length - 1 ? "" : ", ")}</span>)
                    }, "")} />
                <Text style={{ fontSize: 9, paddingLeft: 2, lineHeight: 1.2 }} text={content.habilite} rule={ajout} />
                <Stat data={[content.cout, content.move, content.combat, content.capacite, content.PV]}
                    label={["Cout", "Mouvement", "Attaque", "Capacité", "Résistance"]}
                    mult={[content.prod, null, content.combat_touche]}
                />

            </div>
            <Explication explication={content.explication} afficher={explication} ajout={ajout} />
        </>

    ) : (<></>)
}

function Stat({ data, label, mult }) {

    return (<div style={
        {
            width: "100%",
            height: 28,
            display: "grid",
            gridTemplateColumns: "repeat(" + data.length + ", 1fr)",
            bottom: 0, position: "absolute"
        }}>{data.map((d, i) => {

            return (<div key={i} style={{
                ...borderColor,
                borderWidth: 1,
                borderStyle: d ? "solid" : "none",
                textAlign: "center",
                borderBottomLeftRadius: i === 0 ? 12 : 0,
                borderBottomRightRadius: i === data.length - 1 ? 12 : 0,
                position: "relative"
            }} >
                {d ? (<><span style={{
                    fontSize: 6,
                    verticalAlign: "top",
                    paddingTop: 3
                }}>{label[i]}</span>
                    <div style={{
                        lineHeight: 0,
                        fontSize: 20,
                        fontWeight: "bolder",
                        width: "100%",
                        position: "absolute",
                        bottom: 10
                    }}>
                        {d}{mult[i] ? mult[i] > 1 ? "*".repeat(mult[i]) : "" : ""}
                    </div></>) : ""}
            </div>)
        })}
    </div>)
}

function Form({ content, onChange, onSubmit, id, style }) {
    return (
        <div style={style}>

                <TextInput onChange={onChange} name="name" value={content} />
                <EnumInput onChange={onChange} name="type" value={content} enumClass={shipClasse} />
                <EnumInput onChange={onChange} name="techType" value={content} enumClass={techType} label="Prérequis" />
                <NumberInput onChange={onChange} name="tier" value={content} min={1} max={5} />
                <br />
                <TagInput onChange={onChange} name="mot_cle" value={content} tagClass={tag} />
                <br />
                <EditorInput onChange={onChange} label="Habilité" name="habilite" value={content} />
                <br />
                <NumberInput onChange={onChange} name="cout" value={content} min={0} max={99} label="Cout" />
                <NumberInput onChange={onChange} name="prod" value={content} min={1} max={9} label="Production" />
                <NumberInput onChange={onChange} name="move" value={content} min={0} max={9} label="Mouvement" />
                <NumberInput onChange={onChange} name="combat" value={content} min={0} max={9} label="Combat" />
                <NumberInput onChange={onChange} name="combat_touche" value={content} min={1} max={9} label="touche" />
                <NumberInput onChange={onChange} name="capacite" value={content} min={0} max={99} label="Capacité" />
                <NumberInput onChange={onChange} name="PV" value={content} min={0} max={9} label="Résistance" />
                <br />
                <EditorInput onChange={onChange} label="Explications" name="explication" value={content} />
                <br />
                <button onClick={onSubmit}>Submit</button>
        </div>

    )
}

export default { name: "Unité", classe: Ship, form: Form, display: { default: Display }, print: "grid-cols-3" }




