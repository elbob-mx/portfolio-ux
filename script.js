document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollToPlugin);

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
            currentLang = currentLang === "ESP" ? "ENG" : "ESP";
            document
                .querySelectorAll(".lang-label")
                .forEach((el) => (el.textContent = currentLang));
            Object.keys(translations[currentLang]).forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.textContent = translations[currentLang][id];
            });
            document.querySelectorAll(".software-level").forEach((el) => {
                const key = el.getAttribute("data-lang");
                if (translations[currentLang][key]) el.textContent = translations[currentLang][key];
            });
        });
    });

    const stackContainer = document.getElementById("skills");
    const softwareRows = document.querySelectorAll(".software-row");
    gsap.set(softwareRows, { opacity: 0, x: -20 });
    const stackObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.to(softwareRows, {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                    });
                    stackObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );
    if (stackContainer) stackObserver.observe(stackContainer);

    const contactSection = document.getElementById("contact");
    const cosmicGlow = document.querySelector(".cosmic-light-glow");
    const contactObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.to(cosmicGlow, { opacity: 1, duration: 2.5, ease: "sine.inOut" });
                    cosmicGlow.classList.add("cosmic-active");
                }
            });
        },
        { threshold: 0.1 }
    );
    if (contactSection) contactObserver.observe(contactSection);

    document.querySelectorAll("nav a").forEach((link) => {
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
});
