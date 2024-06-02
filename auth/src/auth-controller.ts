import { connection } from "./utils/db"
import { decodeAccessToken, createAccessToken, deleteAccessToken } from "./utils/auth"
import { Request, Response, response } from "express"
import bcrypt from "bcrypt"
import { adminLoggedIn, loggedIn } from "./utils/loggedIn"

export async function registerUser(req: Request, res: Response) {
    const cookie = decodeAccessToken(req, res)
    if(cookie) {
        res.status(403).send("L'utente ha già effettuato il log-in")
        return
    }

    const { username, password } = req.body

    connection.execute(
        "SELECT * FROM Utenze WHERE User = ?",
        [username],
        async function(err, results, fields) {
            if(Array.isArray(results) && results.length > 0) {
                res.status(400).send("Username già registrato")
                return
            }
            const passwordHash = await bcrypt.hash(password, 10)

            connection.execute(
                "INSERT INTO Utenze (User, Password) VALUES(?, ?)",
                [username, passwordHash],
                function(err: any, results: any, fields: any) {
                    connection.execute(
                        "SELECT IDUtente, User, Role FROM Utenze WHERE User = ?",
                        [username],
                        function(err: any, results: any, fields: any) {
                            const newUser = (results as any)[0]
                            createAccessToken(req, res, newUser)
                            res.json({message: "Registrazione effettuata con successo"})
                        }
                    )
                }
            )
        }
    )
}

export async function loginUser(req: Request, res: Response) {
    const cookie = decodeAccessToken(req, res)

    if(cookie) {
        res.status(403).send("Accesso già effettuato")
        return
    }

    const { username, password } = req.body

    connection.execute(
        "SELECT IDUtente, User, Password, Role FROM Utenze WHERE User = ?",
        [username],
        async function(err, results, fields) {
            if(!Array.isArray(results) || results.length == 0) {
                res.status(400).send("credenziali errate")
                return
            }
            const user = (results as any)[0]
            const passwordOk = await bcrypt.compare(password, user.Password)

            if(!passwordOk) {
                res.status(400).send("credenziali errate")
                return
            }

            delete user.Password

            createAccessToken(req, res, user)
            res.json({message: "Log-In effettuato con successo"})
        }
    )
}

export async function logoutUser(req: Request, res: Response) {
    if(!await loggedIn(req, res)) return
        
    deleteAccessToken(req, res)
    res.json({message: "Log-Out effettuato con successo"})
}

export async function getUser(req: Request, res: Response) {
    const user = decodeAccessToken(req, res)

    res.json(user)
}

export async function modifyPassword(req: Request, res: Response) {
    const user = await loggedIn(req, res)
    if(!user) return

    const oldPassword = req.body.oldPassword

    connection.execute(
        "SELECT Password FROM Utenze WHERE IDUtente = ?",
        [user.IDUtente],
        async function(err: any, results: any, fields: any) {
            const result = (results as any)[0]

            if(!await bcrypt.compare(oldPassword, result['Password'])) {
                res.status(400).send("Credenziali errate")
                return
            }
            const newPassword = await bcrypt.hash(req.body.newPassword, 10)

            connection.execute(
                "UPDATE Utenze SET Password = ? WHERE IDUtente = ?",
                [newPassword, user.IDUtente],
                function(err: any, results: any, fields: any) {
                    if(err) {
                        res.status(400).send(err)
                    }            
                    res.send("Password modificata")
                }
            )
        }
    )
}

export async function isLoggedIn(req: Request, res: Response) {
    const response = await loggedIn(req, res)

    if(!response) {
        return
    }
    
    res.send(response)
}

export async function isAdminLoggedIn(req: Request, res: Response) {
    const response = await adminLoggedIn(req, res)
    
    if(!response) {
        return
    }

    res.send(response)
}