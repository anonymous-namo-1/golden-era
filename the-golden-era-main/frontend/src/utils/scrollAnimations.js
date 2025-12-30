// Scroll Animation Observer
export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all elements with scroll animation classes
  const animateElements = document.querySelectorAll(
    '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
  );
  
  animateElements.forEach(el => observer.observe(el));

  return observer;
};

// Stagger animation utility
export const addStaggerDelay = (elements, baseDelay = 100) => {
  elements.forEach((el, index) => {
    el.style.transitionDelay = `${index * baseDelay}ms`;
  });
};