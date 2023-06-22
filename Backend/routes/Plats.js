import express from 'express';
import { body } from "express-validator";
import { addOncePlat, getAll, DeletePlat, getPlatById, putOnce, getPlatsBySpeciality } from '../Controllers/Plats.js';


const router = express.Router();


router.route('/')
.get(getAll);

router.route('/AddPlats')
.post(
    addOncePlat);

    

router.route('/:id')
.get(getPlatById)
.delete(DeletePlat)
.put(
    body("name").isLength({ min: 5 }),
    body("description").isLength({ min: 4 }),
    putOnce)

router.route('/speicalite/:specialityId')
.get(getPlatsBySpeciality)




export default router;

