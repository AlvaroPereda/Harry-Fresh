import { PageProps } from "$fresh/server.ts";
import Header from "../../islands/Header.tsx";

export default ({Component}:PageProps) => {
    return (
        <div>
            <Header/>
            <Component/>
        </div>
    )
}