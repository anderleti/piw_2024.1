import "reflect-metadata";
import express from "express";
import userRoute from './routes/userRoutes'
import authRoutes  from './routes/authRoutes'
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
    app.use('/users', userRoute);
    app.use('/artworks', userRoute);

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
