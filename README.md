# Nexora 🚀

Nexora es un proyecto web moderno desarrollado con tecnologías estándar (HTML, CSS y JavaScript) y desplegado de forma profesional utilizando herramientas de vanguardia.

## 📋 Descripción del Proyecto
Este repositorio contiene el código fuente de la plataforma **Nexora**, una interfaz web optimizada y responsiva diseñada para ofrecer una experiencia de usuario premium.

## 🚀 Despliegue y Herramientas
Para llevar este proyecto a producción, se siguieron los siguientes pasos técnicos:

1.  **Instalación de GitHub CLI (`gh`)**: Se configuró la herramienta de línea de comandos oficial de GitHub para gestionar el repositorio directamente desde la terminal de Ubuntu.
2.  **Configuración de Git**: Se inicializó el repositorio local, configurando la identidad del autor (`iosivilich`).
3.  **Vercel CLI**: Se instaló Node.js y la interfaz de comandos de Vercel para realizar un despliegue rápido y eficiente.
4.  **Hosting**: La página está alojada en **Vercel**, aprovechando su infraestructura de red global para archivos estáticos.
5.  **Nexa AI Agent**: Se creó un sistema de memoria centralizado en `nexa.md` para coordinar el desarrollo y mantener el contexto estratégico del proyecto.

## 📅 Últimas Actualizaciones
- **25 Feb 2026**: Ajustes visuales y corrección de navegación (Rama `iosiv`).
    - **Logo reducido 25%**: Tamaño ajustado de 60px a 45px para mejor proporción visual.
    - **CTA Garantizados**: Los botones "Encuentra un Consultor" y "Hablar con un Experto" llevan navegación `onclick` directa (`scrollIntoView`) para que funcionen de forma independiente del JS externo, eliminando problemas de caché o carga tardía.
    - **Optimización de Scroll**: Cálculo de posición mejorado con `getBoundingClientRect()` en `main.js` para un desplazamiento preciso compensando la navbar fija.
- **23 Feb 2026 (Noche)**: Refactorización de UX y navegación dinámica.
    - Implementación de **Scroll Spy**: La navegación resalta automáticamente la sección activa.
    - **Navegador de Carreras**: Añadido buscador con autocompletado y filtros por categorías (Tech, Finanzas, etc.).
    - **Sección Interactiva**: Se hizo funcional la sección "Qué Ofrecemos" con carga dinámica de consultores.
    - **Ajustes de Marca**: Aumento del 25% en el texto de marca y reducción del 25% en la imagen del logo.
    - **Limpieza de Proyecto**: Eliminación de directorios redundantes (`.vercel` raíz).
- **23 Feb 2026**: Ajustes dimensionales iniciales del logo.
- **20 Feb 2026**: Reorganización estructural completa. Se centralizaron todos los archivos del proyecto (HTML, CSS, activos y configuración de Vercel) dentro de la carpeta `Docs/` para mantener una raíz limpia.
- **20 Feb 2026**: Cambio de activos. Se estableció `Logo.png` como el logo oficial y se actualizó la tipografía de marca a **Montserrat**.
- **18 Feb 2026**: Inicialización de la memoria del agente Nexa y configuración de la estructura definitiva de ramas para el equipo.

## 👥 Colaboradores
Este proyecto es un esfuerzo colaborativo. Se han enviado invitaciones de colaboración a los siguientes miembros del equipo:

*   **@iosivilich** (Propietario)
*   **@JuanEContrerasP**
*   **@Quirogato**

## 🌿 Estructura de Ramas (Branches)
Para organizar el desarrollo colaborativo, se han creado ramas específicas para cada integrante del equipo técnico:

*   `iosiv`: Rama principal de desarrollo para Iosiv.
*   `sebastian`: Rama dedicada a las funcionalidades y diseños de Sebastian.
*   `juan`: Rama de trabajo para Juan.

Cada colaborador debe trabajar en su respectiva rama antes de realizar un Merge a la rama principal.

## 🛠️ Tecnologías Utilizadas
*   **HTML5**: Estructura semántica.
*   **CSS3**: Diseño moderno y responsivo.
*   **JavaScript**: Lógica de interacción en el lado del cliente.
*   **Git & GitHub**: Control de versiones y colaboración.
*   **Vercel**: Plataforma de despliegue continuo.

---
*Este README fue generado automáticamente como parte del proceso de documentación del proyecto.*
