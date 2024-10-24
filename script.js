// Sample beats data
const beats = [
    {
        title: "Dark Night",
        genre: "Trap",
        price: "$xx.xx",
        image: "images/dark-night.png",
        audioUrl: "audio/cancion.mp3"
    },
    {
        title: "Purple Haze",
        genre: "Hip Hop",
        price: "$xx.xx",
        image: "/api/placeholder/400/400",
        audioUrl: "audio/cancion.mp3"
    },
    {
        title: "Metro Vibes",
        genre: "R&B",
        price: "$xx.xx",
        image: "/api/placeholder/400/400",
        audioUrl: "audio/cancion.mp3"
    },
    {
        title: "Night Rider",
        genre: "Drill",
        price: "$xx.xx",
        image: "/api/placeholder/400/400",
        audioUrl: "audio/cancion.mp3"
    }
];

// Loader Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
});

// Paint Drip Effect
function createPaintDrip() {
    const drip = document.createElement('div');
    drip.className = 'paint-drip';
    drip.style.left = Math.random() * 100 + '%';
    document.body.appendChild(drip);
    
    setTimeout(() => {
        drip.remove();
    }, 3000);
}

setInterval(createPaintDrip, 500);

// Glow Effect Follow
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.glow');
    glow.style.left = e.clientX - 75 + 'px';
    glow.style.top = e.clientY - 75 + 'px';
});

// Función mejorada para crear beat cards con audio individual
function createBeatCard(beat, index) {
    return `
        <div class="col-md-6 col-lg-3">
            <div class="beat-card hover-glow" data-aos="fade-up" data-aos-delay="${index * 100}">
                <img src="${beat.image}" alt="${beat.title}" class="beat-image">
                <h3 class="beat-title">${beat.title}</h3>
                <p class="beat-genre">Género: ${beat.genre}</p>
                <p class="beat-price">${beat.price}</p>
                <div class="beat-player">
                    <audio id="audio-${index}" class="custom-audio-player w-100" controlsList="nodownload">
                        <source src="${beat.audioUrl}" type="audio/mpeg">
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
        </div>
    `;
}

// Función para manejar la reproducción de audio
function setupAudioPlayers() {
    const audioPlayers = document.querySelectorAll('audio');
    
    audioPlayers.forEach(player => {
        // Asegurarse de que el audio se pueda reproducir
        player.load();
        
        player.addEventListener('play', function() {
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player && !otherPlayer.paused) {
                    otherPlayer.pause();
                }
            });
        });

        // Mejorar controles de audio
        player.addEventListener('loadedmetadata', function() {
            player.controls = true;
        });

        // Manejar errores
        player.addEventListener('error', function(e) {
            console.error('Error loading audio:', e);
            this.closest('.beat-player').innerHTML = 'Error al cargar el audio. Intenta más tarde.';
        });
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Agregar loader
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    // Agregar efecto glow
    const glow = document.createElement('div');
    glow.className = 'glow';
    document.body.appendChild(glow);

    // Populate beats section
    const beatsContainer = document.getElementById('beatsContainer');
    beats.forEach((beat, index) => {
        beatsContainer.innerHTML += createBeatCard(beat, index);
    });

    // Setup audio players
    setupAudioPlayers();

    // Animación para elementos cuando aparecen en la vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar elementos para animaciones
    document.querySelectorAll('.beat-card, .section-title, .bio-text, .achievement-item').forEach((el) => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Efecto de "pintura chorreada" en scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const titles = document.querySelectorAll('.graffiti-text, .graffiti-subtitle');
        
        titles.forEach(title => {
            const speed = title.classList.contains('graffiti-subtitle') ? 0.02 : 0.01;
            const rotation = 1 + (scrolled * speed);
            const blur = scrolled * 0.01;
            
            title.style.transform = `rotate(-${rotation}deg)`;
            title.style.filter = `blur(${blur}px)`;
            title.style.textShadow = `
                2px ${2 + scrolled * 0.01}px 0 var(--primary-dark),
                4px ${4 + scrolled * 0.02}px 0 var(--primary-color),
                6px ${6 + scrolled * 0.03}px 10px rgba(0, 0, 0, 0.5)
            `;
        });

        // Navbar background change on scroll
        const navbar = document.querySelector('.navbar');
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});