document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scroll para Navegación
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: targetSection, autoKill: false },
                ease: "power4.inOut",
            });
        });
    });

    // Intersection Observer para animaciones de entrada
    const sections = document.querySelectorAll("section");
    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(32px)";
        section.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
        observer.observe(section);
    });
});
