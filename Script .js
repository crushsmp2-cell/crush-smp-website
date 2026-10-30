/* ===== Crush SMP — Script ===== */

// ===== Loading screen =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 1500);
});

// ===== Copy IP =====
function copyIP() {
  const ip = 'play.crushsmp.net';
  navigator.clipboard.writeText(ip).then(() => {
    showToast('✅ IP copied to clipboard!');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = ip;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✅ IP copied to clipboard!');
  });
}

// ===== Toast =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

// ===== Back to top =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Mobile menu toggle =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== Active nav link highlighting =====
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinksAll.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ===== Animated counters =====
function animateCounter(el, target) {
  let current = 0;
  const increment = target / 60;
  const update = () => {
    current += increment;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };
  update();
}

// ===== Intersection Observer for fade-in & counters =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        if (!el.dataset.animated) {
          el.dataset.animated = 'true';
          animateCounter(el, parseInt(el.dataset.target));
        }
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(s => {
  s.classList.add('fade-in');
  observer.observe(s);
});

// ===== Announcement bar =====
const announcementBar = document.getElementById('announcementBar');
const announcementClose = document.getElementById('announcementClose');
if (sessionStorage.getItem('announcementClosed')) {
  announcementBar.classList.add('hidden');
}
announcementClose.addEventListener('click', () => {
  announcementBar.classList.add('hidden');
  sessionStorage.setItem('announcementClosed', 'true');
});

// ===== FAQ accordion =====
function toggleFAQ(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== Instagram pop-up =====
const igPopup = document.getElementById('igPopup');
const popupClose = document.getElementById('popupClose');
const popupLater = document.getElementById('popupLater');

function showInstagramPopup() {
  igPopup.classList.add('active');
  sessionStorage.setItem('igPopupShown', 'true');
}
function closeInstagramPopup() {
  igPopup.classList.remove('active');
}

popupClose.addEventListener('click', closeInstagramPopup);
popupLater.addEventListener('click', closeInstagramPopup);
igPopup.addEventListener('click', (e) => {
  if (e.target === igPopup) closeInstagramPopup();
});

window.addEventListener('load', () => {
  if (!sessionStorage.getItem('igPopupShown')) {
    setTimeout(showInstagramPopup, 5000);
  }
});

// ===== Hero particles =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 10 + 8) + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
    particlesContainer.appendChild(p);
  }
}

// ===== Tilt effect on feature cards =====
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});