document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollToPlugin);

    // --- LÓGICA DE IDIOMA ---
    let currentLang = "ESP";

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
                "He pasado los últimos 15 años aprendiendo que el diseño no es lo que se ve, sino lo que se entiende.",
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
                "I have spent the last 15 years learning that design is not what you see, but what you understand.",
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

    const toggleLang = () => {
        currentLang = currentLang === "ESP" ? "ENG" : "ESP";

        // Actualizar etiquetas de los botones
        document.querySelectorAll(".lang-label").forEach((el) => (el.textContent = currentLang));

        // Actualizar textos por ID
        Object.keys(translations[currentLang]).forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.textContent = translations[currentLang][id];
        });

        // Actualizar niveles del Stack (usando data-attributes)
        document.querySelectorAll(".software-level").forEach((el) => {
            const key = el.getAttribute("data-lang");
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });
    };

    document.querySelectorAll(".lang-toggle").forEach((btn) => {
        btn.addEventListener("click", toggleLang);
    });

    // --- LÓGICA DE SCROLL Y OBSERVER (LO LOGRADO ANTERIORMENTE) ---
    const links = document.querySelectorAll("nav a");
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    gsap.to(window, {
                        duration: 0.8,
                        scrollTo: { y: targetSection, autoKill: false },
                        ease: "power3.inOut",
                    });
                }
            }
        });
    });

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
        observer.observe(section);
    });
});
