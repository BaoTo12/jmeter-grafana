import express from "express";
import morgan from "morgan";
import helmet from "helmet";         
import compression from "compression";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import 'dotenv/config';

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
import { initializeUsers } from "./controllers/auth.controller.js";

app.use("/", routes);


// initialize data
// initializeUsers(100)

export default app;
