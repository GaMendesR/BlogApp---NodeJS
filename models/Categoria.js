import mongoose from "mongoose";

const Schema = mongoose.Schema

const CategoriaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


export default mongoose.model("categorias", CategoriaSchema)