const button = document.getElementById('button');
const jokeContainer = document.getElementById('joke');
const jokeParagraph = document.getElementById('joke-paragraph');

const apiUrl =
  'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
let joke = '';

const insertJoke = () => {
  if (joke === undefined) {
    joke = 'HIT THE BUTTON AGAIN';
  }
  jokeParagraph.textContent = joke;
};

const getJokes = async () => {
  try {
    const response = await fetch(apiUrl);
    const jokes = await response.json();

    joke = jokes.joke;

    insertJoke();
  } catch (error) {
    console.log(error);
  }
};

button.addEventListener('click', getJokes);
