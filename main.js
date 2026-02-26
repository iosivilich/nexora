const canvas = document.getElementById('canvas-nodes');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 40;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(109, 94, 243, 0.5)';
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();

        particles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 * (1 - distance / 150)})`;
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animate);
}

animate();

// Career Interactivity & Consultant Grid
const consultants = [
    {
        id: 1,
        name: 'Elena Rodríguez',
        category: 'tech',
        area: 'Blockchain & Web3 Architecture',
        desc: 'Arquitecta de sistemas descentralizados con enfoque en seguridad.',
        img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        fullBio: 'Elena es pionera en la implementación de Smart Contracts seguros. Ha auditado protocolos DeFi con más de $500M TVL y diseñado la infraestructura blockchain para tres neobancos europeos. Su especialidad es la transición de infraestructuras legacy hacia soluciones Web3 escalables.',
        skills: ['Solidity', 'Rust', 'EVM Security', 'Web3.js', 'System Design'],
        projects: 142,
        experience: '9+ años',
        quote: 'La descentralización no es solo tecnología, es la nueva base de la confianza empresarial.'
    },
    {
        id: 2,
        name: 'Marco Silvoni',
        category: 'finance',
        area: 'FinTech & Banking Strategy',
        desc: 'Estratega financiero experto en regulación y banca digital.',
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
        fullBio: 'Ex-ejecutivo de Goldman Sachs con una visión disruptiva. Marco ha guiado la salida a bolsa de dos exitosas fintech latinoamericanas y asesorado a bancos centrales en la implementación de monedas digitales (CBDCs). Es experto en optimización de capital y cumplimiento regulatorio internacional.',
        skills: ['Financial Modeling', 'Compliance', 'M&A', 'CBDCs', 'Strategic Planning'],
        projects: 95,
        experience: '16+ años',
        quote: 'El futuro del dinero es digital, transparente y programable.'
    },
    {
        id: 3,
        name: 'Sofía Lin',
        category: 'strategy',
        area: 'Exponential Growth Strategy',
        desc: 'Experta en escalado internacional de startups tecnológicas.',
        img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
        fullBio: 'Sofía ha sido la mente detrás del crecimiento de tres unicornios en Silicon Valley. Su metodología "Exponential Leap" combina análisis de datos masivos con psicología del consumidor para desbloquear canales de adquisición que la competencia ignora por completo.',
        skills: ['Growth Hacking', 'International Expansion', 'Data Analytics', 'Business Model Canvas'],
        projects: 68,
        experience: '8+ años',
        quote: 'Si tu negocio no escala mientras duermes, no tienes un negocio, tienes un auto-empleo.'
    },
    {
        id: 4,
        name: 'Javier Peralta',
        category: 'marketing',
        area: 'Global Branding & Creative Strategy',
        desc: 'Director creativo especializado en marcas de alto impacto.',
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
        fullBio: 'Galardonado en Cannes Lions, Javier transforma empresas locales en marcas globales con alma. Cree que el marketing funcional ha muerto; lo que hoy mueve mercados son las historias que generan pertenencia y propósito.',
        skills: ['Storytelling', 'Consumer Behavior', 'Content Strategy', 'UX Writing'],
        projects: 215,
        experience: '12+ años',
        quote: 'Las personas no compran productos, compran mejores versiones de sí mismas.'
    },
    {
        id: 5,
        name: 'Ana Mestre',
        category: 'tech',
        area: 'AI & Data Science Lead',
        desc: 'Líder técnica en implementación de IA generativa y LLMs.',
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        fullBio: 'Ph.D. en Ciencias de la Computación, Ana traduce el ruido de la IA en resultados de negocio tangibles. Ha desarrollado sistemas de recomendación que aumentaron la retención en un 40% para plataformas de streaming y optimizado cadenas de suministro globales mediante modelos predictivos.',
        skills: ['Python', 'Large Language Models', 'Predictive Analytics', 'TensorFlow'],
        projects: 51,
        experience: '7+ años',
        quote: 'La IA no reemplazará a los humanos, pero los humanos que usan IA sí reemplazarán a los que no.'
    },
    {
        id: 6,
        name: 'Lucas Tanizaki',
        category: 'strategy',
        area: 'Organizational Change Management',
        desc: 'Consultor de cultura y procesos de transformación ágil.',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        fullBio: 'Lucas es experto en desbloquear el potencial humano en entornos corporativos rígidos. Su enfoque ágil ha permitido a corporaciones tradicionales adoptar una mentalidad de startup, reduciendo el "time-to-market" en más de un 60% mediante la optimización de flujos de trabajo.',
        skills: ['Agile Coaching', 'Lean Six Sigma', 'Leadership Training', 'Org Design'],
        projects: 74,
        experience: '14+ años',
        quote: 'La cultura se desayuna a la estrategia todas las mañanas.'
    }
];

const careers = [
    "Ingeniería de Software", "Data Science", "Ciberseguridad", "Arquitectura Cloud",
    "Analista Financiero", "Gestión de Inversiones", "Economía Digital", "Auditoría de Riesgos",
    "Estratega de Negocios", "Consultor UX Strategy", "Liderazgo Ágil", "Operaciones",
    "Growth Hacking", "Content Strategy", "Performance Marketing", "Social Media Manager"
];

const grid = document.getElementById('main-consultants-grid');
const careerInput = document.getElementById('career-input');
const suggestionsBox = document.getElementById('search-suggestions');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('consultant-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

function renderConsultants(filter = 'all') {
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = filter === 'all' ? consultants : consultants.filter(c => c.category === filter);

    filtered.forEach(c => {
        const card = document.createElement('div');
        card.className = 'consultant-item';
        card.innerHTML = `
            <img src="${c.img}" alt="${c.name}" class="item-img">
            <div class="item-content">
                <span class="item-category">${c.area}</span>
                <h4>${c.name}</h4>
                <p class="item-desc">${c.desc}</p>
                <div class="item-footer">
                    <button class="view-profile-btn" onclick="openProfile(${c.id})">Ver Perfil</button>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D5EF3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Modal Logic
window.openProfile = function (id) {
    const consultant = consultants.find(c => c.id === id);
    if (!consultant) return;

    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${consultant.img}" alt="${consultant.name}" class="modal-img">
            <div class="modal-title">
                <h2>${consultant.name}</h2>
                <p class="specialty">${consultant.area}</p>
                <p class="experience-badge">${consultant.experience} de excelencia</p>
            </div>
        </div>
        <div class="modal-main-content">
            <div class="modal-description">
                <p class="modal-quote">"${consultant.quote}"</p>
                <h4>Trayectoria Estratégica</h4>
                <p>${consultant.fullBio}</p>
            </div>
            <div class="modal-info-grid">
                <div class="info-item">
                    <h4>Impacto</h4>
                    <div class="stat-circle">
                        <span class="stat-number">${consultant.projects}</span>
                        <span class="stat-label">Proyectos</span>
                    </div>
                </div>
                <div class="info-item">
                    <h4>Core Stack & Skills</h4>
                    <div class="skills-tags">
                        ${consultant.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer-actions">
            <button class="btn btn-primary btn-full" onclick="initContact('${consultant.name}')">Agendar Consultoría Senior</button>
        </div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

if (closeModal) {
    closeModal.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderConsultants(btn.dataset.category);
    });
});

// Search Logic
if (careerInput) {
    careerInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        if (val.length < 2) {
            suggestionsBox.style.display = 'none';
            return;
        }

        const matches = careers.filter(c => c.toLowerCase().includes(val));

        if (matches.length > 0) {
            suggestionsBox.innerHTML = matches.map(m => `<div class="suggestion-item">${m}</div>`).join('');
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    });

    suggestionsBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-item')) {
            careerInput.value = e.target.textContent;
            suggestionsBox.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!careerInput.contains(e.target)) {
            suggestionsBox.style.display = 'none';
        }
    });
}

// Signup Form Switching
window.switchForm = function (type) {
    const btns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.signup-form');

    btns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(type)) btn.classList.add('active');
    });

    forms.forEach(form => {
        form.classList.remove('active');
        if (form.id === `form-${type}`) form.classList.add('active');
    });
}

// NEXA AI LOGIC - INTUITIVE VERSION
const nexaTrigger = document.getElementById('nexa-trigger');
const nexaChat = document.getElementById('nexa-chat');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');
const chatMessages = document.getElementById('chat-messages');

const nexaKnowledge = {
    mision: "Nuestra misión es transformar la consultoría empresarial mediante una conexión rápida, precisa y tecnológica entre expertos y organizaciones de alto nivel.",
    identidad: "Nexora utiliza una paleta de Azul Eléctrico (#2563EB), Púrpura Estratégico (#6D5EF3) y Verde Acción (#22C55E). Es una estética diseñada para transmitir confianza, modernidad y alto rendimiento.",
    tecnologias: "Nuestra plataforma está construida con un stack de vanguardia: HTML5 semántico, CSS3 avanzado (Glassmorphism, Flexbox, Grid) y JavaScript Vanilla optimizado. Todo desplegado en Vercel con integración continua.",
    consultores: "Contamos con una red de élite: Elena Rodríguez (Blockchain), Marco Silvoni (FinTech), Sofía Lin (Crecimiento), Javier Peralta (Branding), Ana Mestre (IA) y Lucas Tanizaki (Cultura Organizacional).",
    startup: "Nexora no es solo un directorio; es la plataforma definitiva que conecta el mejor talento consultor con los retos corporativos más desafiantes del mercado global.",
    creadores: "Nexora es liderada por un equipo visionario: @iosivilich (Project Lead), @JuanEContrerasP (Head of Strategy) y el equipo de ingeniería de @Quiroga.",
    servicios: "Ofrecemos consultoría estratégica en Tecnología (IA, Blockchain, Dev), Finanzas (Estrategia, Regulación), Estrategia de Negocios y Marketing Creativo de alto impacto.",
    contacto: "Puedes contactarnos vía email en hola@nexora.io, por teléfono al +57 300 000 0000, o seguirnos en nuestras redes sociales oficiales (LinkedIn, X, Instagram) en la sección 'Contáctanos'."
};

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
}

function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message nexa typing';
    typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

function processNexaResponse(input) {
    const query = input.toLowerCase();
    const typingIndicator = showTyping();

    let response = "Interesante planteamiento. Como Nexa, estoy analizando la mejor ruta estratégica para responderte. ¿Te gustaría saber sobre nuestro equipo de consultores, nuestra misión o cómo inscribirte?";

    // Enhanced Intuition Logic
    const keywords = {
        mision: ["mision", "proposito", "objetivo", "meta", "buscan"],
        identidad: ["color", "logo", "visual", "diseño", "look"],
        tech: ["tecnologia", "tech", "stack", "lenguaje", "programación", "vercel"],
        experts: ["quien", "experto", "consultor", "persona", "equipo", "talento"],
        founder: ["juan", "quiroga", "iosiv", "creador", "dueño", "jefe"],
        services: ["servicio", "que hacen", "ofrecen", "ayuda"],
        signup: ["inscribir", "registro", "unirme", "trabajar", "contratar", "formulario"]
    };

    if (keywords.mision.some(k => query.includes(k))) response = nexaKnowledge.mision;
    else if (keywords.identidad.some(k => query.includes(k))) response = nexaKnowledge.identidad;
    else if (keywords.tech.some(k => query.includes(k))) response = nexaKnowledge.tecnologias;
    else if (keywords.experts.some(k => query.includes(k))) response = nexaKnowledge.consultores;
    else if (keywords.founder.some(k => query.includes(k))) {
        if (query.includes("juan")) response = "Juan Contreras (@JuanEContrerasP) es nuestro estratega principal y co-arquitecto de la visión Nexora. ¿Quieres ver su impacto en el proyecto?";
        else if (query.includes("iosiv")) response = "Iosivilich es nuestro Project Lead, encargado de que la visión de Nexora se ejecute con precisión milimétrica.";
        else response = nexaKnowledge.creadores;
    }
    else if (keywords.services.some(k => query.includes(k))) response = nexaKnowledge.servicios;
    else if (keywords.signup.some(k => query.includes(k))) response = nexaKnowledge.contacto;
    else if (query.includes("gracias") || query.includes("bueno") || query.includes("ok")) response = "¡Un placer asistirte! En Nexora estamos para escalar tus ideas. ¿Hay algo más en lo que pueda profundizar?";
    else if (query.includes("hola") || query.includes("que tal") || query.includes("hey")) response = "¡Hola! Soy Nexa. Estoy lista para asistirte en tu navegación estratégica por Nexora. ¿Hablamos de talento, tecnología o de nuestra misión?";

    setTimeout(() => {
        typingIndicator.remove();
        appendMessage(response, 'nexa');
    }, 1200);
}

window.initContact = function (name) {
    alert(`Iniciando canal prioritario de comunicación con ${name}. Un estratega de Nexora se pondrá en contacto pronto.`);
}

if (nexaTrigger) {
    nexaTrigger.onclick = () => {
        nexaChat.style.display = nexaChat.style.display === 'flex' ? 'none' : 'flex';
    };
}

if (closeChat) {
    closeChat.onclick = () => {
        nexaChat.style.display = 'none';
    };
}

function handleSend() {
    const text = chatInput.value.trim();
    if (text) {
        appendMessage(text, 'user');
        chatInput.value = '';
        processNexaResponse(text);
    }
}

if (sendChat) sendChat.onclick = handleSend;
if (chatInput) {
    chatInput.onkeypress = (e) => {
        if (e.key === 'Enter') handleSend();
    };
}

// Init
renderConsultants();

// Scroll Spy & Smooth Scroll Logic
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let scrollPos = window.scrollY + 100; // Adjustment for navbar height

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    if (window.scrollY < 50) {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    }
}

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.length > 1 && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

window.addEventListener('scroll', () => {
    updateActiveLink();

    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.background = 'rgba(10, 31, 68, 0.95)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.background = 'rgba(10, 31, 68, 0.8)';
    }
});

updateActiveLink();
