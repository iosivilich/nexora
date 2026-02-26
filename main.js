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
        name: 'Elena R.',
        category: 'tech',
        area: 'Blockchain & Web3',
        desc: 'Experta en arquitecturas descentralizadas y smart contracts.',
        img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        fullBio: 'Elena ha liderado la implementación de soluciones Web3 para gobiernos y empresas Fortune 500. Su enfoque se centra en la escalabilidad y la interoperabilidad de redes descentralizadas.',
        skills: ['Solidity', 'Rust', 'Hyperledger', 'Web3.js'],
        projects: 124,
        experience: '8+ años'
    },
    {
        id: 2,
        name: 'Marco S.',
        category: 'finance',
        area: 'FinTech Strategy',
        desc: 'Consultor senior para startups financieras y banca digital.',
        img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80',
        fullBio: 'Marco es un veterano de la banca tradicional que hizo la transición al mundo cripto y fintech hace una década. Ayuda a bancos a modernizar su infraestructura y a startups a navegar regulaciones complejas.',
        skills: ['Risk Management', 'Bank Regulations', 'DeFi', 'Product Management'],
        projects: 87,
        experience: '15+ años'
    },
    {
        id: 3,
        name: 'Sofía L.',
        category: 'strategy',
        area: 'Crecimiento Exponencial',
        desc: 'Especialista en escalado de modelos de negocio disruptivos.',
        img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        fullBio: 'Sofía se especializa en "Growth Hacking" corporativo. Ha trabajado con unicornios tecnológicos ayudándolos a pasar de la fase de validación a la internacionalización masiva.',
        skills: ['Market Entry', 'Scaling', 'Venture Capital', 'Business Design'],
        projects: 56,
        experience: '7+ años'
    },
    {
        id: 4,
        name: 'Javier P.',
        category: 'marketing',
        area: 'Digital Branding',
        desc: 'Narrativas de marca con impacto global y posicionamiento SEO.',
        img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        fullBio: 'Javier entiende que una marca es más que un logo; es una historia que resuena. Ha transformado la presencia digital de marcas obsoletas convirtiéndolas en líderes de conversación social.',
        skills: ['SEO', 'Content Marketing', 'Storytelling', 'Analytics'],
        projects: 190,
        experience: '10+ años'
    },
    {
        id: 5,
        name: 'Ana M.',
        category: 'tech',
        area: 'AI & Machine Learning',
        desc: 'Implementación estratégica de modelos predictivos y LLMs.',
        img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80',
        fullBio: 'Ana ayuda a las empresas a no quedarse atrás en la revolución de la IA. Desde la automatización de procesos hasta la creación de agentes inteligentes personalizados.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'LLM Fine-tuning'],
        projects: 45,
        experience: '6+ años'
    },
    {
        id: 6,
        name: 'Lucas T.',
        category: 'strategy',
        area: 'Gestión del Cambio',
        desc: 'Acompañamiento en procesos de transformación organizacional.',
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        fullBio: 'Lucas es el experto al que llamas cuando tu empresa está en crisis de identidad o transformación. Su metodología de gestión del cambio reduce la fricción y aumenta la productividad del equipo.',
        skills: ['Agile', 'Organizational Psychology', 'Lean', 'Coaching'],
        projects: 67,
        experience: '12+ años'
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
            </div>
        </div>
        <div class="modal-description">
            <h4>Sobre ${consultant.name}</h4>
            <p>${consultant.fullBio}</p>
        </div>
        <div class="modal-info-grid">
            <div class="info-item">
                <h4>Experiencia</h4>
                <p>${consultant.experience}</p>
            </div>
            <div class="info-item">
                <h4>Proyectos Exitosos</h4>
                <p>${consultant.projects}</p>
            </div>
            <div class="info-item">
                <h4>Habilidades Clave</h4>
                <div class="skills-tags">
                    ${consultant.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
            </div>
        </div>
        <div style="margin-top: 2.5rem; text-align: center;">
            <button class="btn btn-primary" onclick="alert('Iniciando proceso de contacto con ${consultant.name}...')">Contactar Ahora</button>
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

// NEXA AI LOGIC
const nexaTrigger = document.getElementById('nexa-trigger');
const nexaChat = document.getElementById('nexa-chat');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');
const chatMessages = document.getElementById('chat-messages');

const nexaKnowledge = {
    mision: "Nuestra misión es transformar la consultoría empresarial mediante una conexión rápida, precisa y tecnológica entre expertos y organizaciones.",
    identidad: "Azul Eléctrico (#2563EB), Púrpura Estratégico (#6D5EF3) y Verde Acción (#22C55E). Es visualmente profesional, moderna y de alto rendimiento.",
    tecnologias: "Frontend con HTML5, CSS3 (Glassmorphism) y JS Vanilla. Despliegue en Vercel con CI/CD.",
    consultores: "Contamos con expertos en Blockchain (Elena R.), FinTech (Marco S.), Estrategia (Sofía L.), Marketing (Javier P.), IA (Ana M.) y Gestión del Cambio (Lucas T.).",
    startup: "Nexora es la plataforma que conecta al mejor talento consultor con los retos corporativos más desafiantes.",
    creadores: "El equipo principal está formado por @iosivilich, @JuanEContrerasP y el equipo técnico de @Quiroga."
};

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processNexaResponse(input) {
    const query = input.toLowerCase();
    let response = "Interesante pregunta. Como Nexa AI, estoy procesando tu solicitud estratégica. ¿Te refieres a nuestros consultores, nuestra misión o tecnología?";

    if (query.includes("misión") || query.includes("mision") || query.includes("misión?")) response = nexaKnowledge.mision;
    else if (query.includes("colores") || query.includes("identidad") || query.includes("logo")) response = nexaKnowledge.identidad;
    else if (query.includes("tecnología") || query.includes("tech") || query.includes("stack")) response = nexaKnowledge.tecnologias;
    else if (query.includes("consultores") || query.includes("expertos")) response = nexaKnowledge.consultores;
    else if (query.includes("quien eres") || query.includes("que es nexora")) response = nexaKnowledge.startup;
    else if (query.includes("equipo") || query.includes("humanos") || query.includes("creadores")) response = nexaKnowledge.creadores;
    else if (query.includes("hola") || query.includes("buenos dias")) response = "¡Hola! Soy Nexa. Estoy lista para ayudarte con cualquier duda sobre Nexora. ¿Qué necesitas saber?";

    setTimeout(() => {
        appendMessage(response, 'nexa');
    }, 600);
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
