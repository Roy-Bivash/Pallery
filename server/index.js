import express from "express";
import cors from "cors";

import router from "./src/router.js";
import { config } from "./src/config/config.js";

const app = express();

app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Attach your routes here
app.use('/', router);

app.listen(config.PORT, () => {
    console.log(`Backend app listening on port ${config.PORT}`);
});
