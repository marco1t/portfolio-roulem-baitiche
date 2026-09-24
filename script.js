'use strict';

const root = document.documentElement;
const navigation = document.querySelector('#navigation');
const menu = document.querySelector('#menu');
const languageButton = document.querySelector('#language');
const dialog = document.querySelector('#project-dialog');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[data-label]')];
const translatedNodes = [...document.querySelectorAll('[data-en]')];
const originalText = new Map(translatedNodes.map(node => [node, node.innerHTML]));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 800px)');
let language = 'fr';
let currentProject = null;
let framePending = false;
let lastScrollY = 0;

const projects = {
  securedash: {
    title: 'SecureDash',
    category: ['Cybersécurité · Projet académique ESAIP', 'Cybersecurity · ESAIP academic project'],
    description: [
      'Un prototype de tableau de bord SOC pour explorer une démarche complète de supervision sécurité. Le projet associe une interface web, un générateur de logs Python, des scénarios déterministes et un dossier de preuves.',
      'A SOC dashboard prototype exploring a complete security monitoring workflow. The project combines a web interface, a Python log generator, deterministic scenarios and documented evidence.'
    ],
    points: [
      ['Scénarios : brute force SSH, injection SQL, exfiltration et scan réseau.', 'Scenarios: SSH brute force, SQL injection, exfiltration and network scanning.'],
      ['Logs reproductibles aux formats syslog, JSON et CEF.', 'Reproducible logs in syslog, JSON and CEF formats.'],
      ['Rapport, captures et dossier de preuves disponibles dans le dépôt.', 'Report, screenshots and evidence available in the repository.'],
      ['Prototype pédagogique utilisant des scénarios de démonstration.', 'Educational prototype using demonstration scenarios.']
    ],
    demo: 'https://marco1t.github.io/sujet15-dashboard-securite/',
    source: 'https://github.com/marco1t/sujet15-dashboard-securite'
  },
  artisan: {
    title: 'Dashboard Artisan',
    category: ['Développement web · ETS Étanchéité', 'Web development · ETS Étanchéité'],
    description: [
      'Une solution de gestion développée pour ETS Étanchéité tout support pendant mon CDD de l’été 2025. Le projet interne utilise JavaScript, Chart.js et Firebase. La version publique permet de découvrir l’interface sans accéder aux données de l’entreprise.',
      'A management solution built for ETS Étanchéité tout support during my summer 2025 contract. The internal project uses JavaScript, Chart.js and Firebase. The public version showcases the interface without exposing company data.'
    ],
    points: [
      ['Tableau de bord et indicateurs de gestion.', 'Management dashboard and key indicators.'],
      ['Modules factures, documents, URSSAF et signature PDF.', 'Invoice, document, URSSAF and PDF signing modules.'],
      ['Démonstration publique en lecture seule, avec clients, montants et documents fictifs.', 'Read-only public demonstration with fictional clients, amounts and documents.'],
      ['Aucune donnée Firebase réelle dans la démonstration publique.', 'No real Firebase data in the public demonstration.']
    ],
    demo: 'https://marco1t.github.io/Artisan-dashboard_Version_Public/',
    source: 'https://github.com/marco1t/Artisan-dashboard_Version_Public'
  },
  cti: {
    title: 'Cyber Threat Intelligence',
    category: ['Veille cybersécurité · Automatisation', 'Cybersecurity intelligence · Automation'],
    description: [
      'Un tableau de bord de veille qui agrège des sources cyber et IA. La collecte Python est orchestrée par un workflow GitHub Actions programmé, puis publiée sous forme de site statique.',
      'An intelligence dashboard aggregating cybersecurity and AI sources. Python collection is orchestrated by a scheduled GitHub Actions workflow, then published as a static website.'
    ],
    points: [
      ['Collecte en Python avec requests, feedparser et YAML.', 'Python collection using requests, feedparser and YAML.'],
      ['Génération de snapshots et mise à jour du tableau de bord.', 'Snapshot generation and dashboard updates.'],
      ['Protection contre l’écrasement des données si toutes les sources échouent.', 'Preservation of existing data when all sources fail.'],
      ['Interface HTML, CSS et JavaScript hébergée sur GitHub Pages.', 'HTML, CSS and JavaScript interface hosted on GitHub Pages.']
    ],
    demo: 'https://marco1t.github.io/Cyber-Threat-Intelligence-Dashboard/',
    source: 'https://github.com/marco1t/Cyber-Threat-Intelligence-Dashboard'
  }
};

function closeMenu(restoreFocus = false) {
  navigation.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', language === 'fr' ? 'Ouvrir le menu' : 'Open menu');
  if (restoreFocus) menu.focus();
}

menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', language === 'fr' ? (open ? 'Fermer le menu' : 'Ouvrir le menu') : (open ? 'Close menu' : 'Open menu'));
});
navLinks.forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menu.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) closeMenu(true);
});
mobile.addEventListener('change', () => closeMenu());
navigation.addEventListener('pointermove', event => {
  if (reducedMotion.matches) return;
  const bounds = navigation.getBoundingClientRect();
  navigation.style.setProperty('--nav-x', `${event.clientX - bounds.left}px`);
  navigation.style.setProperty('--nav-y', `${event.clientY - bounds.top}px`);
});

function renderScroll() {
  const max = root.scrollHeight - innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  document.querySelector('#progress').style.transform = `scaleX(${progress})`;
  document.querySelector('#rail-progress').style.transform = `scaleY(${progress})`;
  document.querySelector('#scroll-percent').textContent = `${Math.round(progress * 100)} %`;
  const topbar = document.querySelector('#topbar');
  const scrollingDown = scrollY > lastScrollY + 4;
  const scrollingUp = scrollY < lastScrollY - 4;
  if (scrollY <= 70 || scrollingUp) topbar.classList.remove('compact');
  else if (scrollingDown) topbar.classList.add('compact');
  lastScrollY = scrollY;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= innerHeight * .4) current = section;
  }
  if (progress > .99) current = sections.at(-1);
  const currentLabel = language === 'fr' ? current.dataset.label : current.dataset.labelEn;
  document.querySelector('#compact-label').textContent = current.id === 'accueil' ? 'Roulem' : currentLabel;
  const parentSection = { competences: 'projets' };
  const activeId = parentSection[current.id] || current.id;
  navLinks.forEach(link => {
    const active = link.hash === `#${activeId}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const heroImage = document.querySelector('.hero-image');
  heroImage.style.transform = !reducedMotion.matches && !mobile.matches
    ? `translateY(${Math.min(scrollY, innerHeight) * .12}px) scale(1.05)` : '';
  framePending = false;
}
function requestRender() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(renderScroll);
}
addEventListener('scroll', requestRender, { passive: true });
addEventListener('resize', requestRender, { passive: true });
addEventListener('load', requestRender);
reducedMotion.addEventListener('change', requestRender);
new ResizeObserver(requestRender).observe(document.body);

function populateProject(key) {
  const project = projects[key];
  const index = language === 'fr' ? 0 : 1;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category[index];
  document.querySelector('#dialog-description').textContent = project.description[index];
  const points = project.points.map(point => {
    const item = document.createElement('li');
    item.textContent = point[index];
    return item;
  });
  document.querySelector('#dialog-points').replaceChildren(...points);
  document.querySelector('#dialog-demo').href = project.demo;
  document.querySelector('#dialog-source').href = project.source;
}
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    currentProject = button.dataset.project;
    populateProject(currentProject);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  currentProject = null;
});

const frenchDescription = document.querySelector('meta[name="description"]').content;
function setLanguage(next) {
  language = next;
  root.lang = language;
  translatedNodes.forEach(node => {
    // Both language variants are authored locally; no external HTML is inserted.
    node.innerHTML = language === 'en' ? node.dataset.en : originalText.get(node);
  });
  document.querySelectorAll('[data-en-alt]').forEach(node => {
    if (!node.dataset.frAlt) node.dataset.frAlt = node.alt;
    node.alt = language === 'en' ? node.dataset.enAlt : node.dataset.frAlt;
  });
  languageButton.innerHTML = language === 'fr' ? 'FR <span aria-hidden="true">/ EN</span>' : 'EN <span aria-hidden="true">/ FR</span>';
  languageButton.setAttribute('aria-label', language === 'fr' ? 'Switch to English' : 'Passer en français');
  navigation.setAttribute('aria-label', language === 'fr' ? 'Navigation principale' : 'Main navigation');
  document.querySelector('.scroll-rail').setAttribute('aria-label', language === 'fr' ? 'Progression de lecture' : 'Reading progress');
  document.querySelector('.dialog-close').setAttribute('aria-label', language === 'fr' ? 'Fermer le projet' : 'Close project');
  document.querySelectorAll('.brand').forEach(link => link.setAttribute('aria-label', language === 'fr' ? 'Roulem Baitiche, accueil' : 'Roulem Baitiche, home'));
  document.title = `Roulem Baitiche — ${language === 'fr' ? 'Cybersécurité' : 'Cybersecurity'}, DevOps & Cloud`;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[name="description"]').content = language === 'fr' ? frenchDescription : 'Roulem Baitiche, engineering student at ESAIP. Cybersecurity, DevOps and Cloud: experience, projects and an international background.';
  document.querySelector('meta[property="og:description"]').content = document.querySelector('meta[name="description"]').content;
  closeMenu();
  if (currentProject) populateProject(currentProject);
  try { localStorage.setItem('roulem-language', language); } catch { /* Storage is optional. */ }
  requestRender();
}
languageButton.addEventListener('click', () => setLanguage(language === 'fr' ? 'en' : 'fr'));
try { language = localStorage.getItem('roulem-language') === 'en' ? 'en' : 'fr'; } catch { /* French remains the default. */ }
document.querySelector('#year').textContent = new Date().getFullYear();
setLanguage(language);
