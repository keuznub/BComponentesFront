import { User } from "./User"

export default interface Rate {
    idProduct: number
    idUser?: number
    opinion?: string
    value: number
    user?: User
}