document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const content = document.getElementById('content');

    function loadPage(page) {
        fetch(`./${page}.html`)
            .then(response => {
                if (!response.ok) throw new Error('Página no encontrada');
                return response.text();
            })
            .then(html => {
                content.innerHTML = html;

                const pageSection = content.querySelector('.page');
                if (pageSection) {
                    pageSection.classList.add('active');
                }

                animateCards();
                setupCTA();
            })
            .catch(err => {
                content.innerHTML = `<p>Error cargando la página.</p>`;
                console.error(err);
            });
    }

    function animateCards() {
        const cards = content.querySelectorAll('.project-card, .study-card, .timeline-item, .skill-card, .language-card, .interest-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }, index * 100);
        });
    }

    function setupCTA() {
        const cta = content.querySelector('.cta-button');
        if (cta) {
            cta.addEventListener('click', (e) => {
                e.preventDefault();
                const projectsLink = document.querySelector('[data-page="projects"]');
                projectsLink.click();
            });
        }
    }

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        if (navLinks.classList.contains('active')) {
            menuToggle.textContent = 'Cerrar';
            menuToggle.setAttribute('aria-label', 'Cerrar menú');
        } else {
            menuToggle.textContent = 'Menú';
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        }
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            navLinkItems.forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');

            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.textContent = 'Menú';
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            }

            const page = link.getAttribute('data-page');
            loadPage(page);
        });
    });

    loadPage('home');
});
