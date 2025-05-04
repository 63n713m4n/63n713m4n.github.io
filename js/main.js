// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Intersection Observer for animations
  const observeElements = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
      observer.observe(el);
    });
  };
  
  // Animate skill bars on scroll
  const skillLevels = document.querySelectorAll('.skill-level');
  observeElements(skillLevels, 'animate-skill-bar');
  
  // Fade in sections on scroll
  const sections = document.querySelectorAll('.section');
  observeElements(sections, 'fade-in');
  
  // Terminal typing effect
  const terminalLines = document.querySelectorAll('.terminal .line');
  let delay = 0;
  
  terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.opacity = '1';
      line.classList.add('fade-in');
    }, delay);
    delay += 500;
  });
  
  // Form validation
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple form validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      let isValid = true;
      
      if (!name.trim()) {
        isValid = false;
        showError('name', 'Name is required');
      } else {
        clearError('name');
      }
      
      if (!email.trim()) {
        isValid = false;
        showError('email', 'Email is required');
      } else if (!isValidEmail(email)) {
        isValid = false;
        showError('email', 'Please enter a valid email');
      } else {
        clearError('email');
      }
      
      if (!subject.trim()) {
        isValid = false;
        showError('subject', 'Subject is required');
      } else {
        clearError('subject');
      }
      
      if (!message.trim()) {
        isValid = false;
        showError('message', 'Message is required');
      } else {
        clearError('message');
      }
      
      if (isValid) {
        // In a real application, you would send the form data to a server
        alert('Form submitted successfully! (This is a demo - no actual email is sent)');
        contactForm.reset();
      }
    });
  }
  
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let errorElement = field.parentElement.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      errorElement.style.color = 'var(--accent-tertiary)';
      errorElement.style.fontSize = '0.8rem';
      errorElement.style.marginTop = '4px';
      field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.style.borderColor = 'var(--accent-tertiary)';
  }
  
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    field.style.borderColor = 'var(--light-bg)';
  }
  
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  // Handle section highlighting in navigation
  const handleScrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 300)) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', handleScrollSpy);
  
  // Initialize AOS (Animate on Scroll) fallback if needed
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }
});