import express from 'express';
import { body } from "express-validator";
import { addOnceBesoin, DeleteBesoin, putOnce } from '../Controllers/BesoinPlatsIngredients.js';


const router = express.Router();




router.route('/AddBesoin')
.post(
    addOnceBesoin);


router.route('/:id')
.delete(DeleteBesoin)
.put(putOnce)



export default router;

