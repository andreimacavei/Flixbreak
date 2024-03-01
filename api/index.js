const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();

// app.get('/api', (req, res) => {
//   const path = `/api/item/test`;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// });

// app.get('/api/item/:slug', (req, res) => {
//   const { slug } = req.params;
//   res.end(`Item: ${slug}`);
// });

const tmdbRoutes = require('../routes/tmdbAPI');
app.use('/api/tmdb', tmdbRoutes);

module.exports = app;