import type { Request, Response, NextFunction, RequestHandler } from "express"

export default function authorizeSession(admin=false): RequestHandler {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            const authRes = await fetch(`${process.env.AUTH_URL}/auth${admin ? "/admin" : ""}`, {
                headers: {
                    "Authorization": `Bearer ${req.cookies.access_token}`
                }
            });
            if (!authRes.ok) {
                res.status(401).send("Session must be authenticated");
                return;
            }
            return next();
        } catch (err) {
            console.log(err)
            res.status(500).send("Error occurred while authorizing session");
            return;
        }
    }
}
