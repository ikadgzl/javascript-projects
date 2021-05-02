const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
const textBox = document.getElementById('text-box');
const bodyElement = document.body;

const manageImages = (mode) => {
  img1.src = `img/undraw_proud_coder_${mode}.svg`;
  img2.src = `img/undraw_feeling_proud_${mode}.svg`;
  img3.src = `img/undraw_conceptual_idea_${mode}.svg`;
};

const onDarkMode = () => {
  localStorage.setItem('theme', 'dark');

  nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
  toggleIcon.children[0].textContent = 'Dark Mode';
  toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');

  manageImages('dark');

  bodyElement.setAttribute('data-theme', 'dark');
};

const onLightMode = () => {
  localStorage.setItem('theme', 'light');

  nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
  textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  toggleIcon.children[0].textContent = 'Light Mode';
  toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');

  manageImages('light');

  bodyElement.removeAttribute('data-theme');
};
const switchTheme = ({ target: { checked } }) => {
  checked ? onDarkMode() : onLightMode();
};

toggleSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  bodyElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;

    onDarkMode();
  }
}
