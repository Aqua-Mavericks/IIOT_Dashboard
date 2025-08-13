// Global variables
let currentIndex = 0;
const totalCards = 4;
let autoSlideInterval;

// Remove loading screen when page loads
window.addEventListener('load', function() {
  setTimeout(() => {
    document.body.classList.remove('loading');
    initializeAnimations();
  }, 3000);
});

// Initialize all animations
function initializeAnimations() {
  // Trigger initial animations
  triggerInitialAnimations();
  
  // Setup scroll animations
  setupScrollAnimations();
  
  // Setup counter animations
  setupCounterAnimations();
  
  // Initialize portfolio
  initializePortfolio();
  
  // Setup navigation
  setupNavigation();
  
  // Start auto-slide
  startAutoSlide();
}

// Trigger initial hero animations
function triggerInitialAnimations() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroFeatures = document.querySelector('.hero-features');
  const ctaButton = document.querySelector('.cta-button');
  
  setTimeout(() => heroTitle.style.animation = 'textReveal 1s ease-out forwards', 100);
  setTimeout(() => heroSubtitle.style.animation = 'textReveal 1s ease-out forwards', 600);
  setTimeout(() => heroFeatures.style.animation = 'fadeIn 1s ease-out forwards', 1100);
  setTimeout(() => ctaButton.style.animation = 'bounceIn 0.8s ease-out forwards', 1600);
}

// Setup scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
          element.classList.add('visible');
        }, parseFloat(delay) * 1000);
        
        // Trigger flow step animations
        if (element.classList.contains('system-flow')) {
          animateFlowSteps();
        }
      }
    });
  }, observerOptions);

  // Observe all scroll-animated elements
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// Animate flow steps
function animateFlowSteps() {
  const flowSteps = document.querySelectorAll('.flow-step');
  flowSteps.forEach((step, index) => {
    setTimeout(() => {
      step.style.opacity = '1';
      step.style.transform = 'scale(1)';
      step.style.animation = 'pulseIn 0.6s ease-out forwards';
    }, index * 200);
  });
}

// Setup counter animations
function setupCounterAnimations() {
  const counterElements = document.querySelectorAll('.animate-counter');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.dataset.target);
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
          animateCounter(element, target);
        }, parseFloat(delay) * 1000);
        
        counterObserver.unobserve(element);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));
}

// Animate counter numbers
function animateCounter(element, target) {
  const numberElement = element.querySelector('.achievement-number');
  let current = 0;
  const increment = target / 60; // Animation duration ~1 second
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    numberElement.textContent = Math.floor(current);
  }, 16); // ~60fps
}

// Portfolio card functions
function initializePortfolio() {
  showCard(0);
  setupCardGradients();
}

function setupCardGradients() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
}

function showCard(index) {
  const cards = document.querySelectorAll('.card');
  const dots = document.querySelectorAll('.dot');
  
  // Hide all cards with animation
  cards.forEach((card, i) => {
    card.classList.remove('active');
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8) translateX(100%) rotateY(15deg)';
    card.style.zIndex = '1';
  });
  
  // Show selected card with animation
  if (cards[index]) {
    setTimeout(() => {
      cards[index].classList.add('active');
      cards[index].style.opacity = '1';
      cards[index].style.transform = 'scale(1) translateX(0) rotateY(0deg)';
      cards[index].style.zIndex = '3';
    }, 100);
  }
  
  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  currentIndex = index;
}

function changeCard(direction) {
  currentIndex += direction;
  
  if (currentIndex >= totalCards) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalCards - 1;
  }
  
  showCard(currentIndex);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    changeCard(1);
  }, 6000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Navigation setup
function setupNavigation() {
  // Smooth scroll for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
  
  // Mobile hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('.navbar');
  const scrolled = window.scrollY;
  
  if (scrolled > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  }
});

// Mobile touch support
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', function(e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;
  const diff = startX - endX;
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      changeCard(1);
    } else {
      changeCard(-1);
    }
  }
}

// Interactive diagram points
document.querySelectorAll('.process-point').forEach(point => {
  point.addEventListener('click', function() {
    const process = this.dataset.process;
    // Add click animation
    this.style.transform = 'scale(1.2)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 200);
    
    // You can add more interaction here
    console.log(`Clicked on ${process} process`);
  });
});

// Global functions for onclick handlers
window.changeCard = changeCard;
window.showCard = showCard;
window.scrollToSection = scrollToSection;

console.log('🌊 Enhanced Animated Portfolio Loaded Successfully!');
