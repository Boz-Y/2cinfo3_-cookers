import express from 'express';
import { body } from "express-validator";
import { addVote,getVoteParticipant,updateVote,calculeVote } from '../Controllers/vote_controller.js';

  
const router = express.Router();


router.route('/')
  .post(getVoteParticipant);

router.route('/add/:id_participant')
  .post(addVote);

  router.route('/update')
  .patch(updateVote);

  router.route('/calculeVote')
  .post(calculeVote);

  
export default router;