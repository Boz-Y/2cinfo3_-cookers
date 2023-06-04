import express from "express";
import { body } from "express-validator";

import { getAll, matchs, getOnce } from "../Controller/match.js";

const router = express.Router();


router.route("/")
    .post(
        body("date").isLength({ min:5}),
        body("teamHome").isLength({ min:2}),
        body("teamAway").isLength({ min:2}),
        body("nbPlaces").isNumeric(),
        matchs)
.get(getAll);

router.route('/:id')
  .get(
    body("date").isLength({ min:5}),
    getOnce);



export default router;
