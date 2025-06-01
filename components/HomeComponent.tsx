import { FunctionalComponent } from "preact/src/index.d.ts";

const HomeComponent:FunctionalComponent = () => {
    return (
        <div>
            <a href="/characters"><button type="button">Personajes</button></a>
            <a href="/spells"><button type="button">Hechizos</button></a>
        </div>
    )
} 

export default HomeComponent