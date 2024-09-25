import Router from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { authenticationJWT } from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";

let error =  {
  status:<String | null> null,
  name:<String | null> null,
  message:<String | null> null,
}

function inputValidation(
  username: string,
  name: string,
  email: string,
  password: string,
) {
  if (username && name && email && password ) {
    const emailRegex = new RegExp('^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$');
    const passwordRegex = new RegExp(
      `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`
    );

    if (username.length < 3) {
      error.status = "400"
      error.name = "Validation Error"
      error.message= "O seu nome de usuário deve ter pelo menos 3 caracteres."
      return (error);
    } else if (name.length < 5) {
      error.status = "400"
      error.name = "Validation Error"
      error.message = "O seu nome deve ter pelo menos 5 caractes"
      return (error);
    } else if (!emailRegex.exec(email)) {
      error.status = "400"
      error.name = "Validation Error"
      error.message= "Email inválido."
      return (error);
    } else if (!passwordRegex.exec(password)) {
      error.status = "400"
      error.name = "Validation Error"
      error.message= "A senha deve ter pelo menos 8 caracteres, conter letras maiúsculas, minúsculas, números e caracteres especiais."
      return (error);
    }
  } else {
    error.status = "400"
    error.name = "Validation Error"
    error.message = "Todos os campos devem ser preenchidos."
    return (error)
  }
}


const router = Router();

// router.use(authenticationJWT);

//show all users
router.get("/", authenticationJWT, async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ relations: ["role"] });
  res.status(200).json({
    data: users,
  });
});

//show a user
router.get("/:id", authenticationJWT, async (req, res) => {
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
    error.status = "404"
    error.name = "Not Found"
    error.message = "Usuário não encontrado.";
    res.status(404).json({ 
      status: error.status,
      name: error.name,
      message: error.message,
     });
  }
});

//add a user
router.post("/",async (req, res) => {
  const { username, name, email, password } = req.body;
  const role = "User";
  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  let roleInDb = await roleRepository.findOne({ where: { name: role } });
  if (!roleInDb) {
    roleInDb = roleRepository.create({ name: role }); 
    await roleRepository.save(roleInDb);
  }
  
  console.log(username, name , email, password)
  inputValidation(username, name , email, password);
  console.log(error)

  if (!roleInDb) {
    roleInDb = roleRepository.create({ name: role });
    await roleRepository.save(roleInDb);
  }

  if(!error.status){
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
  } else {
      res.status(400).json({ 
        status: error.status,
        name: error.name,
        message: error.message,
      });
  }

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
    // inputValidation(username, name, email, password);
    if (!error.status) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newData = {
        id: userId,
        username: username,
        name: name,
        email: email,
        password: hashedPassword,
        role: roleInDb,
      };

      await userRepository.save(newData);
      res.status(200).json({
        data: newData,
      });
    } else {
      console.error
      res.status(400).json({ 
        status: error.status,
        name: error.name,
        message: error.message, });
    }
  } else {
    res.status(404).json({ 
      status: "404", 
      name: "Not Found",
      message: "Usuário não encontrado.",
     });
  }
});

//delete specific user
router.delete("/:id", authenticationJWT,async (req, res) => {
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
    error.status = "404"
    error.name = "Not Found"
    error.message = "Usuário não encontrado.";
    res.status(404).json({ 
      status: error.status,
      name: error.name,
      message: error.message,
     });
  }
});

export default router;
