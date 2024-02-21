// import '@fortawesome/fontawesome-free/js/all.js';
import { inject } from '@vercel/analytics';
import './css/style.css';

import { fetchAPIData, searchAPIData } from './services/tmdbApiData';
import { displayMovieSlider, displayShowSlider } from './components/slider';


// Enable Vercel analytics
inject();

const global = {
  currentPage: window.location.pathname,
  searchState: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0
  }
}

// const searchInput = document.querySelector('#search-term');

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
              class="card-img-top" alt="${movie.title}">`
            : `<img src="./images/no-image.jpg"
              class="card-img-top" alt="${movie.title}">`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Display 20 most popular TV shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach(tvShow => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
      <a href="tv-details.html?id=${tvShow.id}">
        ${
          tvShow.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}" 
              class="card-img-top" alt="${tvShow.name}">`
            : `<img src="./images/no-image.jpg"
              class="card-img-top" alt="${tvShow.name}">`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${tvShow.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${tvShow.first_air_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieId = new URLSearchParams(window.location.search).get('id');

  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
    <div class="media">
      <div class="image">
        ${
          movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
              class="card-img-top" alt="${movie.title}">`
            : `<img src="./images/no-image.jpg"
              class="card-img-top" alt="${movie.title}">`
        }
      </div>
      <div class="content">
        <h2>${movie.title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
          ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
    </div>
    <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
        ${movie.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}</div>
    </div>
  `;

  document.querySelector('#movie-details').appendChild(div);
}


async function displayShowDetails() {
  const showId = new URLSearchParams(window.location.search).get('id');

  const show = await fetchAPIData(`tv/${showId}`);
  // Overlay for background image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
    <div class="media">
      <div class="image">
        ${
          show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
              class="card-img-top" alt="${show.name}">`
            : `<img src="./images/no-image.jpg"
              class="card-img-top" alt="${show.name}">`
        }
      </div>
      <div class="content">
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
        <p>
          ${show.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
      </div>
    </div>
    </div>
    <div class="details-bottom">
      <h2>show Info</h2>
      <ul>
        <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
        <li><span class="text-secondary">Last episode to Air:</span> ${show.last_episode_to_air.name}</li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
        ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}</div>
    </div>
  `;

  document.querySelector('#show-details').appendChild(div);
}

// Display Backdrop on details pages
function displayBackgroundImage(type, backdropPath) {
  const overlayDiv = document.createElement('div');

  overlayDiv.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${backdropPath}')`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type == 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else if (type == 'tv') {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Search Movies/Shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.searchState.type = urlParams.get('type');
  global.searchState.term = urlParams.get('search-term');

  if (global.searchState.term !== '' && global.searchState.type !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData(global.searchState.type,
      global.searchState.term, global.searchState.page);

    global.searchState.page = page;
    global.searchState.totalPages = total_pages;
    global.searchState.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    displaySearchResults(results);

    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
}

function displaySearchResults(results) {
  // Clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
      <a href="${global.searchState.type}-details.html?id=${result.id}">
        ${
          result.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" 
              class="card-img-top" alt="${global.searchState.type === 'movie' ? result.title :
              result.name}">`
            : `<img src="./images/no-image.jpg"
              class="card-img-top" alt="${global.searchState.type === 'movie' ? result.title :
              result.name}">`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${global.searchState.type === 'movie' ? result.title : result.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${global.searchState.type === 'movie' ?
            result.release_date : result.first_air_date}</small>
        </p>
      </div>
    `;
    document.querySelector('#search-results-heading').innerHTML = `
        <h2>${results.length} of ${global.searchState.totalResults} Results for ${global.searchState.term}</h2>
    `;

    document.querySelector('#search-results').appendChild(div);
  });

  // Display pagination
  displayPagination();
}

// Create & Display Pagination for Search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.searchState.page} of 
    ${global.searchState.totalPages}</div >
  `
  document.querySelector('#pagination').appendChild(div);

  // Disable prev button if on first page
  if (global.searchState.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable next button if on last page
  if (global.searchState.page === global.searchState.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next page
  document.querySelector('#next').addEventListener('click', async () => {
    global.searchState.page++;
    const { results, total_pages } = await searchAPIData(global.searchState.type,
      global.searchState.term, global.searchState.page);
    displaySearchResults(results);
  });

  // Previous page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.searchState.page--;
    const { results, total_pages } = await searchAPIData(global.searchState.type,
      global.searchState.term, global.searchState.page);
    displaySearchResults(results);
  });
}


// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function onSearchActivateButton(e) {
  const submitBtn = document.querySelector('#search-btn');
  submitBtn.disabled = true;

  if (e.target.value !== '') {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }

  console.log(e.target.value);
}

// Show Alert Message
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));

  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Init app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayMovieSlider();
      displayPopularMovies();
      break;
    case '/shows':
    case '/shows.html':
      displayShowSlider();
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
}

// Event Listeners
// searchInput.addEventListener('keydown', onSearchActivateButton);
document.addEventListener('DOMContentLoaded', init);
