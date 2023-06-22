import express from 'express';
import { body } from "express-validator";
import multer from "../Middelware/multer-config.js";
import { addOnceIngredients, getAll, DeleteIngredients, getIngredientsById, putOnce } from '../controllers/Ingredients.js';


const router = express.Router();


router.route('/')
.get(getAll);

router.route('/AddIngredients')
.post(
    addOnceIngredients);

router.route('/:id')
.get(getIngredientsById)
.delete(DeleteIngredients)
.put(
    body("name").isLength({ min: 5 }),
    body("quantite").isInt(),
    body("description").isLength({ min: 4 }),
    putOnce)




export default router;

