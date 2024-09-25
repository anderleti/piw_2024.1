import Router from "express";
import { AppDataSource } from "../database/data-source";
import { Like } from "../entities/Like";
import { authenticationJWT } from "../middleware/authMiddleware";
import { User } from "../entities/User";
import { Artwork } from "../entities/Artwork";

let error: String | null = null;

const router = Router();

// router.use(authenticationJWT);

//show all Likes
router.get("/:params", async (req, res) => {
  const likeRepository = AppDataSource.getRepository(Like);
  const params = req.params.params.split("&&");
  const artwork = params[0];
  const user = params[1];

  if (!user ||!artwork) {
    error = "Dados incompletos";
    res.status(400).json({
      data: error,
    });
    return;
}

  const artworkRepository = AppDataSource.getRepository(Artwork);
  const artworkId = parseInt(artwork);
  const artworklike = await artworkRepository.findOne({
    where: { id: artworkId }
  });
  if (!artworklike) {
      error = "Obra não encontrada.";
      res.status(400).json({
        data: error,
      });
      return;
  }

  
  const userRepository = AppDataSource.getRepository(User);
  const userId = parseInt(user);
  const userlike = await userRepository.findOne({
    where: { id: userId },
    relations: ["role"],
  });
  if (!userlike) {
      error = "Usuário não encontrado.";
      res.status(400).json({
        data: error,
      });
      return;
  }
  
  const like = await likeRepository.findOne({
    where: { artwork: artworklike, user: userlike },
    relations: ["user"],
  });

  res.status(200).json({
    data: like,
  });
});

router.post("/", async (req, res) => {
    const likeRepository = AppDataSource.getRepository(Like);
    const { user, artwork} = req.body;
    if (!user ||!artwork) {
        error = "Dados incompletos";
        res.status(400).json({
          data: error,
        });
        return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const userId = parseInt(user);

    const userlike = await userRepository.findOne({
      where: { id: userId },
      relations: ["role"],
    });
    if (!userlike) {
        error = "Usuário não encontrado.";
        res.status(400).json({
          data: error,
        });
        return;
    }
    const artworkRepository = AppDataSource.getRepository(Artwork);
    const artworkId = parseInt(artwork);
    const artworklike = await artworkRepository.findOne({
      where: { id: artworkId }
    });
    if (!artworklike) {
        error = "Obra não encontrada.";
        res.status(400).json({
          data: error,
        });
        return;
    }

    
    const newLike = {
        date: new Date(),
        user: userlike,
        artwork: artworklike,
    }
    artworklike.likes = artworklike.likes + 1;

    await artworkRepository.save(artworklike)
  
    await likeRepository.save(newLike);
    res.status(201).json({
      data: newLike,
    });
    
  });

router.delete("/:params", async (req, res) => {
  const likeRepository = AppDataSource.getRepository(Like);
  const params = req.params.params.split("&&");
  const artwork = params[0];
  const user = params[1];

  if (!user ||!artwork) {
    error = "Dados incompletos";
    res.status(400).json({
      data: error,
    });
    return;
}

  const artworkRepository = AppDataSource.getRepository(Artwork);
  const artworkId = parseInt(artwork);
  const artworklike = await artworkRepository.findOne({
    where: { id: artworkId }
  });
  if (!artworklike) {
      error = "Obra não encontrada.";
      res.status(400).json({
        data: error,
      });
      return;
  }

  
  const userRepository = AppDataSource.getRepository(User);
  const userId = parseInt(user);
  const userlike = await userRepository.findOne({
    where: { id: userId },
    relations: ["role"],
  });
  if (!userlike) {
      error = "Usuário não encontrado.";
      res.status(400).json({
        data: error,
      });
      return;
  }

  artworklike.likes = artworklike.likes - 1;

  await artworkRepository.save(artworklike)
  
  const like = await likeRepository.findOne({
    where: { artwork: artworklike, user: userlike },
    relations: ["user"],
  });

  if(like){
    await likeRepository.remove(like);
    res.status(204).json({
      data: '',
    });
  } else {
    res.status(404).json({
      status: '404',
      name: 'Not Found',
      message: 'Like não encontrado.',
    });
  }
});
  
export default router;