import { Request, Response } from 'express'
import { connection } from '../utils/db'
import { adminLoggedIn } from '../utils/auth'

export async function allFramesGrad(req: Request, res: Response) {
    connection.execute(
        `SELECT * FROM Montature WHERE Versione = 'da vista'`,
        [],
        function(err, results, fields) {
            res.json(results)
        }
    )
}

export async function allFramesSun(req: Request, res: Response) {
    connection.execute(
        `SELECT * FROM Montature WHERE Versione = 'da sole'`,
        [],
        function(err, results, fields) {
            res.json(results)
        }
    )
}

export async function getFrameFromID(req: Request, res: Response) {
    connection.execute(
        "SELECT * FROM Montature WHERE Modello = ?",
        [req.params.id],
        function(err, results, fields) {
            res.json(results)
        }
    )
}

export async function addNewFrame(req: Request, res: Response) {
    if(!await adminLoggedIn(req, res)) return

    const { Modello, Brand, Prezzo, Versione, Calibro, Ponte, Aste, Materiale, Colore, Immagine } = req.body.dati
    
    connection.execute(
        "INSERT INTO Montature(Modello, Brand, Prezzo, Versione, Calibro, Ponte, Aste, Materiale, Colore, Immagine) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [Modello, Brand, Prezzo, Versione, Calibro, Ponte, Aste, Materiale, Colore, Immagine],
        function(err, results, fields) {
            if(err) {
                res.status(400).send(err)
                return
            }
            res.send("Prodotto aggiunto")
        }
    )
}
 
export async function modifyFrame(req: Request, res: Response) {
    if(!await adminLoggedIn(req, res)) return

    const { Modello, Brand, Prezzo, Versione, Calibro, Ponte, Aste, Materiale, Colore, Immagine, NewModello } = req.body.dati

    connection.execute(
        "SELECT * FROM Montature WHERE Modello = ?",
        [Modello],
        function(err, results, fields) {
            const result = (results as any)[0]
            if(!result) {
                res.status(400).send("Errore")
                return
            }
            connection.execute(
                "UPDATE Montature SET Modello = ?, Brand = ?, Prezzo = ?, Versione = ?, Calibro = ?, Ponte = ?, Aste = ?, Materiale = ?, Colore = ?, Immagine = ? WHERE Modello = ?",
                [
                    NewModello != null ? NewModello : Modello,
                    Brand != null ? Brand : result['Brand'],
                    Prezzo != null ? Prezzo : result['Prezzo'],
                    Versione != null ? Versione : result['Versione'],
                    Calibro != null ? Calibro : result['Calibro'],
                    Ponte != null ? Ponte : result['Ponte'],
                    Aste != null ? Aste : result['Aste'],
                    Materiale != null ? Materiale : result['Materiale'],
                    Colore != null ? Colore : result['Colore'],
                    Immagine != null ? Immagine : result['Immagine'],
                    Modello
                ],
                function(err, results, fields) {
                    if(err) {
                        res.status(400).send(err)
                        return
                    }
                    res.send("Prodotto modificato")
                }
            )
        }
    )
}

export async function addNewLAC(req: Request, res: Response) {
    if(!await adminLoggedIn(req, res)) return

    const { Modello, Brand, Prezzo, Durata, Fascia, Focale } = req.body.dati

    connection.execute(
        "INSERT INTO LAC(Modello, Brand, Prezzo, Durata, Fascia, Focale) VALUES(?, ?, ?, ?, ?, ?)",
        [Modello, Brand, Prezzo, Durata, Fascia, Focale],
        function(err, results, fields) {
            if(err) {
                res.status(400).send(err)
                return
            }
            res.send("Prodotto aggiunto")
        }
    )
}

export async function modifyLAC(req: Request, res: Response) {
    if(!await adminLoggedIn(req, res)) return

    const { Modello, Brand, Prezzo, Durata, Fascia, Focale, NewModello } = req.body.dati

    connection.execute(
        "SELECT * FROM LAC WHERE Modello = ?",
        [Modello],
        function(err, results, fields) {
            const result = (results as any)[0]
            if(!result) {
                res.status(400).send("Errore")
                return
            }
            connection.execute(
                "UPDATE LAC SET Modello = ?, Brand = ?, Prezzo = ?, Durata = ?, Fascia = ?, Focale = ? WHERE Modello = ?",
                [
                    NewModello != null ? NewModello : Modello,
                    Brand != null ? Brand : result['Brand'],
                    Prezzo != null ? Prezzo : result['Prezzo'],
                    Durata != null ? Durata : result['Durata'],
                    Fascia != null ? Fascia : result['Fascia'],
                    Focale != null ? Focale : result['Focale'],
                    Modello
                ],
                function(err, results, fields) {
                    if(err) {
                        res.status(400).send(err)
                        return
                    }
                    res.send("Prodotto modificato")
                }
            )
        }
    )
}

export async function deleteProduct(req: Request, res: Response) {
    if(!await adminLoggedIn(req, res)) return

    const { Modello, Categoria } = req.body.dati

    connection.execute(
        `DELETE FROM ${Categoria} WHERE Modello = ?`,
        [Modello],
        function(err, results, fields) {
            if(err) {
                res.status(400).send(err)
                return
            }
            res.send("Prodotto eliminato")
        }
    )
}

export async function allLac(req: Request, res: Response) {
    connection.execute(
        `SELECT * FROM LAC`,
        [],
        function(err, results, fields) {
            res.json(results)
        } 
    )
}

export async function getLacFromID(req: Request, res: Response) {
    connection.execute(
        "SELECT * FROM LAC WHERE Modello = ?",
        [req.params.id],
        function(err, results, fields) {
            res.json(results)
        }
    )
}

export async function getLensesFromID(req: Request, res: Response) {
    connection.execute(
        "SELECT * FROM Lenti WHERE Modello = ?",
        [req.params.id],
        function(err, results, fields) {
            res.json(results)
        }
    )
}