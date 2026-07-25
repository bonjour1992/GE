import unitHandler from "./unit"
import agentHandler from "./agent"
import habiliteHandler from "./habilite"
import factionHandler from "./faction"
import techHandler from "./tech"
import promesseHandler from "./promesse"
import militaireHandler from "./militaire"
export const turnNumber = 10

export const borderColor = { borderColor: "#343434" }
export function bottomBorder(size) {
    return { borderBottomWidth: size, borderBottomStyle: "solid" }
}

export const fullBorder = {
    borderWidth: 4,
    borderStyle: "solid",
    borderRadius: 16,
}

export const backgroundColor = { backgroundColor: "#172045BB" }

export const Handler = {
    "unit": unitHandler,
    "agent": agentHandler,
    "habilite": habiliteHandler,
    "faction": factionHandler,
    "tech": techHandler,
    "Promesse": promesseHandler,
    "militaire":militaireHandler,
}

export const techType = { gen: "Génétique", spa: "Spatial", mil: "Militaire", soc: "Social", storm: "Tempete" }
