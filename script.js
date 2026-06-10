// 1. Animation au scroll (Reveal effect)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// On applique l'observation à toutes les sections et cartes
document.querySelectorAll('section, .work-card, .service-row, .review-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// 2. Gestion de la FAQ (Accordéon)
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        // On bascule la classe .open sur l'item cliqué
        item.classList.toggle('open');

        // Optionnel : Fermer les autres si tu veux qu'un seul soit ouvert à la fois
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('open');
            }
        });
    });
});

// 3. Smooth Scroll pour la navigation
// 3. Smooth Scroll uniquement pour les ancres internes (ex: #projets)
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // On vérifie si le lien commence par '#'
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        // Sinon (si c'est un lien vers une autre page .html), on ne fait rien 
        // et le navigateur chargera la nouvelle page normalement.
    });
});
// Gestion du Menu Burger
// On attend que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-links');
    const body = document.body;

    if (burger && nav) {
        burger.addEventListener('click', (e) => {
            e.preventDefault(); // Évite tout comportement parasite

            nav.classList.toggle('active');
            burger.classList.toggle('open');

            // Bloquer le scroll quand le menu est ouvert
            if (nav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Fermer le menu si on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('open');
                body.style.overflow = '';
            });
        });
    }
});
// Gestion de l'état actif dans la navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        // On récupère le nom du fichier dans le href (ex: index_Ui_antso.html)
        const linkHref = link.getAttribute('href');

        if (linkHref === currentUrl || (currentUrl === "" && linkHref === "index_Ui_antso.html")) {
            link.classList.add('active');
        }
    });
});
