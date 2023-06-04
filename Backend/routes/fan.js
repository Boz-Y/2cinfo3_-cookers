import express from 'express';
import { body } from "express-validator";
import { fans,  getAll,  getOnce } from '../Controller/fan.js';

import multer from "../middlewares/multer-config.js";
  
const router = express.Router();

router.route("/")
.get(getAll)
.post(
    body("fullname").isLength({ min:5, max:50}),
    body("phone").isNumeric({ min:8, max:8}),
    body("team").isLength({ min:2, max:100}),
    multer("image", 512 * 1024),
    fans
);

router.route('/:team')
  .get(getOnce);
  
export default router;