import express from 'express';
import {  isAdmin } from '../Middelware/authJwt.js';
import {
  findAllUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  createUserFromGoogle,
  confirmUserByLink,
  blockUser,
  unblockUser,
  getBlockedUserCount,
  getUnblockedUserCount,
  getAllUsers,
} from '../Controllers/userController.js';

const router = express.Router();

// Middleware pour les en-têtes CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.get('/listUser', [ isAdmin], findAllUser);

router.get('/users/profiles/:id',  getUserProfile);

router.put('/users/profile/:userId',  updateUserProfile);

router.post('/forgotPassword', forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/auth/google', createUserFromGoogle);

router.get('/confirm-user/:userId', confirmUserByLink);

router.put('/block-user/:userId', [ isAdmin], blockUser);

router.put('/unblock-user/:userId', [ isAdmin], unblockUser);

router.get('/users', [ isAdmin], getAllUsers);

router.get('/users/blocked/count', [ isAdmin], getBlockedUserCount);

router.get('/users/unblocked/count', [ isAdmin], getUnblockedUserCount);

export default router;
