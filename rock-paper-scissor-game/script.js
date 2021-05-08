const playerScoreEl = document.getElementById('player-score');
const playerChoiceEl = document.getElementById('player-choice');

const computerScoreEl = document.getElementById('computer-score');
const computerChoiceEl = document.getElementById('computer-choice');

const resultTextEl = document.getElementById('result-text');

const playerRockEl = document.getElementById('player-rock');
const playerPaperEl = document.getElementById('player-paper');
const playerScissorsEl = document.getElementById('player-scissors');
const playerLizardEl = document.getElementById('player-lizard');
const playerSpockEl = document.getElementById('player-spock');

const computerRockEl = document.getElementById('computer-rock');
const computerPaperEl = document.getElementById('computer-paper');
const computerScissorsEl = document.getElementById('computer-scissors');
const computerLizardEl = document.getElementById('computer-lizard');
const computerSpockEl = document.getElementById('computer-spock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] }
};

let computerChoice = '';
let playerScore = 0;
let computerScore = 0;

const resetSelected = () => {
  allGameIcons.forEach((icons) => {
    icons.classList.remove('selected');
  });
};

const computerRandomChoice = () => {
  computerChoice = Object.keys(choices)[
    Math.floor(Math.random() * Object.keys(choices).length)
  ];
};

const findWinner = (playerChoice) => {
  const choice = choices[playerChoice];

  if (choice.defeats.indexOf(computerChoice) > -1) {
    resultTextEl.textContent = 'You won!';
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else {
    resultTextEl.textContent = 'Computer won!';
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }
};

const updateScore = (playerChoice) => {
  if (computerChoice === playerChoice) {
    resultTextEl.textContent = "It's a tie!";
  } else {
    findWinner(playerChoice);
  }
};

const checkResult = (playerChoice) => {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
};

const displayComputerChoice = () => {
  switch (computerChoice) {
    case 'rock':
      computerRockEl.classList.toggle('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;

    case 'paper':
      computerPaperEl.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;

    case 'scissors':
      computerScissorsEl.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;

    case 'lizard':
      computerLizardEl.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;

    case 'spock':
      computerSpockEl.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;

    default:
      break;
  }
};

const select = (playerChoice) => {
  checkResult(playerChoice);

  switch (playerChoice) {
    case 'rock':
      playerRockEl.classList.toggle('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;

    case 'paper':
      playerPaperEl.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      break;

    case 'scissors':
      playerScissorsEl.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      break;

    case 'lizard':
      playerLizardEl.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      break;

    case 'spock':
      playerSpockEl.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      break;

    default:
      break;
  }
};

const resetAll = () => {
  playerScore = 0;
  computerScore = 0;

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';

  resultTextEl.textContent = '';

  resetSelected();
};
