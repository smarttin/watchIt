import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import userRouter from './router/userRouter';
import videoRouter from './router/videoRouter';
import globalRouter from './router/globalRouter';
import routes from './routes';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(helmet());

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
