const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const configureSwagger = require('./swagger');
const passport = require('passport');
const cors=require('cors');

dotenv.config();
require('./config/passport')(passport);

connectDB();

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173',
    'https://taskflow-ruddy-rho.vercel.app' 
  ],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

configureSwagger(app);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes)

app.use('/api/tasks',taskRoutes);

const PORT = process.env.port||5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});