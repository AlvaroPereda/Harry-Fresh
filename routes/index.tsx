import { FreshContext, Handlers } from "$fresh/server.ts";
import Form from "../islands/Form.tsx";
import { initDatabase } from "../utils/database.ts";
import { Cookie, setCookie, getCookies } from "@std/http/cookie"

export const handler:Handlers = {
  POST: async(req:Request, _ctx:FreshContext) => {
    try {
      const form = await req.formData()
      const email = form.get("email") as string
      const password = form.get("password") as string
      const name = form.get("name") as string

      const headers = new Headers()
      const date = new Date()
      date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))

      if(name) {
        const UserCollection = await initDatabase()
        const user = await UserCollection.findOne({email})
        if(user) throw new Error("Usuario ya creado")
        const { insertedId } = await UserCollection.insertOne({name, email, password})
        const cookie:Cookie = {name:"token", value:encodeURIComponent(insertedId.toString()), expires:date}
        setCookie(headers, cookie)
      } else {
        const cookie = getCookies(req.headers) 
        if(!cookie.token) {
          const UserCollection = await initDatabase()
          const user_exists = await UserCollection.findOne({email, password})
          if(user_exists) {
            const cookies = {name:"token", value:encodeURIComponent(user_exists._id.toString()), expires:date} 
            setCookie(headers, cookies)
          }
        }
      }

      headers.set("location", "/home")
      return new Response(null, {
        status:303,
        headers
      })

    }catch(e) {
      console.log(e)
      const headers = new Headers()
      headers.set("location", "/")
      return new Response(null, {
        status:303,
        headers
      })
    }
  }
}

export default function Home() {
  return <Form/>
}
