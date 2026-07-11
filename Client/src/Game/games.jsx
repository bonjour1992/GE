import{ Handler as HandlerTI5} from './Ti5/ti5'
export const games ={
    "ti5":{handler:HandlerTI5,name:"Twiligth imperium 5"}
}

export function getHandler(jeu,meta)
{
    //TODO:
return games[jeu].handler[meta]
}