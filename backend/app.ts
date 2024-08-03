import { error } from 'console';
import express from 'express';
//
const app = express();
app.use(express.json());

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
}

const users: User[] =   [
    {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123'
    },
    {
        id: 2,
        username: 'maria',
        email: 'maria1@example.com',
        password: 'maria123'
    },
    {
        id: 3,
        username: 'joana',
        email: 'joana2@example.com',
        password: 'diva123'
    }
];

app.get('/', (req, res) => res.redirect('/users'));

//show all users
app.get('/users', (req, res) =>{
    res.send(users);
})

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if(user){
        res.send(user);
    } else{
        res.status(400).send('Usuário não encontrado');
    }

});

//add a user
app.post('/users/', (req, res) =>{
    const{username, email, password} = req.body;
    const id = users.length + 1;

    if(username && email && password){
        users.push({
            id: id,
            username: username,
            email: email,
            password: password
        });
    } else {
        res.status(400).send('Preencha todos os campos');
    }
});

//update specific user
app.post('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const {username, email, password} = req.body;
    const user = users.find(u => u.id === userId);
    if(user) {
        if(username && email && password){
            user.username = username;
            user.email = email;
            user.password = password;
            res.redirect('/users/')
        } else{
            res.status(400).send('Preencha todos os campos');
        }


    }
    else{
        res.status(404).send('Usuário não encontrado');
    }
}
);

//delete specific user
app.get('/users/remove/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userPosition = users.findIndex(u => u.id === userId);
    console.log(users, userPosition)
    if(userPosition >= 0) {
        users.splice(userPosition, 1);
        console.log(users)
        res.redirect('/users/')
    }
    else{
        res.status(404).send('Usuário não encontrado');
    }
});

//Start server
const port = 8000;
app.listen(port, () => {
    console.log('[server]: Servidor do portfolio esperando reqs: https://localhost:${port}');
});