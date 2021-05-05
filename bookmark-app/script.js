const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const closeModalEl = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteURLEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Event Listeners
const showModal = () => {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
};

const closeModal = () => {
  modal.classList.remove('show-modal');
};

const closeModelIfClickedOutside = ({ target }) => {
  target === modal ? closeModal() : null;
};

// MODAL EL
modalShow.addEventListener('click', showModal);
closeModalEl.addEventListener('click', closeModal);
window.addEventListener('click', closeModelIfClickedOutside);

//

const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
const regex = new RegExp(expression);
const validate = (nameValue, urlValue) => {
  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }

  return true;
};

const deleteBookmark = (bookmarkUrl) => {
  bookmarks.forEach(({ name, url }, index) => {
    if (url === bookmarkUrl) {
      bookmarks.splice(index, 1);
    }
  });

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
};

const buildBookmarks = () => {
  bookmarksContainer.textContent = '';

  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;

    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.addEventListener('click', () => deleteBookmark(url));

    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');

    const favicon = document.createElement('img');
    favicon.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute('alt', 'favicon');

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.textContent = name;

    linkInfo.append(favicon, link);
    itemEl.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(itemEl);
  });
};

const fetchBookmarks = () => {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    bookmarks = [
      {
        name: 'Google',
        url: 'https://google.com'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com'
      },
      {
        name: 'Facebook',
        url: 'https://facebook.com'
      },
      {
        name: 'Instagram',
        url: 'https://instagram.com'
      }
    ];

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  buildBookmarks();
};

const storeBookmark = (e) => {
  e.preventDefault();

  const websiteName = websiteNameEl.value;
  let websiteUrl = websiteURLEl.value;

  if (!websiteUrl.includes('http://', 'https://')) {
    websiteUrl = `https://${websiteUrl}`;
  }

  if (!validate(websiteName, websiteUrl)) {
    return false;
  }

  const bookmark = {
    name: websiteName,
    url: websiteUrl
  };

  bookmarks.push(bookmark);

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();

  bookmarkForm.reset();
  websiteNameEl.focus();
};

// Form EL
bookmarkForm.addEventListener('submit', storeBookmark);

fetchBookmarks();
