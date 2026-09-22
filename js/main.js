/**
 * APEX ACADEMY - MODERN COACHING WEBSITE
 * Interactive JavaScript Engine
 * With WhatsApp Direct Form Redirect (+91 93092 76044) & Responsive Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initTypewriter();
  initCounters();
  initCourseFilters();
  initTestimonialCarousel();
  initResultsFilter();
  initGalleryAndLightbox();
  initBranchSwitcher();
  initFaqAccordion();
  initModalsAndForms();
  initScrollReveal();
});

// Institute Global WhatsApp & Contact Configuration
const APEX_CONFIG = {
  whatsappNumber: '919309276044',
  formattedPhone: '+91 93092 76044'
};

/* ==========================================================================
   1. STICKY HEADER & ACTIVE NAV LINKS
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy for active navigation item
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE NAV DRAWER (SLIDE-IN ANIMATION & COMPLETE LINKS)
   ========================================================================== */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typewriterText');
  if (!targetElement) return;

  const words = [
    'JEE (Main & Adv)',
    'NEET-UG Medical',
    'CBSE Class 9 to 12',
    'Foundation & Olympiads',
    'NTSE & Science Champs'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      targetElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      targetElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1800; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before next phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. ANIMATED STAT COUNTERS (INTERSECTION OBSERVER)
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;

  let hasRun = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 1800;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString();
              clearInterval(timer);
            } else {
              counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.25 });

  const metricsSection = document.querySelector('.trust-metrics-section');
  if (metricsSection) observer.observe(metricsSection);
}

/* ==========================================================================
   5. COURSE / BATCH FILTER TABS
   ========================================================================== */
function initCourseFilters() {
  const filterButtons = document.querySelectorAll('.course-filters .filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 220);
        }
      });
    });
  });
}

/* ==========================================================================
   6. TESTIMONIALS CAROUSEL
   ========================================================================== */
function initTestimonialCarousel() {
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval;

  // Build dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoplay();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5500);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();

  // Pause on hover
  const carouselContainer = document.querySelector('.testimonials-carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carouselContainer.addEventListener('mouseleave', startAutoplay);
  }

  // Touch Swipe support for mobile & tablet
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      nextSlide();
      resetAutoplay();
    } else if (touchEndX - touchStartX > 45) {
      prevSlide();
      resetAutoplay();
    }
  }, { passive: true });
}

/* ==========================================================================
   7. RESULTS / TOPPERS YEAR FILTER
   ========================================================================== */
function initResultsFilter() {
  const filterBtns = document.querySelectorAll('.results-filter-btn');
  const topperCards = document.querySelectorAll('.topper-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const year = btn.getAttribute('data-year');

      topperCards.forEach(card => {
        const cardYear = card.getAttribute('data-year');
        if (year === 'all' || cardYear === year) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   8. GALLERY & FULLSCREEN LIGHTBOX (MOBILE TOUCH FRIENDLY)
   ========================================================================== */
function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      galleryCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  if (!lightbox) return;

  let currentGalleryIndex = 0;
  const visibleCards = () => Array.from(galleryCards).filter(c => c.style.display !== 'none');

  function openLightbox(index) {
    const list = visibleCards();
    if (!list.length || index < 0 || index >= list.length) return;
    currentGalleryIndex = index;
    const card = list[index];
    const img = card.querySelector('img');
    const title = card.querySelector('.gallery-title')?.textContent || '';
    const tag = card.querySelector('.gallery-category-tag')?.textContent || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = `${tag ? tag + ' — ' : ''}${title}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    const list = visibleCards();
    if (!list.length) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % list.length;
    openLightbox(currentGalleryIndex);
  }

  function showPrev() {
    const list = visibleCards();
    if (!list.length) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + list.length) % list.length;
    openLightbox(currentGalleryIndex);
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const list = visibleCards();
      const index = list.indexOf(card);
      openLightbox(index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   9. MULTI-BRANCH LOCATION SWITCHER
   ========================================================================== */
function initBranchSwitcher() {
  const branchTabs = document.querySelectorAll('.branch-tab-btn');
  const branchName = document.getElementById('branchName');
  const branchTagline = document.getElementById('branchTagline');
  const branchAddress = document.getElementById('branchAddress');
  const branchPhone = document.getElementById('branchPhone');
  const branchHours = document.getElementById('branchHours');
  const branchDirectionsBtn = document.getElementById('branchDirectionsBtn');
  const branchMapIframe = document.getElementById('branchMapIframe');

  const branchData = {
    preet_vihar: {
      name: 'Central Campus (Preet Vihar)',
      tagline: 'Flagship Academic Wing • Center of Excellence for JEE & NEET',
      address: 'Plot 42, Main Vikas Marg, Near Preet Vihar Metro Station, New Delhi - 110092',
      phone: APEX_CONFIG.formattedPhone,
      hours: 'Mon – Sat: 8:00 AM – 8:30 PM | Sun: 9:00 AM – 4:00 PM',
      directionsUrl: 'https://maps.google.com/?q=Preet+Vihar+New+Delhi',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.745481711202!2d77.2872322!3d28.6391456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb53b8118ab7%3A0x6a2c262ad0518776!2sPreet%20Vihar%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
    },
    model_town: {
      name: 'North Hub (Model Town)',
      tagline: 'Foundation & Olympiad Specialized Center • Class 8 to 12',
      address: 'D-14, Ground & 1st Floor, Ring Road, Model Town Part 2, Delhi - 110009',
      phone: APEX_CONFIG.formattedPhone,
      hours: 'Mon – Sat: 8:30 AM – 8:00 PM | Sun: 9:00 AM – 2:00 PM',
      directionsUrl: 'https://maps.google.com/?q=Model+Town+Delhi',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13996.347892182744!2d77.1852093!3d28.7051214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0233b827f31b%3A0xb35a09b3c43491f2!2sModel%20Town%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin'
    },
    kalu_sarai: {
      name: 'South Hub (Kalu Sarai / Hauz Khas)',
      tagline: 'Intensive Test Preparation & Dropper Batch Hub',
      address: 'Building 18, Opp. Sarvapriya Vihar, Kalu Sarai, Hauz Khas, New Delhi - 110016',
      phone: APEX_CONFIG.formattedPhone,
      hours: 'Mon – Sun: 7:30 AM – 9:00 PM (Daily Doubt Counters Open)',
      directionsUrl: 'https://maps.google.com/?q=Kalu+Sarai+Hauz+Khas+New+Delhi',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14018.634129521323!2d77.1972827!3d28.5499298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce270836ff935%3A0x7d6a59929285091e!2sKalu%20Sarai%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000002!5m2!1sen!2sin'
    }
  };

  branchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      branchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.getAttribute('data-branch');
      const data = branchData[key];
      if (!data) return;

      branchName.textContent = data.name;
      branchTagline.textContent = data.tagline;
      branchAddress.textContent = data.address;
      branchPhone.textContent = data.phone;
      branchPhone.href = `tel:${data.phone.replace(/[^0-9+]/g, '')}`;
      branchHours.textContent = data.hours;
      branchDirectionsBtn.href = data.directionsUrl;
      branchMapIframe.src = data.mapEmbedUrl;
    });
  });
}

/* ==========================================================================
   10. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all others
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    });
  });
}

/* ==========================================================================
   11. MODALS & ALL FORM SUBMISSIONS REDIRECTED TO WHATSAPP (+91 93092 76044)
   ========================================================================== */
function initModalsAndForms() {
  const demoModal = document.getElementById('demoModal');
  const openDemoBtns = document.querySelectorAll('.open-demo-modal');
  const closeDemoBtn = document.getElementById('closeDemoBtn');
  const demoForm = document.getElementById('demoClassForm');

  const courseModal = document.getElementById('courseDetailModal');
  const closeCourseBtn = document.getElementById('closeCourseBtn');
  const openCourseBtns = document.querySelectorAll('.open-course-details');
  const modalCourseTitle = document.getElementById('modalCourseTitle');
  const modalCourseBadge = document.getElementById('modalCourseBadge');
  const modalCourseDesc = document.getElementById('modalCourseDesc');
  const modalCourseSubjects = document.getElementById('modalCourseSubjects');
  const modalCourseDuration = document.getElementById('modalCourseDuration');
  const modalCourseFee = document.getElementById('modalCourseFee');
  const modalEnrollNowBtn = document.getElementById('modalEnrollNowBtn');

  const toast = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  // Course Data dictionary for curriculum modal
  const courseData = {
    'jee-target': {
      title: 'JEE Main + Advanced (Target 2026/27)',
      badge: 'Most Popular • 2 Year Intensive',
      desc: 'Comprehensive classroom program engineered for serious engineering aspirants targeting top IITs and NITs. Includes daily practice papers (DPPs), chapter-wise micro tests, and national test series.',
      subjects: 'Physics, Physical Chemistry, Organic Chemistry, Inorganic Chemistry, Higher Mathematics',
      duration: '24 Months (Morning & Evening Batches Available)',
      fee: '₹85,000 / Year (Scholarships up to 90% via Apex Talent Hunt)'
    },
    'neet-elite': {
      title: 'NEET-UG Medical Elite Program',
      badge: 'High Selection Rate • Medical Specialized',
      desc: 'Rigorous NCERT line-by-line breakdown coupled with deep conceptual problem-solving for AIIMS and state medical colleges. Features NCERT audio flashcards and Sunday mock drills.',
      subjects: 'Physics for Medical, Organic Chemistry, Botany, Zoology, NCERT Line-by-Line',
      duration: '12 / 24 Months Options',
      fee: '₹78,000 / Year (Flexible No-Cost EMI Available)'
    },
    'foundation-10': {
      title: 'Class 10 CBSE Board + Olympiad Foundation',
      badge: 'Early Starter Edge',
      desc: 'Build rock-solid logical foundations in Science and Maths while preparing for CBSE Board Exams with target 95%+ marks. Special training for NTSE and Jr. Science Olympiad.',
      subjects: 'Science (Phy, Chem, Bio), Mathematics, Mental Ability / NTSE Aptitude',
      duration: '10 Months Academic Session',
      fee: '₹42,000 / Year'
    },
    'cbse-boards': {
      title: 'Class 11 & 12 Science Board Excellence',
      badge: 'NCERT Centric • Concept Mastery',
      desc: 'Complete mastery over CBSE board theory, step-marking strategies, laboratory practical viva prep, and regular answer-writing feedback from ex-CBSE evaluators.',
      subjects: 'Physics, Chemistry, Mathematics / Biology, Board Answer Writing',
      duration: '10 Months per academic year',
      fee: '₹48,000 / Year'
    },
    'dropper-jee': {
      title: 'JEE Repeater / Dropper Rank Accelerator',
      badge: 'Fast Track Batch',
      desc: 'High-octane batch exclusively for 12th pass students. Rapid syllabus coverage, 10,000+ advanced questions, and individualized weak-area diagnosis with top mentors.',
      subjects: 'Full PCM Syllabus + 50 Full Length All-India Mock Tests',
      duration: '8 Months Intensive Program',
      fee: '₹72,000 Total Course'
    },
    'weekend-batch': {
      title: 'Weekend School Integrated Batch',
      badge: 'Convenient Timing',
      desc: 'Specially scheduled Saturday afternoon and Sunday morning batches designed for students attending regular day boarding schools who want supplementary premier coaching.',
      subjects: 'Physics, Chemistry, Mathematics / Biology, Recorded Backup',
      duration: 'Weekly 10 Hours of Live Lectures + Recorded Backup',
      fee: '₹45,000 / Year'
    }
  };

  function showToast(msg) {
    if (!toast) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Helper to construct and open WhatsApp URL
  function sendToWhatsApp(messageText) {
    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${APEX_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  }

  // Demo Modal Trigger
  openDemoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const coursePreselect = btn.getAttribute('data-course-name');
      if (coursePreselect && demoForm) {
        const selectBox = demoForm.querySelector('select[name="course"]');
        if (selectBox) {
          // If option exists select it, else set to nearest match or default
          for (let i = 0; i < selectBox.options.length; i++) {
            if (selectBox.options[i].text.includes(coursePreselect) || selectBox.options[i].value.includes(coursePreselect)) {
              selectBox.selectedIndex = i;
              break;
            }
          }
        }
      }
      demoModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeDemoBtn) {
    closeDemoBtn.addEventListener('click', () => {
      demoModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Course Details Modal
  openCourseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseKey = btn.getAttribute('data-course-key');
      const details = courseData[courseKey];
      if (details && courseModal) {
        modalCourseTitle.textContent = details.title;
        modalCourseBadge.textContent = details.badge;
        modalCourseDesc.textContent = details.desc;
        modalCourseSubjects.textContent = details.subjects;
        modalCourseDuration.textContent = details.duration;
        modalCourseFee.textContent = details.fee;

        modalEnrollNowBtn.onclick = () => {
          courseModal.classList.remove('open');
          // Open demo/enroll modal prefilled
          const selectBox = demoForm?.querySelector('select[name="course"]');
          if (selectBox) {
            for (let i = 0; i < selectBox.options.length; i++) {
              if (selectBox.options[i].text.includes(details.title) || selectBox.options[i].value.includes(details.title)) {
                selectBox.selectedIndex = i;
                break;
              }
            }
          }
          demoModal.classList.add('open');
        };

        courseModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeCourseBtn) {
    closeCourseBtn.addEventListener('click', () => {
      courseModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Modal backdrop click close
  [demoModal, courseModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Handle Demo Class Form Submission -> WhatsApp Redirect
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modalStudentName')?.value.trim() || 'Not specified';
      const phone = document.getElementById('modalPhone')?.value.trim() || 'Not specified';
      const course = document.getElementById('modalCourse')?.value || 'Not specified';
      const campus = document.getElementById('modalCampus')?.value || 'Not specified';
      const slot = document.getElementById('modalSlot')?.value || 'Not specified';

      const whatsappMsg = 
`*New Free Demo Class Booking — Apex Academy*
• *Name:* ${name}
• *Phone:* ${phone}
• *Course Interested:* ${course}
• *Preferred Campus:* ${campus}
• *Preferred Slot:* ${slot}

Hello, I want to book my 3-Day Free Demo Class with Apex Academy. Please confirm my schedule.`;

      demoModal.classList.remove('open');
      document.body.style.overflow = '';
      demoForm.reset();

      showToast('Opening WhatsApp to send your demo booking...');
      sendToWhatsApp(whatsappMsg);
    });
  }

  // Handle Main Enquiry / Contact Form Submission -> WhatsApp Redirect
  const mainEnquiryForm = document.getElementById('mainEnquiryForm');
  if (mainEnquiryForm) {
    mainEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('studentName')?.value.trim() || 'Not specified';
      const phone = document.getElementById('parentPhone')?.value.trim() || 'Not specified';
      const email = document.getElementById('studentEmail')?.value.trim() || 'N/A';
      const grade = document.getElementById('studentGrade')?.value || 'Not specified';
      const course = document.getElementById('targetExam')?.value || 'Not specified';
      const campus = document.getElementById('preferredCampus')?.value || 'Not specified';
      const message = document.getElementById('studentMessage')?.value.trim() || 'None';

      const whatsappMsg = 
`*New Enquiry — Apex Academy*
• *Name:* ${name}
• *Phone:* ${phone}
• *Email:* ${email}
• *Class/Grade:* ${grade}
• *Course Interested:* ${course}
• *Campus Preference:* ${campus}
• *Message:* ${message}

Hi Apex Academy, I submitted an enquiry on your website and want to know more about admission & fees.`;

      mainEnquiryForm.reset();
      showToast('Opening WhatsApp to send your enquiry...');
      sendToWhatsApp(whatsappMsg);
    });
  }
}

/* ==========================================================================
   12. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}
