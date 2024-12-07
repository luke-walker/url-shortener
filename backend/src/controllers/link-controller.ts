import type { Request, Response, NextFunction } from "express"
import type { RowDataPacket } from "mysql2"

import { openDBConnection } from "../db.ts"
import { getUserInfo } from "../services/auth-service.ts"

export async function getLinks(req: Request, res: Response, next: NextFunction) {
    const userInfo = await getUserInfo(req.cookies.access_token);
    if (!userInfo) {
        res.status(401).send("Failed to authorize user");
        return;
    }

    await openDBConnection(async (db) => {
        try {
            const [results] = await db.query(`
                SELECT *
                FROM links
                WHERE user_token=?
            `, [userInfo.token]);
            
            res.status(200).json(results);
        } catch (err) {
            res.status(401).send("Failed to create link (already exists?)");
            return;
        }
    });

    return next();
}

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
            res.status(401).send("Failed to create link"); // maybe change this to 401/500 specific depending on error
            return;
        }
    });
    
    res.status(200).send("Created link");
    return next();
}

export async function redirectLink(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;
    await openDBConnection(async (db) => {
        try {
            const [linkResults] = await db.query<RowDataPacket[]>(`
                SELECT *
                FROM links
                WHERE name=?
            `, [name]);
            if (linkResults.length === 0) {
                res.status(403).send("Link does not exist");
                return;
            }

            const link = linkResults[0];
            if (link.expires && link.expires <= Date.now()) {
                db.query(`
                    DELETE FROM links
                    WHERE name=?
                `, [name]);
                res.status(403).send("Expired link");
                return;
            }

            const [trustResults] = await db.query<RowDataPacket[]>(`
                SELECT 1
                FROM trusted_links
                WHERE user_token=? AND link_name=?
            `, [link.user_token, link.name]);
            if (trustResults.length === 0) {
                res.status(200).redirect(`${process.env.FRONTEND_URL}/redirect/${encodeURIComponent(link.redirect_url)}` || link.redirect_url)
            } else {
                res.status(200).redirect(link.redirect_url);
            }
        } catch (err) {
            res.status(500).send("Failed to redirect");
            return;
        }
    });

    return next();
}

export async function trustLink(req: Request, res: Response, next: NextFunction) {
    const userInfo = await getUserInfo(req.cookies.access_token);
    if (!userInfo) {
        res.status(401).send("Failed to authorize user");
        return;
    }

    const { name } = req.params;
    await openDBConnection(async (db) => {
        try {
            await db.query(`
                INSERT INTO trusted_links (user_token, link_name)
                VALUES (?)
            `, [[userInfo.token, name]]);
        } catch (err) {
            res.status(401).send("Failed to trust link");
            return;
        }
        res.status(200).send("Trusted link");
    });

    return next();
}
