'use strict';
import axios from 'axios';

export async function searchImages(query, page = 1) {
  return await axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '44240844-fac6cf8e273222cb69c263295',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: '15',
      },
    })
    .then(res => {
      return res.data;
    });
}
