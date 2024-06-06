import { searchImages } from './js/pixabay-api.js';
import {
  listImages,
  showError,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();

  if (query === '') {
    showError('Please enter a search query!');
    return;
  }

  gallery.innerHTML = '';
  showLoader(loader);

  searchImages(query)
    .then(data => {
      hideLoader(loader);

      if (data.hits.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      listImages(data.hits, gallery);
    })

    .catch(error => {
      hideLoader(loader);

      showError('Something went wrong. Please try again later.');
      console.error(error);
    });
  form.reset();
});
