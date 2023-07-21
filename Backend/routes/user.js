import express from 'express';
import { verifyToken, isAdmin } from '../Middelware/authJwt.js';
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

router.get('/listUser', [verifyToken, isAdmin], findAllUser);

router.get('/users/profiles/:id', [verifyToken], getUserProfile);

router.put('/users/profile/:userId', [verifyToken], updateUserProfile);

router.post('/forgotPassword', forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/auth/google', createUserFromGoogle);

router.get('/confirm-user/:userId', confirmUserByLink);

router.put('/block-user/:userId', [verifyToken, isAdmin], blockUser);

router.put('/unblock-user/:userId', [verifyToken, isAdmin], unblockUser);

router.get('/users', [verifyToken, isAdmin], getAllUsers);

router.get('/users/blocked/count', [verifyToken, isAdmin], getBlockedUserCount);

router.get('/users/unblocked/count', [verifyToken, isAdmin], getUnblockedUserCount);

export default router;
