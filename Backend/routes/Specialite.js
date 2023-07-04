import express from 'express';
import { body } from "express-validator";
import { addOnceSpeciality, getAll, DeleteSpeciality, getSpecialityById, putOnce,  } from '../controllers/Specialite.js';


const router = express.Router();


router.route('/')
.get(getAll);

router.route('/AddSpecialite')
.post(
    addOnceSpeciality);


router.route('/:id')
.get(getSpecialityById)
.delete(DeleteSpeciality)
.put(
    body("name").isLength({ min: 5 }),
    body("description"),
    putOnce)



export default router;

