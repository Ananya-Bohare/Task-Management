import cookiePareser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { errorHandler, routeNotFound } from './middleware/errorMiddleware.js';
import route from './routes/index.js';
import { dbConnection } from './utils/index.js';

dotenv.config()

dbConnection()

const Port = process.env.PORT || 5000

const app = express()

app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookiePareser())
app.use(morgan('dev'))

app.use("/api", route)

app.use(routeNotFound)
app.use(errorHandler)

app.listen(Port, () => {
    console.log(`Server running on ${Port}`);
})