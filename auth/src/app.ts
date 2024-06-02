import express, { Express } from 'express'
import bodyParser from "body-parser"
import authRouter from "./auth-router"
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app: Express = express()
const port: String | undefined = process.env.PORT

var corsOptions = {
    origin: process.env.FRONT_URL,
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(cookieParser())

app.use(authRouter)

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain")
    res.status(404).send("404 PAGE NOT FOUND...")
})

app.listen(port, function() {
    console.log("Listening on port: " + port)
})
