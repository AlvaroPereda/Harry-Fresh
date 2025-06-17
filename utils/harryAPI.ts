import { Characters_API, Spells_API } from "./types.ts";

export const getCharacters = async():Promise<Characters_API[]> => {
    const data = await fetch("https://hp-api.onrender.com/api/characters")
    const result:Characters_API[] = await data.json()
    const result_adjust = result.slice(0,20)
    const result_final:Characters_API[] = result_adjust.map(e => ({
        id: e.id,
        name: e.name,
        image: e.image
    }))
    return result_final
}

export const getSpells = async():Promise<Spells_API[]> => {
    const data = await fetch("https://hp-api.onrender.com/api/spells")
    const result = await data.json()
    return (result.slice(0,20))
}