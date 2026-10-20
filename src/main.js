import './style.css';
import { site } from './data.js';
import { initCursor } from './cursor.js';
import { initDots } from './dots.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const when = (cond, html) => (cond ? html : '');
const bubbles = (tech, size = 'text-xs px-2.5 py-1') => tech.map((t) => (
    `<li class="${size} rounded-full bg-red/15 text-red-bright font-medium">${esc(t)}</li>`
)).join('');

const pills = (tech) => tech.map((t) => (
    `<span class="rounded-full bg-red/15 px-2.5 py-1 text-xs font-medium text-red-bright">${esc(t)}</span>`
)).join('');

const icons = {
    github: '<svg viewBox="0 0 16 16" class="size-5" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.948 1.637-1.684 3.37-1.684 3.601 0 4.267 2.37 4.267 4.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
};

const factIcons = {
    pin: '<svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    cake: '<svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7M5 16c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0M12 12V8M12 5.5V5"/></svg>',
    code: '<svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5M16 7l5 5-5 5"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
    building: '<svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M3 21h18M8 7h4M8 11h4M8 15h4"/></svg>',
};

const socials = () => [['github', 'GitHub'], ['linkedin', 'LinkedIn']]
    .filter(([key]) => site[key])
    .map(([key, label]) => `<a href="${esc(site[key])}" target="_blank" rel="noopener" aria-label="${label}" class="grid size-12 place-items-center rounded-full border border-line text-muted hover:text-white hover:border-red-bright transition-colors">${icons[key]}</a>`)
    .join('');

const panel = 'relative min-h-svh snap-start px-5 sm:px-10 pt-24 pb-12 flex flex-col';
const navLink = (href, label) => `<a href="${href}" class="pill" data-nav>
    <span data-dot hidden class="relative z-[1] mr-1.5 size-1.5 rounded-full bg-[#ff5b2e]"></span>
    <span class="pill-stack"><span class="pill-text">${label}</span><span class="pill-text pill-text-hover" aria-hidden="true">${label}</span></span>
</a>`;
const input = 'w-full rounded-lg border border-line bg-white/[.03] px-3.5 py-3 text-base text-ink outline-none transition focus:border-red-bright focus:bg-white/[.05]';

document.title = [site.name, site.role].filter(Boolean).join(' — ');

document.querySelector('#app').innerHTML = `
<header class="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 pt-4 sm:px-6 xl:px-10 [&>*]:pointer-events-auto">
    <a href="#top" class="flex items-center gap-3">
        <span class="grid size-10 place-items-center rounded-full border border-white/15 bg-[rgba(18,18,20,.62)] text-[13px] font-semibold tracking-tight backdrop-blur-xl">${esc(site.name.split(/\s+/).map((w) => w[0]).join(''))}</span>
        <span class="hidden text-sm font-semibold tracking-tight sm:block">${esc(site.name)}</span>
    </a>
    <nav class="flex items-center gap-[2px] rounded-full border border-white/10 bg-[rgba(18,18,20,.62)] p-[3px] backdrop-blur-xl">
        ${navLink('#darbai', 'Darbai')}
        ${navLink('#apie', 'Apie mane')}
        ${navLink('#kontaktai', 'Kontaktai')}
    </nav>
</header>

<main>
    <section id="top" class="relative isolate flex min-h-svh snap-start flex-col overflow-hidden pt-28">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_10%,rgba(255,91,46,.13),transparent_70%),radial-gradient(50%_40%_at_10%_90%,rgba(243,240,234,.05),transparent_70%)]"></div>
        <canvas id="hero-dots" aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 size-full opacity-70 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]"></canvas>
        <div class="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-10 sm:px-10">
            <div>
                <h1 class="text-[clamp(52px,10vw,150px)] font-semibold leading-[.92] tracking-[-.045em]">${esc(site.name)}</h1>
                ${when(site.intro || site.role, `<p class="hero-shine mt-6 max-w-4xl text-[clamp(24px,3.4vw,48px)] font-medium leading-[1.1] tracking-tight">${esc(site.intro || site.role)}</p>`)}
                <div class="mt-10 flex flex-wrap items-center gap-3">
                    <a href="#darbai" class="group inline-flex items-center gap-2 rounded-full bg-[#cc3a0e] px-6 py-3 font-semibold text-white hover:bg-[#e04516] transition-colors">Mano darbai <span class="transition-transform group-hover:translate-x-0.5">→</span></a>
                    <a href="#kontaktai" class="rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:border-white/40 transition-colors">Susisiekti</a>
                </div>
            </div>
        </div>
        ${when(site.about.skills.length, `<div aria-hidden="true" class="overflow-hidden border-t border-white/10 py-3">
            <div class="marquee font-mono text-sm uppercase tracking-[.12em] text-muted">
                ${[0, 1, 2, 3].map(() => `<span class="whitespace-nowrap">${site.about.skills.map(esc).join(' &nbsp;·&nbsp; ')} &nbsp;·&nbsp; </span>`).join('')}
            </div>
        </div>`)}
    </section>

    <section id="darbai" class="${panel} justify-center">
        <div class="mx-auto w-full max-w-6xl">
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-10">Mano darbai</h2>
            <div class="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
                ${site.projects.map((p, i) => `
                <button type="button" data-project="${i}" class="group flex min-h-36 w-full items-start justify-between gap-4 rounded-2xl border border-line bg-panel/60 p-6 text-left transition duration-300 ease-out hover:-translate-y-1 hover:border-red/60 cursor-pointer">
                    <span>
                        <span class="block text-2xl font-bold text-white">${esc(p.title)}</span>
                        ${when(p.tech.length, `<span class="mt-3 flex flex-wrap gap-2">${pills(p.tech)}</span>`)}
                    </span>
                    <span class="text-3xl font-light leading-none text-muted transition group-hover:text-white">+</span>
                </button>`).join('')}
            </div>
        </div>
    </section>

    <section id="apie" class="${panel} justify-center">
        <div class="mx-auto w-full max-w-6xl">
            <div class="grid gap-12 md:grid-cols-2 md:gap-16">
                <div class="flex flex-col items-start">
                    <span class="text-sm font-medium uppercase tracking-[.2em] text-muted">Apie mane</span>
                    <h2 class="mt-5 text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] tracking-tight">Labas, aš <span class="text-red-bright">${esc(site.name)}</span></h2>
                    ${when(site.about.facts.length, `<ul class="mt-7 flex flex-col gap-3">
                        ${site.about.facts.map((f) => `<li class="flex items-center gap-3 text-muted"><span class="text-red-bright">${factIcons[f.icon] || factIcons.code}</span>${esc(f.text)}</li>`).join('')}
                    </ul>`)}
                    ${site.about.text.map((t) => `<p class="mt-6 text-lg leading-relaxed text-ink">${esc(t)}</p>`).join('')}
                    <div class="mt-8 flex flex-wrap gap-3">
                        <a href="#kontaktai" class="rounded-lg bg-red px-6 py-3 font-semibold text-white hover:bg-red-bright transition-colors">Susisiekti</a>
                        <a href="#darbai" class="rounded-lg border border-line px-6 py-3 font-semibold text-ink hover:border-red-bright transition-colors">Mano darbai</a>
                    </div>
                </div>
                <div class="flex flex-col gap-10 md:pt-12">
                    ${when(site.about.skills.length, `<div>
                        <h3 class="text-xl font-semibold">Pagrindiniai įgūdžiai</h3>
                        <ul class="mt-4 flex flex-wrap gap-2">${bubbles(site.about.skills, 'text-sm px-3.5 py-1.5')}</ul>
                    </div>`)}
                    ${when(site.about.services.length, `<div>
                        <h3 class="text-xl font-semibold">Paslaugos</h3>
                        <ul class="mt-4 flex flex-col gap-2.5">
                            ${site.about.services.map((x) => `<li class="flex items-center gap-3 text-muted"><span class="text-red-bright">→</span>${esc(x)}</li>`).join('')}
                        </ul>
                    </div>`)}
                </div>
            </div>
            ${when(site.about.stats.length, `<div class="mt-14 grid grid-cols-2 gap-4 ${['', '', '', 'sm:grid-cols-3', 'sm:grid-cols-4'][site.about.stats.length] || ''}">
                ${site.about.stats.map((x) => `<div class="rounded-2xl border border-line bg-panel/60 p-6">
                    <span class="block text-4xl font-bold text-red-bright">${esc(x.value)}</span>
                    <span class="mt-2 block text-sm text-muted">${esc(x.label)}</span>
                </div>`).join('')}
            </div>`)}
        </div>
    </section>

    <section id="kontaktai" class="${panel}">
        <div class="mx-auto w-full max-w-6xl flex-1 grid content-center gap-10 md:grid-cols-2 md:gap-16 md:items-center">
            <div class="flex flex-col gap-6">
                <h2 class="text-4xl sm:text-5xl font-bold tracking-tight">Kontaktai</h2>
                <a href="mailto:${esc(site.email)}" class="self-start text-[clamp(22px,3vw,36px)] font-semibold border-b-2 border-red hover:text-red-bright transition-colors break-all">${esc(site.email)}</a>
                <div class="flex gap-3">${socials()}</div>
            </div>
            <form id="contact-form" class="flex flex-col gap-4">
                <label class="flex flex-col gap-2 text-sm text-muted">Vardas<input name="name" type="text" autocomplete="name" required class="${input}"></label>
                <label class="flex flex-col gap-2 text-sm text-muted">El. paštas<input name="email" type="email" autocomplete="email" required class="${input}"></label>
                <label class="flex flex-col gap-2 text-sm text-muted">Žinutė<textarea name="message" rows="5" required class="${input} resize-y"></textarea></label>
                <button type="submit" class="self-start rounded-full bg-red px-6 py-3 font-medium text-white hover:bg-red-bright transition-colors cursor-pointer">Siųsti</button>
            </form>
        </div>
        <footer class="mx-auto w-full max-w-6xl mt-10 pt-6 border-t border-line flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>© ${new Date().getFullYear()} ${esc(site.name)}</span>
        </footer>
    </section>
</main>

<div id="pop" hidden class="fixed inset-0 z-50 grid place-items-center p-5">
    <div data-pop-backdrop class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
    <div data-pop-card role="dialog" aria-modal="true" aria-labelledby="pop-title" class="relative w-full max-w-xl origin-top-left rounded-2xl border border-red bg-panel p-8 shadow-[0_40px_100px_-30px_rgba(158,27,37,.6)]">
        <button type="button" data-pop-close aria-label="Uždaryti" class="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-line text-xl text-muted hover:border-red hover:text-white transition-colors cursor-pointer">×</button>
        <div id="pop-icon" class="mb-5 inline-flex h-14 items-center rounded-xl bg-white px-3"><img alt="" class="h-8 w-auto max-w-40 object-contain"></div>
        <h3 id="pop-title" class="pr-12 text-3xl font-bold text-white"></h3>
        <div id="pop-tech" class="mt-4 flex flex-wrap gap-2"></div>
        <p id="pop-desc" class="mt-6 text-lg leading-relaxed text-muted"></p>
        <div class="mt-8 flex flex-wrap gap-3">
            <a id="pop-link" target="_blank" rel="noopener" class="rounded-full bg-red px-6 py-3 font-semibold text-white hover:bg-red-bright transition-colors">Aplankyti svetainę ↗</a>
            <a id="pop-repo" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-semibold text-ink hover:border-red-bright transition-colors">${icons.github} GitHub</a>
        </div>
    </div>
</div>
`;

// Projects: clicking a block pops it out of the grid into a bigger card in the middle
const pop = document.getElementById('pop');
const popCard = pop.querySelector('[data-pop-card]');
const popBackdrop = pop.querySelector('[data-pop-backdrop]');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let source = null;

// Transform that makes the pop-up card sit exactly over the block it came from
const fromBlock = () => {
    const a = source.getBoundingClientRect();
    const b = popCard.getBoundingClientRect();
    return `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
};

const animate = (reverse) => {
    const timing = { duration: reducedMotion ? 0 : 380, easing: 'cubic-bezier(.2, .8, .2, 1)', direction: reverse ? 'reverse' : 'normal' };
    popBackdrop.animate([{ opacity: 0 }, { opacity: 1 }], timing);
    return popCard.animate([
        { transform: fromBlock(), opacity: .6 },
        { transform: 'none', opacity: 1 },
    ], timing).finished;
};

const openProject = (block) => {
    const p = site.projects[block.dataset.project];
    source = block;
    document.getElementById('pop-title').textContent = p.title;
    const icon = document.getElementById('pop-icon');
    icon.hidden = !p.icon;
    icon.querySelector('img').src = p.icon || '';
    document.getElementById('pop-tech').innerHTML = pills(p.tech);
    const desc = document.getElementById('pop-desc');
    desc.textContent = p.description;
    desc.hidden = !p.description;
    const link = document.getElementById('pop-link');
    link.hidden = !p.url;
    link.href = p.url || '#';
    const repo = document.getElementById('pop-repo');
    repo.hidden = !p.repo;
    repo.href = p.repo || '#';

    pop.hidden = false;
    block.style.visibility = 'hidden';
    document.documentElement.classList.add('overflow-hidden');
    animate(false);
    pop.querySelector('[data-pop-close]').focus();
};

const closeProject = async () => {
    if (!source || pop.dataset.closing) return;
    pop.dataset.closing = '1';
    await animate(true);
    pop.hidden = true;
    delete pop.dataset.closing;
    source.style.visibility = '';
    document.documentElement.classList.remove('overflow-hidden');
    source.focus();
    source = null;
};

document.querySelectorAll('[data-project]').forEach((b) => b.addEventListener('click', () => openProject(b)));
pop.querySelector('[data-pop-close]').addEventListener('click', closeProject);
popBackdrop.addEventListener('click', closeProject);
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pop.hidden) closeProject(); });

// Orange dot next to the header link for the section you're on
const navLinks = [...document.querySelectorAll('[data-nav]')];
const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
        if (!e.isIntersecting) continue;
        navLinks.forEach((a) => {
            a.querySelector('[data-dot]').hidden = a.getAttribute('href') !== `#${e.target.id}`;
        });
    }
}, { threshold: 0.55 });
document.querySelectorAll('main > section').forEach((s) => io.observe(s));

// No back-end yet: the form opens the visitor's mail app with everything filled in
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `Žinutė nuo ${f.get('name')}`;
    const body = `${f.get('message')}\n\n${f.get('name')} (${f.get('email')})`;
    location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

initCursor();
initDots(document.getElementById('hero-dots'));
