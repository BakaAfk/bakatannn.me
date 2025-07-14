const header = document.getElementById('header');
const infoWidget = document.getElementById('infoWidget');
// Scroll effect for background and widgets
window.addEventListener('scroll', () => {
  const scroll = Math.min(window.scrollY / window.innerHeight, 1);
  document.body.style.setProperty('--scroll', scroll);
});
// Optionally, add more interactivity for widgets or arrow
// Title letter-by-letter animation
(function() {
  const fullTitle = document.title;
  let i = 1;
  let wait = 0;
  const interval = setInterval(() => {
    document.title = fullTitle.substring(0, i);
    if (i === fullTitle.length) {
      wait++;
      if (wait > 2) {
        clearInterval(interval);
        document.title = fullTitle;
      }
    } else {
      i++;
    }
  }, 400);
})();
