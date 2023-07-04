import express from 'express';
import { body } from "express-validator";
import { addOnceRecette, getAll, DeleteRecette, getRecetteById, putOnce, getRecetteByPlats } from '../controllers/Recettes.js';


const router = express.Router();


router.route('/')
.get(getAll);

router.route('/AddRecette')
.post(
    addOnceRecette);


router.route('/:id')
.get(getRecetteById)
.delete(DeleteRecette)
.put(
    body("order").isInt,
    body("description").isLength({ min: 4 }),
    putOnce)



router.route('/plats/:platId')
.get(getRecetteByPlats)


export default router;

