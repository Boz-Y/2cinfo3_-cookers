
import express from 'express';
import { body } from "express-validator";
import {add_reclamation,getOnce_byId ,getAll,getReclamationsByUserId,getReclamationsByType,deleteReclIfStatusIsOne,updateReclamation} from '../Controller/reclamation.js';

  
const router = express.Router();

router.route("/")
.get(getAll)

router.route("/")
.post(add_reclamation);

router.route('/:id')
  .get(getOnce_byId); 

  
router.route('/user/:id_user')
.get(getReclamationsByUserId);

router.route('/type/:id_type')
.get(getReclamationsByType);


  //router.route('/:id')
  //.delete(delete_reclamation);

  router.route('/:id')
  .delete(deleteReclIfStatusIsOne);

router.route('/:id').
put(updateReclamation);




export default router;