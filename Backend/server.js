//  const env = require('dotenv').config()
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

//connect database
import { notFoundError, errorHandler } from './Middelware/error-handler.js';


import UsersRoutes from './routes/user.js';
import PlatsRoutes from './routes/Plats.js'; //importer le router du fichier 
import IngredientsRoutes from './routes/Ingredients.js'; 
import SpecialitesRoutes from './routes/Specialite.js'; 
import EventRoutes from './routes/evenement_route.js';
import ParticipantRoutes from './routes/participant_route.js';
import VoteRoutes from './routes/vote_route.js';

const app = express(); // creer l'instance de express a utiliser
const hostname = '127.0.0.1'; //l'@ du serveur
const port = process.env.PORT || 9090; //le port du serveur
const databaseName = 'Cookers';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {   
    console.log(err);
  });

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/img', express.static('public/images'));



app.use('/user', UsersRoutes);
app.use('/plats', PlatsRoutes);
app.use('/ingredients', IngredientsRoutes);
app.use('/specialites', SpecialitesRoutes);
app.use('/event', EventRoutes);
app.use('/event/participant', ParticipantRoutes);
app.use('/event/vote', VoteRoutes);

  app.use(notFoundError);
  app.use(errorHandler);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


