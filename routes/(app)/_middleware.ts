import { FreshContext, Handler } from "$fresh/server.ts";
import { getCookies } from "@std/http/cookie";
import { initDatabase } from "../../utils/database.ts";
import { ObjectId } from "mongodb";

export const handler:Handler = async(req:Request, ctx:FreshContext) => {
    const cookie = getCookies(req.headers)
    if(cookie.token) {
        const UserCollection = await initDatabase()
        const user_exists = await UserCollection.findOne({_id: new ObjectId(decodeURIComponent(cookie.token))})
        if(user_exists) return await ctx.next()
    }

    const headers = new Headers()
    headers.set("location", "/")
    return new Response(null, {
        status:303,
        headers
    })
}