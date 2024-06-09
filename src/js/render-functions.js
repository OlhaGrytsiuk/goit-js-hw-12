'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;
const gallery = document.querySelector('.gallery');

export function listImages(images) {
  const markup = images
    .map(image => {
      return `
      <li class = "gallery-item">
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

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
