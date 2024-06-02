import express, { Express } from 'express'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import framesRouter from "./routes/products-router"
import ordersRouter from "./routes/orders-router"
import usersRouter from "./routes/users-router"
import cors from 'cors'

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

app.use(framesRouter)
app.use(ordersRouter)
app.use(usersRouter)

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain")
    res.status(404).send("404 PAGE NOT FOUND...")
})

app.listen(port, function() {
    console.log("Listening on port: " + port)
})
