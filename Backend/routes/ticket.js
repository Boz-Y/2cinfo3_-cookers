import express from "express";
import { body } from "express-validator";

import { getAll, getOnce } from "../Controller/ticket.js";

const router = express.Router();

router.route("/:fanId/:matchId")
.get(getOnce);

router.route("/:fanId")
.get(getAll);

export default router;
