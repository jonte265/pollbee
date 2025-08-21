import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server working');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
