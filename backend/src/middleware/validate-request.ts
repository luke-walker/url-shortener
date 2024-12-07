import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export default function validateRequest(req: Request, res: Response, next: NextFunction): void {
    if (!validationResult(req).isEmpty()) {
        res.status(403).send("Invalid request");
        return;
    }
    return next();
}
