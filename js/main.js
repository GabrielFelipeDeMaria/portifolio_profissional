/* ============================================================
   Theme Toggle
   ============================================================ */
const html        = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
applyThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    applyThemeIcon(next);
});

function applyThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ============================================================
   Navbar Scroll
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateScrollTopVisibility();
    updateActiveNav();
}, { passive: true });

/* ============================================================
   Mobile Nav
   ============================================================ */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('active')));

/* ============================================================
   Active Nav Link on Scroll
   ============================================================ */
const sections     = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinkItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

/* ============================================================
   Typewriter
   ============================================================ */
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'Engenheiro da Computação',
    'Desenvolvedor Full-Stack',
    'Entusiasta de Automação',
    'Apaixonado por IoT',
    'Solucionador de Problemas',
];

let pIdx = 0, cIdx = 0, deleting = false;

(function typeStep() {
    const phrase = phrases[pIdx];
    typewriterEl.textContent = deleting
        ? phrase.slice(0, cIdx - 1)
        : phrase.slice(0, cIdx + 1);

    deleting ? cIdx-- : cIdx++;

    let delay = deleting ? 55 : 95;

    if (!deleting && cIdx === phrase.length) {
        delay = 2200;
        deleting = true;
    } else if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        delay = 420;
    }

    setTimeout(typeStep, delay);
})();

/* ============================================================
   Floating Particles  (orange tones)
   ============================================================ */
const particlesEl = document.getElementById('particles');
const pColors     = ['#F97316', '#FB923C', '#F59E0B', '#EF4444', '#FBBF24'];

function spawnParticle() {
    const el   = document.createElement('div');
    el.className = 'particle';
    const size = Math.random() * 5 + 2;
    el.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${Math.random() * 100}%`,
        `background:${pColors[Math.floor(Math.random() * pColors.length)]}`,
        `animation-duration:${Math.random() * 12 + 8}s`,
        `animation-delay:${Math.random() * 3}s`,
    ].join(';');
    particlesEl.appendChild(el);
    setTimeout(() => el.remove(), 22000);
}

for (let i = 0; i < 14; i++) setTimeout(spawnParticle, i * 250);
setInterval(spawnParticle, 1800);

/* ============================================================
   Counter animation for stats
   ============================================================ */
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const dur    = 1200;
    const step   = 16;
    const inc    = target / (dur / step);
    let   cur    = 0;

    const tick = setInterval(() => {
        cur += inc;
        if (cur >= target) { el.textContent = target + '+'; clearInterval(tick); }
        else               { el.textContent = Math.floor(cur); }
    }, step);
}

/* ============================================================
   Scroll-reveal with IntersectionObserver
   ============================================================ */
const revealEls = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-item, .cert-item, .contact-card, .about-grid, .tech-stack'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* Language bars */
const langObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const w = entry.target.dataset.width;
        entry.target.style.width = w + '%';
        langObs.unobserve(entry.target);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.lang-fill').forEach(el => langObs.observe(el));

/* Counter numbers */
const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObs.observe(el));

/* ============================================================
   Scroll-to-Top
   ============================================================ */
const scrollTopBtn = document.getElementById('scroll-top');

function updateScrollTopVisibility() {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ============================================================
   3D Card Tilt on hover
   ============================================================ */
function addTilt(selector) {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `perspective(700px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.55s ease, border-color 0.35s, box-shadow 0.35s';
            card.style.transform  = '';
            setTimeout(() => { card.style.transition = ''; }, 560);
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'border-color 0.35s, box-shadow 0.35s';
        });
    });
}

addTilt('.project-card');
addTilt('.skill-card');
addTilt('.contact-card');

/* ============================================================
   Magnetic Buttons
   ============================================================ */
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 0.1s ease, box-shadow 0.25s, background 0.25s, border-color 0.25s, color 0.25s';
    });
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * 0.28;
        const y = (e.clientY - r.top  - r.height / 2) * 0.28;
        btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.45s ease, box-shadow 0.25s, background 0.25s, border-color 0.25s, color 0.25s';
        btn.style.transform  = '';
    });
});

/* ============================================================
   Project Modals
   ============================================================ */
const modalData = {
    project1: {
        title:   'Perna Robótica Ortopédica',
        year:    '2022',
        partner: 'Hospital Oswaldo Cruz',
        icon:    '🦿',
        about:   `Em 2022, participei de um projeto desafiador pela FIAP em parceria com o Hospital Oswaldo Cruz.
                  O objetivo do grupo (eu e mais 4 pessoas) era desenvolver uma solução para auxiliar na
                  reabilitação de pacientes com mobilidade das pernas debilitada.`,
        details: `O resultado foi uma perna mecânica projetada para replicar os movimentos da fisioterapia de
                  forma mais rápida e prática. Utilizamos o software Autodesk para o design 3D do dispositivo e
                  a linguagem Python para toda a programação.`,
        impact:  `Solução inovadora que tornou o processo de reabilitação ortopédica mais acessível e eficiente,
                  reduzindo o tempo de fisioterapia com movimentos automatizados e controlados.`,
        tech:    ['Python', 'Autodesk 3D', 'Hardware', 'IoT', 'Motores', 'Sensores'],
    },
    project2: {
        title:   'Projetor Imersivo Interativo',
        year:    '2023',
        partner: 'Natura',
        icon:    '✨',
        about:   `Em 2023, participei de um projeto acadêmico em parceria com a empresa Natura. O desafio
                  consistia em criar uma tecnologia criativa para atrair a atenção dos clientes nos pontos de venda.`,
        details: `Nossa equipe desenvolveu um projetor inovador que combinava tecnologia e ilusionismo,
                  entregando uma experiência visual impactante e memorável. O projeto unia criatividade
                  com engenharia para criar momentos únicos de engajamento.`,
        impact:  `Experiência imersiva que aumentou o engajamento dos clientes e fortaleceu a identidade
                  da marca no ponto de venda, criando um diferencial competitivo marcante.`,
        tech:    ['Projeção', 'Hardware', 'UX Design', 'Ilusionismo'],
    },
    project3: {
        title:   'App de Produtividade Corporativa',
        year:    '2024',
        partner: 'Sanofi',
        icon:    '📱',
        about:   `Em 2024, atuei em um projeto para a empresa farmacêutica Sanofi. O desafio proposto era
                  identificar um problema interno e propor uma solução tecnológica para resolvê-lo.`,
        details: `O foco foi a falta de comprometimento e pontualidade na equipe operacional. Desenvolvemos
                  um aplicativo de controle de trabalho e produtividade que permitia registrar tarefas,
                  configurar alertas de lembretes e gerenciar o status das atividades (em andamento / concluído),
                  promovendo maior organização e responsabilidade.`,
        impact:  `Melhoria significativa na organização e pontualidade da equipe operacional, com redução
                  de atrasos e aumento da responsabilidade individual e transparência de processos.`,
        tech:    ['App Development', 'UI/UX', 'Python', 'Banco de Dados', 'Notificações'],
    },
    project4: {
        title:   'Braço Robótico Seletor com IA',
        year:    '2025',
        partner: 'SPI Integração de Sistemas',
        icon:    '🤖',
        about:   `Em 2025, desenvolvemos um braço robótico seletor de objetos para a empresa SPI Integração
                  de Sistemas. Este projeto de alta complexidade foi um dos mais desafiadores do meu percurso
                  acadêmico, unindo robótica, eletrônica e inteligência artificial.`,
        details: `O sistema utilizou motores para garantir a movimentação completa da estrutura, além de
                  sensores e uma bomba de sucção para a manipulação segura dos itens. A parte central do
                  sistema é a Inteligência Artificial programada para reconhecer o objeto correto, ativar a
                  garra, realizar a sucção, pegar o item e depositá-lo no local designado com precisão.`,
        impact:  `Sistema de automação industrial com IA que pode ser escalado para linhas de produção,
                  logística e triagem de materiais, reduzindo erros humanos e aumentando a eficiência operacional.`,
        tech:    ['IA / Machine Learning', 'Python', 'IoT', 'Robótica', 'Computer Vision', 'Sensores', 'Motores', 'Bomba de Sucção'],
        images:  [
            'assets/projeto_robospi/1.jpeg',
            'assets/projeto_robospi/2.jpeg',
            'assets/projeto_robospi/3.jpeg',
            'assets/projeto_robospi/4.jpeg',
            'assets/projeto_robospi/5.jpeg',
            'assets/projeto_robospi/6.jpeg',
        ],
    },
};

const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

function openModal(id) {
    const d = modalData[id];
    if (!d) return;

    const techHTML = d.tech.map(t => `<span>${t}</span>`).join('');

    const mediaHTML = d.images
        ? `<div class="modal-gallery">${d.images.map(src => `<img src="${src}" alt="${d.title}" loading="lazy">`).join('')}</div>`
        : `<div class="modal-img-area"><span>${d.icon}</span><p>Imagem / Vídeo do Projeto</p><small>Em breve</small></div>`;

    modalContent.innerHTML = `
        ${mediaHTML}
        <h2>${d.title}</h2>
        <div class="modal-meta">
            <span class="modal-year">${d.year}</span>
            <span class="modal-partner"><i class="fas fa-handshake"></i> ${d.partner}</span>
        </div>
        <p>${d.about}</p>
        <h4>Detalhes Técnicos</h4>
        <p>${d.details}</p>
        <h4>Impacto</h4>
        <p>${d.impact}</p>
        <h4>Tecnologias Utilizadas</h4>
        <div class="project-tech" style="margin-top:.5rem">${techHTML}</div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });