import "reflect-metadata";
import express from "express";
import userRoute from './routes/userRoutes'
import authRoutes  from './routes/authRoutes'
import { AppDataSource } from "./database/data-source";


//
const app = express();
app.use(express.json());
app.use('/', authRoutes)
app.use('users', userRoute);
app.use('items', userRoute);

async function main() {
  try{
    //db
    await AppDataSource.initialize();
    
    //routes
    app.use('/', authRoutes);
    app.use('/users', userRoute);

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
