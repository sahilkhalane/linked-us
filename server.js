const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'https://floralwhite-gull-520021.hostingersite.com', // your Hostinger domain
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
// Routes for posts and users will be added later

app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
