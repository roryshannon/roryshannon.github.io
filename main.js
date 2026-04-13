/* ============================================================
   RORY SHANNON — MAIN JS
   Custom cursor, typing, scroll reveals, counter, konami, clock
   ============================================================ */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
let mx = -100, my = -100, tx = -100, ty = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// Trail follows with lag
function animateTrail() {
  tx += (mx - tx) * 0.15;
  ty += (my - ty) * 0.15;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor grow on interactive elements
document.querySelectorAll('a, button, .stat-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ---- LIVE CLOCK ----
const clockEl = document.getElementById('clock');
function updateClock() {
  clockEl.textContent = new Date().toLocaleTimeString('en-GB');
}
updateClock();
setInterval(updateClock, 1000);

// ---- TYPING ANIMATION ----
const commands = [
  'whoami',
  'cat about.txt',
  'ls projects/',
  'git log --oneline',
  'npm run build',
  'ssh rorybshannon.co.uk',
];
let cmdIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-command');

function typeLoop() {
  const cmd = commands[cmdIdx];
  if (!isDeleting) {
    typedEl.textContent = cmd.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === cmd.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = cmd.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      cmdIdx = (cmdIdx + 1) % commands.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 45 : 90);
}
setTimeout(typeLoop, 1000);

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- COUNTER ANIMATION ----
const targets = {
  0: 12,    // projects shipped — update these!
  1: 847,   // coffees
  2: 3,     // admitted bugs
  3: 94,    // routes climbed
};

function animateCounter(el, target) {
  let current = 0;
  const step = Math.max(1, Math.floor(target / 50));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 30);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-num');
      nums.forEach((num, i) => {
        animateCounter(num, targets[i] ?? 0);
      });
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

// ---- GLITCH HERO NAME on hover ----
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.style.animationPlayState = 'running';
  });
}

// ---- KONAMI CODE ----
const konamiSequence = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];
let konamiIdx = 0;

document.addEventListener('keydown', e => {
  if (e.key === konamiSequence[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konamiSequence.length) {
      document.getElementById('konami-overlay').classList.add('active');
      konamiIdx = 0;
    }
  } else {
    konamiIdx = e.key === konamiSequence[0] ? 1 : 0;
  }
});

// Show hint after 30s of inactivity (easter egg discovery)
let idleTimer = setTimeout(() => {
  const hint = document.getElementById('konami-hint');
  if (hint) {
    hint.style.opacity = '0.3';
    hint.style.transition = 'opacity 2s';
  }
}, 30000);
document.addEventListener('mousemove', () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    const hint = document.getElementById('konami-hint');
    if (hint) hint.style.opacity = '0.3';
  }, 30000);
});

// ---- NAV scroll style ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(10,10,10,0.96)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.95), transparent)';
  }
});

// ---- PARALLAX hero bg text ----
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBgText) {
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px))`;
  }
}, { passive: true });
