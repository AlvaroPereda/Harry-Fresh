import { useState } from "preact/hooks";
import { FunctionalComponent } from "preact/src/index.d.ts";

type Data = {
    id: string
    fav: boolean
}

const Star:FunctionalComponent<Data> = (props) => {

    const [favoritos, setFavoritos] = useState<boolean>(props.fav)

    const addFavorites = () => {
        setFavoritos(!favoritos)
        const favCookie = decodeURIComponent(document.cookie).split("; ").find(e => e.startsWith("favCharacter"))
        if(favCookie) {
            const value:string[] = JSON.parse(favCookie.split("=")[1])
            let almacen = []
            if(!favoritos) {
                almacen = [...value, props.id]
            } else {
                const aux = value.filter(e => e !== props.id) 
                almacen = [...aux]
                if(almacen.length < 1) return document.cookie = `favCharacter=; Path=/; Expires=Fri, 30 May 2025 00:00:00 GMT`
            }            
            document.cookie = `favCharacter=${encodeURIComponent(JSON.stringify(almacen))}; Path=/`
        } else {
            const almacen = [props.id]
            document.cookie = `favCharacter=${encodeURIComponent(JSON.stringify(almacen))}; Path=/`
        }
    }

    return (
        <div>
            <img src={favoritos ? "con_fondo.svg" : "sin_fondo.svg"} alt="estrella" width={50} onClick={() => addFavorites()}/>
        </div>
    )
}

export default Star