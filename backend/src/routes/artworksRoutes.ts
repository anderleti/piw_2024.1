import Router from "express";
import { AppDataSource } from "../database/data-source";
import { Artwork } from "../entities/Artwork";
import { Author } from "../entities/Author";
import { authenticationJWT } from "../middleware/authMiddleware";

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

const router = Router();

// router.use(authenticationJWT);

//show all artworks
router.get("/", async (req, res) => {
  const artworkRepository = AppDataSource.getRepository(Artwork);
  const artworks = await artworkRepository.find({relations: ['author']});
  res.status(200).json({
    data: artworks,
  });
});

router.get("/:id", async (req, res) => {

  const artworkId = Number(req.params.id)
  const artworkRepository = AppDataSource.getRepository(Artwork);
  const artwork = await artworkRepository.findOne({
    where: {
      id: artworkId
    }, 
    relations: ['author']
  });
  res.status(200).json({
    data: artwork,
  });
});

//add an artwork
router.post("/", async (req, res) => {

  const artworkRepository = AppDataSource.getRepository(Artwork);

  const authorRepository = AppDataSource.getRepository(Author);

  const {title, desc, tag, authorId} = req.body

  const author = await authorRepository.findOne({
    where: {id: Number(authorId)}
  })

  inputValidation(title, desc, tag)

  console.log(error)

  if(!error.status && author){
    const newArtwork = {
      title: title,
      desc: desc,
      tag: tag,
      author: author,
      date: new Date(),
      likes: 0,
      comments: 0,
    }
    await artworkRepository.save(newArtwork);

    res.status(201).json({
      data: newArtwork,
    });
  } else {
    res.status(400).json({
      status: error.status,
      name: error.name,
      message: error.message
    })
  }
});

export default router;

//update an artwork
router.put("/:id", async (req, res) => {
  const artworkRepository = AppDataSource.getRepository(Artwork);

  const artworkId = Number(req.params.id);
  const artwork = await artworkRepository.findOne({
    where: {
      id: artworkId
    }, 
    relations: ['author']
  });
  
  const {title, desc, tag, authors, like, comment} = req.body

  if(!error && artwork){
    const updateArtwork = {
      id: artwork.id,
      title: title ? title : artwork.title,
      desc: desc ? desc : artwork.title,
      tag: tag ? tag : artwork.tag,
      likes: (Number(artwork.likes) + (like? 1 : 0)),
      comments: (Number(artwork.likes) + (comment? 1 : 0)),
    }
    await artworkRepository.save(updateArtwork);

    res.status(201).json({
      data: updateArtwork,
    });
  } else {
    res.status(400).json({
      status: error.status,
      name: error.name,
      message: error.message
    })
  }

});
//dele an artwork
router.delete("/:id", async(req, res)=>{
  const artworkRepository = AppDataSource.getRepository(Artwork);
  const artworkId = Number(req.params.id);
  const artworkToRemove = await artworkRepository.findOne({
    where: {
      id: artworkId
    }
  });

  if(artworkToRemove){
    await artworkRepository.remove(artworkToRemove);
    res.status(200).json({
      data: artworkToRemove,
    });
  }

})