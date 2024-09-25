import Router from "express";
import { AppDataSource } from "../database/data-source";
import { Comments } from "../entities/Comments";
import { authenticationJWT } from "../middleware/authMiddleware";
import { User } from "../entities/User";
import { Artwork } from "../entities/Artwork";

let error =  {
  status:<String | null> null,
  name:<String | null> null,
  message:<String | null> null,
}

const router = Router();

// router.use(authenticationJWT);

//show all comments
router.get("/:id", async (req, res) => {
  const commentRepository = AppDataSource.getRepository(Comments);
  const artwork = req.params.id;
  const artworkRepository = AppDataSource.getRepository(Artwork);
  const artworkId = parseInt(artwork);
  const artworkcomment = await artworkRepository.findOne({
    where: { id: artworkId }
  });
  if (!artworkcomment) {
      error.status = '404';
      error.name = "Not found";
      error.message = "Trabalho não encontrado";
      res.status(400).json({
        status: error.status,
        name: error.name,
        message: error.message,
      });
      return;
  }
  
  const comments = await commentRepository.find({
    where: { artwork: artworkcomment},
    relations: ["user"],
  });

  res.status(200).json({
    data: comments,
  });
});

router.post("/", async (req, res) => {
    const commentRepository = AppDataSource.getRepository(Comments);
    const { user, artwork, comment } = req.body;
    if (!user ||!artwork ||!comment) {
        error.status = '404';
        error.name = "Not found";
        error.message = "Trabalho não encontrado";
        res.status(400).json({
          status: error.status,
          name: error.name,
          message: error.message,
        });
        return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const userId = parseInt(user);
    const usercomment = await userRepository.findOne({
      where: { id: userId },
      relations: ["role"],
    });
    if (!usercomment) {
      error.status = '404';
      error.name = "Not found";
      error.message = "Usuário não encontrado";
        res.status(400).json({
          data: error,
        });
        return;
    }
    const artworkRepository = AppDataSource.getRepository(Artwork);
    const artworkId = parseInt(artwork);
    const artworkcomment = await artworkRepository.findOne({
      where: { id: artworkId }
    });
    if (!artworkcomment) {
      error.status = '404';
      error.name = "Not found";
      error.message = "Trabalho não encontrado";
      res.status(400).json({
        status: error.status,
        name: error.name,
        message: error.message,
      });
      return;
  }

    
    const newComments = {
        date: new Date(),
        text: comment,
        user: usercomment,
        artwork: artworkcomment,
    }
  
    await commentRepository.save(newComments);
    res.status(201).json({
      data: comment,
    });
    
  });

export default router;
