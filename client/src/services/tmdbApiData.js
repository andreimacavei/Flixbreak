import axios from "axios";
import { showSpinner, hideSpinner } from "../components/spinner.js"

const apiUrl = '/api/tmdb';

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  
  showSpinner();

  const url = `${apiUrl}/${endpoint}`;
  const res = await axios.get(url)

  hideSpinner();

  return res.data.data;
}

// Make request to Search
async function searchAPIData(type, term, page) {
  showSpinner();

  const url = `${apiUrl}/search/${type}/${term}/${page}`;
  const res = await axios.get(url);

  hideSpinner();

  return res.data.data;
}


export { fetchAPIData, searchAPIData };