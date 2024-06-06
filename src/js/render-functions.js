'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function listImages(images, gallery) {
  const markup = images
    .map(image => {
      return `
      <li>
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}">
        </a>
        
        <ul class="info">
          <li>Likes: ${image.likes}</li>
          <li>Views: ${image.views}</li>
          <li>Comments: ${image.comments}</li>
          <li>Downloads: ${image.downloads}</li>
        </ul>
      </li>
    `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {});
  }
}

export function showError(message) {
  iziToast.error({ message });
}
