import { Request, Response, response } from 'express'
import { connection } from '../utils/db'
import { loggedIn, adminLoggedIn } from '../utils/auth'

export async function ordersFromID(req: Request, res: Response) {
    if(!await adminLoggedIn(req, res)) return

    connection.execute(
        "SELECT IDProdotto, Categoria, Quantita FROM dettOrdini WHERE IDOrdine = ?",
        [req.body.id],
        async function(err, results, fields) {
            const result = results as any
            if(result.length == 0) {
                res.status(400).send('Errore')
                return
            }
            const ordine = [] as any

            for(let i = 0; i < result.length; ++i) {
                ordine.push((await selecProdotto(`SELECT * FROM ${result[i]['Categoria']} WHERE Modello = '${result[i]['IDProdotto']}'`))[0])
            }
            res.json(ordine)
        }
    )
}

export async function getOrder(req: Request, res: Response) {
    const user = await loggedIn(req, res)
    if(!user) return

    const IDOrdine = req.body.id

    connection.execute(
        "SELECT IDUtente FROM Ordini WHERE IDOrdine = ?",
        [IDOrdine],
        function(err, results, fields) {
            const check = (results as any)[0]['IDUtente']
            if(check != user.IDUtente) {
                res.status(403).send("Permesso negato")
                return
            }
            connection.execute(
                "SELECT IDProdotto, Categoria, Quantita FROM dettOrdini WHERE IDOrdine = ?",
                [IDOrdine],
                async function(err, results, fields) {
                    const result = results as any
                    const ordine = [] as any
        
                    for(let i = 0; i < result.length; ++i) {
                        ordine.push((await selecProdotto(`SELECT * FROM ${result[i]['Categoria']} WHERE Modello = '${result[i]['IDProdotto']}'`))[0])
                    }
                    res.json(ordine)
                }
            )
        }
    )
}

export async function ordersFromUser(req: Request, res: Response) {
    const user = await loggedIn(req, res)
    if(!user) return;
    
    connection.execute(
        "SELECT IDOrdine FROM Ordini WHERE IDUtente = ?",
        [user.IDUtente],
        async function(err, results, fields) {
            res.json(results)
        }
    )
}

export async function createOrder(req: Request, res: Response) {
    if(!await loggedIn(req, res)) return

    const data = new Date().toISOString().slice(0, 19)
    const ord = req.body.ord
    const IDUtente = req.body.IDUtente

    connection.execute(
        "INSERT INTO Ordini(IDUtente, Data) VALUES(?, ?)",
        [IDUtente, data],
        async function(err, results, fields) {
            connection.execute(
                "SELECT IDOrdine FROM Ordini WHERE IDUtente = ? AND Data = ?",
                [IDUtente, data],
                async function(err, results, fields) {
                    const IDOrdine = (results as any)[0]['IDOrdine']

                    for(let i = 0; i < ord.length; ++i) {
                        let IDProdotto: string = (ord as any)[i]['IDProdotto']
                        let Quantita: number = (ord as any)[i]['Quantita']
                        let Categoria: string = (ord as any)[i]['Categoria']

                        await selecProdotto(`INSERT INTO dettOrdini(IDOrdine, IDprodotto, Categoria, Quantita) VALUES(${IDOrdine}, '${IDProdotto}', '${Categoria}', ${Quantita})`)
                    }
                }
            )
        }
    )
    res.send("Ordine creato")
}

const selecProdotto = async (query: string) => {
    const res = await connection
                .promise()
                .query(
                    query,
                    []
                )
                .then(([rows, fields]) => {
                    return rows
                })
    return (res as any)
}
