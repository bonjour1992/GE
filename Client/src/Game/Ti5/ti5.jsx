import unitHandler from "./unit"
import agentHandler from"./agent"
import habiliteHandler from "./habilite"
import factionHandler from "./faction"

export const turnNumber=10

export const borderColor = { borderColor: "#343434" }

export const backgroundColor= { backgroundColor: "#172045BB"}

export  const Handler={
    "unit":unitHandler,
    "agent":agentHandler,
    "habilite":habiliteHandler,
    "faction":factionHandler
}

export const techType = { gen: "Génétique", spa: "Spatial", mil: "Militaire", soc: "Social", storm: "Tempete" }
