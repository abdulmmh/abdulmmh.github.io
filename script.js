document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Preloader & Initial Fade-in
  // =========================================================================
  const preloader = document.getElementById('preloader');
  const loaderStatus = document.querySelector('.loader-status');
  
  const statuses = [
    'Parsing credentials...',
    'Loading Spring Boot configurations...',
    'Compiling Angular components...',
    'Initializing Flutter state engine...',
    'Deploying application build...',
    'Ready!'
  ];

  let statusIndex = 0;
  const statusInterval = setInterval(() => {
    if (statusIndex < statuses.length - 1) {
      statusIndex++;
      if (loaderStatus) loaderStatus.textContent = statuses[statusIndex];
    } else {
      clearInterval(statusInterval);
    }
  }, 400);

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
      }
      document.documentElement.classList.remove('preloader-active');
      document.body.classList.remove('preloader-active');
      // Trigger scroll reveals once loaded
      revealOnScroll();
    }, 1800); // Allow preloader animations to run cleanly
  });


  // =========================================================================
  // 2. Navigation Header & Active Links
  // =========================================================================
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Dynamic nav link highlighting based on active section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });


  // =========================================================================
  // 3. Mobile Navigation Menu
  // =========================================================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }


  // =========================================================================
  // 4. Typewriter Animation (Hero)
  // =========================================================================
  const typewriter = document.getElementById('typewriter');
  const occupations = [
    'Full Stack Developer',
    'Spring Boot Specialist',
    'Angular Web Developer',
    'Flutter & Android Creator',
    'B.Sc. Mathematics Graduate'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentWord = occupations[wordIndex];
    
    if (isDeleting) {
      // Deleting character
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Deletes faster
    } else {
      // Adding character
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // Standard speed
    }

    // Word completed
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Cycle to next word
      wordIndex = (wordIndex + 1) % occupations.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typewriter) {
    typeEffect();
  }


  // =========================================================================
  // 5. Scroll Reveal & Skill Progress Animations
  // =========================================================================
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  const skillFills = document.querySelectorAll('.skill-bar-fill');

  // Intersection Observer for scroll triggers
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  scrollElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Specifically animate skill bars when they scroll into view
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const progress = fill.getAttribute('data-progress');
        fill.style.width = progress;
      }
    });
  }, {
    threshold: 0.2
  });

  skillFills.forEach(fill => {
    skillObserver.observe(fill);
  });

  // Fallback scroll reveal triggers if observer is not supported
  function revealOnScroll() {
    scrollElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add('revealed');
      }
    });
  }


  // =========================================================================
  // 6. Project Tab Selector
  // =========================================================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active states
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Add active state to clicked button
      btn.classList.add('active');

      // Add active state to matching target panel
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });


  // =========================================================================
  // 7. Interactive GitHub Contribution Grid
  // =========================================================================
  const contribGrid = document.getElementById('github-contrib-grid');
  
  if (contribGrid) {
    // Generate 53 weeks x 7 days = 371 cells
    const cellCount = 371;
    
    // Create random activity biased towards weekdays
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      
      // Determine day of the week (0-6)
      const day = i % 7;
      let level = 0;
      
      // Generate realistic contribution layouts (bias against weekends 0 & 6)
      const rand = Math.random();
      if (day === 0 || day === 6) {
        // Weekends: mostly light activity
        if (rand > 0.85) level = 2;
        else if (rand > 0.6) level = 1;
        else level = 0;
      } else {
        // Weekdays: heavier coding commits
        if (rand > 0.9) level = 4;
        else if (rand > 0.7) level = 3;
        else if (rand > 0.4) level = 2;
        else if (rand > 0.2) level = 1;
        else level = 0;
      }

      cell.classList.add(`level-${level}`);
      
      // Dynamic details on tooltip title (relative time estimation for 2026)
      let commits = 'No commits';
      if (level === 1) commits = '1-2 commits';
      else if (level === 2) commits = '3-5 commits';
      else if (level === 3) commits = '6-8 commits';
      else if (level === 4) commits = '9+ commits';
      
      cell.setAttribute('title', `${commits} on day ${i+1}`);
      contribGrid.appendChild(cell);
    }
  }


  // =========================================================================
  // 8. Contact Form Handling (Validation & Submission State)
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const statusTitle = document.querySelector('.status-title');
  const statusDesc = document.querySelector('.status-desc');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = contactForm.querySelectorAll('.form-control');
      
      inputs.forEach(input => {
        const formGroup = input.parentElement;
        
        // Basic check for empty inputs
        if (input.value.trim() === '') {
          formGroup.classList.add('has-error');
          isValid = false;
        } else {
          formGroup.classList.remove('has-error');
        }

        // Email validation check
        if (input.type === 'email' && input.value.trim() !== '') {
          const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailPattern.test(input.value)) {
            formGroup.classList.add('has-error');
            isValid = false;
          }
        }
      });

      // Clear error statuses when user types
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          input.parentElement.classList.remove('has-error');
        });
      });

      if (isValid) {
        const submitBtn = contactForm.querySelector('.btn-submit');
        const submitBtnText = submitBtn.querySelector('span');
        const submitBtnIcon = submitBtn.querySelector('i');
        
        // Enter loading state
        submitBtn.disabled = true;
        submitBtnText.textContent = 'Sending Message...';
        submitBtnIcon.className = 'fa-solid fa-spinner fa-spin';

        // Collect form data
        const formData = new FormData(contactForm);
        
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            // Success Response State
            formStatus.className = 'form-status success';
            statusTitle.textContent = 'Message Transmitted Successfully!';
            statusDesc.textContent = 'Thank you for reaching out. Abdul Mannan Mahadi Hasan will respond shortly.';
            contactForm.reset();
          } else {
            // Error Response State
            formStatus.className = 'form-status error';
            statusTitle.textContent = 'Transmission Error';
            statusDesc.textContent = json.message || 'Something went wrong. Please try again later.';
          }
        })
        .catch(error => {
          console.error(error);
          formStatus.className = 'form-status error';
          statusTitle.textContent = 'Transmission Error';
          statusDesc.textContent = 'Network error. Please check your connection and try again.';
        })
        .then(() => {
          // Reset Button State
          submitBtn.disabled = false;
          submitBtnText.textContent = 'Send Message';
          submitBtnIcon.className = 'fa-solid fa-paper-plane';
          // Smooth scroll to status message
          formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      } else {
        // Show local error status
        formStatus.className = 'form-status error';
        statusTitle.textContent = 'Transmission Error';
        statusDesc.textContent = 'Please correct the highlighted validation constraints before sending.';
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }


  // =========================================================================
  // 9. Scroll To Top Logic
  // =========================================================================
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 10. Interactive Phone Mockup Screen Toggle
  // =========================================================================
  const phoneHomeBtn = document.getElementById('phone-home-btn');
  const phoneImg1 = document.getElementById('phone-img-1');
  const phoneImg2 = document.getElementById('phone-img-2');

  if (phoneHomeBtn && phoneImg1 && phoneImg2) {
    let currentScreen = 1;
    
    // Toggle on home button click
    phoneHomeBtn.addEventListener('click', () => {
      if (currentScreen === 1) {
        phoneImg1.classList.remove('active');
        phoneImg2.classList.add('active');
        currentScreen = 2;
      } else {
        phoneImg2.classList.remove('active');
        phoneImg1.classList.add('active');
        currentScreen = 1;
      }
    });

    // Auto-toggle every 4 seconds
    setInterval(() => {
      if (currentScreen === 1) {
        phoneImg1.classList.remove('active');
        phoneImg2.classList.add('active');
        currentScreen = 2;
      } else {
        phoneImg2.classList.remove('active');
        phoneImg1.classList.add('active');
        currentScreen = 1;
      }
    }, 4000);
  }

});
