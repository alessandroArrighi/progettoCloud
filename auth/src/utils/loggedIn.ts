import { Request, Response } from "express";
import { decodeAccessToken } from "./auth"

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

    if(cookie.Role == 'admin') {
        return cookie
    }
    else {
        return false
    }
}