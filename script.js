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


// View count functionality
(function() {
  try {
    // Get or initialize view count from localStorage
    function getViewCount() {
      const stored = localStorage.getItem('pageViewCount');
      return stored ? parseInt(stored, 10) : 0;
    }

    // Increment and save view count
    function incrementViewCount() {
      const currentCount = getViewCount();
      const newCount = currentCount + 1;
      localStorage.setItem('pageViewCount', newCount.toString());
      return newCount;
    }

    // Format number with commas
    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Update view count display
    function updateViewCountDisplay() {
      const viewCountElement = document.getElementById('viewCount');
      if (viewCountElement) {
        const count = incrementViewCount();
        viewCountElement.textContent = formatNumber(count);
      }
    }

    // Initialize view count when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
      updateViewCountDisplay();
    });

  } catch (error) {
    console.error('View count error:', error);
    // Fallback: show error message
    const viewCountElement = document.getElementById('viewCount');
    if (viewCountElement) {
      viewCountElement.textContent = 'Error loading count';
    }
  }
})();