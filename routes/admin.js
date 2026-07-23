import express from "express"
import mongoose from "mongoose"
import Categoria from "../models/Categoria.js";
import Postagem from "../models/Postagem.js";

const router = express.Router()
//const Categorias= mongoose.model("categorias")


router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Página de Posts")
})

router.get('/categorias', (req, res) => {
    Categoria.find().sort({ date: "desc" }).then((categorias) => {
        res.render("admin/categorias", { categorias: categorias })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
})

router.get("/categorias/add", (req, res) => {
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", (req, res) => {

    var erros = []

    if (!req.body.nome || req.body.nome == null) {
        erros.push({ texto: "Nome Inválido!" })
    } else if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome Deve ser Maior que 2 caracteres!" })
    }

    if (req.boddy.slug || req.body.slug == null) {
        erros.push({ texto: "Slug Inválido!" })
    }


    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros: erros })
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save().then(() => {
            console.log("Categoria Salva com Sucesso!")
            req.flash("success_msg", "Categoria criado com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            console.log("Erro ao salvar categoria: " + err)
            req.flash("error_msg", "Houve um erro ao tentar salvar a categoria, tente novamente!")
            res.redirect("/admin/categorias")
        })
    }
})


router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({ _id: req.params.id }).then((categoria) => {
        res.render("admin/editcategorias", { categoria: categoria })
    }).catch((err) => {
        req.flash("error_msg", "Essa categoria não existe!")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit", (req, res) => {

    var erros = []

    if (typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome Inválido!" })
    } else if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome Deve ser Maior que 2 caracteres!" })
    }

    if (typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "Slug Inválido!" })
    }


    if (erros.length > 0) {
        res.render("admin/editcategorias", { erros: erros })
    } else {
        Categoria.findOne({ _id: req.body.id }).then((categoria) => {

            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save().then(() => {
                req.flash("success_msg", "Categoria editada com sucesso!")
                res.redirect("/admin/categorias")
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro no DB ao editar a categoria, tente novamente!")
                res.redirect("/admin/categorias")
            })
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao editar a categoria, tente novamente!")
            res.redirect("/admin/categorias")
        })
    }


})

router.post("/categorias/deletar", (req, res) => {
    Categoria.deleteOne({ _id: req.body.id }).then((result) => {
        if (result.deletedCount > 0) {
            req.flash("success_msg", "Categoria deletada com sucesso!")
        } else {
            req.flash("error_msg", "Categoria não encontrada!")
        }
        res.redirect("/admin/categorias")


    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao tentar deletar a categoria!")
        res.redirect("/admin/categorias")
    })
})


router.get("/postagens", (req, res) => {
    Postagem.find().sort({ date: "desc" }).then((postagens) => {
        res.render("admin/postagens", { postagens: postagens })
    }).catch((err) => {
        req.flash("error_msg", "Erro ao carregar postagens, tente novamente!")
        res.redirect("/admin")
    })
})

router.get("/postagens/add", (req, res) => {
    Categoria.find().then((categorias) => {
        res.render("admin/addpostagem", { categorias: categorias })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar as categorias!")
        res.redirect("/admin")
    })

})


router.post("/postagens/nova", (req, res) => {

    var erros = []

    if (!req.body.titulo || req.body.titulo == null) {
        erros.push({ texto: "Título não pode estar vazio!" })
    }

    if (!req.body.slug || req.body.slug == null) {
        erros.push({ texto: "Slug não pode ser vazio!" })
    }

    if (!req.body.descricao || req.body.descricao == null) {
        erros.push({ texto: "Descrição não pode ser vazia!" })
    }

    if (!req.body.conteudo || req.body.conteudo == null) {
        erros.push({ texto: "Conteúdo não pode ser vazio!" })
    }

    if (req.body.categoria == "0") {
        erros.push({ texto: "Categoria inválida, registe uma categoria!" })
    }

    if (erros.length > 0) {
        res.render("admin/addpostagem", { erros: erros })
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao tentar salvar postagem, tente novamente!")
            res.redirect("/admin/postagens")
        })
    }

})

export default router;
