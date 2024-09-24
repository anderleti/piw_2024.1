import Router from "express";
import { AppDataSource } from "../database/data-source";
import { Artwork } from "../entities/Artwork";
import { Author } from "../entities/Author";
import { authenticationJWT } from "../middleware/authMiddleware";

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

  if(!author){
    res.status(400).json({
      error: 'Selecione um artista'
    })
    return
  }

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
});

export default router;

//update an artwork
router.put("/:id", async (req, res) => {
  const artworkRepository = AppDataSource.getRepository(Artwork);

  const artworkId = Number(req.params.id);
  
  const {title, desc, tag, authors} = req.body

  const updatedArtwork = {
    title: title,
    desc: desc,
    tag: tag,
    authors: authors,
  };

  await artworkRepository.save(updatedArtwork)

  res.status(200).json({
    data: updatedArtwork,
  });
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