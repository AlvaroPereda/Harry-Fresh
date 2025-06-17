import { PageProps } from "$fresh/server.ts";
import { Home_with_API } from "../../utils/types.ts";
import Home from "../../islands/Home.tsx";

export default (props:PageProps<Home_with_API>) => <Home data={props.data} favorites/>