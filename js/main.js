/* ==========================================================================
   PORTOFOLIO INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  /* --- 1. Sticky Navbar & Scroll Spy --- */
  const navbar = document.querySelector('.navbar-custom');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add background shadow on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav item based on scroll position
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* --- 2. Typewriter Effect in Hero Section --- */
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const phrases = [
      'Informatics Management Student'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at end of phrase
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before new phrase
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  /* --- 3. Filter System for Skills --- */
  const skillPills = document.querySelectorAll('.skill-filter-pill');
  const skillCards = document.querySelectorAll('.skill-card-item');

  skillPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Toggle active status
      skillPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* --- 4. Contact Form Submission Handling --- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnSubmit = contactForm.querySelector('button[type="submit"]');
      const originalText = btnSubmit.innerHTML;

      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...`;

      try {
        const response = await fetch('https://formsubmit.co/ajax/salsabilaj111@gmail.com', {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            Accept: 'application/json'
          }
        });
        const result = await response.json();

        if (!response.ok || (result.success !== 'true' && result.success !== true)) {
          throw new Error(result.message || 'FormSubmit rejected the message.');
        }

        if (formStatus) {
          formStatus.innerHTML = `
            <div class="alert alert-success border-0 bg-success bg-opacity-20 text-white mt-3" role="status">
              <i class="bi bi-check-circle-fill me-2"></i> Your message has been sent. Thank you!
            </div>
          `;
        }
        contactForm.reset();
      } catch (error) {
        console.error('Contact form submission failed:', error);
        if (formStatus) {
          formStatus.innerHTML = `
            <div class="alert alert-danger border-0 mt-3" role="alert">
              <i class="bi bi-exclamation-circle-fill me-2"></i> We couldn't send your message. Please try again later.
            </div>
          `;
        }
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalText;
      }
    });
  }

  /* --- 5. Download CV Handler --- */
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('🔒 Unduh CV: File CV Portofolio siap diunduh! (Anda dapat menghubungkan file PDF CV Anda di sini)');
    });
  }

});
