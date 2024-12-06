import "dotenv/config"
import express from "express"

const app = express();

const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, (err?: Error) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Server running on port ${SERVER_PORT}`)
});
