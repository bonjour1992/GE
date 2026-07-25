import { Explication } from '../Component/Text'
import { Handler as HandlerTI5 } from './Ti5/ti5'

export const games = {
    "ti5": { handlers: HandlerTI5, name: "Twiligth imperium 5" }
}

export function getHandler(jeu, meta) {

    return games[jeu].handlers[meta]
}

export function Displayeur({jeu,type,explication=false,content,style,displayeur})
{
        let Display = getHandler(jeu, type).display[displayeur || "default"]
    let ajout = {remp:[],lien:[]}

        return (
            <>
            <Display content={content} explication={ajout}/>
            {explication?<Explication explication={content.explication}  ajout={ajout} />:""}
            </>
        )
}