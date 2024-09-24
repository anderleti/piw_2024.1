import Router from "express";
import { AppDataSource } from "../database/data-source";
import { Role } from "../entities/Role";
import { authenticationJWT } from "../middleware/authMiddleware";



const router = Router();

router.use(authenticationJWT);

//show all roles
router.get("/", async (req, res) => {
  const roleRepository = AppDataSource.getRepository(Role);
  const roles = await roleRepository.find();
  res.status(200).json({
    data: roles,
  });
});

export default router;
