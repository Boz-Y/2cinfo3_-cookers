import express from 'express';
import { body } from "express-validator";
import multer from "../Middelware/multerConfig.js";
import { addOnceIngredients, getAll, DeleteIngredients, getIngredientsById, putOnce } from '../Controllers/Ingredients.js';


const router = express.Router();


router.route('/')
.get(getAll);

router.route('/AddIngredients')
.post(
    multer("ingImg"),
    addOnceIngredients);

router.route('/:id')
.get(getIngredientsById)
.delete(DeleteIngredients)
.put(
    multer("ingImg"),
    putOnce)




export default router;

