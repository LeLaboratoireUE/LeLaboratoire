// ==========================================
// ANIMATIONS BACKGROUND UNIQUEMENT
// ==========================================

class InteractiveAnimations {
    constructor() {
        this.particles = [];
        this.cursor = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createCustomCursor();
        this.createParticleSystem();
        this.setupMouseTracking();
        this.setupInteractivePotions();
        this.animateBackground();
        
        // Attendre que le DOM soit prêt pour les animations spécifiques à index.html
        if (document.querySelector('.hero')) {
            setTimeout(() => this.setupIndexAnimations(), 100);
        }
    }

    createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        document.body.appendChild(cursor);

        // Suivre le mouvement de la souris
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Effet au clic
        document.addEventListener('mousedown', () => {
            cursor.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('clicking');
        });

        // Effet hover sur éléments interactifs
        const interactiveElements = 'a, button, .btn, .product-card, .potion, .clickable-pill, .cart-item, .nav-link';
        
        const addHoverEffect = () => {
            document.querySelectorAll(interactiveElements).forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('hovering');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hovering');
                });
            });
        };

        // Ajouter les effets immédiatement
        addHoverEffect();
        
        // Et après chaque changement du DOM
        const observer = new MutationObserver(addHoverEffect);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.cursor = { x: e.clientX, y: e.clientY };
        });
    }

    createParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: this.getRandomColor(),
                alpha: Math.random() * 0.3 + 0.2
            });
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                if (particle.life !== undefined) {
                    particle.life--;
                    if (particle.life <= 0) {
                        particle.alpha -= 0.02;
                    }
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.alpha;
                ctx.fill();
            });

            this.particles = this.particles.filter(p => p.alpha > 0);
            
            ctx.globalAlpha = 1;
            requestAnimationFrame(animateParticles);
        };
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    createExplosion(x, y, count = 20, color = null) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 3 + 2;
            this.particles.push({
                x: x,
                y: y,
                size: Math.random() * 3 + 2,
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                color: color || this.getRandomColor(),
                alpha: 0.8,
                life: 100
            });
        }
    }

    createPowderFall(x, y, count = 30) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 50,
                y: y,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 2,
                speedY: Math.random() * 3 + 1,
                color: '#ffffff',
                alpha: Math.random() * 0.5 + 0.3,
                life: 150
            });
        }
    }

    getRandomColor() {
        const colors = ['#00d4ff', '#ff6b9d', '#00ff88', '#a855f7'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupInteractivePotions() {
        const potions = document.querySelectorAll('.potion');
        
        potions.forEach((potion, index) => {
            potion.style.cursor = 'pointer';
            
            potion.addEventListener('mouseenter', () => {
                if (!potion.classList.contains('exploded')) {
                    potion.style.transform = 'scale(1.1)';
                    potion.style.filter = 'brightness(1.2) drop-shadow(0 0 30px currentColor)';
                }
            });

            potion.addEventListener('mouseleave', () => {
                if (!potion.classList.contains('exploded')) {
                    potion.style.transform = '';
                    potion.style.filter = 'drop-shadow(0 0 20px currentColor)';
                }
            });

            potion.addEventListener('click', (e) => {
                if (potion.classList.contains('exploded')) return;
                
                console.log('🧪 Fiole cliquée !');
                const rect = potion.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                potion.classList.add('exploded');
                potion.style.animation = 'explode 0.5s ease-out forwards';
                potion.style.pointerEvents = 'none';
                
                this.createExplosion(x, y, 30);
                
                // Ne pas restaurer l'animation
                setTimeout(() => {
                    potion.style.opacity = '0';
                }, 500);
            });
        });

        if (!document.getElementById('explode-animation')) {
            const style = document.createElement('style');
            style.id = 'explode-animation';
            style.textContent = `
                @keyframes explode {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.5); opacity: 0.5; }
                    100% { transform: scale(0.5); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    animateBackground() {
        const hero = document.querySelector('.hero-background');
        if (hero) {
            let hue = 0;
            setInterval(() => {
                hue = (hue + 1) % 360;
                hero.style.background = `
                    radial-gradient(circle at 20% 50%, hsla(${hue}, 80%, 60%, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 80% 50%, hsla(${(hue + 180) % 360}, 80%, 60%, 0.08) 0%, transparent 50%)
                `;
            }, 100);
        }
    }

    setupIndexAnimations() {
        const hero = document.querySelector('.hero-background');
        if (!hero) return;

        console.log('🎮 Création des pilules interactives...');

        const pills = ['💊', '💊', '💊'];
        pills.forEach((emoji, i) => {
            const pill = document.createElement('div');
            pill.className = 'clickable-pill';
            pill.innerHTML = emoji;
            pill.style.cssText = `
                position: absolute;
                font-size: 3rem;
                cursor: pointer;
                left: ${20 + i * 30}%;
                top: ${30 + i * 20}%;
                animation: floatPill ${4 + i}s ease-in-out infinite;
                filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6));
                transition: transform 0.3s ease;
                z-index: 5;
            `;
            
            pill.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(10deg)';
            });
            
            pill.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
            
            pill.addEventListener('click', (e) => {
                if (pill.classList.contains('opened')) return;
                
                console.log('💊 Pilule cliquée !');
                const rect = pill.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                pill.classList.add('opened');
                pill.style.animation = 'pillOpen 0.6s ease-out forwards';
                pill.style.pointerEvents = 'none';
                
                this.createPowderFall(x, y, 40);
                
                // Ne pas restaurer l'animation
                setTimeout(() => {
                    pill.style.opacity = '0';
                }, 600);
            });
            
            hero.appendChild(pill);
        });

        // Ajouter les keyframes
        if (!document.getElementById('pill-animations')) {
            const style = document.createElement('style');
            style.id = 'pill-animations';
            style.textContent = `
                @keyframes floatPill {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                @keyframes pillOpen {
                    0% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.3) rotate(90deg); }
                    100% { transform: scale(1) rotate(180deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.animationsInstance = new InteractiveAnimations();
        console.log('🎨 Animations background activées !');
    }, 100);
});
