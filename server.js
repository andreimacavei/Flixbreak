const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
}));

const tmdbRoutes = require('./routes/tmdbAPI');
app.use('/api/tmdb', tmdbRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});