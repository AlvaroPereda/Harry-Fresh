import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Home from "../../islands/Home.tsx";
import { getCharacters, getSpells } from "../../utils/harryAPI.ts";
import { Characters_API, Home_with_API, Spells_API } from "../../utils/types.ts";

export const handler:Handlers = {
    GET: async(_req:Request, ctx:FreshContext<unknown, Home_with_API>) => {
        const characters:Characters_API[] = await getCharacters()
        const spells:Spells_API[] = await getSpells()
        return ctx.render({
            characters,
            spells
        })
    }
}

export default (props:PageProps<Home_with_API>) => <Home data={props.data} favorites={false}/>