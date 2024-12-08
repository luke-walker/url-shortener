import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"

import linkRouter from "./routes/link-route.ts"

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/link", linkRouter);

const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, (err?: Error) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Server running on port ${SERVER_PORT}`)
});
