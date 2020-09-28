import './db';
import app from './app';

const port = process.env.PORT || 9000;

const handleListening = () => console.log(`Listening on: http://localhost:${port}`);

app.listen(port, handleListening);
