import express from "express"
import { body } from "express-validator"

import { 
    getLinks,
    createLink,
    redirectLink,
    trustLink,
    untrustLink
} from "../controllers/link-controller.ts"
import authorizeSession from "../middleware/authorize-session.ts"
import validateRequest from "../middleware/validate-request.ts"

const router = express.Router();

router.get("/", [
    authorizeSession(),
], getLinks);

router.post("/", [
    authorizeSession(),
    body("name").isString(),
    body("redirect").isString(),
    body("minutes").isInt(),
    validateRequest
], createLink);

router.get("/redirect/:name", redirectLink);

router.post("/trust/:name", [
    authorizeSession()
], trustLink);

router.delete("/trust/:name", [
    authorizeSession()
], untrustLink);

export default router;
