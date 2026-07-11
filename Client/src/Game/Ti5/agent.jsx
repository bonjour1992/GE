import { ElementContent } from "../../lib/datatype"
import { divider } from "../../lib/styleUtils"
import { EnumInput } from "../../Input/EnumInput"
import { TagInput } from "../../Input/TagInput"
import { TextInput } from "../../Input/TextInput"
import { NumberInput } from "../../Input/NumberInput"
import { EditorInput } from "../../Input/EditorInput"
import { techType } from "./ti5"
import { Text, Explication } from "../../Display/Text"
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
                color: content.color,
                borderColor: content.color,
                borderWidth: 4,
                borderStyle: "solid",
                borderRadius: 10,
                width: 150,
                minHeight: 65
            }}>
            <Text style={{ borderBottomWidth: 2, paddingLeft: 4, fontSize: 12, fontWeight: "bold", borderBottomStyle: "solid",textAlign:"center" }} text={content.name} rule={ajout} />
            <Text style={{ fontSize: 8 ,paddingLeft:2,paddingBottom:2}} text={content.usage} rule={ajout} />

        </div>
                <Explication explication={content.explication} afficher={explication} ajout={ajout} />

        </>)
}
//TODO:   <ColorInput onChange={onChange} name="color" value={content} />
function Form({ content, onChange, onSubmit, id, dep }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EditorInput onChange={onChange} name="usage" value={content} />
              

                <button onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Agent", classe: Classe, form: Form, display: { default: Display } }