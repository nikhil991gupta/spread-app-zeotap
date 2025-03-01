
/**
 * Utility functions for handling animations throughout the application
 */

// Animate element entrance with staggered delay for child elements
export const staggeredAppear = (parentSelector: string, childSelector: string, baseDelay = 50): void => {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;
  
  const children = Array.from(parent.querySelectorAll(childSelector));
  
  children.forEach((child, index) => {
    const element = child as HTMLElement;
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    
    // Apply staggered delay
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, baseDelay * index);
  });
};

// Fade in element
export const fadeIn = (element: HTMLElement, duration = 300): Promise<void> => {
  return new Promise((resolve) => {
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms ease`;
    
    // Trigger reflow
    void element.offsetWidth;
    
    element.style.opacity = '1';
    
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

// Fade out element
export const fadeOut = (element: HTMLElement, duration = 300): Promise<void> => {
  return new Promise((resolve) => {
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease`;
    
    // Trigger reflow
    void element.offsetWidth;
    
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.display = 'none';
      resolve();
    }, duration);
  });
};

// Smooth scroll to element
export const smoothScrollTo = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

// Add subtle hover animation to element
export const addHoverEffect = (element: HTMLElement): void => {
  element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  
  element.addEventListener('mouseenter', () => {
    element.style.transform = 'translateY(-4px)';
    element.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translateY(0)';
    element.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)';
  });
};
