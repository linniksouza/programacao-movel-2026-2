import { Usuario } from "../models/usuario.model";

const usuario: Usuario = {
    cpf: "12345678900",
    nome: "Linnik Souza",
    email: "linniksouza.prof@gmail.com",
    urlImagem: "https://avatars.githubusercontent.com/u/263082479"
};

const buscarUsuario = () => usuario;

export { buscarUsuario };
