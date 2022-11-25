import express from 'express';
// import contactRouter from './routes/contact.route';
import movieRouter from './routes/movie.route';
import 'dotenv/config';
import { connectDB } from './config/db';
const app = express();
const port = 5003;
// Config
connectDB();

// Middleware
app.use(express.json());
app.use('/api/v1/movie', movieRouter);
// app.use('/api/v2/contact',contactRouter)

app.listen(port, () => {
  console.log(`Server is running on port 5000 http://localhost:${port}`);
});