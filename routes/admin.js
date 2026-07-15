import express from "express"
import mongoose from "mongoose"
import Categoria from "../models/Categoria.js";

const router = express.Router()
//const Categorias= mongoose.model("categorias")


router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Página de Posts")
})

router.get('/categorias', (req, res) => {
    res.render("admin/categorias")
})

router.post("/categorias/nova", (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save()
        .then(() => console.log("Categoria Salva com Sucesso!"))
        .catch((err) => console.log("Erro ao salvar categoria: " + err))
})


router.get("/categorias/add", (req, res) => {
    res.render("admin/addcategorias")
})

export default router;