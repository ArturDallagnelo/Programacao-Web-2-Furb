import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    id: {type: String},
    nomeUsuario: {type: String, required: true},
    email: {type: String},
    senha: {type: String, required: true},
  },
  {
    versionKey: false
  }
)
export default mongoose.model("usuario", usuarioSchema);