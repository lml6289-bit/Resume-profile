// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle with persistence
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') body.classList.add('dark');

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Progress bar animation (fill on load)
  function animateProgressBars() {
    const bars = document.querySelectorAll('.progress');
    bars.forEach(bar => {
      const percent = parseInt(bar.getAttribute('data-percent') || '0', 10);
      const fill = bar.querySelector('.progress-fill');
      // delay by a small random amount for nicer staggered animation
      setTimeout(() => {
        fill.style.width = percent + '%';
      }, 150 + Math.random() * 300);
    });
  }
  animateProgressBars();

  // Experience list click -> toast
  const toast = document.getElementById('toast');
  function showToast(message) {
    toast.textContent = message;
    toast.setAttribute('aria-hidden', 'false');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 3000);
  }

  const jobs = document.querySelectorAll('.job');
  jobs.forEach(job => {
    job.addEventListener('click', () => {
      const company = job.dataset.company || 'that employer';
      showToast(`Learn more about my role at ${company}`);
    });
    job.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        job.click();
      }
    });
  });

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  function validateEmail(email) {
    // simple regex for validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('formSuccess').textContent = '';

    if (!nameInput.value.trim()) {
      valid = false;
      document.getElementById('nameError').textContent = 'Please enter your name.';
    }

    if (!validateEmail(emailInput.value.trim())) {
      valid = false;
      document.getElementById('emailError').textContent = 'Please enter a valid email.';
    }

    if (messageInput.value.trim().length < 10) {
      valid = false;
      document.getElementById('messageError').textContent = 'Message must be at least 10 characters.';
    }

    if (!valid) return;

    // success
    alert('Message sent successfully!');
    contactForm.reset();
    document.getElementById('formSuccess').textContent = 'Message sent successfully!';
  });

  // Download webpage as PDF using html2pdf.js
  const downloadBtn = document.getElementById('downloadPdf');
  downloadBtn.addEventListener('click', () => {
    // Configure options
    const opt = {
      margin:       0.4,
      filename:     'Lucas_Langone_Resume_Webpage.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 1.5, logging: false, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // use the container element to render
    const element = document.querySelector('main');
    html2pdf().set(opt).from(element).save();
  });

  // Accessibility nicety: enable keyboard focus ring on keyboard navigation only
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
});