import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import pollRoutes from './routes/pollRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/polls', pollRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is live' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
