import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '48859157-4179ddf5331f3749a3f2c3141',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  },
});

export function getAllPhotos(inputValue) {
  instance.defaults.params.q = inputValue;
  return instance
    .get()
    .then(res => res.data.hits)
    .catch(() => {
      console.error('Error fetching data from Pixabay API');
    });
}
