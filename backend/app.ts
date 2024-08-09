import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Repository } from "typeorm";

import express from "express";

//
const app = express();
app.use(express.json());

async function main() {
  console.log("cudepinto");
  await AppDataSource.initialize();
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  // let passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$");
  let emailRegex = new RegExp("^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$");

  // app.get("/", (req, res) => res.redirect("/users"));

  //show all users
  app.get("/users", async (req, res) => {
    console.log("cudepinto get");
    const users = await userRepository.find();
    if (users.length === 0) {
      res.status(404).send("Nenhum usuário encontrado");
      return;
    } else {
      res.json(users);
    }
  });
  //show a user
  app.get("/users/:id", async (req, res) => {
    console.log("cudepinto mostrar especifico");
    const userId = parseInt(req.params.id);
    const user = await userRepository.findOneBy({id: userId});

    if (user) {
      res.send(user);
    } else {
      res.status(400).send("Usuário não encontrado");
    }
  });

  //add a user
  app.post("/users/", async (req, res) => {
    console.log("cudepinto add");
    const { username, email, password } = req.body;
    if (username && email && password) {
      let error = null;

      switch (true) {
        case username.length < 5:
          error = "Nome de usuário deve ter pelo menos 5 caracteres";
          break;

        case !emailRegex.exec(email):
          error = "Email inválido";
          break;

        // case !passwordRegex.exec(password):
          // error =
          //   "Senha inválida. Certifique-se de que a senha tenha pelo menos 8 caracteres, 1 número e 1 letra maiúscula.";
          // break;

        default:
          // Se não houver erro, adiciona o usuário
          const newUser = req.body;
          await userRepository.save(newUser)
      }

      res.status(400).json({ error });
    } else {
      res.status(400).send("Preencha todos os campos");
    }
  });

  //update specific user
  app.post("/users/:id", async (req, res) => {
    console.log("delete o cudepinto");
    const userId = parseInt(req.params.id);
    const { username, email, password } = req.body;
    const user = await userRepository.findOneBy({id: userId});

    if (user) {
      let error = null;
      let emailRegex = new RegExp("^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$");
      let passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$");

      switch (true) {
        case username.length < 5:
          error = "Nome de usuário deve ter pelo menos 5 caracteres";
          break;

        case !emailRegex.exec(email):
          error = "Email inválido";
          break;

        // case !passwordRegex.exec(password):
        //   error =
        //     "Senha inválida. Certifique-se de que a senha tenha pelo menos 8 caracteres, 1 número e 1 letra maiúscula.";
        //   break;

        default:
          // Se não houver erro, atualiza o usuário
          const userUpdate = req.body;
          await userRepository.save(userUpdate)
          return res.redirect("/users/");
      }

      // Retorna o erro encontrado
      res.status(400).json({ error });
    } else {
      res.status(404).json({ erro: "Usuário não encontrado" });
    }
  });

  //delete specific user
  app.get("/users/remove/:id", async (req, res) => {
    const userId = parseInt(req.params.id);

    const userToRemove = await userRepository.findOneBy({id: userId});
    
    if (userToRemove) {
      await userRepository.remove(userToRemove);
      res.redirect("/users/");
    } else {
      res.status(404).send("Usuário não encontrado");
    }
  });

  //Start server
  const port = 8000;
  app.listen(port, () => {
    console.log(
      `Servidor do portfolio esperando reqs: https://localhost:${port} OU https://127.0.0.1:${port}`
    );
  });
};

main();

// proximo passo ja ja
// async function main(){
//     await AppDataSource.initialize();
//     const userRepository: Repository<User> = AppDataSource.getRepository(User);

//     const menuOptions = [
//         {
//             name: 'Cadastrar novo usuário',
//             value: '/users/add',
//             description: 'add new user'
//         },
//         {
//             name: 'Listar todos os usuários',
//             value: '/users',
//             description: 'list users'
//         },
//         {
//             name: 'Atualizar um usuário',
//             value: '/users',
//             description: 'update user'
//         },
//         {
//             name: 'Remover um usuário',
//             value: '/users/remove',
//             description: 'delete user'
//         },

//     ];

//     const menu =
// }