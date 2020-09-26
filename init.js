import app from './app';
import './db';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 9000;

const handleListening = () => console.log(`Listening on: http://localhost:${port}`);

app.listen(port, handleListening);
