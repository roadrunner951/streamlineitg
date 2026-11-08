// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal for cards and section headings
const revealEls = document.querySelectorAll('.section-head, .card, .steps li, .stats div, .about > div:first-child, .contact-copy, .contact-form');
if ('IntersectionObserver' in window) {
  revealEls.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// Cursor-following glow on service cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: GitHub Pages is static, so this opens the visitor's email client.
// To receive submissions directly, swap in a form service (e.g. Formspree) later.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  const name = d.get('name').trim();
  const email = d.get('email').trim();
  const message = d.get('message').trim();
  if (!name || !email || !message || !form.email.checkValidity()) {
    status.textContent = 'Please fill in your name, a valid email, and a message.';
    status.className = 'form-status error';
    return;
  }
  const subject = `Assessment request: ${d.get('interest')}`;
  const body = `Name: ${name}\nCompany: ${d.get('company')}\nEmail: ${email}\nInterest: ${d.get('interest')}\n\n${message}`;
  window.location.href = `mailto:rreyes@streamlineitg.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Opening your email app… If nothing happens, email rreyes@streamlineitg.com or call (951) 703-0411.';
  status.className = 'form-status';
});
