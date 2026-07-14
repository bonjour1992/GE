import { ElementContent } from "../../lib/datatype"
import { divider } from "../../lib/styleUtils"
import { EnumInput } from "../../Input/EnumInput"
import { TagInput } from "../../Input/TagInput"
import { TextInput } from "../../Input/TextInput"
import { NumberInput } from "../../Input/NumberInput"
import { EditorInput } from "../../Input/EditorInput"
import { ColorInput } from "../../Input/ColorInput"
import { backgroundColor, techType } from "./ti5"
import { Text, Explication } from "../../Component/Text"
import ReactDOMServer from "react-dom/server"




class Classe extends ElementContent {

    usage = ""
    color = "#000000"
}

function Display({ content, explication, style }) {
    let ajout = []


    return (
        <>
            <div
                style={{
                    ...style,
                    color: "white",
                    borderColor: content.color,
                    ...backgroundColor,
                    borderWidth: 4,
                    borderStyle: "solid",
                    borderRadius: 10,
                    width: 150,
                    minHeight: 65
                }}>
                <Text style={{ color: content.color, borderColor: content.color, borderBottomWidth: 2, paddingLeft: 4, fontSize: 12, fontWeight: "bold", borderBottomStyle: "solid", textAlign: "center" }} text={content.name} rule={ajout} />
                <Text style={{ fontSize: 8, paddingLeft: 2, paddingBottom: 2 }} text={content.usage} rule={ajout} />

            </div>
            <Explication explication={content.explication} afficher={explication} ajout={ajout} />

        </>)
}

function Form({ content, onChange, onSubmit, style }) {

    return (
        <div style={style}>

                <TextInput onChange={onChange} name="name" value={content} />
                <EditorInput onChange={onChange} name="usage" value={content} />
                <ColorInput onChange={onChange} name="color" value={content} />
                <EditorInput onChange={onChange} label="Explications" name="explication" value={content} />

                <button onClick={onSubmit}> Sauvegarder</button>

        </div>
    )
}


export default { name: "Agent", classe: Classe, form: Form, display: { default: Display } }