const express = require('express');
const router = express.Router();
require('dotenv').config();

const API_KEY = process.env.TMDB_API_KEY;
const API_URL = process.env.TMDB_API_URL;

// Fetch movies now playing from TMDB API
router.get('/movie/now_playing', async (req, res) => {
  try {
    const url = `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json({ success: true, data: data });
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: 'Failed to fetch data from TMDB API' });
  }
});

// Fetch popular movies from TMDB API
router.get('/movie/popular', async (req, res) => {
  try {
    const url = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json({ success: true, data: data });
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: 'Failed to fetch data from TMDB API' });
  }
});

// Fetch movie using id from TMDB API
router.get('/movie/:id', async (req, res) => {
  try {
    const url = `${API_URL}/movie/${req.params.id}?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json({ success: true, data: data });
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: 'Failed to fetch data from TMDB API' });
  }
});


// Fetch popular tv shows from TMDB API
router.get('/tv/popular', async (req, res) => {
  try {
    const url = `${API_URL}/tv/popular?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json({ success: true, data: data });
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: 'Failed to fetch data from TMDB API' });
  }
});

// Fetch tv shows airing today from TMDB API
router.get('/tv/popular', async (req, res) => {
  try {
    const url = `${API_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json({ success: true, data: data });
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: 'Failed to fetch data from TMDB API' });
  }
});

// Fetch tv show using id from TMDB API
router.get('/tv/:id', async (req, res) => {
  try {
    const url = `${API_URL}/tv/${req.params.id}?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(url);
    const movies = await response.json();
    
    res.json({ success: true, data: movies });
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: 'Failed to fetch data from TMDB API' });
  }
});

// Search for movies or tv shows from TMDB API
router.get('/search/:type/:term/:page', async (req, res) => {
  try {
    const url = `${API_URL}search/${req.params.type}?api_key=${API_KEY}&language=en-US&query=${req.params.term}&page=${req.params.page}`
    console.log("searching url:", url)

    const response = await fetch(url);
    const data = await response.json();
    
    res.json({ success: true, data: data });
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: 'Failed to fetch data from TMDB API' });
  }
});

module.exports = router;