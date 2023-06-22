import express from 'express';
import { body, check } from 'express-validator';
import {
  registerUser,
  verifyEmail,
  logIn,
  reset,
  forgetPass,
  updateUser,
  findUserById,
  deleteOnce
} from '../Controllers/userController.js';
import { protectSimpleUser, validator } from '../Middelware/userMiddelware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-email', verifyEmail);
router.post('/login', logIn);
router.post('/forget-password', forgetPass);
router.post('/reset-password', validator, reset);
router.put('/updateUser/:id', protectSimpleUser, updateUser);
router.get('/getuser/:id', protectSimpleUser, findUserById);
router.route('/:firstname').delete(deleteOnce);

export default router;
