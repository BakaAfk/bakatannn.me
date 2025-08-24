const header = document.getElementById('header');
const infoWidget = document.getElementById('infoWidget');

// Ensure DOM is loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing animations');
  
  // Apply profile backdrop URL from config
  if (typeof config !== 'undefined' && config.profile_backdrop_url) {
    document.documentElement.style.setProperty('--backdrop-url', `url("${config.profile_backdrop_url}")`);
    console.log('Profile backdrop URL applied:', config.profile_backdrop_url);
  }
  
  // Initialize scroll functionality
  initScrollEffects();
  // Fallback: Trigger animations after a delay if scroll doesn't work
  setTimeout(() => {
    const widgets = document.querySelectorAll('.widget');
    const projects = document.querySelectorAll('.project');
    const display = document.querySelector('.display');
    // If no scroll has happened, trigger animations anyway
    if (widgets.length > 0 && !widgets[0].hasAttribute('data-animated')) {
      console.log('Fallback: Triggering animations manually');
      widgets.forEach((widget, index) => {
        setTimeout(() => {
          widget.setAttribute('data-animated', 'true');
        }, index * 100);
      });
      projects.forEach((project, index) => {
        setTimeout(() => {
          project.setAttribute('data-animated', 'true');
        }, (index + 7) * 100);
      });
      if (display) {
        setTimeout(() => {
          display.setAttribute('data-animated', 'true');
        }, 900);
      }
    }
  }, 2000); // 2 second fallback
});

function initScrollEffects() {
  // Scroll effect for background and widgets
  window.addEventListener('scroll', () => {
    try {
      const scroll = Math.min(window.scrollY / window.innerHeight, 1);
      document.body.style.setProperty('--scroll', scroll);

      // Hide arrow after scrolling begins
      const arrow = document.querySelector('.arrow');
      if (scroll > 0.05) {
        if (arrow) {
          arrow.style.opacity = '0';
          arrow.style.pointerEvents = 'none';
        }
      }

      // Trigger widget animations when scrolled
      if (scroll >= 0) {
        const widgets = document.querySelectorAll('.widget');
        widgets.forEach((widget, index) => {
          setTimeout(() => {
            widget.setAttribute('data-animated', 'true');
          }, index * 100);
        });

        // Trigger project widget animations
        const projects = document.querySelectorAll('.project');
        projects.forEach((project, index) => {
          setTimeout(() => {
            project.setAttribute('data-animated', 'true');
          }, (index + 7) * 100);
        });

        // Trigger Discord presence widget animation
        const display = document.querySelector('.display');
        if (display) {
          setTimeout(() => {
            display.setAttribute('data-animated', 'true');
          }, 900);
        }
      }
    } catch (error) {
      console.error('Scroll effect error:', error);
    }
  });
}

// Function to scroll to main content when arrow is clicked
function scrollToMain() {
  try {
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
      mainContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  } catch (error) {
    console.error('Scroll to main error:', error);
    // Fallback: simple scroll
    window.scrollTo(0, window.innerHeight);
  }
}

// Title letter-by-letter animation
(function() {
  try {
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
  } catch (error) {
    console.error('Title animation error:', error);
  }
})();
