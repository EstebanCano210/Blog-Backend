'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import postRoutes     from '../src/post/post.routes.js';
import commentRoutes  from '../src/comment/comment.routes.js';
import categoryRoutes from '../src/category/category.routes.js';


const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) =>{
    app.use('/Blog-App/v1/categories', categoryRoutes);
    app.use('/Blog-App/v1/posts',  postRoutes);
    app.use('/Blog-App/v1/posts', commentRoutes);
}

const conectarDB = async () => {
    try{
        await dbConnection();
        console.log("Conexion a la base de datos exitosa");
    }catch(error){
        console.error('Error Conectando a la base de datos', error);
        process.exit(1);
    }
}

export const initServer = async () =>{
    const app = express();
    const port = process.env.PORT || 3000;

    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port:  ${port}`)

    } catch (err) {
        console.log(`Server init fail : ${err}`)
    }
}