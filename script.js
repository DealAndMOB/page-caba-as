// Datos de ejemplo para los beats
const beats = [
    {
        title: "Purple Haze",
        genre: "Trap/R&B",
        price: "$49.99",
        image: "/api/placeholder/400/400",
        audioUrl: "audio/beat1.mp3",
        bpm: "140",
        key: "Am",
        tags: ["Melodic", "Dark", "Ambient"]
    },
    {
        title: "Neon Dreams",
        genre: "Hip Hop",
        price: "$39.99",
        image: "/api/placeholder/400/400",
        audioUrl: "audio/beat2.mp3",
        bpm: "95",
        key: "Fm",
        tags: ["Chill", "Lofi", "Smooth"]
    },
    {
        title: "Crystal Night",
        genre: "Pop/Trap",
        price: "$44.99",
        image: "/api/placeholder/400/400",
        audioUrl: "audio/beat3.mp3",
        bpm: "128",
        key: "Cm",
        tags: ["Energetic", "Modern", "Bass"]
    },
    {
        title: "Metro Vibes",
        genre: "R&B/Soul",
        price: "$54.99",
        image: "/api/placeholder/400/400",
        audioUrl: "audio/beat4.mp3",
        bpm: "85",
        key: "Gm",
        tags: ["Soulful", "Emotional", "Deep"]
    }
];

// Loader Mejorado
document.addEventListener('DOMContentLoaded', () => {
    // Simular carga de recursos
    let progress = 0;
    const progressBar = document.querySelector('.loader-progress');
    const loader = document.querySelector('.page-loader');

    const incrementProgress = () => {
        if (progress < 100) {
            progress += Math.random() * 30;
            progress = Math.min(progress, 100);
            progressBar.style.width = `${progress}%`;

            if (progress < 100) {
                setTimeout(incrementProgress, 200);
            } else {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.visibility = 'hidden';
                    // Iniciar animaciones de entrada
                    startEntryAnimations();
                }, 500);
            }
        }
    };

    setTimeout(incrementProgress, 500);
});

// Animaciones de entrada
function startEntryAnimations() {
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });
}

// Navbar Scroll Effect Mejorado
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Navbar appearance
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 1, 24, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(147, 51, 234, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 1, 24, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    // Hide/Show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 300) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Beats Container Population con Nueva UI
function createBeatCard(beat) {
    const tagsHtml = beat.tags.map(tag => `
        <span class="beat-tag">${tag}</span>
    `).join('');

    return `
        <div class="col-md-6 col-lg-3">
            <div class="beat-card fade-up">
                <div class="beat-image-container">
                    <img src="${beat.image}" alt="${beat.title}" class="beat-image">
                    <div class="beat-overlay">
                        <div class="beat-info">
                            <div class="beat-detail">
                                <i class="fas fa-music"></i> ${beat.bpm} BPM
                            </div>
                            <div class="beat-detail">
                                <i class="fas fa-key"></i> ${beat.key}
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="beat-title">${beat.title}</h3>
                <p class="beat-genre">${beat.genre}</p>
                <div class="beat-tags">
                    ${tagsHtml}
                </div>
                <p class="beat-price">${beat.price}</p>
                <div class="beat-player">
                    <audio class="custom-audio-player" controls>
                        <source src="${beat.audioUrl}" type="audio/mpeg">
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
        </div>
    `;
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('beat-card')) {
                entry.target.style.transitionDelay = '0.2s';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Inicializar observador para elementos fade-up
document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
});

// Smooth Scroll Mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Cerrar menú móvil si está abierto
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Audio Player Management Mejorado
let currentlyPlaying = null;
let previousVolume = 1;

document.addEventListener('play', function(e) {
    if (e.target.tagName.toLowerCase() === 'audio') {
        if (currentlyPlaying && currentlyPlaying !== e.target) {
            currentlyPlaying.pause();
        }
        currentlyPlaying = e.target;
        
        // Añadir clase active a la card del beat que se está reproduciendo
        const beatCards = document.querySelectorAll('.beat-card');
        beatCards.forEach(card => {
            const audioPlayer = card.querySelector('audio');
            if (audioPlayer === e.target) {
                card.classList.add('playing');
            } else {
                card.classList.remove('playing');
            }
        });
    }
}, true);

// Manejar cambios de volumen
document.addEventListener('volumechange', function(e) {
    if (e.target.tagName.toLowerCase() === 'audio') {
        previousVolume = e.target.volume;
    }
}, true);

// Parallax Effect Mejorado
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && window.innerWidth > 768) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        
        // Efecto parallax en el título
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Poblar contenedor de beats
    const beatsContainer = document.getElementById('beatsContainer');
    if (beatsContainer) {
        beats.forEach(beat => {
            beatsContainer.innerHTML += createBeatCard(beat);
        });
    }

    // Inicializar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Cursor personalizado (solo en dispositivos no táctiles)
if (!('ontouchstart' in window)) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Añadir efecto hover en elementos interactivos
    document.querySelectorAll('a, button, .beat-card').forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Typed Text Animation
document.addEventListener('DOMContentLoaded', function() {
    const texts = [
        "Creando sonidos únicos",
        "Diseñando el futuro del sonido",
        "Produciendo hits",
        "Mezclando géneros"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.querySelector('.typed-text');
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(type, 1000);
});

// Equalizer Animation
const equalizerBars = document.querySelectorAll('.equalizer .bar');
function updateEqualizer() {
    equalizerBars.forEach(bar => {
        const height = Math.random() * 40 + 20;
        bar.style.height = `${height}px`;
    });
}
setInterval(updateEqualizer, 150);

// Parallax Effect en partículas
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelector('.hero-particles');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    particles.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
});