document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollToPlugin);

    let currentLang = "ESP"; // Inicia en Español
    const translations = {
        ESP: {
            "nav-start": "INICIO",
            "m-nav-start": "INICIO",
            "nav-story": "HISTORIA",
            "m-nav-story": "HISTORIA",
            "nav-stack": "STACK",
            "m-nav-stack": "STACK",
            "nav-work": "TRABAJO",
            "m-nav-work": "TRABAJO",
            "nav-contact": "CONTACTO",
            "m-nav-contact": "CONTACTO",
            "hero-desc":
                "En mis 15 años como diseñador, sé que el diseño no solamente se ve, ayuda a entender.",
            "story-title": "// Narrativa",
            "story-desc":
                "Transformo problemas complejos en soluciones que se sienten naturales. Mi enfoque no se basa en suposiciones, sino en evidencia.",
            "stack-title": "// Software Stack",
            "work-title": "// Trabajo Seleccionado",
            "project-1": "Rediseño de YouTube Music",
            "contact-title": "// Contacto",
            exp: "Experto",
            adv: "Avanzado",
            prof: "Competente",
        },
        ENG: {
            "nav-start": "START",
            "m-nav-start": "START",
            "nav-story": "STORY",
            "m-nav-story": "STORY",
            "nav-stack": "STACK",
            "m-nav-stack": "STACK",
            "nav-work": "WORK",
            "m-nav-work": "WORK",
            "nav-contact": "CONTACT",
            "m-nav-contact": "CONTACT",
            "hero-desc":
                "In my 15 years as a designer, I know that design is not just seen, it helps to understand.",
            "story-title": "// Narrative",
            "story-desc":
                "I transform complex problems into solutions that feel natural. My approach is not based on assumptions, but on evidence.",
            "stack-title": "// Software Stack",
            "work-title": "// Selected Work",
            "project-1": "YouTube Music Redesign",
            "contact-title": "// Contact",
            exp: "Experienced",
            adv: "Advanced",
            prof: "Proficient",
        },
    };

    document.querySelectorAll(".lang-toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
            // Intercambio de idioma
            currentLang = currentLang === "ESP" ? "ENG" : "ESP";

            // Actualizar etiqueta del botón para mostrar el SIGUIENTE idioma disponible
            const nextLabel = currentLang === "ESP" ? "ENG" : "ESP";
            document.querySelectorAll(".lang-label").forEach((el) => (el.textContent = nextLabel));

            // Traducir contenidos por ID
            Object.keys(translations[currentLang]).forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.textContent = translations[currentLang][id];
            });

            // Traducir niveles del stack (vía data-attribute)
            document.querySelectorAll(".software-level").forEach((el) => {
                const key = el.getAttribute("data-lang");
                if (translations[currentLang][key]) el.textContent = translations[currentLang][key];
            });
        });
    });

    // Navegación suave con GSAP
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                gsap.to(window, { duration: 1, scrollTo: target, ease: "power4.out" });
            }
        });
    });

    // Animación de entrada para el Software Stack
    const stackObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.from(".software-row", {
                        opacity: 0,
                        y: 20,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: "power2.out",
                    });
                    stackObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    const stackSec = document.querySelector("#skills");
    if (stackSec) stackObserver.observe(stackSec);
});
