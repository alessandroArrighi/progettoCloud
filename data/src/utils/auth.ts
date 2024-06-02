import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { connection } from './db'

interface user {
    IDUtente: number
    User: string
    Role: "admin" | "user"
}

const JWT_SECRET = "foo"
const COOKIE_NAME = "cookie-token"

export const decodeAccessToken = (req: Request, res: Response) => {
    const accessToken = req.cookies

    if(!accessToken) return null

    try {
        const user = jwt.verify(accessToken[COOKIE_NAME], JWT_SECRET) as user
        return user
    } catch {
        return null
    }
}

export async function loggedIn(req: Request, res: Response) {
    const cookie = decodeAccessToken(req, res)

    if(!cookie) {
        res.status(403).send("Effettuare l'accesso")
        return false
    }

    return cookie
}

export async function adminLoggedIn(req: Request, res: Response) {
    const cookie = decodeAccessToken(req, res)

    if(!cookie) {
        res.status(403).send("Effettuare l'accesso")
        return false
    }

    const risultato = await connection
                .promise()
                .query(
                    "SELECT Role FROM Utenze WHERE IDUtente = ?",
                    [cookie.IDUtente]
                )
                .then(([rows, fields]) => {
                    const role = (rows as any)[0]['Role']
                    if(role != 'admin') {
                        res.status(403).send("Permesso negato")
                        return false
                    }
                    return cookie
                })
    return (risultato as any)
}
