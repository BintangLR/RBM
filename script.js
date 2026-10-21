// =====================================================
// RBM TORAJA — Global Script
// Runs after components.js has injected header/footer
// =====================================================

// ── Fade-in CSS (injected early) ───────────────────
(function injectFadeCSS() {
  const s = document.createElement('style');
  s.textContent = '.fade-in{opacity:0;transform:translateY(18px);transition:opacity .5s ease,transform .5s ease}.fade-in.visible{opacity:1;transform:none}';
  document.head.appendChild(s);
})();

// ── All DOM-dependent logic runs after DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const learningVideoSources = [
    'assets/video/One-day-in-SnapYT.App.mp4',
    'assets/video/videoo2.mp4',
    'assets/video/videoo3.mp4'
  ];

  document.querySelectorAll('.story-carousel, .service-carousel').forEach(horizontalCarousel => {
    horizontalCarousel.addEventListener('wheel', event => {
      const maxScroll = horizontalCarousel.scrollWidth - horizontalCarousel.clientWidth;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || maxScroll <= 0) return;
      if ((horizontalCarousel.scrollLeft <= 0 && event.deltaY < 0)
        || (horizontalCarousel.scrollLeft >= maxScroll && event.deltaY > 0)) return;

      event.preventDefault();
      horizontalCarousel.scrollLeft = Math.max(0, Math.min(maxScroll, horizontalCarousel.scrollLeft + event.deltaY));
    }, { passive: false });
  });

  const learningCarousel = document.querySelector('.learn-video-carousel');
  if (learningCarousel) {
    const cards = [...learningCarousel.querySelectorAll('.learn-video-card')];
    const dots = learningCarousel.parentElement.querySelector('.learn-video-carousel__dots');
    const buttons = learningCarousel.parentElement.querySelectorAll('[data-carousel-direction]');
    const players = cards.map(card => card.querySelector('.learn-video__player'));
    let activeIndex = 0;

    players.forEach((player, index) => {
      const source = player?.querySelector('source');
      if (!source || !learningVideoSources[index]) return;
      source.src = learningVideoSources[index];
      player.load();
    });

    const updateControls = () => {
      const maxScroll = learningCarousel.scrollWidth - learningCarousel.clientWidth;
      const slideStep = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : learningCarousel.clientWidth;
      activeIndex = maxScroll > 0
        ? Math.round(learningCarousel.scrollLeft / slideStep)
        : 0;
      activeIndex = Math.max(0, Math.min(cards.length - 1, activeIndex));
      dots?.querySelectorAll('.learn-video-carousel__dot').forEach((dot, index) => {
        dot.classList.toggle('is-active', index === activeIndex);
        dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
      });
      buttons.forEach(button => {
        button.disabled = button.dataset.carouselDirection === 'prev' ? activeIndex === 0 : activeIndex === cards.length - 1;
      });
    };

    cards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'learn-video-carousel__dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Tampilkan video ${index + 1}`);
      dot.addEventListener('click', () => cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }));
      dots?.append(dot);
    });

    buttons.forEach(button => button.addEventListener('click', () => {
      const offset = button.dataset.carouselDirection === 'next' ? 1 : -1;
      cards[Math.max(0, Math.min(cards.length - 1, activeIndex + offset))]
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }));
    learningCarousel.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
  }

  document.querySelectorAll('.learn-video').forEach((video, index) => {
    const player = video.querySelector('.learn-video__player');
    const playButton = video.querySelector('.learn-video__play');

    if (!player || !playButton) return;

    player.addEventListener('playing', () => {
      playButton.hidden = true;
      document.querySelectorAll('.learn-video__player').forEach(otherPlayer => {
        if (otherPlayer !== player) otherPlayer.pause();
      });
    });
    player.addEventListener('pause', () => {
      playButton.hidden = false;
    });
    player.addEventListener('ended', () => {
      playButton.hidden = false;
    });
    player.addEventListener('error', () => {
      playButton.hidden = false;
    });

    playButton.addEventListener('click', () => {
      player.play().catch(error => {
        playButton.hidden = false;
        console.error('Video Pusat Belajar gagal diputar:', error);
      });
    });

    if (index === 0) {
      player.muted = true;
      player.autoplay = true;
      player.play().catch(() => {
        // Browser dapat menolak autoplay; tombol putar tetap tersedia.
      });
    }
  });

  // ── FAQ Accordion (accessible, one-open-at-a-time) ──
  function initFAQAccordion() {
    if (typeof window.RBM_initFAQ === 'function') {
      window.RBM_initFAQ();
    }
  }
  initFAQAccordion();

  // ── Tab Navigation ────────────────────────────────
  document.querySelectorAll('.tab-nav').forEach(nav => {
    nav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        if (target) {
          const parent = nav.closest('[data-tabs]') || document;
          parent.querySelectorAll('[data-tab-panel]').forEach(p => {
            p.hidden = p.dataset.tabPanel !== target;
          });
        }
      });
    });
  });

  // ── Karya / Product Category Filter ──────────────
  // (cerita.html uses its own inline script; this handles karya-rbm.html)
  document.querySelectorAll('[data-filterable]').forEach(grid => {
    const navEl = document.querySelector('.cat-nav');
    if (!navEl) return;
    navEl.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        navEl.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.dataset.cat;
        grid.querySelectorAll('[data-cat]').forEach(item => {
          item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  });

  // ── Donation Amount Selector ──────────────────────
  document.querySelectorAll('.donate-amounts').forEach(amounts => {
    amounts.querySelectorAll('.donate-amt').forEach(btn => {
      btn.addEventListener('click', () => {
        amounts.querySelectorAll('.donate-amt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const input = document.querySelector('#donate-custom');
        if (input) {
          const val = btn.dataset.amount;
          input.value = val === 'custom' ? '' : val;
        }
      });
    });
  });

  // ── Layanan Page — Pill Scroll Nav ───────────────
  document.querySelectorAll('.service-nav-pill[data-target]').forEach(pill => {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.service-nav-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const target = document.getElementById(this.dataset.target);
      if (target) {
        const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Contact Form ──────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const requestType = contactForm.elements.namedItem('keperluan');
    const guidance = document.getElementById('contact-form-guidance');
    const status = document.getElementById('contact-form-status');
    const submitButton = contactForm.querySelector('[type="submit"]');
    const guidanceMessages = {
      pertanyaan: 'Apakah Anda ingin bertanya tentang layanan atau kegiatan RBM Toraja? Kirimkan pertanyaan Anda melalui formulir ini.',
      'informasi-layanan': 'Apakah Anda ingin bertanya tentang layanan atau kegiatan RBM Toraja? Kirimkan pertanyaan Anda melalui formulir ini.',
      donasi: 'Apakah Anda ingin mendukung program RBM Toraja melalui donasi? Silakan sampaikan pertanyaan atau rencana dukungan Anda.',
      relawan: 'Apakah Anda berminat menjadi relawan RBM Toraja? Silakan kirimkan data Anda melalui formulir ini.',
      kemitraan: 'Apakah Anda ingin bekerja sama dengan RBM Toraja? Kami terbuka untuk menjalin kemitraan yang berdampak positif.',
      default: 'Silakan jelaskan kebutuhan Anda melalui formulir ini.'
    };
    const confirmationMessages = {
      pertanyaan: 'Pertanyaan Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.',
      'informasi-layanan': 'Pertanyaan Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.',
      donasi: 'Pengajuan donasi Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.',
      relawan: 'Permintaan relawan Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.',
      kemitraan: 'Pengajuan kemitraan Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.',
      default: 'Pesan Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.'
    };
    const contactTranslations = {
      'Apakah Anda ingin bertanya tentang layanan atau kegiatan RBM Toraja? Kirimkan pertanyaan Anda melalui formulir ini.': 'Do you have a question about RBM Toraja services or activities? Send it using this form.',
      'Apakah Anda ingin mendukung program RBM Toraja melalui donasi? Silakan sampaikan pertanyaan atau rencana dukungan Anda.': 'Would you like to support RBM Toraja through a donation? Please share your question or offer of support.',
      'Apakah Anda berminat menjadi relawan RBM Toraja? Silakan kirimkan data Anda melalui formulir ini.': 'Interested in volunteering with RBM Toraja? Please submit your details using this form.',
      'Apakah Anda ingin bekerja sama dengan RBM Toraja? Kami terbuka untuk menjalin kemitraan yang berdampak positif.': 'Would you like to partner with RBM Toraja? We welcome partnerships that make a positive impact.',
      'Silakan jelaskan kebutuhan Anda melalui formulir ini.': 'Please describe what you need using this form.',
      'Pertanyaan Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.': 'Your question has been forwarded to RBM Toraja’s email service. Our team will follow up.',
      'Pengajuan donasi Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.': 'Your donation inquiry has been forwarded to RBM Toraja’s email service. Our team will follow up.',
      'Permintaan relawan Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.': 'Your volunteer request has been forwarded to RBM Toraja’s email service. Our team will follow up.',
      'Pengajuan kemitraan Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.': 'Your partnership request has been forwarded to RBM Toraja’s email service. Our team will follow up.',
      'Pesan Anda telah diteruskan ke layanan email RBM Toraja. Tim kami akan menindaklanjutinya.': 'Your message has been forwarded to RBM Toraja’s email service. Our team will follow up.',
      'Mengirim pesan ke RBM Toraja...': 'Sending your message to RBM Toraja...',
      'Layanan email belum siap. Silakan coba kembali nanti atau hubungi RBM Toraja melalui email.': 'The email service is not ready yet. Please try again later or contact RBM Toraja by email.',
      'Subjek wajib diisi dan maksimal 160 karakter.': 'A subject is required and must be no longer than 160 characters.',
      'Pengiriman email gagal. Silakan coba lagi beberapa saat lagi atau hubungi RBM Toraja melalui email.': 'Email submission failed. Please try again shortly or contact RBM Toraja by email.',
      'Layanan email belum siap. Pengelola perlu mengatur RESEND_API_KEY dan RESEND_FROM_EMAIL di environment backend.': 'The email service is not ready. The site administrator must configure RESEND_API_KEY and RESEND_FROM_EMAIL in the backend environment.',
      'Pengiriman email gagal karena layanan email tidak dapat dijangkau. Silakan coba kembali nanti.': 'Email submission failed because the email service could not be reached. Please try again later.',
      'Layanan email menolak pengiriman. Pengelola perlu memeriksa konfigurasi Resend.': 'The email service rejected the request. The site administrator must check the Resend configuration.'
    };
    const language = () => document.documentElement.lang === 'en' ? 'en' : 'id';

    function updateGuidance() {
      if (!guidance || !requestType) return;
      const type = requestType.value;
      const message = guidanceMessages[type] || guidanceMessages.default;
      guidance.textContent = language() === 'en' ? contactTranslations[message] || message : message;
    }

    function showStatus(message, state) {
      if (!status) return;
      status.dataset.originalMessage = message;
      status.textContent = language() === 'en' ? contactTranslations[message] || message : message;
      status.dataset.state = state;
    }

    requestType.addEventListener('change', () => {
      updateGuidance();
      if (status) {
        status.textContent = '';
        delete status.dataset.state;
        delete status.dataset.originalMessage;
      }
    });
    updateGuidance();
    window.addEventListener('rbm:languagechange', () => {
      updateGuidance();
      if (status && status.dataset.originalMessage) {
        showStatus(status.dataset.originalMessage, status.dataset.state);
      }
    });

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!this.reportValidity()) return;

      const selectedType = requestType.value;
      const payload = Object.fromEntries(new FormData(this).entries());
      if (submitButton) submitButton.disabled = true;
      this.setAttribute('aria-busy', 'true');
      showStatus('Mengirim pesan ke RBM Toraja...', 'pending');

      try {
        const response = await fetch(this.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!response.ok || result.ok !== true) {
          showStatus(result.error || 'Pengiriman email gagal. Silakan coba lagi beberapa saat lagi atau hubungi RBM Toraja melalui email.', 'error');
          return;
        }

        showStatus(confirmationMessages[selectedType] || confirmationMessages.default, 'success');
        this.reset();
        updateGuidance();
      } catch (error) {
        console.error('Pengiriman formulir kontak gagal:', error);
        showStatus('Pengiriman email gagal. Silakan coba lagi beberapa saat lagi atau hubungi RBM Toraja melalui email.', 'error');
      } finally {
        this.removeAttribute('aria-busy');
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  // ── Scroll-triggered Fade In ──────────────────────
  function initFadeIn() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = document.querySelectorAll('.fade-in:not(.visible)');
    if (!els.length || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    els.forEach(el => obs.observe(el));
  }
  initFadeIn();

  // Re-run fade-in when new content is injected (for dynamic pages)
  window.RBM_initFadeIn = initFadeIn;

  // Ensure FAQ initializes immediately on static pages too.
  initFAQAccordion();

  // ── Sidebar Smooth Nav Highlight ─────────────────
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
  if (sidebarLinks.length) {
    const sections = Array.from(sidebarLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          sidebarLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    sections.forEach(s => io.observe(s));
  }

  // ── Hero Slideshow (Homepage) ─────────────────────
  const heroSlideshow = document.getElementById('hero-slideshow');
  if (heroSlideshow) {
    const slides = heroSlideshow.querySelectorAll('.hero-slide');
    const dots = heroSlideshow.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let slideTimer = null;
    let transitionRequest = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const homeHero = heroSlideshow.closest('.home-hero');
    let heroInView = false;
    let heroIntroComplete = false;

    if (homeHero) {
      if (reducedMotion) {
        homeHero.classList.add('hero-motion-complete');
        heroInView = true;
      } else {
        homeHero.classList.add('hero-motion-pending');
        const heroObserver = new IntersectionObserver(entries => {
          const entry = entries[0];
          if (!entry?.isIntersecting) return;

          heroInView = true;
          const completeHeroIntro = () => {
            if (heroIntroComplete) return;
            heroIntroComplete = true;
            homeHero.classList.remove('hero-motion-active');
            homeHero.classList.add('hero-motion-complete');
          };

          heroSlideshow.addEventListener('animationend', event => {
            if (event.animationName === 'hero-photo-in') completeHeroIntro();
          }, { once: true });

          homeHero.classList.remove('hero-motion-pending');
          homeHero.classList.add('hero-motion-active');
          heroObserver.unobserve(homeHero);
          heroObserver.disconnect();
          // Keep the intro state alive until the SVG trace has completed.
          window.setTimeout(completeHeroIntro, 2800);
        }, { threshold: 0.25 });

        heroObserver.observe(homeHero);
      }
    }

    // Shift only the decorative background by a few pixels during scroll.
    if (homeHero && !reducedMotion) {
      let parallaxFrame = null;

      const updateHeroParallax = () => {
        parallaxFrame = null;
        if (!heroInView) return;
        const bounds = homeHero.getBoundingClientRect();
        const progress = (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height);
        const shift = Math.max(-6, Math.min(6, (progress - 0.5) * -8));
        homeHero.style.setProperty('--hero-bg-shift', `${shift.toFixed(2)}px`);
      };

      const requestHeroParallax = () => {
        if (parallaxFrame === null) parallaxFrame = window.requestAnimationFrame(updateHeroParallax);
      };

      window.addEventListener('scroll', requestHeroParallax, { passive: true });
      window.addEventListener('resize', requestHeroParallax);
      requestHeroParallax();
    }

    // Warm the next images before they become visible, so the crossfade never
    // reveals an unloaded frame. The existing image elements remain in place.
    function preloadSlide(index) {
      const image = slides[index]?.querySelector('img');
      if (!image || image.dataset.heroReady === 'true') return Promise.resolve();

      image.dataset.heroReady = 'loading';
      image.loading = 'eager';
      const ready = image.complete
        ? Promise.resolve()
        : new Promise(resolve => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });

      return ready.then(() => {
        const decoded = typeof image.decode === 'function' ? image.decode() : Promise.resolve();
        return decoded.catch(() => undefined).then(() => {
          image.dataset.heroReady = 'true';
        });
      });
    }

    function goToSlide(index) {
      if (index === currentSlide || !slides.length) return;
      const nextSlide = (index + slides.length) % slides.length;
      const request = ++transitionRequest;

      preloadSlide(nextSlide).then(() => {
        if (request !== transitionRequest) return;

        slides[currentSlide].classList.remove('is-active');
        slides[currentSlide].setAttribute('aria-hidden', 'true');
        if (dots[currentSlide]) {
          dots[currentSlide].classList.remove('is-active');
          dots[currentSlide].setAttribute('aria-selected', 'false');
        }

        currentSlide = nextSlide;
        slides[currentSlide].classList.add('is-active');
        slides[currentSlide].setAttribute('aria-hidden', 'false');
        if (dots[currentSlide]) {
          dots[currentSlide].classList.add('is-active');
          dots[currentSlide].setAttribute('aria-selected', 'true');
        }

        preloadSlide((currentSlide + 1) % slides.length);
      });
    }

    function startTimer() {
      if (reducedMotion || slides.length <= 1) return;
      stopTimer();
      slideTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 6000);
    }

    function stopTimer() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startTimer();
      });
    });

    preloadSlide(0);
    preloadSlide(1 % slides.length);

    heroSlideshow.addEventListener('mouseenter', stopTimer);
    heroSlideshow.addEventListener('mouseleave', startTimer);
    heroSlideshow.addEventListener('focusin', stopTimer);
    heroSlideshow.addEventListener('focusout', startTimer);

    startTimer();
  }

});
