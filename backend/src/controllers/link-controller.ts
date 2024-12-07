import type { Request, Response, NextFunction } from "express"

import { openDBConnection } from "../db.ts"
import { getUserInfo } from "../services/auth-service.ts"

export async function createLink(req: Request, res: Response, next: NextFunction) {
    const userInfo = await getUserInfo(req.cookies.access_token);
    if (!userInfo) {
        res.status(401).send("Failed to authorize user");
        return;
    }

    const { name, redirect, expires } = req.body;
    await openDBConnection(async (db) => {
        try {
            await db.query(`
                INSERT INTO links (name, user_token, redirect_url, expires)
                VALUES (?)
            `, [[name, userInfo.token, redirect, expires]]);
        } catch (err) {
            console.log(err);
            res.status(401).send("Failed to create link"); // maybe change this to 401/500 specific depending on error
            return;
        }
    });
    
    res.status(200).send("Created link")
    return next();
}
