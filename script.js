document.addEventListener("DOMContentLoaded", () => {
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
                        ease: "power2.inOut",
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
        { threshold: 0.05 }
    );

    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(15px)";
        section.style.transition = "all 0.6s cubic-bezier(0.2, 1, 0.3, 1)";
        observer.observe(section);
    });
});
