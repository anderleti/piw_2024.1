import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
<<<<<<< HEAD
=======
import { Role } from "../entities/Role";
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);
<<<<<<< HEAD
  const user = await userRepository.findOneBy({ username });
=======
  const user = await userRepository.findOne({
    where: { username: username },
    relations: ["role"],
  });

  console.log(user)
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        userRole: user.role,
      },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      data: {
<<<<<<< HEAD
        username: user.username,
        email: user.email,
=======
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          password: user.password,
          role: {
            id: user.role.id,
            name: user.role.name,
          }
        },
>>>>>>> d473681 (Entrega 05: Página de login e cadastro OK)
        jwt: token
      },
    });
  } else {
    res.status(401).json({
      status: 401,
      name: "Authentication Error",
      message: "Username or password incorrect",
    });
  }
});

router.get("/logout", (req, res) => {
  res.status(200).json({
    data: {
      message: "Logout realized with sucess",
    },
  });
});

export default router;
