import { Usuario } from "../models/usuario.model";

const usuario: Usuario = {
    id: "1",
    nome: "Linnik Souza",
    email: "linniksouza.prof@gmail.com",
    urlImagem: "https://avatars.githubusercontent.com/u/263082479"
};

const buscarUsuario = () => usuario;

export { buscarUsuario };
