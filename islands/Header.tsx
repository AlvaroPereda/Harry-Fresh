import { FunctionalComponent } from "preact/src/index.d.ts";

const Header:FunctionalComponent = () => {

    const logout = () => {
        document.cookie = `token=;Expires=Mon, 16 June 2025 00:00:00 UTC;Path=/`
        document.cookie = `characterFav=;Expires=Mon, 16 June 2025 00:00:00 UTC;Path=/`
        document.cookie = `spellFav=;Expires=Mon, 16 June 2025 00:00:00 UTC;Path=/`
        location.reload()
    }

    return (
        <header>
            <h1>Harry Fresh</h1>
            <div class="esquina">
                <a href="/home"><button type="button">Inicio</button></a>
                <a href="/favorites"><button type="button">Favoritos</button></a>
                <button type="button" onClick={logout}>Cerrar sesión</button>
            </div>
        </header>
    )
}

export default Header