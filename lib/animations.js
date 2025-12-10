// lib/animations.js

// 1. Standard Fade Up (Used in Home, About, Grid Items)
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

// 2. Stagger Container (Orchestrates the children animations)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// 3. Text Reveal (Used in Book Details)
export const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// 4. Image Reveal (Used in About Page)
export const imageReveal = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

// 5. Slide In (Used in Book Details Sidebar)
export const slideInLeft = {
  hidden: { x: "-100%" },
  visible: { 
    x: "0%",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};