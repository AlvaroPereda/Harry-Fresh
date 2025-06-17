import { OptionalId } from "mongodb";

export type Characters_API = {
    id: string
    name: string
    image: string
}

export type Spells_API = {
    id: string
    name: string
    description: string
}

export type Home_with_API = {
    characters: Characters_API[]
    spells: Spells_API[]
}

export type UserModel = OptionalId<{
    name: string
    email: string
    password: string
}>