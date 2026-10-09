const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const pageButtons = document.querySelectorAll('.primary-btn, .secondary-btn, .header-button, .search-button, .card-footer button');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    const buttonState = isOpen ? 'Close menu' : 'Open menu';
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', buttonState);
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      menuToggle.textContent = '☰';
    });
  });
}

function showPrototypeMessage(message) {
  let notice = document.querySelector('.prototype-notice');

  if (!notice) {
    notice = document.createElement('div');
    notice.className = 'prototype-notice';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    document.body.appendChild(notice);
  }

  notice.textContent = message;
  notice.classList.add('notice-visible');

  window.clearTimeout(showPrototypeMessage.timer);
  showPrototypeMessage.timer = window.setTimeout(() => {
    notice.classList.remove('notice-visible');
  }, 2600);
}

pageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const text = button.textContent.trim();

    if (button.classList.contains('header-button')) {
      showPrototypeMessage('The sign-in flow is available in the prototype demo.');
      return;
    }

    if (button.closest('.search-button')) {
      showPrototypeMessage('Search is ready for the next prototype iteration.');
      return;
    }

    if (button.closest('.card-footer')) {
      showPrototypeMessage('This offer detail view is part of the next demo step.');
      return;
    }

    if (text.toLowerCase().includes('build')) {
      showPrototypeMessage('Your journey builder is coming next.');
      return;
    }

    if (text.toLowerCase().includes('explore')) {
      showPrototypeMessage('View more Africa experiences in the next prototype stage.');
      return;
    }

    showPrototypeMessage('This prototype action is intentionally demo-only.');
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  const targetId = link.getAttribute('href');
  if (!targetId || targetId === '#') return;

  link.addEventListener('click', (event) => {
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
