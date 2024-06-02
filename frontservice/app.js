import express from 'express'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import history from "connect-history-api-fallback"
import axios from 'axios'

const app = express()
const port = process.env.PORT

app.use(history())
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static("dist"))

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain")
    res.status(404).send("404 PAGE NOT FOUND...")
})

app.listen(port, function() {
    console.log("Listening on port: " + port)
})
