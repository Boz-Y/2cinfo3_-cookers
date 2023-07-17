import express from 'express';
import { body } from "express-validator";

import { addReducUser } from '../Controllers/reducUser_controller.js';


  
const router = express.Router();


router.route('/add')
  .post(
    addReducUser);

  
export default router;