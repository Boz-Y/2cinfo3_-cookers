import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import { notFoundError, errorHandler } from './middlewares/error-handler.js';

import EventRoutes from './routes/evenement_route.js';
import ParticipantRoutes from './routes/participant_route.js';
import VoteRoutes from './routes/vote_route.js';


const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'yummy';

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

app.use('/event', EventRoutes);
app.use('/event/participant', ParticipantRoutes);
app.use('/event/vote', VoteRoutes);


app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});