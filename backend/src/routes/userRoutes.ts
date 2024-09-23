import Router from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { authenticationJWT } from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";

let error: String | null = null;

function inputValidation(
  username: string,
  email: string,
  name: string,
  password: string,
  // role: string
) {
  if (username && name && email && password ) {
    const emailRegex = new RegExp("^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$");
    const passwordRegex = new RegExp(
      `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`
    );

    if (username.length < 3) {
      return (error = "Nome de usuário deve ter pelo menos 3 caracteres.");
    } else if (name.length < 5) {
      return (error = "O seu nome deve ter pelo menos 5 caracteres.");
    } else if (!emailRegex.exec(email)) {
      return (error = "Email inválido.");
    } else if (!passwordRegex.exec(password)) {
      return (error =
        "Senha inválida. Certifique-se de que a senha tenha pelo menos 8 caracteres, 1 número e 1 letra maiúscula.");
    }
  } else {
    return (error = "Todos os campos devem ser preenchidos.");
  }
}

const router = Router();

// router.use(authenticationJWT);

//show all users
router.get("/", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ relations: ["role"] });
  res.status(200).json({
    data: users,
  });
});

//show a user
<<<<<<< HEAD
router.get("/:id", async (req, res) => {
=======
router.get("/:id", authenticationJWT, async (req, res) => {
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
  const userRepository = AppDataSource.getRepository(User);
  const userId = parseInt(req.params.id);
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["role"],
  });

  if (user) {
    res.status(200).json({
      data: user,
    });
  } else {
    error = "Usuário não encontrado.";
    res.status(400).json({ error });
  }
});

//add a user
<<<<<<< HEAD
router.post("/", async (req, res) => {
=======
router.post("/",async (req, res) => {
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
  const { username, name, email, password } = req.body;

  console.log(req.body);

  const role = "admin";
  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  let roleInDb = await roleRepository.findOne({ where: { name: role } });
  if (!roleInDb) {
    roleInDb = roleRepository.create({ name: role });
    await roleRepository.save(roleInDb);
  }

  inputValidation(username, name , email, password);
  if (!roleInDb) {
    roleInDb = roleRepository.create({ name: role });
    await roleRepository.save(roleInDb);
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    username: username,
    name: name,
    email: email,
    password: hashedPassword,
    role: roleInDb,
  };

  await userRepository.save(newUser);
  res.status(201).json({
    data: newUser,
  });
});

//update specific user
router.put("/:id", authenticationJWT, async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  const userId = parseInt(req.params.id);
  const { username, name, email, password, role } = req.body;

  let userToUpdate = await userRepository.findOne({
    where: { id: userId },
    relations: ["role"],
  });

  let roleInDb = await roleRepository.findOne({ where: { name: role } });
  if (!roleInDb) {
    roleInDb = roleRepository.create({ name: role });
    await roleRepository.save(roleInDb);
  }

  if (userToUpdate) {
    inputValidation(username, name, email, password);
    if (!error) {
      const newData = {
        id: userId,
        username: username,
        name: name,
        email: email,
        password: password,
        role: roleInDb,
      };

      await userRepository.save(newData);
      res.status(200).json({
        data: newData,
      });
    } else {
      res.status(400).json({ error });
    }
  } else {
    res.status(404).json({ erro: "Usuário não encontrado." });
  }
});

//delete specific user
<<<<<<< HEAD
router.delete("/:id", async (req, res) => {
=======
router.delete("/:id", authenticationJWT,async (req, res) => {
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
  const userRepository = AppDataSource.getRepository(User);
  const userId = parseInt(req.params.id);
  const userToRemove = await userRepository.findOneBy({ id: userId });

  if (userToRemove) {
    console.log(userToRemove);
    await userRepository.remove(userToRemove);
    res.status(200).json({
      data: userToRemove,
    });
  } else {
    error = "Usuário não encontrado.";
    res.status(404).json({ error });
  }
});

export default router;
