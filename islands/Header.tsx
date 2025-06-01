import { FunctionalComponent } from "preact/src/index.d.ts";

const Header:FunctionalComponent = () => {

    const borrarCoockie = () => {
        document.cookie = "user=; Path=/; Expires=Thu, 29 May 2025 00:00:00 GMT"
        location.reload() //recarga la página, para activar el middleware
    }

    return (
        <header>
            <h1>Harry Potter</h1>
            <a href="/favorites"><button type="button">Favoritos</button></a>
            <button type="button" onClick={() => borrarCoockie()}>Cerrar sesión</button>
        </header>
    )
}

export default Header