import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

import router from "./src/router.js";
import { config } from "./src/config/config.js";

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/', router);

app.listen(config.PORT, '0.0.0.0', () => {
    console.log(`Backend app listening on port ${config.PORT}`);
});
