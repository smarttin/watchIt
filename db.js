import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connection Successful');
  })
  .catch((err) => console.log(err));
