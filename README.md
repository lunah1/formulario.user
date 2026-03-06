## Instalar as dependências do backend
## projeto utiliza Node.js. Para instalar todas as dependências necessárias execute:

npm install

## Configurar o banco de dados

## Abra o MySQL e execute o arquivo database.sql que está no projeto para criar o banco e a tabela de usuários.

## Exemplo:

mysql -u root -p < database.sql

## Iniciar o servidor backend
## Para iniciar o servidor Node.js execute o comando:

node server.js

## O servidor será iniciado normalmente em:

http://localhost:8080

## Executar o frontend
## Abra o arquivo index.html no navegador.
## O formulário será carregado e permitirá enviar os dados de login para o servidor.

## Testar o sistema

## Preencha o nome de usuário e senha no formulário.

Se os dados estiverem corretos, aparecerá a mensagem:

"Acesso concedido"

Caso contrário será exibida a mensagem:

"Acesso negado"