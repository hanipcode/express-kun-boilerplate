import express from 'express';
import cors from 'cors';
import initDB from './utils/initDB';
import useApiRouter from './routes';
initDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useApiRouter(app);

export default app;
