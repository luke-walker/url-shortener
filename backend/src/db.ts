import mysql from "mysql2/promise"

type ConnFunction = (db: mysql.Connection) => Promise<void>

export async function openDBConnection(func: ConnFunction) {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        await func(db);
    } catch (err) {}

    await db.end();
}
