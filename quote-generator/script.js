const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes = [];

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const completed = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const manageTextLength = (text) => {
  if (text.length > 80) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
};

const fillTextAndAuthorFields = (author, text) => {
  quoteText.textContent = text;

  if (author) {
    authorText.textContent = author;
  } else {
    authorText.textContent = 'Unknown';
  }
};

const newQuote = () => {
  loading();

  const { author, text } = quotes[Math.floor(Math.random() * quotes.length)];

  manageTextLength(text);
  fillTextAndAuthorFields(author, text);

  completed();
};

const getQuotes = async () => {
  loading();

  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl);
    quotes = await response.json();

    newQuote();
  } catch (error) {}
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, '_blank');
};

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
// on-load
