/* ==========================================================================
   NULL ZONE — Interaction scripts (vanilla JavaScript)
   ========================================================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------------
  // Mobile navigation toggle
  // ------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      mainNav.style.display = isExpanded ? 'none' : 'block';
    });
  }

  // ------------------------------------------------------------------
  // Smooth-scroll for in-page anchor links
  // ------------------------------------------------------------------
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        const headerHeight = document.getElementById('header').offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 1.5;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        // Close mobile menu if open
        if (mainNav && navToggle) {
          mainNav.style.display = 'none';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // ------------------------------------------------------------------
  // Filterable archive
  // ------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const setCards = document.querySelectorAll('.set-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(function (b) {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('filter-btn--active');
      this.setAttribute('aria-pressed', 'true');

      // Show/hide cards
      setCards.forEach(function (card) {
        const matches = filter === 'all' || card.getAttribute('data-genre') === filter;
        if (matches) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // ------------------------------------------------------------------
  // Archive set play toggle (simulated playback)
  // ------------------------------------------------------------------
  const playButtons = document.querySelectorAll('.set-play');

  playButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = this.closest('.set-card');
      const isPlaying = card.classList.toggle('is-playing');

      // Toggle button label
      this.textContent = isPlaying ? '■' : '▶';
      this.setAttribute('aria-label', isPlaying
        ? 'Stop ' + card.querySelector('.set-title').textContent + ' set'
        : 'Play ' + card.querySelector('.set-title').textContent + ' set');
    });
  });

  // ------------------------------------------------------------------
  // Sticky header border emphasis on scroll (subtle detail)
  // ------------------------------------------------------------------
  const header = document.getElementById('header');
  let lastScrollY = window.pageYOffset;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.pageYOffset;
    if (currentScrollY > 0 && currentScrollY > lastScrollY) {
      header.style.borderBottomColor = 'var(--accent)';
    } else if (currentScrollY <= lastScrollY) {
      header.style.borderBottomColor = 'var(--border)';
    }
    lastScrollY = currentScrollY;
  });
})();
