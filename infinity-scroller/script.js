const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 10;
const apiKey = 'JJhcY59yJm9Ezqu1WJ9ynBkoHkl6bM1IJp915PqPEDU';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let ready = false;
let loadedImages = 0;
let totalImages = 0;
let photos = [];

const imageLoaded = () => {
  loadedImages++;

  if (loadedImages === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = () => {
  photos.forEach((photo) => {
    const linkElement = document.createElement('a');
    const img = document.createElement('img');

    const linkElementAttributes = {
      href: photo.links.html,
      target: '_blank'
    };

    const imgAttributes = {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    };

    setAttributes(linkElement, linkElementAttributes);
    setAttributes(img, imgAttributes);

    img.addEventListener('load', imageLoaded);

    linkElement.appendChild(img);
    imageContainer.append(linkElement);
  });
};

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();

    loadedImages = 0;
    totalImages = photos.length;

    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 768 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
