import { searchImages } from './js/pixabay-api.js';
import { listImages, showError } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const learnMoreBtn = document.querySelector('.btn');
let page = 1;
let query = '';
const per_page = 15;
learnMoreBtn.style.display = 'none';
form.addEventListener('submit', onFormSubmit);
learnMoreBtn.addEventListener('click', () => onBtnClick(query));

async function onFormSubmit(event) {
  event.preventDefault();
  query = input.value.trim();

  if (query === '') {
    learnMoreBtn.style.display = 'none';
    showError('Please enter a search query!');
    return;
  }

  gallery.innerHTML = '';

  loader.style.display = 'block';
  searchImages(query)
    .then(data => {
      loader.style.display = 'none';

      if (data.hits.length === 0) {
        learnMoreBtn.style.display = 'none';
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );

        return;
      }

      listImages(data.hits, gallery);
    })

    .catch(error => {
      loader.style.display = 'none';
      showError('Something went wrong. Please try again later.');
      console.error(error);
    });
  learnMoreBtn.style.display = 'block';
  form.reset();
}

async function onBtnClick(query) {
  loader.style.display = 'block';
  page += 1;

  try {
    loader.style.display = 'none';
    const response = await searchImages(query, page);

    listImages(response.hits, gallery);

    scrolling();

    if (
      page * per_page >= response.totalHits ||
      per_page >= response.totalHits
    ) {
      learnMoreBtn.style.display = 'none';
    }
  } catch (error) {
    loader.style.display = 'none';
    console.log(error.message);
  }
}

function smoothScroll() {
  const cardHeight = document
    .querySelector('.gallery li ')
    .getBoundingClientRect().height;

  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}

smoothScroll();
