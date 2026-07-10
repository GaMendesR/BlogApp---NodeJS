import express from "express"
import { engine } from "express-handlebars"
import bodyParser from "body-parser"
//import mongoose from "mongoose"

const app = express()

//Configurações
//Body Parses
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//HandleBars
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars");
//Mongoose
//Em breve


//Rotas




//Outros
const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor Rodando! ")
})