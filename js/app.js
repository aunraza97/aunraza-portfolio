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

    // ===== PROFILE VIEW TOGGLE =====
    const toggleContainers = document.querySelectorAll('.profile-toggle-container');
    const projectListItemsNodeList = document.querySelectorAll('.project-list-item');
    const projectDetailPanelsNodeList = document.querySelectorAll('.project-detail-panel');

    const updateProfileView = (profileType) => {
        // Update body attribute for CSS visibility
        document.body.setAttribute('data-active-profile', profileType);

        // Update active class on buttons across all toggles
        toggleContainers.forEach(container => {
            const btns = container.querySelectorAll('.profile-toggle-btn');
            const slider = container.querySelector('.profile-toggle-slider');
            
            btns.forEach(btn => btn.classList.remove('active'));
            
            const activeBtn = Array.from(btns).find(b => b.getAttribute('data-target') === profileType);
            if (activeBtn) {
                activeBtn.classList.add('active');
                if (slider) {
                    const paddingLeft = parseFloat(window.getComputedStyle(container).paddingLeft) || 4.8;
                    slider.style.width = `${activeBtn.offsetWidth}px`;
                    slider.style.transform = `translateX(${activeBtn.offsetLeft - paddingLeft}px)`;
                }
            }
        });

        // Auto-select first project in the active profile
        const firstActiveItem = Array.from(projectListItemsNodeList).find(
            item => item.getAttribute('data-profile') === profileType
        );

        if (firstActiveItem) {
            // Remove active class from all
            projectListItemsNodeList.forEach(i => i.classList.remove('active'));
            projectDetailPanelsNodeList.forEach(p => p.classList.remove('active'));

            // Add active to first item
            firstActiveItem.classList.add('active');
            const targetPanel = document.getElementById(`proj-${firstActiveItem.getAttribute('data-project')}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        }
    };

    if (toggleContainers.length > 0) {
        // Initialize slider position
        setTimeout(() => {
            const initialActive = document.querySelector('.profile-toggle-btn.active');
            const targetProfile = initialActive ? initialActive.getAttribute('data-target') : 'data';
            updateProfileView(targetProfile);
        }, 100); // small delay to ensure fonts/layout are loaded for accurate width

        window.addEventListener('resize', () => {
            const currentProfile = document.body.getAttribute('data-active-profile') || 'data';
            updateProfileView(currentProfile);
        });

        toggleContainers.forEach(container => {
            const btns = container.querySelectorAll('.profile-toggle-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetProfile = btn.getAttribute('data-target');
                    if (targetProfile) {
                        updateProfileView(targetProfile);
                    }
                });
            });
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
    const textArray = [
        "Data Analyst",
        "AI Enthusiast",
        "Power BI Consultant",
        "Analytics Engineer",
        "Databricks Expert"
    ];
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
        
        // Navbar scrolled state
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

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
    const revealElements = document.querySelectorAll('.contact-card, .section-header');
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

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            hamburger.classList.toggle('open');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('open');
            });
        });
    }

    // ===== PROJECT SPLIT PANEL =====
    const projectListItems = document.querySelectorAll('.project-list-item');
    const projectDetailPanels = document.querySelectorAll('.project-detail-panel');
    const detailWrapper = document.querySelector('.projects-detail-wrapper');

    // Move panels based on screen size
    const arrangeProjectPanels = () => {
        if (window.innerWidth <= 1024) {
            // Move panels directly under their corresponding list items
            projectListItems.forEach(item => {
                const targetId = item.getAttribute('data-project');
                const targetPanel = document.getElementById(`proj-${targetId}`);
                if (targetPanel) {
                    item.after(targetPanel);
                }
            });
        } else {
            // Move panels back to the detail wrapper
            if (detailWrapper) {
                projectDetailPanels.forEach(panel => {
                    detailWrapper.appendChild(panel);
                });
            }
        }
    };

    // Run on load and on resize
    arrangeProjectPanels();
    window.addEventListener('resize', arrangeProjectPanels);

    projectListItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-project');

            // Update active list item
            projectListItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Swap active detail panel
            projectDetailPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`proj-${targetId}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Auto-scroll on mobile/tablet
                if (window.innerWidth <= 1024) {
                    // Offset by 100px so the fixed navbar doesn't cover it
                    const y = item.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({top: y, behavior: 'smooth'});
                }
            }
        });
    });

    // ===== DATA NETWORK CANVAS EFFECT =====
    const networkCanvas = document.getElementById('data-network-canvas');
    if (networkCanvas) {
        const ctx = networkCanvas.getContext('2d');
        const container = document.querySelector('.hero-right');
        
        let width, height;
        let particles = [];
        
        // Mouse tracking
        let mouse = { x: null, y: null, radius: 150 };

        container.addEventListener('mousemove', (e) => {
            const rect = networkCanvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        container.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function resizeCanvas() {
            width = container.clientWidth;
            height = container.clientHeight;
            networkCanvas.width = width;
            networkCanvas.height = height;
            initParticles();
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
            }
            draw() {
                ctx.fillStyle = 'rgba(139, 92, 246, 0.4)'; // Violet tint
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }
        }

        function initParticles() {
            particles = [];
            const numberOfParticles = Math.floor((width * height) / 9000);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function connect() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = dx * dx + dy * dy;

                    // Connect particles to each other
                    if (distance < 7000) {
                        let opacityValue = 1 - (distance / 7000);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue * 0.25})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }

                // Connect particles to mouse
                if (mouse.x != null) {
                    let dx = particles[a].x - mouse.x;
                    let dy = particles[a].y - mouse.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        let opacityValue = 1 - (distance / mouse.radius);
                        ctx.strokeStyle = `rgba(16, 185, 129, ${opacityValue * 0.6})`; // Emerald connection to mouse
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connect();
        }

        // Initialize
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }

    // ===== RESUME MODAL LOGIC =====
    const resumeBtn = document.getElementById('hero-resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const resumeModalClose = document.getElementById('resume-modal-close');

    if (resumeBtn && resumeModal && resumeModalClose) {
        const openModal = (e) => {
            e.preventDefault();
            resumeModal.classList.add('show');
        };

        const closeModal = () => {
            resumeModal.classList.remove('show');
        };

        // Open modal
        resumeBtn.addEventListener('click', openModal);

        // Close on X click
        resumeModalClose.addEventListener('click', closeModal);

        // Close on outside click
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });

        // Close on Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('show')) {
                closeModal();
            }
        });
    }

});
