// i18n strings for the small set of dynamic, JS-generated texts.
// Static markup text lives directly in index.html / de/index.html.
const LANG = document.documentElement.lang === 'de' ? 'de' : 'bg';

const STRINGS = {
  bg: {
    stepLabel: (current, total) => `Стъпка ${current} от ${total}`,
    next: 'Напред',
    submit: 'Изпрати',
    sending: 'Изпращане...',
    submitError: 'Възникна грешка при изпращането. Моля, опитайте отново или ни пишете на n.nedkov97@gmail.com.',
    contactSubject: (name) => `Запитване за уебсайт от ${name}`,
    contactNameLabel: 'Име',
    contactCompanyLabel: 'Фирма',
    mailOpening: 'Отваря се вашият имейл клиент...',
    packages: {
      start: { name: 'Старт', reason: 'Перфектна основа за начален онлайн старт — бърз лендинг сайт, който можете да разширявате постепенно.' },
      business: { name: 'Бизнес', reason: 'Пълноценен сайт с SEO оптимизация и достатъчно раздели, за да представите бизнеса си професионално.' },
      premium: { name: 'Премиум', reason: 'Разширена функционалност — онлайн магазин, интеграции и приоритетна поддръжка за по-сложни нужди.' }
    }
  },
  de: {
    stepLabel: (current, total) => `Schritt ${current} von ${total}`,
    next: 'Weiter',
    submit: 'Absenden',
    sending: 'Wird gesendet...',
    submitError: 'Beim Absenden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns an n.nedkov97@gmail.com.',
    contactSubject: (name) => `Anfrage für eine Webseite von ${name}`,
    contactNameLabel: 'Name',
    contactCompanyLabel: 'Firma',
    mailOpening: 'Ihr E-Mail-Programm wird geöffnet...',
    packages: {
      start: { name: 'Start', reason: 'Eine perfekte Grundlage für den Online-Start — eine schnelle Landingpage, die Sie nach und nach erweitern können.' },
      business: { name: 'Business', reason: 'Eine vollwertige Webseite mit SEO-Optimierung und genug Bereichen, um Ihr Unternehmen professionell zu präsentieren.' },
      premium: { name: 'Premium', reason: 'Erweiterte Funktionen — Online-Shop, Integrationen und priorisierter Support für komplexere Anforderungen.' }
    }
  }
}[LANG];

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

// Mobile sticky CTA: hide once the funnel or contact section is reached
const mobileCta = document.getElementById('mobileCta');
const ctaHideTargets = [document.getElementById('lead-funnel'), document.getElementById('contact')].filter(Boolean);
if (mobileCta && ctaHideTargets.length) {
  const ctaObserver = new IntersectionObserver((entries) => {
    const anyVisible = entries.some(entry => entry.isIntersecting);
    mobileCta.classList.toggle('is-hidden', anyVisible);
  }, { threshold: 0.15 });
  ctaHideTargets.forEach(el => ctaObserver.observe(el));
}

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
      const phone = step.querySelector('#funnelPhone');
      const availability = step.querySelector('#funnelAvailability');
      const consent = step.querySelector('#funnelConsent');
      nextBtn.disabled = !(name.value.trim() && email.value.trim() && phone.value.trim() && availability.value.trim() && (!consent || consent.checked));
    }
  }

  function updateStep() {
    steps.forEach((s, i) => s.classList.toggle('is-active', i === current));
    progressBar.style.width = `${((current + 1) / totalSteps) * 100}%`;
    stepLabel.textContent = STRINGS.stepLabel(current + 1, totalSteps);
    backBtn.classList.toggle('is-hidden', current === 0);
    nextBtn.textContent = current === totalSteps - 1 ? STRINGS.submit : STRINGS.next;
    updateNextState();
  }

  steps.forEach(step => {
    const group = step.querySelector('.funnel-options');
    if (group) {
      group.querySelectorAll('.funnel-option').forEach(opt => {
        opt.addEventListener('click', () => {
          group.querySelectorAll('.funnel-option').forEach(o => o.classList.remove('is-selected'));
          opt.classList.add('is-selected');
          answers[group.dataset.group] = { key: opt.dataset.value, label: opt.textContent.trim() };
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

  function recommendPackage() {
    const scores = { start: 0, business: 0, premium: 0 };

    switch ((answers.need || {}).key) {
      case 'new-site': scores.start += 2; scores.business += 1; break;
      case 'seo': scores.business += 2; break;
      case 'shop': scores.premium += 3; break;
      case 'automation': scores.premium += 3; break;
    }
    switch ((answers.website || {}).key) {
      case 'none': scores.start += 1; break;
      case 'outdated': scores.business += 1; break;
      case 'satisfied': scores.business += 1; scores.premium += 1; break;
      case 'in-progress': scores.business += 1; break;
    }
    switch ((answers.business || {}).key) {
      case 'shop': scores.premium += 2; break;
      case 'services': scores.business += 1; break;
      case 'hospitality': scores.business += 1; break;
      case 'other': scores.start += 1; break;
    }

    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  }

  const resultName = document.getElementById('funnelResultName');
  const resultPackage = document.getElementById('funnelResultPackage');
  const resultReason = document.getElementById('funnelResultReason');

  nextBtn.addEventListener('click', async () => {
    if (current < totalSteps - 1) {
      current++;
      updateStep();
      return;
    }

    const name = document.getElementById('funnelName').value.trim();
    const company = document.getElementById('funnelCompany').value.trim();
    const email = document.getElementById('funnelEmail').value.trim();
    const phone = document.getElementById('funnelPhone').value.trim();
    const availability = document.getElementById('funnelAvailability').value.trim();
    const pkg = STRINGS.packages[recommendPackage()];

    nextBtn.disabled = true;
    nextBtn.textContent = STRINGS.sending;
    funnelHint.textContent = '';

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          availability,
          business: (answers.business || {}).label || '',
          website: (answers.website || {}).label || '',
          need: (answers.need || {}).label || '',
          recommendedPackage: pkg.name,
          lang: LANG
        })
      });

      if (!res.ok) throw new Error('Request failed');

      resultName.textContent = name;
      resultPackage.textContent = pkg.name;
      resultReason.textContent = pkg.reason;
      funnel.classList.add('is-submitted');
    } catch (err) {
      funnelHint.textContent = STRINGS.submitError;
      nextBtn.disabled = false;
      nextBtn.textContent = STRINGS.submit;
    }
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

  const subject = STRINGS.contactSubject(name);
  const bodyLines = [
    `${STRINGS.contactNameLabel}: ${name}`,
    company ? `${STRINGS.contactCompanyLabel}: ${company}` : null,
    '',
    message
  ].filter(Boolean);

  const mailto = `mailto:n.nedkov97@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  window.location.href = mailto;
  hint.textContent = STRINGS.mailOpening;
});
