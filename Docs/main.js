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
    { name: 'Elena R.', category: 'tech', area: 'Blockchain & Web3', desc: 'Experta en arquitecturas descentralizadas y smart contracts.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Marco S.', category: 'finance', area: 'FinTech Strategy', desc: 'Consultor senior para startups financieras y banca digital.', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sofía L.', category: 'strategy', area: 'Crecimiento Exponencial', desc: 'Especialista en escalado de modelos de negocio disruptivos.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
    { name: 'Javier P.', category: 'marketing', area: 'Digital Branding', desc: 'Narrativas de marca con impacto global y posicionamiento SEO.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
    { name: 'Ana M.', category: 'tech', area: 'AI & Machine Learning', desc: 'Implementación estratégica de modelos predictivos y LLMs.', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
    { name: 'Lucas T.', category: 'strategy', area: 'Gestión del Cambio', desc: 'Acompañamiento en procesos de transformación organizacional.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' }
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
                    <a href="#" class="view-profile">Ver Perfil</a>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D5EF3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
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

// Init
renderConsultants();

// Interactivity for navbar scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.background = 'rgba(10, 31, 68, 0.95)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.background = 'rgba(10, 31, 68, 0.8)';
    }
});
