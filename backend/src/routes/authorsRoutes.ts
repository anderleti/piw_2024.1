import Router from "express";
import { AppDataSource } from "../database/data-source";
import { Author } from "../entities/Author";
import { authenticationJWT } from "../middleware/authMiddleware";

const router = Router();

// router.use(authenticationJWT);

//show all authors
router.get("/", async (req, res) => {
  const authorRepository = AppDataSource.getRepository(Author);
  const authors = await authorRepository.find();
  res.status(200).json({
    data: authors,
  });
});

router.get("/:id", async (req, res) => {

  const authorId = Number(req.params.id)
  const authorRepository = AppDataSource.getRepository(Author);
  const author = await authorRepository.findOne({
    where: {
      id: authorId
    }
  });
  res.status(200).json({
    data: author,
  });
});

//add an author
router.post("/", async (req, res) => {
  const authorRepository = AppDataSource.getRepository(Author);

  const {name, username, bio, photo} = req.body

  const newAuthor = {
    name: name,
    username: username,
    bio: bio,
    photo: photo,
  }

  await authorRepository.save(newAuthor);

  res.status(201).json({
    data: newAuthor,
  });
});

export default router;

//update an author
router.put("/:id", async (req, res) => {
  const authorRepository = AppDataSource.getRepository(Author);

  const authorId = Number(req.params.id);
  const {name, username, bio, photo} = req.body;

  const updatedAuthor = await authorRepository.save({
    id: authorId,
    name: name,
    username: username,
    bio: bio,
    photo: photo,
  });

  res.status(200).json({
    data: updatedAuthor,
  });
});
//dele an author
router.delete("/:id", async(req, res)=>{
  const authorRepository = AppDataSource.getRepository(Author);
  const authorId = Number(req.params.id);
  const authorToRemove = await authorRepository.findOne({
    where: {
      id: authorId
    }
  });

  if(authorToRemove){
    await authorRepository.remove(authorToRemove);
    res.status(200).json({
      data: authorToRemove,
    });
  }

})