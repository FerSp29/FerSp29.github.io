# Fercho.dev — Portafolio Profesional de Software Developer

> **Fernando Santos** | Junior Software Developer (.NET / Backend & Full-Stack)  
> Ubicación: Barranquilla, Colombia • Email: fsantosp29@gmail.com • GitHub: [@FerSp29](https://github.com/FerSp29)

Sitio web y portafolio interactivo de alto impacto diseñado para desplegarse instantáneamente en **GitHub Pages** bajo el dominio `https://FerSp29.github.io`.

---

## 🚀 Características Principales

- **Arquitectura Zero-Build**: Construido en HTML5 semántico, CSS3 moderno (Variables nativas, Grid, Flexbox, efectos Glassmorphism) y JavaScript ES6+ modular. No requiere pasos de compilación complejos (`npm run build`), lo que permite que cualquier cambio en la rama `main` se refleje de inmediato en GitHub Pages.
- **Estética Dark Mode Premium**:
  - Fondo refinado `#09090b` con orbes de luz ambiental animados.
  - Tarjetas estilo **Bento Grid** con efecto de **spotlight interactivo** que sigue las coordenadas del cursor del usuario.
  - Acentos visuales en tonos púrpura (`#8b5cf6`), cian (`#06b6d4`) e índigo (`#6366f1`).
- **Microinteracciones y Dinamismo**:
  - Efecto de escritura dinámico en el Hero (*typing effect*) rotando especialidades clave.
  - Terminal de código interactivo en el Hero mostrando la arquitectura de dominio en C# y .NET 10.
  - Navbar flotante inteligente con desenfoque de fondo (*backdrop blur*) y detección de sección activa (*scrollspy*).
  - Modal interactivo para inspeccionar la arquitectura en capas y decisiones técnicas de los proyectos insignia.
  - Copiado rápido de email con retroalimentación visual tipo toast.
  - Menú hamburguesa responsivo y accesible para móviles y tablets.
- **Tipografía e Iconografía**:
  - *Plus Jakarta Sans* para jerarquía editorial y lectura fluida.
  - *JetBrains Mono* para tags técnicos, snippets y datos de arquitectura.
  - Logos e iconos auténticos con *Devicon* y *Lucide Icons*.

---

## 🛠️ Stack Tecnológico Representado

- **Backend & Core**: C#, .NET 8 / 10, ASP.NET Core Web APIs, Entity Framework Core, LINQ, JWT, Principios SOLID & Clean Architecture.
- **Bases de Datos**: PostgreSQL, SQL Server, modelado relacional e integridad referencial.
- **Frontend**: React, TypeScript, JavaScript moderno, HTML5 semántico, CSS3 / Tailwind.
- **DevOps & Herramientas**: Docker, Azure, Git, GitHub, JetBrains Rider, Linux.

---

## 📦 Estructura del Proyecto

```text
fersp29-portfolio/
├── .nojekyll         # Previene el procesamiento de Jekyll en GitHub Pages
├── index.html        # Estructura semántica, accesibilidad y maquetación Bento
├── styles.css        # Variables CSS, glassmorphism, orbes ambientales y spotlight
├── script.js         # Lógica interactiva: typing effect, modals, spotlight, toasts
└── README.md         # Documentación de despliegue y mantenimiento
```

---

## 🚢 Pasos para Desplegar en GitHub Pages

Para publicar tu portafolio en `https://FerSp29.github.io`:

1. **Crear o clonar tu repositorio especial de GitHub Pages**:
   Crea un repositorio en GitHub con el nombre exacto: `FerSp29.github.io` (debe ser público).

2. **Subir los archivos del portafolio**:
   Copia el contenido de esta carpeta (`index.html`, `styles.css`, `script.js`, `.nojekyll`, `README.md`) y realiza el push a la rama `main`:
   ```bash
   git init
   git add .
   git commit -m "feat: Lanzamiento inicial del portafolio profesional Fercho.dev"
   git branch -M main
   git remote add origin https://github.com/FerSp29/FerSp29.github.io.git
   git push -u origin main
   ```

3. **Verificar la configuración de GitHub Pages**:
   - En tu repositorio de GitHub, ve a **Settings** > **Pages**.
   - En **Source**, asegúrate de que esté seleccionado `Deploy from a branch`.
   - En **Branch**, selecciona `main` y la carpeta `/(root)`.
   - Haz clic en **Save**. En un par de minutos tu sitio estará en vivo en:
     👉 **https://FerSp29.github.io**
