const themeToggleBtn = document.querySelector('.theme-toggle-btn');

themeToggleBtn.addEventListener('click', function() {
  document.body.classList.toggle('light-theme');
  
  if (document.body.classList.contains('light-theme')) {
    themeToggleBtn.src = './images/icon-moon.svg'
  } else {
    themeToggleBtn.src = './images/icon-sun.svg'
  }
})