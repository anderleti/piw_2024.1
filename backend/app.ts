import express from 'express';
//
const app = express();

app.get('/', (req, res) => {
    res.send(`<H1> Portfolio</H1> 
    <h3>Autores: Francisco Anderson e Letícia Maciel</h3> 
    <p>Objetivo: Desenvolver uma aplicação web responsável por gerenciar usuários, 
    utilizando Node.js, Express e TypeScript. A aplicação deve permitir a criação, 
    leitura, atualização e remoção (CRUD) de usuários, além de fornecer páginas para adicionar e editar usuários.</p>`);
})

//Start server
const port = 8000;
app.listen(port, () => {
    console.log(`Servidor do portfolio esperando reqs: https://localhost/${port}`)
})
