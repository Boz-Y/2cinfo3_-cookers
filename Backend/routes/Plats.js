import express from 'express';
import { body } from "express-validator";
import multer from "../Middelware/multerConfig.js";

import { addOncePlat, getAll, DeletePlat, getPlatById, putOnce, getPlatsBySpeciality } from '../Controllers/Plats.js';


const router = express.Router();


router.route('/')
.get(getAll);

router.route('/AddPlats')
.post(
    multer("images"),
    addOncePlat);


router.route('/:id')
.get(getPlatById)
.delete(DeletePlat)
.put(
    multer("images"),
    putOnce)

router.route('/speicalite/:specialityId')
.get(getPlatsBySpeciality)

// router.route('/ingredient/:ingredientId')
// .get(getPlatsByIngredients)


export default router;

