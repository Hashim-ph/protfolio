document.addEventListener("DOMContentLoaded", () => {
    // Custom Cursor
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding slight delay for outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for links/buttons
        const interactables = document.querySelectorAll("a, button, .bento-item");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });
            el.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });
        });

        // 3D Tilt Effect for Hero Image
        const imageWrapper = document.querySelector('.image-wrapper');
        if (imageWrapper) {
            imageWrapper.addEventListener('mousemove', (e) => {
                const rect = imageWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation (max 12 degrees)
                const rotateX = ((y - centerY) / centerY) * -12; 
                const rotateY = ((x - centerX) / centerX) * 12;
                
                imageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            imageWrapper.addEventListener('mouseenter', () => {
                imageWrapper.style.transition = 'none';
            });

            imageWrapper.addEventListener('mouseleave', () => {
                imageWrapper.style.transition = 'transform 0.5s ease';
                imageWrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        }
    }

    // Scroll Reveal Animations
    const revealElements = document.querySelectorAll(".reveal-text, .bento-item");
    
    // Initial states
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)";
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Staggered reveal for grid items
    revealElements.forEach((el, index) => {
        el.style.transitionDelay = `${(index % 10) * 0.1}s`;
        observer.observe(el);
    });
});
