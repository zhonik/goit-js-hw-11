import { getAllPhotos } from './js/pixabay-api';
import { photosTemplate } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

 const lightbox = new SimpleLightbox('.image-container a', {
        captionDelay: 250,
      });
      
const refs = {
  searchForm: document.querySelector('#search-form'),
  loader: document.querySelector('.loader-wrap'),
  gallery: document.querySelector('#gallery'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);

function searchFormSubmitHandler(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.loader.classList.remove('disabled');

  const searchQuery = e.target.elements.search.value;

  if (searchQuery.trim() === '') {
    refs.loader.classList.add('disabled');
    return iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      maxWidth: '432px',
    });
  }

  getAllPhotos(searchQuery)
    .then(photos => {
      if (photos.length === 0) {
        refs.loader.classList.add('disabled');
        return iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          maxWidth: '432px',
        });
      }

      refs.loader.classList.add('disabled');

      photosTemplate(photos);

     
      lightbox.refresh();
    })
    .catch(() => {
      console.error('Error fetching data from Pixabay API');
    });

  refs.searchForm.reset();
}
