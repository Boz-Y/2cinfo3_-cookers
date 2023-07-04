import express from 'express';
import { body } from "express-validator";
import {add_type_reclamation,getOnce_byId,getAll,update_reclamation_type} from '../Controller/type_reclamation.js';

  
const router = express.Router();

router.route("/")
.post(add_type_reclamation);


router.route("/")
.get(getAll)

router.route('/BY_ID/:id')
  .get(getOnce_byId);


  
router.route('/:id').
put(update_reclamation_type);
  

export default router;