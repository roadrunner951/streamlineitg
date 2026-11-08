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
