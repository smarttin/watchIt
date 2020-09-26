import dotenv from 'dotenv';
import app from './app';
import './db';

dotenv.config();

const port = process.env.PORT || 9000;

const handleListening = () => console.log(`Listening on: http://localhost:${port}`);

app.listen(port, handleListening);
