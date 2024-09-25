import Router from "express";
import { AppDataSource } from "../database/data-source";
import { Author } from "../entities/Author";
import { authenticationJWT } from "../middleware/authMiddleware";

const router = Router();

let error =  {
  status:<String | null> null,
  name:<String | null> null,
  message:<String | null> null,
}

function inputValidation(title:string, desc:string, tag:string){
  if(!title && !desc && !tag){
    error.status = "400"
    error.name = "Invalid input"
    error.message = "Preencha todos os campos"
    return (error)
  }
}

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

  if(author){
    res.status(200).json({
      data: author,
    });
  } else {
    error.status = "404"
    error.name = "Not Found"
    error.message = "Autor não encontrado.";
    res.status(404).json({ 
      status: error.status,
      name: error.name,
      message: error.message,
    });
  }

  
});

//add an author
router.post("/", authenticationJWT, async (req, res) => {
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
router.put("/:id", authenticationJWT, async (req, res) => {
  const authorRepository = AppDataSource.getRepository(Author);

  const authorId = Number(req.params.id);
  const {name, username, bio, photo} = req.body;

  if(name && username && bio && photo){
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
  } else {
    error.status = "400"
    error.name = "Invalid input"
    error.message = "Preencha todos os campos";
    res.status(404).json({ 
      status: error.status,
      name: error.name,
      message: error.message,
     });
  }

  
});
//dele an author
router.delete("/:id",authenticationJWT, async(req, res)=>{
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
  } else {
    error.status = "404"
    error.name = "Not found"
    error.message = "Autor não existe";
    res.status(404).json({ 
      status: error.status,
      name: error.name,
      message: error.message,
     });
  }

})