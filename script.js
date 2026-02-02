// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Optimized scroll animations with IntersectionObserver
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Create reusable observer factory function
const createObserver = (callback) => {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        callback(entry.target);
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
};

// General observer for simple fade-in animations
const generalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Animate feature cards
const featureObserver = createObserver((element) => {
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
});

// Animate amenity cards
const amenityObserver = createObserver((element) => {
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
});

// Animate location details
const locationObserver = createObserver((element) => {
  element.style.opacity = '1';
  element.style.transform = 'translateX(0)';
});

// Animate location map
const mapObserver = createObserver((element) => {
  element.style.opacity = '1';
  element.style.transform = 'translateX(0)';
});

// Animate CTA content
const ctaObserver = createObserver((element) => {
  element.style.opacity = '1';
  element.style.transform = 'scale(1)';
});

// Animate testimonial cards with stagger
const testimonialObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

// Parallax effect for hero background (optimized)
let parallaxTimer;
window.addEventListener('scroll', () => {
  if (parallaxTimer) {
    cancelAnimationFrame(parallaxTimer);
  }
  
  parallaxTimer = requestAnimationFrame(() => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}, { passive: true });

// Initialize all observers
const initializeAnimations = () => {
  // Observe all section headers
  document.querySelectorAll('.section-header').forEach(header => {
    generalObserver.observe(header);
  });

  // Feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    featureObserver.observe(card);
  });

  // Amenity cards
  const amenityCards = document.querySelectorAll('.amenity-card');
  amenityCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    amenityObserver.observe(card);
  });

  // Location elements
  const locationDetails = document.querySelector('.location-details');
  if (locationDetails) {
    locationDetails.style.opacity = '0';
    locationDetails.style.transform = 'translateX(-30px)';
    locationDetails.style.transition = 'all 0.6s ease-out';
    locationObserver.observe(locationDetails);
  }

  const locationMap = document.querySelector('.location-map');
  if (locationMap) {
    locationMap.style.opacity = '0';
    locationMap.style.transform = 'translateX(30px)';
    locationMap.style.transition = 'all 0.6s ease-out';
    mapObserver.observe(locationMap);
  }

  // CTA content
  const ctaContent = document.querySelector('.cta-content');
  if (ctaContent) {
    ctaContent.style.opacity = '0';
    ctaContent.style.transform = 'scale(0.95)';
    ctaContent.style.transition = 'all 0.6s ease-out';
    ctaObserver.observe(ctaContent);
  }

  // Testimonial cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    testimonialObserver.observe(card);
  });

  // Project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    const projectObserver = createObserver((element) => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
    projectObserver.observe(card);
  });
};

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
  initializeAnimations();
}

// Handle CTA form submission
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
  ctaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    
    // Simple validation
    if (!name || !email || !phone) {
      alert('Please fill in all fields');
      return;
    }
    
    // Show success message (in production, this would send to a server)
    const submitBtn = this.querySelector('.cta-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Thank You! We\'ll contact you soon.';
    submitBtn.style.background = 'var(--color-accent)';
    submitBtn.disabled = true;
    
    // Reset form after 3 seconds
    setTimeout(() => {
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  });
}

// Project Modal Functionality
const projectModal = document.getElementById('projectModal');
const modalProjectName = document.getElementById('modalProjectName');
const modalLocation = document.getElementById('modalLocation');
const modalDescription = document.getElementById('modalDescription');
const modalHighlights = document.getElementById('modalHighlights');

// Project data
const projectData = {
  'Nova Haven Heights': {
    location: 'Mumbai, Maharashtra',
    description: 'Nova Haven Heights represents the pinnacle of luxury living in Mumbai\'s most prestigious location. This architectural masterpiece combines contemporary design with timeless elegance, offering residents an unparalleled lifestyle experience with breathtaking city views and world-class amenities.',
    highlights: [
      '360-degree panoramic views of the Mumbai skyline',
      'Smart home automation with voice control',
      'Exclusive rooftop infinity pool and lounge'
    ]
  },
  'Nova Haven Vista': {
    location: 'Pune, Maharashtra',
    description: 'Nestled in the heart of Pune\'s thriving IT corridor, Nova Haven Vista offers a perfect blend of urban convenience and serene living. Designed for modern professionals and families, this project features sustainable architecture and cutting-edge amenities.',
    highlights: [
      'Proximity to major IT parks and educational institutions',
      'Extensive green spaces and walking trails',
      'Advanced security with AI-powered surveillance'
    ]
  },
  'Nova Haven Central': {
    location: 'Bengaluru, Karnataka',
    description: 'Nova Haven Central sets new standards for luxury living in Bengaluru\'s prime business district. This landmark development combines sophisticated design with sustainable practices, creating an oasis of tranquility amidst the bustling city.',
    highlights: [
      'Walking distance to metro station and business hubs',
      'Rainwater harvesting and solar power systems',
      'Wellness center with spa and meditation facilities'
    ]
  }
};

// Open modal function
function openProjectModal(projectName) {
  const project = projectData[projectName];
  if (!project) return;
  
  modalProjectName.textContent = projectName;
  modalLocation.querySelector('span').textContent = project.location;
  modalDescription.textContent = project.description;
  
  // Update highlights
  modalHighlights.innerHTML = project.highlights
    .map(highlight => `<li>${highlight}</li>`)
    .join('');
  
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus management
  const firstFocusable = projectModal.querySelector('.modal-close');
  if (firstFocusable) firstFocusable.focus();
}

// Close modal function
function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Handle ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
});

// Trap focus within modal
document.addEventListener('keydown', (e) => {
  if (!projectModal.classList.contains('active')) return;
  
  const focusableElements = projectModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
});

// Add click handlers to project buttons
document.addEventListener('DOMContentLoaded', () => {
  const projectButtons = document.querySelectorAll('.project-btn');
  projectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectCard = btn.closest('.project-card');
      const projectName = projectCard.querySelector('.project-name').textContent;
      openProjectModal(projectName);
    });
  });
});

// Enquire Now button handler
function openEnquiryForm() {
  closeProjectModal();
  // Scroll to CTA form
  const ctaSection = document.getElementById('contact');
  if (ctaSection) {
    ctaSection.scrollIntoView({ behavior: 'smooth' });
    // Focus on first input
    setTimeout(() => {
      const firstInput = ctaSection.querySelector('.form-input');
      if (firstInput) firstInput.focus();
    }, 500);
  }
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update toggle button state
function updateToggleState() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  if (isDark) {
    darkModeToggle.classList.add('dark-active');
  } else {
    darkModeToggle.classList.remove('dark-active');
  }
}

// Initialize toggle state
updateToggleState();

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateToggleState();
});

// Prevent flash on page load
document.addEventListener('DOMContentLoaded', () => {
  // Remove transition temporarily to prevent flash
  html.style.transition = 'none';
  
  // Force a reflow
  html.offsetHeight;
  
  // Restore transitions
  setTimeout(() => {
    html.style.transition = '';
  }, 100);
});

// Optimized smooth loading with reduced animation time
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// Set initial opacity to prevent flash
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// Performance-optimized scroll handler with throttling
let scrollTimer;
const optimizedScrollHandler = () => {
  if (scrollTimer) {
    cancelAnimationFrame(scrollTimer);
  }
  
  scrollTimer = requestAnimationFrame(() => {
    const scrolled = window.scrollY > 80;
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', scrolled);
  });
};

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Intersection Observer for fade-in animations
const fadeObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, fadeObserverOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(section);
});

// Button hover effects
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.style.setProperty('--mouse-x', `${x}px`);
    this.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const scrollPosition = window.pageYOffset + 100;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--color-accent) !important;
  }
`;
document.head.appendChild(style);

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (hero && heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - scrolled / 800;
  }
});

// Form validation (for future contact forms)
function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea, select');
  let isValid = true;
  
  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      showError(input, 'This field is required');
      isValid = false;
    } else {
      clearError(input);
    }
  });
  
  return isValid;
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  if (formGroup) {
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#ef4444';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(error);
    }
    
    input.style.borderColor = '#ef4444';
  }
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  if (formGroup) {
    const error = formGroup.querySelector('.error-message');
    if (error) {
      error.remove();
    }
    input.style.borderColor = '';
  }
}

// Loading states for buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    if (this.classList.contains('btn-primary') && !this.classList.contains('no-loading')) {
      const originalText = this.textContent;
      this.textContent = 'Loading...';
      this.disabled = true;
      
      // Simulate loading state (remove this in production)
      setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
      }, 2000);
    }
  });
});

// Console branding
console.log('%c LUXE Real Estate ', 'background: #0f172a; color: #c8a24a; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%c Premium Living Spaces ', 'background: #c8a24a; color: #0f172a; font-size: 14px; padding: 5px; border-radius: 3px;');
