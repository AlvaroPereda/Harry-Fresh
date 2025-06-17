import { useState } from "preact/hooks";
import { FunctionalComponent } from "preact/src/index.d.ts";

const Form:FunctionalComponent = () => {

    const [Login, setLogin] = useState<boolean>(true)

    return (
        <div class="form-container">
            <h1>{Login ? "Iniciar sesión" : "Registrarse"}</h1>
            <form action="/" method="POST">
                {!Login && <h3>Nombre: <input type="text" name="name"/></h3>}
                <h3>Email: <input type="email" name="email" required/></h3>
                <h3>Password: <input type="password" name="password" required/></h3>
                <button type="submit">{Login ? "Entrar" : "Crear"}</button>
            </form>
            <p>{Login ? "No tienes cuenta? " : "Ya tiene una cuenta? "}<button type="button" onClick={() => setLogin(!Login)}>{Login ? "Registrarte": "Inicia sesión"}</button></p>
        </div>
    )
}

export default Form