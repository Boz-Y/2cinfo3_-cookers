import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import { notFoundError, errorHandler } from './middlewares/error-handler.js';

import FanRoutes from './routes/fan.js';
import MatchRoutes from './routes/match.js';
import TicketRoutes from './routes/ticket.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'examencoteserveur2223sr';

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

app.use('/fans', FanRoutes);
app.use('/matchs', MatchRoutes);
app.use('/tickets', TicketRoutes);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});