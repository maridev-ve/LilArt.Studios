// Handles theme toggling between light and dark modes.
const themeToggleButton = document.getElementById('theme-toggle');

const applyTheme = (theme) => {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(`${theme}-mode`);
  themeToggleButton.textContent = theme === 'dark' ? '☼' : '☾';

  // Toggle logo visibility based on theme
  const lightLogos = document.querySelectorAll('.light-mode-logo');
  const darkLogos = document.querySelectorAll('.dark-mode-logo');

  if (theme === 'dark') {
    lightLogos.forEach(logo => logo.classList.add('hidden'));
    darkLogos.forEach(logo => logo.classList.remove('hidden'));
  } else {
    lightLogos.forEach(logo => logo.classList.remove('hidden'));
    darkLogos.forEach(logo => logo.classList.add('hidden'));
  }
};

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggleButton.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});
