import express from 'express';
import { body } from "express-validator";
import multer from "../Middelware/multerConfig.js";
import { addOnceSpeciality, getAll, DeleteSpeciality, getSpecialityById, putOnce } from '../Controllers/Specialite.js';


const router = express.Router();


router.route('/')
.get(getAll);

router.route('/AddSpecialite')
.post(
    multer("specImg"),
    addOnceSpeciality);


router.route('/:id')
.get(getSpecialityById)
.delete(DeleteSpeciality)
.put(
    multer("specImg"),
    body("name").isLength({ min: 5 }),
    body("description"),
    putOnce)



export default router;

