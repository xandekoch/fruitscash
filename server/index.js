import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import betRoutes from "./routes/bets.js";
import transactionRoutes from "./routes/transactions.js";
import affiliateOperationRoutes from "./routes/affiliateOperations.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors({
    origin: ['http://localhost:5173', process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200
}));

/* ROUTES */
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/bets", betRoutes);
app.use("/transactions", transactionRoutes);
app.use("/affiliateOperations", affiliateOperationRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {dbName: 'fruitscash'}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(`${err} did 'not connect`);
});