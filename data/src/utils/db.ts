import mysql, { Connection } from 'mysql2'

export const connection: Connection = mysql.createConnection({
    host: process.env.DB_URL,
    user: 'Arrighi',
    password: '1234',
    database: 'Data'
})