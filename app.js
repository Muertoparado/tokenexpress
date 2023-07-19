import express from 'express';
import app from './routers/routes.js';
import dotenv from 'dotenv';
dotenv.config();
const appPrueba = express();

appPrueba.use(express.json());
appPrueba.use("/",app);

appPrueba.listen(5200,() => {
    console.log(`http://127.3.3.2`);
});

export default appPrueba;