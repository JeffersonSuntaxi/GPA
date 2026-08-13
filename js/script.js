document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const header = document.querySelector('.header');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    const pageKey = location.pathname.split('/').pop() || 'index.html';
    const pageContent = {
        'index.html': {
            eyebrow: 'Organización de la sociedad civil · Ecuador',
            title: 'Lo común vive en <span>lo diverso.</span>',
            text: 'Impulsamos participación, liderazgo e incidencia para construir una sociedad más justa, visible e inclusiva.',
            primary: ['Conoce nuestra historia', '#historia'],
            secondary: ['Ver proyectos', 'pages/proyectos.html']
        },
        'gpaviajero.html': {
            eyebrow: 'Conectamos territorios y experiencias',
            title: 'GPA <span>Viajero</span>',
            text: 'Articulamos voces, aprendizajes y alianzas desde Ecuador hacia América Latina y el mundo.',
            primary: ['Explorar Ecuador', '#nacional'],
            secondary: ['Ruta internacional', '#internacional']
        },
        'proyectos.html': {
            eyebrow: 'Ideas que se convierten en acción',
            title: 'Proyectos que <span>transforman</span>',
            text: 'Cultura, formación, comunicación y derechos humanos para fortalecer comunidades y nuevas generaciones.',
            primary: ['Descubrir proyectos', '#oratoria'],
            secondary: ['Nuestras alianzas', '#convenios']
        },
        'incidencia.html': {
            eyebrow: 'Participación política y social',
            title: 'Voces con <span>incidencia</span>',
            text: 'Abrimos espacios de diálogo y promovemos políticas públicas inclusivas desde lo local hasta lo regional.',
            primary: ['Conocer GPA Dialoga', '#gpa-dialoga'],
            secondary: ['Ver alcance', '#incidencia-main']
        },
        'noticias.html': {
            eyebrow: 'Actualidad, memoria y comunidad',
            title: 'Historias que <span>nos conectan</span>',
            text: 'Conoce las acciones, encuentros y momentos que construyen el camino de GPA.',
            primary: ['Ver noticias', '#noticias'],
            secondary: ['Abrir galería', '#galeria']
        },
        'contacto.html': {
            eyebrow: 'Hablemos y construyamos juntos',
            title: 'Tu voz también <span>cuenta</span>',
            text: 'Escríbenos para colaborar, participar o conocer más sobre nuestro trabajo.',
            primary: ['Enviar un mensaje', '.contacto-wrapper'],
            secondary: ['WhatsApp', 'https://api.whatsapp.com/send?phone=593963593763']
        }
    };

    const current = pageContent[pageKey] || pageContent['index.html'];

    // Barra de progreso y estado de navegación.
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    body.prepend(progress);

    const updateScrollUI = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
        header?.classList.toggle('scrolled', window.scrollY > 24);
    };

    updateScrollUI();
    window.addEventListener('scroll', updateScrollUI, { passive: true });

    // Hero enriquecido sin duplicar contenido en cada HTML.
    const hero = document.querySelector('.hero-viajero');
    if (hero) {
        const content = document.createElement('div');
        content.className = 'hero-content';
        content.innerHTML = `
            <span class="hero-eyebrow">${current.eyebrow}</span>
            <h1>${current.title}</h1>
            <p>${current.text}</p>
            <div class="hero-actions">
                <a class="hero-button" href="${current.primary[1]}">${current.primary[0]} <i class="fa-solid fa-arrow-right"></i></a>
                <a class="hero-button secondary" href="${current.secondary[1]}">${current.secondary[0]}</a>
            </div>
            <span class="hero-scroll">Desliza para descubrir</span>
        `;
        hero.appendChild(content);
    }

    // Marca automáticamente la sección activa del menú.
    document.querySelectorAll('.nav-link').forEach((link) => {
        const href = link.getAttribute('href') || '';
        const targetPage = href.split('#')[0].split('/').pop() || 'index.html';
        link.classList.toggle('active', targetPage === pageKey);
    });

    // Menú móvil accesible.
    const closeMenu = () => {
        menu?.classList.remove('show');
        toggle?.classList.remove('active');
        toggle?.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
    };

    if (toggle && menu) {
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-label', 'Abrir menú');
        toggle.setAttribute('aria-expanded', 'false');

        const toggleMenu = () => {
            const open = menu.classList.toggle('show');
            toggle.classList.toggle('active', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
            body.classList.toggle('menu-open', open);
        };

        toggle.addEventListener('click', toggleMenu);
        toggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMenu();
            }
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', (event) => {
                const parent = link.closest('.dropdown');
                if (window.innerWidth <= 1180 && parent && link.parentElement === parent) {
                    event.preventDefault();
                    parent.classList.toggle('open');
                    return;
                }
                closeMenu();
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1180) closeMenu();
        });
    }

    // Apariciones progresivas al entrar al viewport.
    const revealTargets = document.querySelectorAll(
        '.pilar-row, .pilar-compacto, .tarjeta-horizontal, .tarjeta-verde, .tarjeta-lugar, .atributo-item, .miembro, .noticia-content, .foto-galeria, .contacto-form-col, .contacto-info-col, .aliado-item'
    );
    revealTargets.forEach((element, index) => {
        element.classList.add('reveal');
        if (element.matches('.pilar-row, .pilar-compacto, .tarjeta-horizontal')) {
            element.classList.add(index % 2 ? 'reveal-right' : 'reveal-left');
        }
        element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, instance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    instance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
        revealTargets.forEach((element) => observer.observe(element));
    } else {
        revealTargets.forEach((element) => element.classList.add('visible'));
    }

    // Galería ampliable.
    const galleryImages = document.querySelectorAll('.foto-galeria img');
    if (galleryImages.length) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Vista ampliada de la galería');
        lightbox.innerHTML = '<button class="lightbox-close" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button><img alt="">';
        body.appendChild(lightbox);

        const preview = lightbox.querySelector('img');
        const closeLightbox = () => {
            lightbox.classList.remove('open');
            body.classList.remove('menu-open');
        };

        galleryImages.forEach((image) => {
            image.setAttribute('tabindex', '0');
            const open = () => {
                preview.src = image.src;
                preview.alt = image.alt;
                lightbox.classList.add('open');
                body.classList.add('menu-open');
                lightbox.querySelector('button').focus();
            };
            image.addEventListener('click', open);
            image.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') open();
            });
        });

        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox || event.target.closest('.lightbox-close')) closeLightbox();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeLightbox();
        });
    }

    // Créditos y formulario de contacto.
    const creditsButton = document.getElementById('btn-creditos');
    const creditsBox = document.getElementById('caja-creditos');
    if (creditsButton && creditsBox) {
        creditsButton.setAttribute('aria-expanded', 'false');
        creditsButton.addEventListener('click', () => {
            const visible = creditsBox.style.display === 'block';
            creditsBox.style.display = visible ? 'none' : 'block';
            creditsButton.setAttribute('aria-expanded', String(!visible));
            if (!visible) creditsBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    const form = document.getElementById('form-gpa');
    if (form) {
        const fields = form.querySelectorAll('input, textarea');
        const names = ['nombre', 'email', 'mensaje'];
        fields.forEach((field, index) => {
            if (!field.name) field.name = names[index] || `campo-${index}`;
            field.setAttribute('autocomplete', index === 0 ? 'name' : index === 1 ? 'email' : 'off');
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let status = form.querySelector('.form-status');
            if (!status) {
                status = document.createElement('p');
                status.className = 'form-status';
                status.setAttribute('role', 'status');
                form.appendChild(status);
            }
            status.textContent = 'Formulario listo. Para activar el envío se debe conectar un servicio de correo o backend.';
        });
    }

    // Mapa nacional de GPA Viajero.
    const mapaEcuador = document.getElementById('contenedor-mapa-ecuador');
    const panelProvincia = document.getElementById('panel-info');
    const nombreProvincia = document.getElementById('nombre-provincia');
    const contenidoProvincia = document.getElementById('contenido-provincia');

    if (mapaEcuador && panelProvincia && nombreProvincia && contenidoProvincia) {
        const provincias = {
            esmeraldas: {
                nombre: 'Esmeraldas',
                actividades: [
                    'Reunión de Trabajo y Taller de Fortalecimiento Organizacional para el Movimiento Afroecuatoriano Cimarrón (2017).',
                    'Programa de radio sobre la identidad y la conexión con el territorio (2017).',
                    'Desarrollo de Taller Amando Nuestra Cuerpa Afroecuatoriana, Proyecto Afropoderosas Ecuador, en Quinindé (2022).'
                ]
            },
            carchi: {
                nombre: 'Carchi',
                actividades: [
                    'Desarrollo de Taller Amando Nuestra Cuerpa Afroecuatoriana, Proyecto Afropoderosas Ecuador, en La Concepción (2022).'
                ]
            },
            imbabura: {
                nombre: 'Imbabura',
                actividades: [
                    'Entrega de donaciones para niños, en el marco de la iniciativa "Cajita de Zapatos" en coordinación con la Coalición Ciudadana de Organizaciones Sociales del Ecuador (CCOSE), en Urcuquí (2021).'
                ]
            },
            guayas: {
                nombre: 'Guayas',
                actividades: [
                    'Participación en el Foro Nacional de la Juventud Ecuatoriana (2018).',
                    'Reunión con Movimiento Afroecuatoriano.',
                    'Entrega de donaciones para niños.'
                ]
            },
            pichincha: {
                nombre: 'Pichincha',
                actividades: [
                    'Entrega de donaciones para niños en el marco de la iniciativa "Cajita de Zapatos".',
                    'Desarrollo del Taller Armando Nuestro Cuerpo Afroecuatoriano.'
                ]
            },
            manabi: {
                nombre: 'Manabí',
                actividades: [
                    'Taller "Redescubriendo la vida en comunidad", San Pedro de Cajape.',
                    'Entrega de donaciones para niños.'
                ]
            },
            eloro: {
                nombre: 'El Oro',
                actividades: [
                    'Entrega de donaciones para niños, en el marco de la iniciativa "Cajita de Zapatos" en coordinación con la Coalición Ciudadana de Organizaciones Sociales del Ecuador (CCOSE), en Machala y Puerto Bolívar (2021).'
                ]
            }
        };

        const zonas = mapaEcuador.querySelectorAll('.viajero-zona');
        const contenedorMapa = mapaEcuador.closest('.mapa-info-contenedor');
        let tooltipFijado = false;

        const limpiarZonas = () => zonas.forEach((zona) => zona.classList.remove('activa'));

        const mostrarProvincia = (zona) => {
            const info = provincias[zona.dataset.provincia];
            if (!info) return;

            limpiarZonas();
            zona.classList.add('activa');
            nombreProvincia.textContent = info.nombre;
            contenidoProvincia.innerHTML = `<ul>${info.actividades.map((actividad) => `<li>${actividad}</li>`).join('')}</ul>`;
            panelProvincia.classList.add('visible');
        };

        const ubicarTooltip = (clientX, clientY) => {
            const contenedorRect = contenedorMapa.getBoundingClientRect();
            const panelRect = panelProvincia.getBoundingClientRect();
            const margen = 12;
            let left = clientX - contenedorRect.left + 18;
            let top = clientY - contenedorRect.top + 18;

            if (left + panelRect.width > contenedorRect.width) {
                left = clientX - contenedorRect.left - panelRect.width - 18;
            }

            if (top + panelRect.height > contenedorRect.height) {
                top = clientY - contenedorRect.top - panelRect.height - 18;
            }

            panelProvincia.style.left = `${Math.max(margen, left)}px`;
            panelProvincia.style.top = `${Math.max(margen, top)}px`;
        };

        const ubicarTooltipEnZona = (zona) => {
            const rect = zona.getBoundingClientRect();
            ubicarTooltip(rect.left + rect.width / 2, rect.top + rect.height / 2);
        };

        const ocultarTooltip = () => {
            if (tooltipFijado) return;
            limpiarZonas();
            panelProvincia.classList.remove('visible');
        };

        zonas.forEach((zona) => {
            zona.addEventListener('pointerenter', (event) => {
                if (event.pointerType === 'touch') return;
                tooltipFijado = false;
                mostrarProvincia(zona);
                ubicarTooltip(event.clientX, event.clientY);
            });

            zona.addEventListener('pointermove', (event) => {
                if (!tooltipFijado && event.pointerType !== 'touch') {
                    ubicarTooltip(event.clientX, event.clientY);
                }
            });

            zona.addEventListener('pointerleave', ocultarTooltip);

            zona.addEventListener('click', (event) => {
                tooltipFijado = true;
                mostrarProvincia(zona);
                ubicarTooltip(event.clientX, event.clientY);
            });

            zona.addEventListener('focus', () => {
                tooltipFijado = false;
                mostrarProvincia(zona);
                ubicarTooltipEnZona(zona);
            });

            zona.addEventListener('blur', ocultarTooltip);
        });

        document.addEventListener('click', (event) => {
            if (mapaEcuador.contains(event.target)) return;
            tooltipFijado = false;
            ocultarTooltip();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                tooltipFijado = false;
                ocultarTooltip();
            }
        });
    }

    // Mapa internacional de GPA Viajero.
    const mapaMundo = document.getElementById('contenedor-mapa-mundo');
    const panelPais = document.getElementById('panel-info-mundo');
    const nombrePais = document.getElementById('nombre-pais');
    const contenidoPais = document.getElementById('contenido-pais');

    if (mapaMundo && panelPais && nombrePais && contenidoPais) {
        const paises = {
            CU: {
                nombre: 'Cuba',
                actividades: [
                    'La Habana: Participación en la I Escuela de Posgrado sobre el Decenio de los Pueblos Afrodescendientes (2017).'
                ]
            },
            BR: {
                nombre: 'Brasil',
                actividades: [
                    'Salvador de Bahía: Participación en el Foro Social Mundial (2018).'
                ]
            },
            CO: {
                nombre: 'Colombia',
                actividades: [
                    'Manizales: Participación en la III Bienal de Infancias y Juventudes - Universidad de Manizales (2018).',
                    'Bogotá: Participación en el Primer Encuentro Internacional de Investigadores y en el XI Congreso de la Asociación Latinoamericana de Población (2024).'
                ]
            },
            MX: {
                nombre: 'México',
                actividades: [
                    'Acapulco: Participación en el I Encuentro Regional de Afrodescendientes (2019).'
                ]
            },
            CH: {
                nombre: 'Suiza',
                actividades: [
                    'Geneve: Presentación del Informe de Coalición a los Miembros del Comité para la Eliminación de la Discriminación Racial (CERD) (2019).'
                ]
            }
        };

        const contenedorMapa = mapaMundo.closest('.mapa-info-contenedor');
        const zonasPais = Object.keys(paises)
            .map((codigo) => mapaMundo.querySelector(`#${codigo}`))
            .filter(Boolean);
        let tooltipFijado = false;

        zonasPais.forEach((pais) => {
            pais.classList.add('viajero-pais');
            pais.dataset.pais = pais.id;
            pais.setAttribute('tabindex', '0');
            pais.setAttribute('role', 'button');
            pais.setAttribute('aria-label', paises[pais.id].nombre);
        });

        const limpiarPaises = () => zonasPais.forEach((pais) => pais.classList.remove('activa'));

        const mostrarPais = (pais) => {
            const info = paises[pais.dataset.pais];
            if (!info) return;

            limpiarPaises();
            pais.classList.add('activa');
            nombrePais.textContent = info.nombre;
            contenidoPais.innerHTML = `<ul>${info.actividades.map((actividad) => `<li>${actividad}</li>`).join('')}</ul>`;
            panelPais.classList.add('visible');
        };

        const ubicarTooltip = (clientX, clientY) => {
            const contenedorRect = contenedorMapa.getBoundingClientRect();
            const panelRect = panelPais.getBoundingClientRect();
            const margen = 12;
            let left = clientX - contenedorRect.left + 18;
            let top = clientY - contenedorRect.top + 18;

            if (left + panelRect.width > contenedorRect.width) {
                left = clientX - contenedorRect.left - panelRect.width - 18;
            }

            if (top + panelRect.height > contenedorRect.height) {
                top = clientY - contenedorRect.top - panelRect.height - 18;
            }

            panelPais.style.left = `${Math.max(margen, left)}px`;
            panelPais.style.top = `${Math.max(margen, top)}px`;
        };

        const ubicarTooltipEnPais = (pais) => {
            const rect = pais.getBoundingClientRect();
            ubicarTooltip(rect.left + rect.width / 2, rect.top + rect.height / 2);
        };

        const ocultarTooltip = () => {
            if (tooltipFijado) return;
            limpiarPaises();
            panelPais.classList.remove('visible');
        };

        zonasPais.forEach((pais) => {
            pais.addEventListener('pointerenter', (event) => {
                if (event.pointerType === 'touch') return;
                tooltipFijado = false;
                mostrarPais(pais);
                ubicarTooltip(event.clientX, event.clientY);
            });

            pais.addEventListener('pointermove', (event) => {
                if (!tooltipFijado && event.pointerType !== 'touch') {
                    ubicarTooltip(event.clientX, event.clientY);
                }
            });

            pais.addEventListener('pointerleave', ocultarTooltip);

            pais.addEventListener('click', (event) => {
                tooltipFijado = true;
                mostrarPais(pais);
                ubicarTooltip(event.clientX, event.clientY);
            });

            pais.addEventListener('focus', () => {
                tooltipFijado = false;
                mostrarPais(pais);
                ubicarTooltipEnPais(pais);
            });

            pais.addEventListener('blur', ocultarTooltip);
        });

        document.addEventListener('click', (event) => {
            if (mapaMundo.contains(event.target)) return;
            tooltipFijado = false;
            ocultarTooltip();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                tooltipFijado = false;
                ocultarTooltip();
            }
        });
    }

    // Pie consistente en todas las páginas.
    document.querySelectorAll('.footer-gris .container').forEach((footer) => {
        if (!footer.querySelector('.footer-tagline')) {
            const tagline = document.createElement('p');
            tagline.className = 'footer-tagline';
            tagline.textContent = 'Promovemos participación, identidad y justicia social desde la diversidad.';
            const socials = document.createElement('div');
            socials.className = 'footer-socials';
            socials.innerHTML = `
                <a href="https://www.facebook.com/gpafroficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/gpafroficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://x.com/gpafroficial" target="_blank" rel="noopener noreferrer" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="https://api.whatsapp.com/send?phone=593963593763" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            `;
            const copyright = footer.querySelector('.footer-copyright');
            copyright?.before(tagline, socials);
            if (copyright) copyright.textContent = `© ${new Date().getFullYear()} GPA Ecuador. Todos los derechos reservados.`;
        }
    });
});
