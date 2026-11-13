/**
 * Fernando Santos — Portfolio Scripts
 * Interacciones limpias, ligeras y funcionales
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar iconos de Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Navbar blur en scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Menú móvil
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 4. Copiado rápido de email
    const emailStr = "fsantosp29@gmail.com";
    const heroBtn = document.getElementById('btn-copy-email');
    const bottomBtn = document.getElementById('btn-copy-email-bottom');
    const toast = document.getElementById('toast');

    function copyEmail() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(emailStr).then(showToast);
        } else {
            const input = document.createElement('input');
            input.value = emailStr;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            showToast();
        }
    }

    let toastTimer;
    function showToast() {
        if (!toast) return;
        toast.classList.remove('translate-y-16', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-16', 'opacity-0');
        }, 2500);
    }

    if (heroBtn) heroBtn.addEventListener('click', copyEmail);
    if (bottomBtn) bottomBtn.addEventListener('click', copyEmail);

    // 5. Modal de arquitectura de proyectos
    const projectDetails = {
        firmeza: {
            title: "Firmeza — Arquitectura y Decisiones Técnicas",
            type: "Full-Stack (.NET 10 + React + PostgreSQL)",
            summary: "Firmeza se diseñó como un sistema monolítico modular siguiendo Clean Architecture para garantizar que la lógica de negocio no dependa de frameworks ni de la base de datos.",
            layers: [
                {
                    name: "1. Capa de Dominio (Domain)",
                    detail: "Contiene las entidades principales (Material, Order, Supplier, Warehouse), enums de estado y reglas de negocio puras. No tiene ninguna dependencia externa."
                },
                {
                    name: "2. Capa de Aplicación (Application)",
                    detail: "Define las interfaces de repositorios, DTOs de entrada/salida y la orquestación de casos de uso (crear órdenes, descontar inventario, registrar entradas) con validaciones explícitas."
                },
                {
                    name: "3. Capa de Infraestructura (Infrastructure)",
                    detail: "Implementación de Entity Framework Core conectada a PostgreSQL, configuración de tablas con Fluent API, migraciones y generación de tokens JWT."
                },
                {
                    name: "4. Capa de Presentación (WebAPI & React)",
                    detail: "Controladores REST documentados con Swagger, middlewares para capturar excepciones globales y cliente en React + TypeScript que consume los endpoints tipados."
                }
            ],
            github: "https://github.com/FerSp29"
        },
        frame: {
            title: "Frame — Plantilla Base para APIs",
            type: "Backend (.NET Core)",
            summary: "Proyecto estructurado para servir como punto de partida en nuevas APIs y microservicios, con configuraciones listas para producción.",
            layers: [
                {
                    name: "Manejo de Errores Estandarizado",
                    detail: "Middleware que intercepta errores no controlados y genera respuestas con el estándar RFC 7807 (ProblemDetails)."
                },
                {
                    name: "Inyección de Dependencias Limpia",
                    detail: "Métodos de extensión separados por módulo para registrar servicios sin saturar el Program.cs."
                },
                {
                    name: "Contenerización con Docker",
                    detail: "Dockerfile multi-stage para compilar la aplicación en un contenedor de SDK y generar la imagen final con un runtime ligero de Alpine/Debian."
                }
            ],
            github: "https://github.com/FerSp29"
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTriggers = document.querySelectorAll('.open-modal-btn');

    if (modal && modalBody) {
        modalTriggers.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-project');
                const data = projectDetails[id];
                if (!data) return;

                modalBody.innerHTML = `
                    <div class="mb-4">
                        <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">${data.type}</span>
                        <h3 class="text-xl font-bold text-white mt-2">${data.title}</h3>
                        <p class="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">${data.summary}</p>
                    </div>

                    <div class="mt-5 space-y-3 border-t border-zinc-800 pt-4">
                        ${data.layers.map(layer => `
                            <div class="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                                <div class="text-xs font-semibold text-zinc-200 font-mono">${layer.name}</div>
                                <div class="text-xs text-zinc-400 mt-1 leading-normal">${layer.detail}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="text-xs font-medium px-3.5 py-2 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 flex items-center gap-1.5 transition-colors">
                            <i data-lucide="github" class="w-3.5 h-3.5"></i>
                            <span>Ver repositorio</span>
                        </a>
                        <button id="modal-inner-close" class="text-xs text-zinc-400 hover:text-white px-3 py-1.5 font-mono">
                            Cerrar
                        </button>
                    </div>
                `;

                if (window.lucide) window.lucide.createIcons();

                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';

                const innerClose = document.getElementById('modal-inner-close');
                if (innerClose) innerClose.addEventListener('click', closeModal);
            });
        });

        function closeModal() {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // 6. Año en el footer
    const yearElem = document.getElementById('year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
});
