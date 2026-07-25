import { ElementContent, Link } from "../../lib/datatype.js";
import { TextInput } from "../../Input/TextInput.jsx";
import { turnNumber } from "./ti5.jsx";
import { ModalPickerInput } from "../../Input/ModalPickerInput";
import { ImagePicker } from "../../Input/ImagePicker";
import { ColorInput } from "../../Input/ColorInput.jsx";
import { TableInput } from "../../Input/TableInput";
import { EditorInput } from "../../Input/EditorInput.jsx";
import { Text } from "../../Component/Text.jsx";
import { Image } from "../../Component/Image.jsx";
import { imgURL } from "../../lib/styleUtils.js";
import { LoadAndDisplay } from "../../Component/LoadAndDisplay.jsx";
import FormBase from "../../Input/FormBase"

class Faction extends ElementContent {
    logo = "/404.jpeg"
    color = "#FFFFFF"
    units = new Array(12).fill(new Link("unit"))
    agents = new Array(7).fill(new Link("agent"))
    rules = new Array(5).fill(new Link("habilite"))
    agentNum = 0
    ruleNum = 0
}

function Display({ content, style, context, explication }) {
    let turn = Array.from(Array(turnNumber - 1)).map((e, i) => i + 2)


    return (<div
        style={{
            backgroundImage: imgURL("/ti/bg%20star.jpg"),
            width: 1122,
            height: 794
        }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(" + turn.length + ", 1fr)" }}>
            {turn.map((e) => {
                return (<div key={e} style={{
                    borderTop: 0,
                    borderLeft: 6,
                    borderRight: 6,
                    borderBottom: 12,
                    height: 60,
                    borderStyle: "solid",
                    borderColor: "#999999",
                    textAlign: "center"
                }}
                >
                    <span style={{ fontSize: 50, color: "#999999" }}>    {e}</span></div>)
            })}
        </div>
        <FactionName content={content} style={{ marginLeft: 20, fontSize: 50, fontWeight: 1000 }} />
        <div style={{
            height: 630,
            width: 160,
            gap: 5,
            padding: 5,
            paddingLeft: 15,
            display: "flex",
            flexDirection: "column",
            float: "left"
        }}>
            {Array.from((new Faction).agents.keys()).map((i) => {
                return content.agents &&
                    <LoadAndDisplay key={i} link={content.agents[i]} style={{ flexGrow: 1, display: content.agents[i].id === -1 ? "none" : "block" }} />
            })}
        </div>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            height: 630,
            width: 700,
            float: "left",
            paddingTop: 5
        }}
        >
            {Array.from((new Faction).units.keys()).map((i) => {
                return content.units &&
                    <LoadAndDisplay key={i} link={content.units[i]} style={{ width: 230, visibility: content.units[i].id === -1 ? "hidden" : "visible" }} />
            })}
        </div>
        <div style={{
            height: 630,
            width: 220,
            gap: 5,
            padding: 5,
            paddingRigth: 15,
            display: "flex",
            flexDirection: "column",
            float: "left"
        }}>
            {Array.from((new Faction).rules.keys()).map((i) => {
                return content.rules &&
                    <LoadAndDisplay key={i} link={content.rules[i]} style={{ flexGrow: 1, width: 210, visibility: content.rules[i].id === -1 ? "hidden" : "visible" }} />
            })}
        </div>
    </div>)
}

export function FactionName({ content, style }) {
    return (
        <div >

            <Text text={"#img[" + content.logo + "]" + content.name} style={{ ...style, color: content.color }} />
        </div>
    )
}


function Form({ content, onChange, onSubmit, style }) {

    if (!content.rules) {
        content.rules = new Array(5).fill(new Link("habilite"))
        content.ruleNum = 0
    }
    function agentLine(x) {
        return [(<ModalPickerInput onChange={onChange} name={"agents"} value={content} index={x} type={["agent"]} />)]
    }

    function ruleLine(x) {
        return [(<ModalPickerInput onChange={onChange} name={"rules"} value={content} index={x} type={["habilite"]} />)]
    }

    return (
        <FormBase content={content} onChange={onChange} onSubmit={onSubmit} style={style}>

            <ImagePicker onChange={onChange} name={"logo"} value={content} />
            <ColorInput onChange={onChange} name={"color"} value={content} />

            <h2>Agent</h2>
            <TableInput onChange={onChange} Line={agentLine} max={7} name="agentNum" value={content} />
            <h2>Ship</h2>
            <div className="grid grid-cols-4">
                {Array.from((new Faction).units.keys()).map((i) => {
                    return (<div key={i} className="p-2" >
                        <ModalPickerInput onChange={onChange} name={"units"} value={content} index={i} type={["unit"]} /></div>)
                })}

            </div>
            <h2>Rule</h2>
            <TableInput onChange={onChange} Line={ruleLine} max={5} name="ruleNum" value={content} />
        </FormBase>
    )
}

//

export default { name: "Faction", classe: Faction, form: Form, display: { default: Display }, print: "grid-cols-1" }