import express from "express"
import { engine } from "express-handlebars"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import admin from "./routes/admin.js"
import { glob } from "fs"
import session from "express-session"
import flash from "connect-flash"

const app = express()

//Configurações

//Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

//Sessão
app.use(session({
    secret: "DG!12@$31dAS#Dasd2#13!@$wyegSDFsad!gaSDg34q]yeGGe@Afds",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

//Body Parses
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//HandleBars
app.engine("handlebars", engine({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}))
app.set("view engine", "handlebars");

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp")
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch((err) => console.log("Erro ao se conectar ao MongoDB: " + err))

//Public
app.use(express.static(path.join(__dirname, "public")))

//Rotas
app.use('/admin', admin)

app.get("/posts", (req, res) => {
    res.send("Lista de Posts")
})

app.get("/", (req, res) => {
    res.send("Pagina Inicial")
})


//Outros
const PORT = 8081;
app.listen(PORT, () => console.log("Servidor Rodando!"))