(function () {
  'use strict';

  const carousel = document.querySelector('[data-hero-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('[data-hero-slide]'));
  const indicators = carousel.querySelector('[data-hero-indicators]');
  if (slides.length === 0 || !indicators) {
    console.error('Carousel hero Karya RBM tidak dapat diinisialisasi: slide atau indikator tidak ditemukan.');
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 4500;
  let activeIndex = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
  let timer = null;
  let isPaused = false;

  const indicatorButtons = slides.map((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'karya-hero__indicator';
    button.setAttribute('aria-label', `Tampilkan gambar ${index + 1} dari ${slides.length}`);
    button.setAttribute('aria-controls', slide.id || `karya-hero-slide-${index + 1}`);
    button.setAttribute('aria-current', String(index === activeIndex));
    if (!slide.id) slide.id = `karya-hero-slide-${index + 1}`;
    button.addEventListener('click', () => showSlide(index, true));
    button.addEventListener('keydown', event => {
      let nextIndex = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (activeIndex + 1) % slides.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (activeIndex - 1 + slides.length) % slides.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = slides.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      showSlide(nextIndex, true);
      indicatorButtons[nextIndex].focus();
    });
    indicators.append(button);
    return button;
  });

  function showSlide(index, restartTimer) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      indicatorButtons[slideIndex].setAttribute('aria-current', String(active));
      indicatorButtons[slideIndex].tabIndex = active ? 0 : -1;
    });
    if (restartTimer) startTimer();
  }

  function stopTimer() {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  }

  function startTimer() {
    stopTimer();
    if (slides.length < 2 || reducedMotion.matches || isPaused) return;
    timer = window.setInterval(() => showSlide(activeIndex + 1, false), interval);
  }

  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
    stopTimer();
  });
  carousel.addEventListener('mouseleave', () => {
    isPaused = false;
    startTimer();
  });
  carousel.addEventListener('focusin', () => {
    isPaused = true;
    stopTimer();
  });
  carousel.addEventListener('focusout', event => {
    if (carousel.contains(event.relatedTarget)) return;
    isPaused = false;
    startTimer();
  });
  reducedMotion.addEventListener('change', startTimer);

  showSlide(activeIndex, false);
  startTimer();
})();
