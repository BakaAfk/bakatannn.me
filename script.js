const header = document.getElementById('header');
const infoWidget = document.getElementById('infoWidget');

// Scroll effect for background and widgets
window.addEventListener('scroll', () => {
  const scroll = Math.min(window.scrollY / window.innerHeight, 1);
  document.body.style.setProperty('--scroll', scroll);

  // Hide arrow after scrolling begins
  const arrow = document.querySelector('.arrow');

  if (scroll > 0.05) { // Reduced threshold to 5%
    if (arrow) {
      arrow.style.opacity = '0';
      arrow.style.pointerEvents = 'none';
    }
  }

  // Trigger widget animations when scrolled halfway
  if (scroll >= 0) {
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach((widget, index) => {
      setTimeout(() => {
        widget.setAttribute('data-animated', 'true');
      }, index * 100); // Stagger the animation triggers
    });

    // Trigger project widget animations
    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
      setTimeout(() => {
        project.setAttribute('data-animated', 'true');
      }, (index + 7) * 100); // Start after main widgets
    });

    // Trigger Discord presence widget animation
    const display = document.querySelector('.display');
    if (display) {
      setTimeout(() => {
        display.setAttribute('data-animated', 'true');
      }, 900); // After all other widgets
    }
  }
});

// Function to scroll to main content when arrow is clicked
function scrollToMain() {
  const mainContainer = document.querySelector('.main-container');
  if (mainContainer) {
    mainContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

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
