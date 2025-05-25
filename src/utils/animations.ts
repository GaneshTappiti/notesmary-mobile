
// Animation utilities for mobile transitions
export const animationVariants = {
  // Page transitions
  pageEnter: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-50%', opacity: 0 },
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.25
    }
  },
  
  pageEnterFromLeft: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.25
    }
  },

  // Modal transitions
  modalEnter: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      duration: 0.3
    }
  },

  // Card animations
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98, y: 0 },
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 17
    }
  },

  // Staggered list animations
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },

  staggerItem: {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  },

  // FAB animations
  fabExpand: {
    initial: { scale: 1 },
    expanded: { 
      scale: 1.1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17
      }
    }
  },

  // Button ripple effect
  buttonTap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Easing curves
export const easingCurves = {
  fastOutSlowIn: [0.4, 0.0, 0.2, 1],
  easeInOut: [0.4, 0.0, 0.6, 1],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95]
};
