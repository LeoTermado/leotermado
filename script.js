const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

$('#year').textContent = new Date().getFullYear();

const toggleBtn = $('.nav-toggle');
const navList = $('#nav-menu');

const closeNav = () => {
  navList.classList.remove('open');
  toggleBtn.setAttribute('aria-expanded', 'false');
};
const openNav = () => {
  navList.classList.add('open');
  toggleBtn.setAttribute('aria-expanded', 'true');
};

toggleBtn?.addEventListener('click', () => {
  const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
  expanded ? closeNav() : openNav();
});

$$('.nav-link').forEach(a => a.addEventListener('click', closeNav));

const sections = $$('.section');
const navLinksById = new Map(
  $$('.nav-link')
    .filter(a => a.getAttribute('href').startsWith('#'))
    .map(a => [a.getAttribute('href').slice(1), a])
);

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinksById.forEach(link => link.classList.remove('active'));
      if (navLinksById.has(id)) navLinksById.get(id).classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });

sections.forEach(sec => io.observe(sec));

const ACCENT_TERMS = {
  en: ['Leo', 'B.Sc.', 'M.Sc.'],
  de: ['Leo', 'B.Sc.', 'M.Sc.']
};
const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function highlightAccents(lang){
  const terms = ACCENT_TERMS[lang] || ACCENT_TERMS.en;
  if(!terms.length) return;
  const pattern = new RegExp(`\\b(${terms.map(escapeRegExp).join('|')})\\b`, 'g');
  $$('[data-i18n]').forEach(el => {
    const raw = el.textContent;
    const html = raw.replace(pattern, '<span class="accent">$1</span>');
    el.innerHTML = html;
  });
}

const translations = {
  en: {
    'nav.about':'About',
    'nav.skills':'Skills',
    'nav.work':'Work & Education',
    'nav.projects':'Projects',
    'nav.contact':'Contact',
    'nav.resume':'Resume',

    'about.title': "Leo Termado — dual B.Sc. Business Informatics",
    'about.lead': "I have been programming games, websites, and software independently for years and took advanced, project, and elective courses in computer science at school. In the advanced course I gained practical experience with Java, developing software solutions, and working with databases and SQL. At the moment, I enjoy building apps with Xcode and Swift. Starting September 1, 2025, I will begin my dual B.Sc. in Business Informatics at CBS in Cologne with KDVZ in Frechen, continuing to grow through real projects and AI.",

    'skills.title':'Skills',
    'skills.note':'Java, Swift, SQL, HTML & CSS, Javascript, GDScript, Phython - VS Code, Xcode, Godot, Unity, Microsoft Office, GIMP & Adobe Photoshop, Garageband, Ableton Live, AudioKit library',

    'work.title':'Work & Education',
    'work.item1.title':'Dual B.Sc. Business Informatics',
    'work.item1.meta':'CBS (Cologne) · with KDVZ (Frechen) · 2025–2028',
    'work.item1.desc':'Dual study starting September 1, 2025. Focus on bridging business & tech, practical experience at KDVZ, and building real projects.',
    'work.item2.title':'Planned: M.Sc. Software Engineering',
    'work.item2.meta':'Abroad · From 2028',
    'work.item2.desc':'Goal: deepen software engineering, work internationally, and specialize in AI-driven products.',
    'work.item3.title':'Abitur (German A-levels)',
    'work.item3.meta':'Completed · 2025',
    'work.item3.desc':'Graduated from secondary school (Abitur) in 2025; moving on to a dual B.Sc. in Business Informatics.',

    'projects.title':'Projects',
    'projects.note':'in the following are some of my best projects listed.',
    'projects.current.title':'Current Project',
    'projects.current.meta':'In progress · Xcode · Swift · AudioKit library',
    'projects.more.label':'More projects:',

    'projects.two.title':'AI Project for Character recognition',
    'projects.two.meta':'Python & Java',
    'projects.three.title':'Project Three',
    'projects.three.meta':'Web App',
    'projects.four.title':'Project Four',
    'projects.four.meta':'Frontend',

    'contact.title':'Contact',
    'contact.phone':'Phone'
  },

  de: {
    'nav.about':'Über mich',
    'nav.skills':'Skills',
    'nav.work':'Bildung',
    'nav.projects':'Projekte',
    'nav.contact':'Kontakt',
    'nav.resume':'Lebenslauf',

    'about.title':'Leo Termado — dualer B.Sc. Wirtschaftsinformatik',
    'about.lead':'Ich programmiere seit Jahren selbstständig Spiele, Websites und Software und habe in der Schule den Leistungskurs, Projektkurs und Neigungskurs Informatik belegt. Besonders im Leistungskurs habe ich viel praktische Erfahrung mit Java und der Entwicklung von Softwarelösungen, sowie die Arbeit mit Datenbanken und SQL gesammelt. Aktuell programmiere ich gerne Apps mit Xcode und Swift. Ab dem 1. September 2025 starte ich mein duales B.Sc.-Studium in Wirtschaftsinformatik an der CBS in Köln mit der KDVZ in Frechen und wachse über reale Projekte und KI weiter.',

    'skills.title':'Skills',
    'skills.note':'Java, Swift, SQL, HTML & CSS, Javascript, GDScript, Phython - VS Code, Xcode, Godot, Unity, Microsoft Office, GIMP & Adobe Photoshop, Garageband, Ableton Live, AudioKit library',

    'work.title':'Bildung & Werdegang',
    'work.item1.title':'Duales B.Sc.-Studium Wirtschaftsinformatik',
    'work.item1.meta':'CBS (Köln) · KDVZ (Frechen) · 2025–2028',
    'work.item1.desc':'Start am 1. September 2025 · Praxiserfahrung bei der KDVZ und echte Projektarbeit.',
    'work.item2.title':'Geplant: M.Sc. Software Engineering',
    'work.item2.meta':'Ausland · ab 2028',
    'work.item2.desc':'Ziel: Software Engineering vertiefen, international arbeiten und auf KI-getriebene Produkte spezialisieren.',
    'work.item3.title':'Abitur',
    'work.item3.meta':'Abgeschlossen · 2025',
    'work.item3.desc':'Abitur 2025 abgeschlossen · Leistungskurse Mathematik und Informatik · 2,7',

    'projects.title':'Projekte',
    'projects.note':'Im folgenden Sind einige meiner besten Projekte aufgelistet.',
    'projects.current.title':'Dynamic Drive',
    'projects.current.meta':'In Arbeit · Xcode · Swift · AudioKit library',
    'projects.more.label':'Weitere Projekte:',

    'projects.two.title':'KI-Projekt zur Zeichenerkennung',
    'projects.two.meta':'Python & Java',
    'projects.three.title':'Projekt Drei',
    'projects.three.meta':'Web-App',
    'projects.four.title':'Projekt Vier',
    'projects.four.meta':'Frontend',

    'contact.title':'Kontakt',
    'contact.phone':'Telefon'
  }
};

function setLang(lang){
  const dict = translations[lang] ?? translations.en;
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  $$('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.setAttribute('aria-pressed', String(active));
  });
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang);
  highlightAccents(lang);
}

const saved = localStorage.getItem('lang') || 'en';
setLang(saved);

$$('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    setTimeout(() => target.setAttribute('tabindex','-1'), 0);
    setTimeout(() => target.focus({preventScroll:true}), 400);
  });
});
