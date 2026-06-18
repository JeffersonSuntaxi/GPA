// Cambiar el estilo del navbar al hacer scroll
const navbar = document.getElementById('navbar');
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        navbar.style.padding = '0.8rem 5%';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        navbar.style.padding = '1rem 5%';
    }
});

// Lógica para menú móvil (Hamburguesa)
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("btn-creditos");
    const caja = document.getElementById("caja-creditos");

    if (btn && caja) {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            // Si está oculto, lo mostramos; si no, lo ocultamos
            if (caja.style.display === "none" || caja.style.display === "") {
                caja.style.display = "block";
                caja.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else {
                caja.style.display = "none";
            }
        });
    } else {
        console.warn("No se encontraron los elementos necesarios (btn-creditos o caja-creditos).");
    }
});

