import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'

const app = express();
const PORT = 8000;

app.engine('hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.send(`<H1> Portfolio</H1> 
    <h3>Autores: Francisco Anderson e Letícia Maciel</h3> 
    <p>Objetivo: Desenvolver uma aplicação web responsável por gerenciar usuários, 
    utilizando Node.js, Express e TypeScript. A aplicação deve permitir a criação, 
    leitura, atualização e remoção (CRUD) de usuários, além de fornecer páginas para adicionar e editar usuários.</p>`);
})


app.listen(PORT, () => {
    console.log("Servidor do portfolio esperando reqs")
})