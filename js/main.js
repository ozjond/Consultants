// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });
}

// Contact form — submits to Formspree
// Sign up at formspree.io, create a form, then replace YOUR_FORM_ID
// in contact.html with your actual form ID (e.g. xrgvkpqn)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type=submit]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        const success = document.getElementById('form-success');
        if (success) success.style.display = 'block';
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong.';
        alert(msg + '\n\nYou can also reach us at info@heartandsolgroup.com');
        btn.textContent = originalText;
        btn.disabled = false;
      }
    } catch {
      alert('Could not send — please email us directly at info@heartandsolgroup.com');
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}
