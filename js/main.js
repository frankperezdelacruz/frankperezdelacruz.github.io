/* ===================================================
   FRANK PORTFOLIO — main.js
   Matrix BG · Typing · Glitch · Scroll Reveal · Nav
   =================================================== */

'use strict';

// ─── MATRIX CANVAS ───────────────────────────────────
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;
  const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ#@!%&*';
  const FONT_SIZE = 14;
  const COLOR = '#00ff88';

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / FONT_SIZE);
    drops = new Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = COLOR;
    ctx.font = FONT_SIZE + 'px Share Tech Mono, monospace';
    for (let i = 0; i < cols; i++) {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(ch, i * FONT_SIZE, drops[i] * FONT_SIZE);
      if (drops[i] * FONT_SIZE > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();


// ─── TYPING EFFECT ───────────────────────────────────
(function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const phrases = [
    'Ingeniero de Sistemas',
    'Analista de Datos',
    'Desarrollador Web',
    'Entusiasta de la IA',
    'Problem Solver',
  ];
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const current = phrases[pi];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 100);
  }
  setTimeout(tick, 1500);
})();


// ─── NAVBAR SCROLL + ACTIVE LINK ─────────────────────
(function initNav() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Scroll class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActive();
  }, { passive: true });

  // Active link on scroll
  function updateActive() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  // Hamburger toggle
  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks && navLinks.addEventListener('click', e => {
    if (e.target.classList.contains('nav-link')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
})();


// ─── SCROLL REVEAL ───────────────────────────────────
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children
          const card = entry.target;
          const delay = card.dataset.delay || 0;
          setTimeout(() => {
            card.classList.add('visible');
          }, delay);
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Add stagger delay to grid children
  document.querySelectorAll('.skills-grid, .projects-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.dataset.delay = i * 80;
    });
  });

  revealEls.forEach(el => observer.observe(el));
})();


// ─── SKILL BARS ──────────────────────────────────────
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level || 0;
          setTimeout(() => { bar.style.width = level + '%'; }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach(b => observer.observe(b));
})();


// ─── CONTACT FORM ────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('form-submit');
    const originalText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = 'Mensaje Enviado ✓';
    btn.style.background = 'var(--neon)';
    btn.style.color = 'var(--bg-primary)';
    btn.disabled = true;
    form.reset();
    setTimeout(() => {
      btn.querySelector('span').textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 3000);
  });
})();


// ─── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ─── NEON CURSOR TRAIL ───────────────────────────────
(function initCursorTrail() {
  const trail = [];
  const MAX = 12;
  for (let i = 0; i < MAX; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;pointer-events:none;z-index:9998;
      width:${6 - i * 0.3}px;height:${6 - i * 0.3}px;
      border-radius:50%;background:rgba(0,255,136,${0.5 - i * 0.04});
      transition:transform 0.05s;mix-blend-mode:screen;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mx = 0, my = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animate() {
    let px = mx, py = my;
    trail.forEach((t, i) => {
      t.x += (px - t.x) * 0.3;
      t.y += (py - t.y) * 0.3;
      t.el.style.left = t.x - 3 + 'px';
      t.el.style.top  = t.y - 3 + 'px';
      px = t.x; py = t.y;
    });
    requestAnimationFrame(animate);
  })();
})();
