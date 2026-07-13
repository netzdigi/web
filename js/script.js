// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal, staggered per group so grids cascade in
const revealGroups = new Map();
document.querySelectorAll('.reveal').forEach(el => {
  const parent = el.parentElement;
  const index = revealGroups.get(parent) || 0;
  if (!prefersReducedMotion) {
    el.style.setProperty('--reveal-delay', `${Math.min(index * 0.08, 0.4)}s`);
  }
  revealGroups.set(parent, index + 1);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Header glass state + hero parallax
const header = document.getElementById('header');
const heroGlow1 = document.querySelector('.hero-glow-1');
const heroGlow2 = document.querySelector('.hero-glow-2');
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 8);

  if (!prefersReducedMotion && heroGlow1 && heroGlow2) {
    heroGlow1.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
    heroGlow2.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

onScroll();

// Lead funnel
const funnel = document.getElementById('funnel');
if (funnel) {
  const steps = Array.from(funnel.querySelectorAll('.funnel-step'));
  const totalSteps = steps.length;
  const progressBar = document.getElementById('funnelProgressBar');
  const stepLabel = document.getElementById('funnelStepLabel');
  const backBtn = document.getElementById('funnelBack');
  const nextBtn = document.getElementById('funnelNext');
  const funnelHint = document.getElementById('funnelHint');
  const answers = {};
  let current = 0;

  function updateNextState() {
    const step = steps[current];
    const group = step.querySelector('.funnel-options');
    if (group) {
      nextBtn.disabled = !group.querySelector('.is-selected');
    } else {
      const name = step.querySelector('#funnelName');
      const email = step.querySelector('#funnelEmail');
      nextBtn.disabled = !(name.value.trim() && email.value.trim());
    }
  }

  function updateStep() {
    steps.forEach((s, i) => s.classList.toggle('is-active', i === current));
    progressBar.style.width = `${((current + 1) / totalSteps) * 100}%`;
    stepLabel.textContent = `Стъпка ${current + 1} от ${totalSteps}`;
    backBtn.classList.toggle('is-hidden', current === 0);
    nextBtn.textContent = current === totalSteps - 1 ? 'Изпрати' : 'Напред';
    updateNextState();
  }

  steps.forEach(step => {
    const group = step.querySelector('.funnel-options');
    if (group) {
      group.querySelectorAll('.funnel-option').forEach(opt => {
        opt.addEventListener('click', () => {
          group.querySelectorAll('.funnel-option').forEach(o => o.classList.remove('is-selected'));
          opt.classList.add('is-selected');
          answers[group.dataset.group] = opt.textContent;
          updateNextState();
        });
      });
    }
    step.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', updateNextState);
    });
  });

  backBtn.addEventListener('click', () => {
    if (current > 0) {
      current--;
      updateStep();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (current < totalSteps - 1) {
      current++;
      updateStep();
      return;
    }

    const name = document.getElementById('funnelName').value.trim();
    const company = document.getElementById('funnelCompany').value.trim();
    const email = document.getElementById('funnelEmail').value.trim();

    const subject = `Заявка за оценка от ${name}`;
    const bodyLines = [
      `Име: ${name}`,
      company ? `Фирма: ${company}` : null,
      `Имейл: ${email}`,
      '',
      `Тип бизнес: ${answers.business || '-'}`,
      `Уебсайт в момента: ${answers.website || '-'}`,
      `Основна нужда: ${answers.need || '-'}`
    ].filter(Boolean);

    const mailto = `mailto:n.nedkov97@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
    funnelHint.textContent = 'Отваря се вашият имейл клиент...';
  });

  updateStep();
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form -> opens mail client with prefilled message
const form = document.getElementById('contactForm');
const hint = document.getElementById('formHint');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const company = form.company.value.trim();
  const message = form.message.value.trim();

  const subject = `Запитване за уебсайт от ${name}`;
  const bodyLines = [
    `Име: ${name}`,
    company ? `Фирма: ${company}` : null,
    '',
    message
  ].filter(Boolean);

  const mailto = `mailto:n.nedkov97@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  window.location.href = mailto;
  hint.textContent = 'Отваря се вашият имейл клиент...';
});
