import express from 'express';
import { body } from "express-validator";
import { getEvent,addEvent,updateEvent } from '../Controllers/evenement_controller.js';
import multer from "../Middelware/multer-config.js";

  
const router = express.Router();


router.route('/')
  .post(getEvent);

router.route('/add')
  .post(
    multer("images"),
    addEvent);

  router.route('/update')
  .patch(updateEvent);

  
export default router;