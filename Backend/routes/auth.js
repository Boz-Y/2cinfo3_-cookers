import express from 'express';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../Middelware/verifySignUp.js';
import { signup, signin, signout } from '../Controllers/authController.js';


const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.post("/signup", checkDuplicateUsernameOrEmail, checkRolesExisted, signup);

router.post("/signin", signin);

router.post("/signout", signout);

export default router;
