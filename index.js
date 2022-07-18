import express, { response } from "express";
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000; // Define uma porta automática e uma default

app.use(express.json()); // Define que o que será enviado será um objeto JSON

let users = [
    {
        id: 1,
        name: 'Rafael',
        height: 1.73
    },
    {
        id: 2,
        name: 'Vitor',
        height: 1.65
    }
];

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});

// Apredendo usar o GET - retornando conteúdos e usuários
app.get('/', (request, response) => {
    return response.send('Hello World');
});

app.get('/users', (request, response) => { 
    return response.send(users);
});

app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId));
    });
    return response.send(user);
});

// Apredendo a usar o POST - criando um novo usuário
app.post('/users', (request, response) => {
    const newUser = request.body;
    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

// Aprendendo a usar  o PUT - atualizando um usuário cadastrado
app.put('/users/:userId', (request, responde) => {
    const userId = request.params.userId;
    const updateUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updateUser;
        }
        return user;
    });
    
    return response.send(updateUser);
});

// Apredendo a usar o DELETE - removando usuários com um dos muitos métodos
app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    users = users.filter((user) => user.id !== Number(userId))

    return response.status(StatusCodes.NO_CONTENT).send(userId);
});