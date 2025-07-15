import express from "express";
import morgan from "morgan";
import helmet from "helmet";          // default export works in ESM
import compression from "compression";
import rateLimit from "express-rate-limit";

const app = express();

// —— Middleware ——
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// —— Database & Routes ——
import "./dbs/init.db.js";
import routes from "./routes/index.js";
app.use("/", routes);

export default app;
