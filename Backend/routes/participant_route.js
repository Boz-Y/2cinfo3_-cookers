import express from 'express';
import { body } from "express-validator";
import { getParticipantEvent,participerEvent,updateParticipantEvent,approuveParticipant } from '../Controllers/participant_controller.js';

  
const router = express.Router();


router.route('/')
  .post(getParticipantEvent);

router.route('/add')
  .post(participerEvent);

  router.route('/update')
  .patch(updateParticipantEvent);

  router.route('/approuve')
  .patch(approuveParticipant);

  
export default router;