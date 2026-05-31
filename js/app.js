document.addEventListener('DOMContentLoaded', () => {

    // ===== THEME TOGGLE =====
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light' && themeIcon) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let targetTheme = 'light';
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                targetTheme = 'dark';
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }

            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ===== TYPING EFFECT FOR HERO TITLE =====
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ["Data Analyst", "AI Enthusiast", "Analytics Engineer", "Databricks Expert"];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    const type = () => {
        if (!typedTextSpan) return;
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    };

    const erase = () => {
        if (!typedTextSpan) return;
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    };

    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    // ===== SCROLL SPY ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.cta)');

    const scrollSpy = () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.project-card, .bento-item, .contact-card, .section-header');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // ===== SMOOTH ANCHOR SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ===== CUSTOM CURSOR =====
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    // Detect if device supports hover
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instantly move dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth outline follow
        const animateCursor = () => {
            let dx = mouseX - outlineX;
            let dy = mouseY - outlineY;

            outlineX += dx * 0.15; // smooth factor
            outlineY += dy * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        // Hover states
        const hoverElements = document.querySelectorAll('a, button, .magnetic, .b-icon');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // ===== MAGNETIC ELEMENTS =====
    const magneticElements = document.querySelectorAll('.magnetic');
    if (!isTouchDevice) {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const position = el.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;

                // strength from data attribute or default
                const strength = el.getAttribute('data-strength') || 20;

                el.style.transform = `translate(${x / position.width * strength}px, ${y / position.height * strength}px)`;
                el.style.transition = 'transform 0.1s linear';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px)';
                el.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    // ===== HERO PARALLAX =====
    const parallaxContainer = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.layer');
    if (!isTouchDevice && parallaxContainer) {
        parallaxContainer.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX) / 2;
            const y = (window.innerHeight - e.pageY) / 2;

            layers.forEach(layer => {
                const speed = layer.getAttribute('data-speed') || 0.05;
                const xOffset = x * speed;
                const yOffset = y * speed;
                layer.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
        parallaxContainer.addEventListener('mouseleave', () => {
            layers.forEach(layer => {
                layer.style.transform = `translate(0px, 0px)`;
                layer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
        parallaxContainer.addEventListener('mouseenter', () => {
            layers.forEach(layer => {
                layer.style.transition = 'none';
            });
        });
    }
});
