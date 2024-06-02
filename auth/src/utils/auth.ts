import { Request, Response } from "express"
import jwt from "jsonwebtoken"

interface user {
    IDUtente: number
    User: string
    Role: "admin" | "user"
}

const JWT_SECRET = "foo"
const COOKIE_NAME = "cookie-token"

export const createAccessToken = (req: Request, res: Response, user: any) => {
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" })

    res.cookie(COOKIE_NAME, accessToken, {
        maxAge: 86400000,
        httpOnly: false,
        sameSite: 'none',
        secure: true
    })
}

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

export const deleteAccessToken = (req: Request, res: Response) => {
    res.cookie(COOKIE_NAME, "", {
        maxAge: 0,
        httpOnly: false,
        sameSite: 'none',
        secure: true
    })
}