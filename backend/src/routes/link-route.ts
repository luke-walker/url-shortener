import express from "express"
import { body } from "express-validator"

import { createLink } from "../controllers/link-controller.ts"
import authorizeSession from "../middleware/authorize-session.ts"
import validateRequest from "../middleware/validate-request.ts"

const router = express.Router();

router.post("/", [
    authorizeSession(),
    body("name").isString(),
    body("redirect").isString(),
    body("minutes").isInt(),
    validateRequest
], createLink);

export default router;
