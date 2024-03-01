// import Swiper from 'swiper';
// import { Autoplay } from 'swiper';

import { fetchAPIData } from '../services/tmdbApiData.js';
const Swiper = window.Swiper;
// import 'swiper/css';
// import 'swiper/css/autoplay';

// Display Slider Movies
async function displayMovieSlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

async function displayShowSlider() {
  const { results } = await fetchAPIData('tv/airing_today');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
            class="card-img-top" alt="${show.name}">`
          : `<img src="../images/no-image.jpg"
            class="card-img-top" alt="${show.name}">`
      }
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${show.vote_average} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}


function initSwiper() {
  const swiper = new Swiper('.swiper', {
    // modules: [Autoplay],
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        // spaceBetween: 30
      },
      700: {
        slidesPerView: 3,
        // spaceBetween: 30
      },
      1200: {
        slidesPerView: 4,
        // spaceBetween: 30
      }
    }
  });
  swiper.init();
}

export { displayMovieSlider, displayShowSlider };