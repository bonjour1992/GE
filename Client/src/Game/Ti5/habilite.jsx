import { TextInput } from "../../Input/TextInput"
import { EditorInput } from "../../Input/EditorInput"
import { ElementContent } from "../../lib/datatype"
import { Text, Explication } from "../../Component/Text"
import { fullBorder, backgroundColor, borderColor } from "./ti5"
import FormBase from "../../Input/FormBase"

class Habilite extends ElementContent {

    effet = ""
}

function Display({ content, explication, style }) {


    return (
        <div style={{
            width: 250,
            ...backgroundColor,
            ...borderColor,
            color: "white",
            ...style,
            ...fullBorder


        }}>
            <Text style={{
                ...borderColor,
                borderBottomWidth: 2,
                paddingLeft: 4,
                fontSize: 12,
                fontWeight: "bold",
                borderBottomStyle: "solid",
                textAlign: "center"
            }} text={content.name} />
            <Text style={{
                fontSize: 10,
                paddingLeft: 2,
                paddingBottom: 2
            }} text={content.effet} rule={explication} />

        </div>


    )
}

function Form({ content, onChange, onSubmit, style }) {

    return (
        <FormBase content={content} onChange={onChange} onSubmit={onSubmit} style={style}>

            <EditorInput onChange={onChange} name="effet" value={content} />

        </FormBase>
    )
}


export default { name: "Habilité", classe: Habilite, form: Form, display: { default: Display } }