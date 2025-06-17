import { MongoClient, Collection } from "mongodb"
import { UserModel } from "./types.ts";

let UserCollection:Collection<UserModel>

export const initDatabase = async():Promise<Collection<UserModel>> => {

    if(UserCollection) return UserCollection

    const MONGO_URL = Deno.env.get("MONGO_URL")
    if(!MONGO_URL) throw new Error("Error con MONGO_URL")

    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Conectado a MongoDB")

    const db = client.db("Harry-Fresh")
    UserCollection = db.collection<UserModel>("users") 

    return UserCollection
}