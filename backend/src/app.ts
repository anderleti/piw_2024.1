import "reflect-metadata";
import express from "express";
import userRoutes from './routes/userRoutes'
import authRoutes  from './routes/authRoutes'
import roleRoutes  from './routes/rolesRoutes'
import authorsRoutes  from './routes/authorsRoutes'
import artworkRoutes  from './routes/artworksRoutes'
import commentsRoutes from './routes/commentsRoutes'
import likesRoutes from './routes/likesRoutes'
import { AppDataSource } from "./database/data-source";
import cors from "cors";

async function main() {
  try{
    //db
    await AppDataSource.initialize();
    //api
    const app = express();
    app.use(cors());
    app.use(express.json());
  //routes
    app.use('/', authRoutes)
    app.use('/users', userRoutes);
    app.use('/artworks', artworkRoutes);
    app.use('/roles', roleRoutes);
    app.use('/authors', authorsRoutes);
    app.use('/comments', commentsRoutes);
    app.use('/likes', likesRoutes);

    
    //Start server
    const port = 8000;
    app.listen(port, () => {
    console.log(`Servidor do portfolio esperando reqs: http://localhost:${port} OU http://127.0.0.1:${port}`);
      });

  }catch(error){
    throw error;
  }

  
};

main();
