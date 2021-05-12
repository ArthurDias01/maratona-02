const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

server.use(express.static("public")); // << funçao para habilitar todos os carminhos estáticos - cria as rotas automaticamente

server.set("view engine", "ejs");

//mudar a localização da pasta views* (padrão de procura da view engine ejs)
server.set("views", path.join(__dirname, "views"));

//usar req.body:
server.use(express.urlencoded({ extended: true }));

//criando a rota HOME ou inicial do servidor (configura que o comando ou url digitada como '/' aponte para o arquivo index.html)
//Chamar rotas!  do routes
server.use(routes);

// listen => abrir porta para receber comandos
server.listen(3000, () => console.log("Server ON and Running"));
