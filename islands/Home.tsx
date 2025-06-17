import { FunctionalComponent } from "preact/src/index.d.ts";
import { Characters_API, Home_with_API, Spells_API } from "../utils/types.ts";
import { useEffect, useState } from "preact/hooks";

type Data = {
    data: Home_with_API
    favorites: boolean
}

const Home:FunctionalComponent<Data> = (props) => {

    const [Page, setPage] = useState<boolean>(true)
    const [AlmacenChaFav, SetAlmacenChaFav] = useState<Characters_API[]>()
    const [AlmacenSpeFav, SetAlmacenSpeFav] = useState<Spells_API[]>()

    const addCharacterFav = (character:Characters_API) => {
        const almacen:Characters_API[] = []
        if(!AlmacenChaFav) almacen.push(character)
        else {
            if(AlmacenChaFav.some(e => e.id === character.id)) almacen.push(...AlmacenChaFav.filter(e => e.id !== character.id))
            else almacen.push(...AlmacenChaFav, character)
        }

        const date = new Date()
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))
        SetAlmacenChaFav(almacen)
        document.cookie = `characterFav=${encodeURIComponent(JSON.stringify(almacen))};Expires=${date.toUTCString()};Path=/`
    }

    const addSpellFav = (spell:Spells_API) => {
        const almacen:Spells_API[] = []
        if(!AlmacenSpeFav) almacen.push(spell)
        else {
            if(AlmacenSpeFav.some(e => e.id === spell.id)) almacen.push(...AlmacenSpeFav.filter(e => e.id !== spell.id))
            else almacen.push(...AlmacenSpeFav, spell)
        }

        const date = new Date()
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))
        SetAlmacenSpeFav(almacen)
        document.cookie = `spellFav=${encodeURIComponent(JSON.stringify(almacen))};Expires=${date.toUTCString()};Path=/`
    }

    const getFullorEmpty = (id: string):string => {
        if(Page) {
            if(!AlmacenChaFav) return "heart-empty.svg"
            else if(AlmacenChaFav.some(e => e.id === id)) return "heart-full.svg"
            return "heart-empty.svg"
        } else {
            if(!AlmacenSpeFav) return "heart-empty.svg"
            else if(AlmacenSpeFav.some(e => e.id === id)) return "heart-full.svg"
            return "heart-empty.svg"
        }
    }

    useEffect(() => {
        if(Page) {
            const cookie = document.cookie.split("; ").find(e => e.startsWith("characterFav="))
            if(cookie) {
                const value = JSON.parse(decodeURIComponent(cookie.split("=")[1])) as Characters_API[]
                SetAlmacenChaFav(value)
            }
        } else {
            const cookie = document.cookie.split("; ").find(e => e.startsWith("spellFav="))
            if(cookie) {
                const value = JSON.parse(decodeURIComponent(cookie.split("=")[1])) as Spells_API[]
                SetAlmacenSpeFav(value)
            }
        }
    }, [Page])

    return (
        <div class="home">
            <select name="select" onChange={(e) => setPage(Boolean(Number(e.currentTarget.value)))}>
                <option value={1}>Personajes</option>
                <option value={0}>Hechizos</option>
            </select>
            
            <div class="contaier-page">
                {!props.favorites ? 
                    (Page ? 
                        props.data.characters.map(e => <div key={e.id} class="cart" onClick={() => addCharacterFav(e)}>
                            <div class="cabecera">
                                <h1>{e.name}</h1>
                                <img src={getFullorEmpty(e.id)} alt="heart" width="50px" />
                            </div>
                            <img src={e.image} alt={e.name} width="150px"/>
                        </div>)
                    :
                        props.data.spells.map(e => <div key={e.id} class="cart" onClick={() => addSpellFav(e)}>
                            <div class="cabecera">
                                <h1>{e.name}</h1>
                                <img src={getFullorEmpty(e.id)} alt="heart" width="50px" />
                            </div>
                            <p>{e.description}</p>
                        </div>)
                    )
                :
                    (Page ? 
                        AlmacenChaFav?.map(e => <div key={e.id} class="cart" onClick={() => addCharacterFav(e)}>
                            <div class="cabecera">
                                <h1>{e.name}</h1>
                                <img src={getFullorEmpty(e.id)} alt="heart" width="50px" />
                            </div>
                            <img src={e.image} alt={e.name} width="150px"/>
                        </div>)
                    :
                        AlmacenSpeFav?.map(e => <div key={e.id} class="cart" onClick={() => addSpellFav(e)}>
                            <div class="cabecera">
                                <h1>{e.name}</h1>
                                <img src={getFullorEmpty(e.id)} alt="heart" width="50px" />
                            </div>
                            <p>{e.description}</p>
                        </div>)
                    )
                }
            </div>

        </div>
    )
}

export default Home