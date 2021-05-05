const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeElBtn = document.getElementById('complete-btn');

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

let countdownTitle = '';
let countdownDate = '';
let countdownValue;
let countdownInterval;
let savedCountdown;

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const calculateDate = () => {
  const distance = countdownValue - Date.now();

  const days = Math.floor(distance / DAY);
  const hours = Math.floor((distance % DAY) / HOUR);
  const minutes = Math.floor((distance % HOUR) / MINUTE);
  const seconds = Math.floor((distance % MINUTE) / SECOND);

  return { distance, days, hours, minutes, seconds };
};

const handleDOM = () => {
  const { distance, days, hours, minutes, seconds } = calculateDate();

  inputContainer.hidden = true;

  if (distance < 0) {
    countdownEl.hidden = true;

    clearInterval(countdownInterval);

    completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    completeEl.hidden = false;
  } else {
    countdownElTitle.textContent = countdownTitle;
    timeElements[0].textContent = days;
    timeElements[1].textContent = hours;
    timeElements[2].textContent = minutes;
    timeElements[3].textContent = seconds;

    completeEl.hidden = true;
    countdownEl.hidden = false;
  }
};

const updateDOM = () => {
  handleDOM();
  countdownInterval = setInterval(() => handleDOM(), SECOND);
};

const updateCountdown = (e) => {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate
  };

  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  if (!countdownTitle || !countdownDate) {
    alert('Missing date or title.');
  } else {
    countdownValue = new Date(countdownDate).getTime();

    updateDOM();
  }
};

const reset = () => {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  clearInterval(countdownInterval);

  countdownTitle = '';
  countdownDate = '';

  localStorage.removeItem('countdown');
};

const restorePrevCountdown = () => {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;

    const { title, date } = JSON.parse(localStorage.getItem('countdown'));

    countdownTitle = title;
    countdownDate = date;
    countdownValue = new Date(countdownDate).getTime();

    updateDOM();
  }
};

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeElBtn.addEventListener('click', reset);

restorePrevCountdown();
