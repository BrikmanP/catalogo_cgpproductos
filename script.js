// =========================================================================
// LUXURY PREMIUM CATALOG - JAVASCRIPT
// Magazine Editorial Interactions with Premium Micro-animations
// =========================================================================

// -------------------------------------------------------------------------
// DARK MODE LOGIC
// -------------------------------------------------------------------------

const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

/**
 * Toggle dark mode with smooth transition
 */
function toggleDarkMode() {
    html.classList.toggle('dark');

    // Persist user preference
    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    // Reinitialize icons after mode change
    lucide.createIcons();
}

/**
 * Load theme preference on page load
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
    }

    // Initialize Lucide icons
    lucide.createIcons();
}

// Attach event listener to toggle button
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// -------------------------------------------------------------------------
// PREMIUM SCROLL ANIMATIONS
// -------------------------------------------------------------------------

/**
 * Intersection Observer for fade-in animations
 * Triggers when elements come into viewport
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || '0';
            entry.target.style.animation = `fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms forwards`;
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => fadeObserver.observe(el));
});

// -------------------------------------------------------------------------
// SMOOTH NAVIGATION
// -------------------------------------------------------------------------

/**
 * Enhanced smooth scroll for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navHeight = 80; // Account for fixed nav
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// -------------------------------------------------------------------------
// PREMIUM NAVIGATION EFFECTS
// -------------------------------------------------------------------------

let lastScroll = 0;
const nav = document.querySelector('nav');

/**
 * Add premium scroll effects to navigation
 */
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        nav?.classList.add('shadow-md');
    } else {
        nav?.classList.remove('shadow-md');
    }

    lastScroll = currentScroll;
}, { passive: true });

// -------------------------------------------------------------------------
// IMAGE LAZY LOADING ENHANCEMENT
// -------------------------------------------------------------------------

/**
 * Add premium fade-in effect to images as they load
 */
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', function () {
            this.classList.add('loaded');
        });
    }
});

// -------------------------------------------------------------------------
// BADGE HOVER MICRO-INTERACTIONS
// -------------------------------------------------------------------------

/**
 * Add subtle premium hover effects to badges
 */
document.querySelectorAll('.badge, [class*="px-3 py-1"]').forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });

    badge.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// -------------------------------------------------------------------------
// INITIALIZE ON PAGE LOAD
// -------------------------------------------------------------------------

// Load theme preference
loadTheme();

// Add loaded class to body for entrance animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// -------------------------------------------------------------------------
// PREMIUM CURSOR INTERACTIONS
// -------------------------------------------------------------------------

/**
 * Add premium interaction feedback to clickable elements
 */
const interactiveElements = document.querySelectorAll('button, a, .clickable');

interactiveElements.forEach(el => {
    el.addEventListener('mousedown', function () {
        this.style.transform = 'scale(0.98)';
    });

    el.addEventListener('mouseup', function () {
        this.style.transform = 'scale(1)';
    });
});

// -------------------------------------------------------------------------
// ACCESSIBILITY ENHANCEMENTS
// -------------------------------------------------------------------------

/**
 * Ensure keyboard navigation is smooth
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// -------------------------------------------------------------------------
// PERFORMANCE OPTIMIZATION
// -------------------------------------------------------------------------

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// -------------------------------------------------------------------------
// MODAL GLASSMORPHISM PARA IMÁGENES
// -------------------------------------------------------------------------

/**
 * Modal para mostrar imágenes ampliadas con efecto glassmorphism
 */
function createImageModal() {
    // Crear modal overlay
    const modalHTML = `
        <div class="modal-overlay" id="imageModal">
            <div class="modal-content">
                <button class="modal-close" id="modalClose">×</button>
                <img src="" alt="" class="modal-image" id="modalImage">
                <div class="modal-info">
                    <h3 class="modal-title" id="modalTitle"></h3>
                    <p class="modal-subtitle" id="modalSubtitle"></p>
                    <p class="modal-description" id="modalDescription"></p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('imageModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDescription = document.getElementById('modalDescription');

    // Data de productos
    const productData = {
        detox: {
            title: 'Detox Green',
            subtitle: 'Manzana & Piña · 400g',
            description: 'Purifica tu cuerpo eliminando metales pesados con Chlorella. Desinflama gracias a la acción sistémica de la Cúrcuma. Con Espirulina, proteína de arveja, aguacate, espinaca y omega-3.'
        },
        coffee: {
            title: 'Collagen Coffee',
            subtitle: 'Café Colombiano & Vainilla',
            description: '13g de colágeno bovino por porción. Fortalece cabello y uñas desde la matriz celular. Energía sostenida con cafeína natural y proteína whey.'
        },
        marine: {
            title: 'Marine Elixir',
            subtitle: 'Vainilla & Resveratrol',
            description: '13g de colágeno marino hidrolizado por porción. Combate radicales libres y frena el fotoenvejecimiento. Péptidos bioactivos de bajo peso molecular para máxima asimilación.'
        },
        factor: {
            title: 'Factor Transfer',
            subtitle: 'Fresa & Shiitake · 400g',
            description: '5g de calostro bovino por porción. Prepara tu sistema inmune ante amenazas externas. Repara la barrera intestinal y optimiza la microbiota.'
        }
    };

    // Agregar event listeners a todas las imágenes de productos
    document.querySelectorAll('.image-container').forEach((container, index) => {
        container.addEventListener('click', function () {
            const img = this.querySelector('.image-premium');
            const productKeys = ['detox', 'coffee', 'marine', 'factor'];
            const product = productData[productKeys[index]];

            if (img && product) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalTitle.textContent = product.title;
                modalSubtitle.textContent = product.subtitle;
                modalDescription.textContent = product.description;
                modal.classList.add('active');
            }
        });
    });

    // Cerrar modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Cerrar al hacer click fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Inicializar modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', createImageModal);

// -------------------------------------------------------------------------
// SCROLL TO TOP BUTTON
// -------------------------------------------------------------------------

/**
 * Botón para volver al inicio del catálogo
 */
function createScrollToTopButton() {
    const buttonHTML = `
        <button class="scroll-to-top" id="scrollToTop" aria-label="Volver arriba">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </button>
    `;

    document.body.insertAdjacentHTML('beforeend', buttonHTML);

    const scrollBtn = document.getElementById('scrollToTop');

    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Scroll al inicio
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar botón scroll to top
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// -------------------------------------------------------------------------
// CONSOLE SIGNATURE (Premium Touch)
// -------------------------------------------------------------------------

console.log(
    '%cCajica Grupo%c\nPremium Supplements Catalog\n\nDesigned with care ✨',
    'font-size: 24px; font-weight: bold; color: #10b981;',
    'font-size: 12px; color: #6b7280;'
);