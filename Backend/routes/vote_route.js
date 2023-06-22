import express from 'express';
import { body } from "express-validator";
import { addVote,getVoteParticipant,updateVote } from '../Controller/vote_controller.js';

import multer from "../middlewares/multer-config.js";
  
const router = express.Router();


router.route('/')
  .post(getVoteParticipant);

router.route('/add')
  .post(addVote);

  router.route('/update')
  .patch(updateVote);

  
export default router;