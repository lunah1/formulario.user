// importar ferramentas prontas
const express = require("express"); //cria um servidor web em node.js-------Navegador → Servidor Express → resposta
const mysql = require("mysql2"); //permite conectar o node ao banco mysql ---------Navegador → Servidor Express → resposta
const cors = require("cors"); //permi que um site faça reuisções para outro servido
// navegador bloqueia requisições para outros servidores por questões de segurança, o cors é uma forma de liberar isso
// HTML rodando em
// file:// ou localhost:5500
// tentando acessar
// localhost:3000
///////////////////////
const app = express(); //cria o servidor da aplicação

app.use(cors()); //libera o cors para todas as rotas, isso permite que qualquer site faça requisições para esse servidor
app.use(express.json()); //permite que o servidor entenda requisições com corpo em formato json
app.use(express.urlencoded({extended: true})); //permite que o servidor entenda requisições com corpo em formato urlencoded, isso é necessário para entender os dados enviados pelo formulário do HTML, o extended: true permite que o servidor entenda objetos aninhados no corpo da requisição, isso é útil para enviar dados mais complexos


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "login_db"
});///conecetando ao banco de dados mysql, passando as informações de conexão
// | campo    | significado       |
// | -------- | ----------------- |
// | host     | onde está o banco |
// | user     | usuário           |
// | password | senha             |
// | database | banco             |
//Node.js → login_db → tabela usuarios
db.connect((err) => { //isso tenta abrir a conexão com o banco de dados, se der erro ele mostra o erro, se não ele mostra que a conexão foi bem sucedida
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    } else {
        console.log("Conectado ao MySQL com sucesso!");
    }
});

app.post("/login", (req, res) => { //rota para login, recebe uma requisição do tipo POST, o corpo da requisição deve conter um json com os campos "username" e "password"
    const {username, password} = req.body; //desestruturação do corpo da requisição para pegar os campos username e password realiza uma consulta no banco de dados para verificar se existe um usuário com o username e password fornecidos.bobu contem os dados enviados pelo navegador
    const sql = "select * from usuarios where username = ? and password = ?"; // consulta sql para verificar se existe um usuário com o username e password fornecidos, os ? são placeholders para os valores que serão passados depois
    db.query(sql, [username, password], (err, result) => { //executa a consulta no banco de dados, passando os valores de username e password para os placeholders, se der erro ele mostra o erro, se não ele verifica se o resultado da consulta tem algum registro, se tiver ele retorna uma resposta de sucesso, se não ele retorna uma resposta de erro
        //se der erro
        if (err) {
            return res.status(500).json({message: "Erro no servidor"});
        }
        // resposta enviado ao servidor
        // "acessso" : false;
        if (result.length > 0) {//contem as linhas retornadas //se o tamanho for maior que 0, significa que encontrou um usuário com o username e password fornecidos
            res.json({acesso:true});
        }
            
        else {
            res.json({acesso:false});
            }
        });
    });
    app.listen(8080, () => {
        console.log("servidor rodando na porta 8080");//isso faz o servidor começar a ouvir as requisições na porta 8080, quando o servidor estiver rodando, ele mostrará a mensagem "servidor rodando na porta 8080" no console
    });
