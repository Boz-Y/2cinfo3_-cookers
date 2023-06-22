import express from 'express';
import { body } from "express-validator";
import { getEvent,addEvent,updateEvent } from '../Controller/evenement_controller.js';

import multer from "../middlewares/multer-config.js";
  
const router = express.Router();


router.route('/')
  .post(getEvent);

router.route('/add')
  .post(addEvent);

  router.route('/update')
  .patch(updateEvent);

  
export default router;