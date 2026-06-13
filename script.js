// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // back to top button
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ===== Mobile menu toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== Typed text effect =====
const typedSpan = document.getElementById('typed');
const roles = [
  "Data Science Enthusiast",
  "Python & SQL Developer",
  "Aspiring Data Analyst",
  "Backend Development Learner"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedSpan.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    typedSpan.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 40 : 90;
  setTimeout(typeLoop, speed);
}
typeLoop();

// ===== Scroll reveal animations =====
const revealEls = document.querySelectorAll(
  '.section-title, .about-text, .about-stats .stat-card, .skill-category, .timeline-item, .project-card, .edu-card, .achieve-card, .contact-info, .contact-form'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      // trigger skill bar fill animation
      if (entry.target.classList.contains('skill-category')) {
        entry.target.querySelectorAll('.fill').forEach(fill => {
          const width = fill.getAttribute('data-width');
          fill.style.width = width + '%';
        });
      }

      // trigger counters
      if (entry.target.classList.contains('stat-card')) {
        animateCounter(entry.target.querySelector('.counter'));
      }

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealEls.forEach(el => observer.observe(el));

// ===== Counter animation =====
function animateCounter(el) {
  if (!el) return;
  const target = +el.getAttribute('data-target');
  const duration = 1500;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + (target >= 1000 ? '+' : (target === 20 ? '%' : '+'));
      if (target === 3) el.textContent = target; // small counts stay plain
    }
  }
  requestAnimationFrame(update);
}

// ===== Contact form (front-end only) =====
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please fill in all fields.";
    formNote.style.color = "#ef4444";
    return;
  }

  // Since this is a static site, open a mailto with the message pre-filled
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
  window.location.href = `mailto:yukthagullapalli@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = "Opening your email client...";
  formNote.style.color = "#06b6d4";
  contactForm.reset();
});

// ===== Back to top =====
const backToTop = document.getElementById('back-to-top');

// ===== Current year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();
