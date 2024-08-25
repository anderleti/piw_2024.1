import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import { User } from "./entities/User";
import { Repository } from "typeorm";

import express from "express";
import userRoutes from './routes/userRoute'

//
const app = express();
app.use(express.json());

async function main() {
  try{
    //db
    await AppDataSource.initialize();
    
    //routes
    app.use('/users', userRoutes)

    //Start server
    const port = 8000;
    app.listen(port, () => {
    console.log(`Servidor do portfolio esperando reqs: https://localhost:${port} OU https://127.0.0.1:${port}`);
      });

  }catch(error){
    throw error;
  }

  
};

main();
