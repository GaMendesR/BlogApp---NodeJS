import express from "express"
import { engine } from "express-handlebars"
import bodyParser from "body-parser"
//import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import admin from "./routes/admin.js"


const app = express()

//Configurações

//Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)


//Body Parses
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//HandleBars
app.engine("handlebars", engine({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}))
app.set("view engine", "handlebars")

//Mongoose
//Em breve


//Public
app.use(express.static(path.join(__dirname,"public")))


//Rotas
app.use('/admin', admin)

app.get("/posts", (req, res) => {
    res.send("Lista de Posts")
})

app.get("/", (req,res) => {
    res.send("Pagina Inicial")
})


//Outros
const PORT = 8081;
app.listen(PORT, () => console.log("Servidor Rodando!"))