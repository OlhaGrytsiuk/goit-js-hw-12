import { searchImages } from './js/pixabay-api.js';
import { listImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const learnMoreBtn = document.querySelector('.btn');

form.addEventListener('submit', onFormSubmit);
learnMoreBtn.addEventListener('click', onBtnClick);

let page;
let query;
let totalPages;

async function onFormSubmit(event) {
  event.preventDefault();
  hideLoadMoreBtn();
  gallery.innerHTML = '';
  showLoader();
  query = input.value.trim();
  if (!query) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });

    hideLoader();
    return;
  }
  try {
    page = 1;
    const data = await searchImages(query, page);
    if (data && data.hits && data.hits.length) {
      hideLoader();
      totalPages = Math.ceil(data.totalHits / 15);
      checkLoadMoreBtn();
      listImages(data.hits);
    } else {
      throw Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
  } catch (error) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
  form.reset();
}

async function onBtnClick() {
  showLoader();
  hideLoadMoreBtn();

  try {
    page += 1;
    const data = await searchImages(query, page);

    if (data && data.hits && data.hits.length) {
      checkLoadMoreBtn();
      listImages(data.hits);

      const cardHeight = document
        .querySelector('.gallery-item')
        .getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

      return;
    } else {
      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function checkLoadMoreBtn() {
  if (totalPages > page) {
    showLoadMoreBtn();
  } else {
    hideLoadMoreBtn();
    iziToast.error({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
}

function showLoader() {
  loader.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadMoreBtn() {
  learnMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  learnMoreBtn.classList.add('hidden');
}
