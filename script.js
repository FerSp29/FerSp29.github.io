/**
 * FERCHO.DEV — Portfolio Interactions & Dynamic Experience
 * Author: Fernando Santos | FerSp29
 * Stack: JavaScript (ES6+ Modular)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Typing Effect for Hero Subtitle
    initTypingEffect();

    // 3. Navbar Scrollspy & Glassmorphism Transition
    initNavbarScroll();

    // 4. Mobile Menu Navigation
    initMobileMenu();

    // 5. Spotlight Glow Effect on Bento & Project Cards
    initCardSpotlight();

    // 6. Interactive Projects Modal System
    initProjectModals();

    // 7. Clipboard Copy & Toast Feedback
    initClipboardCopy();

    // 8. Footer Year Auto-Update
    const yearElem = document.getElementById('current-year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
});

/* ==========================================================================
   1. Dynamic Typing Effect
   ========================================================================== */
function initTypingEffect() {
    const textTarget = document.getElementById('typing-text');
    if (!textTarget) return;

    const phrases = [
        '.NET Backend Developer',
        'Clean Architecture Specialist',
        'Full-Stack Developer (React & TS)',
        'C# & RESTful APIs Designer',
        'PostgreSQL & EF Core Enthusiast'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const pauseTime = 1800;
    const deleteSpeed = 40;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textTarget.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textTarget.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deleteSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentSpeed = 300;
        }

        setTimeout(type, currentSpeed);
    }

    type();
}

/* ==========================================================================
   2. Navbar Scroll Behavior & Active Links (Scrollspy)
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Glassmorphism background toggle
        if (scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ==========================================================================
   3. Mobile Menu Handling
   ========================================================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ==========================================================================
   4. Bento Card Mouse Spotlight Tracker
   ========================================================================== */
function initCardSpotlight() {
    const cards = document.querySelectorAll('.bento-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================================================
   5. Project Modals Data & Logic
   ========================================================================== */
const projectDetails = {
    firmeza: {
        title: "Firmeza — Sistema Integral de Suministros de Construcción",
        category: "Full-Stack • .NET 10 & React • Clean Architecture",
        description: "Firmeza es una plataforma de grado empresarial diseñada para solventar la desincronización de inventarios, órdenes de compra y entregas en obras civiles y comercializadoras de materiales.",
        architecture: [
            {
                layer: "Domain Layer",
                desc: "Entidades ricas (Material, Order, Supplier, Warehouse), Value Objects y reglas de negocio sin dependencias externas."
            },
            {
                layer: "Application Layer",
                desc: "Casos de uso desacoplados, DTOs, validaciones con FluentValidation y orquestación de comandos/consultas."
            },
            {
                layer: "Infrastructure Layer",
                desc: "Implementación de persistencia con Entity Framework Core 10, migraciones en PostgreSQL, hash seguro de credenciales y generación de JWTs."
            },
            {
                layer: "WebAPI & Presentation",
                desc: "Controladores REST documentados, rate limiting, middleware global de excepciones y cliente React + TypeScript con Vite."
            }
        ],
        highlights: [
            "Gestión multi-almacén con actualización atómica de stock para evitar race conditions.",
            "Roles jerárquicos: SuperAdmin, Administrador de Obra y Auditor.",
            "Trazabilidad completa de auditoría (quién modificó cada recurso y cuándo).",
            "Docker Compose listo para levantar base de datos y backend con un solo comando."
        ],
        github: "https://github.com/FerSp29"
    },
    frame: {
        title: "Frame — Acelerador y Boilerplate de Clean Architecture para .NET",
        category: "Backend Framework • .NET 8/10 SDK",
        description: "Plantilla creada para eliminar el boilerplate repetitivo al iniciar microservicios y APIs REST en .NET, garantizando buenas prácticas desde el primer commit.",
        architecture: [
            {
                layer: "Manejo Global de Excepciones",
                desc: "Middleware nativo que transforma excepciones no controladas en respuestas estandarizadas RFC 7807 (ProblemDetails)."
            },
            {
                layer: "Pipeline de Validación",
                desc: "Interceptores automáticos que validan payloads antes de llegar a los controladores de la API."
            },
            {
                layer: "Logging Estructurado",
                desc: "Configuración predeterminada para exportar logs en formato JSON listos para Elasticsearch, Seq o Azure Application Insights."
            }
        ],
        highlights: [
            "Configuración lista de Swagger / OpenAPI con esquema de autorización Bearer JWT.",
            "Health checks endpoints (/health y /ready) para despliegues en Kubernetes o Azure Container Apps.",
            "Configuración Dockerfile multi-stage optimizado para imágenes de mínimo peso."
        ],
        github: "https://github.com/FerSp29"
    },
    nexus: {
        title: "Nexus Billing & Inventory API",
        category: "Backend API • Concurrencia & Transacciones ACID",
        description: "Motor transaccional de facturación y control de caja con alta demanda de lecturas y escrituras concurrentes.",
        architecture: [
            {
                layer: "Bloqueo Optimista",
                desc: "Control de versiones en filas de inventario para rechazar ventas sobre stock agotado en tiempo real."
            },
            {
                layer: "Persistencia Eficiente",
                desc: "Consultas LINQ compiladas con AsNoTracking() para operaciones de sólo lectura y reportes masivos."
            },
            {
                layer: "Seguridad Perimetral",
                desc: "Políticas de CORS restrictivas, cabeceras seguras y validación de tokens de corta duración."
            }
        ],
        highlights: [
            "Transacciones con aislamiento Serializable en operaciones contables críticas.",
            "Paginación basada en cursor para millones de registros de auditoría.",
            "Pruebas de integración automatizadas para endpoints de facturación."
        ],
        github: "https://github.com/FerSp29"
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal-btn');
    const triggers = document.querySelectorAll('.open-project-modal');

    if (!modal || !modalContent) return;

    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = btn.getAttribute('data-project');
            const data = projectDetails[projectId];
            if (!data) return;

            modalContent.innerHTML = `
                <div class="mb-4">
                    <span class="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        ${data.category}
                    </span>
                    <h3 class="text-2xl sm:text-3xl font-extrabold text-white mt-3">${data.title}</h3>
                    <p class="text-slate-300 text-sm mt-3 leading-relaxed">${data.description}</p>
                </div>

                <div class="mt-6 border-t border-white/10 pt-4">
                    <h4 class="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                        <i data-lucide="layers" class="w-4 h-4 text-cyan-400"></i> Desglose Arquitectónico
                    </h4>
                    <div class="space-y-3">
                        ${data.architecture.map(item => `
                            <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                                <span class="text-xs font-bold text-cyan-300 font-mono">${item.layer}</span>
                                <p class="text-xs sm:text-sm text-slate-300 mt-1">${item.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="mt-6 border-t border-white/10 pt-4">
                    <h4 class="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i> Puntos Clave de Rendimiento
                    </h4>
                    <ul class="space-y-2 text-xs sm:text-sm text-slate-300">
                        ${data.highlights.map(h => `
                            <li class="flex items-start gap-2">
                                <span class="text-purple-400 mt-0.5">•</span>
                                <span>${h}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white">
                        <i data-lucide="github" class="w-4 h-4"></i> Explorar en GitHub
                    </a>
                    <button class="modal-close-trigger px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5">
                        Cerrar
                    </button>
                </div>
            `;

            // Re-run lucide icons for modal content
            if (window.lucide) {
                window.lucide.createIcons();
            }

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            // Bind dynamic close button inside modal
            const innerClose = modalContent.querySelector('.modal-close-trigger');
            if (innerClose) {
                innerClose.addEventListener('click', closeModal);
            }
        });
    });

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   6. Clipboard Copy & Toast Feedback
   ========================================================================== */
function initClipboardCopy() {
    const emailToCopy = "fsantosp29@gmail.com";
    const heroCopyBtn = document.getElementById('btn-copy-email-hero');
    const cardCopyBtn = document.getElementById('btn-copy-email-card');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    function copyEmail() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(emailToCopy).then(() => {
                showToast("¡fsantosp29@gmail.com copiado al portapapeles!");
            }).catch(() => {
                fallbackCopy(emailToCopy);
            });
        } else {
            fallbackCopy(emailToCopy);
        }
    }

    function fallbackCopy(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast("¡fsantosp29@gmail.com copiado al portapapeles!");
    }

    let toastTimeout;
    function showToast(message) {
        if (!toast) return;
        toastMessage.textContent = message;
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3200);
    }

    if (heroCopyBtn) heroCopyBtn.addEventListener('click', copyEmail);
    if (cardCopyBtn) cardCopyBtn.addEventListener('click', copyEmail);
}
