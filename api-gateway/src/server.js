import dotenv from 'dotenv';
import express  from 'express';
import auth from './routes/auth-routes.js'
import data from './routes/data-routes.js'

dotenv.config();
const app = express();

app.use(auth)
app.use(data)

app.use(function(req, res, next) {
    res.status(404).json({ error:'Not Found' });
});
 
app.listen(process.env.PORT, function () {
    console.log("listening on port: " + process.env.PORT)
})
