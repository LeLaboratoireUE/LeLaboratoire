// ==========================================
// CONFIGURATION & DONNÉES
// ==========================================

const products = [
    {
        id: 1,
        name: "Sérum Expérimental X-7",
        category: "Composé Premium",
        description: "Un composé révolutionnaire développé dans nos installations de recherche avancées. Ce sérum expérimental offre des propriétés uniques pour vos expériences scientifiques.",
        price: 0.005,
        currency: "ETH",
        icon: "🧪",
        badge: "Nouveau",
        specs: {
            purity: "99.9%",
            volume: "100ml",
            stability: "-20°C à +25°C",
            shelf_life: "24 mois",
            certification: "ISO 9001"
        },
        longDescription: "Ce sérum expérimental de grade laboratoire offre des propriétés uniques pour vos recherches. Synthétisé selon les normes GMP les plus strictes, chaque lot est accompagné d'un certificat d'analyse complet incluant les résultats HPLC et GC-MS."
    }
];

const cryptoAddresses = {
    ETH: {
        name: "Ethereum",
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8",
        icon: "Ξ"
    },
    BTC: {
        name: "Bitcoin",
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        icon: "₿"
    },
    USDT: {
        name: "USDT (ERC-20)",
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8",
        icon: "₮"
    },
    BNB: {
        name: "BNB (BSC)",
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8",
        icon: "◆"
    }
};

// État de l'application
let cart = [];
let selectedCrypto = null;

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderProducts();
    setupEventListeners();
    setupMoleculeAnimation();
    loadCart();
    updateCartCount();
}

// ==========================================
// ANIMATIONS
// ==========================================

function setupMoleculeAnimation() {
    const container = document.getElementById('moleculeContainer');
    if (!container) return;

    // Créer des molécules animées
    for (let i = 0; i < 20; i++) {
        const molecule = document.createElement('div');
        molecule.className = 'molecule';
        molecule.style.cssText = `
            position: absolute;
            width: ${Math.random() * 30 + 20}px;
            height: ${Math.random() * 30 + 20}px;
            background: radial-gradient(circle, rgba(0,102,255,0.3), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(molecule);
    }

    // Animation CSS dynamique
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(30px, -30px) rotate(90deg);
            }
            50% {
                transform: translate(-20px, 20px) rotate(180deg);
            }
            75% {
                transform: translate(40px, 10px) rotate(270deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Effet de parallaxe au scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function handleScroll() {
    const scrolled = window.pageYOffset;
    const moleculeContainer = document.getElementById('moleculeContainer');
    
    if (moleculeContainer) {
        moleculeContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// ==========================================
// GESTION DES PRODUITS
// ==========================================

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image-container">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image-icon">${product.icon}</div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-specs">
                    <span class="spec-tag">Pureté: ${product.specs.purity}</span>
                    <span class="spec-tag">${product.specs.volume}</span>
                </div>
                <div class="product-footer">
                    <div>
                        <div class="product-price">${product.price} ${product.currency}</div>
                        <div class="product-price-label">Prix TTC</div>
                    </div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="product-modal-grid">
            <div class="product-modal-image">
                <div style="font-size: 10rem;">${product.icon}</div>
            </div>
            <div class="product-modal-details">
                <span class="product-category">${product.category}</span>
                <h2>${product.name}</h2>
                <div class="product-modal-price">${product.price} ${product.currency}</div>
                
                <p style="color: var(--text-secondary); margin: 1rem 0; line-height: 1.8;">
                    ${product.longDescription}
                </p>

                <h3 style="margin: 2rem 0 1rem 0; font-size: 1.25rem;">Spécifications Techniques</h3>
                <ul class="product-specs-list">
                    ${Object.entries(product.specs).map(([key, value]) => `
                        <li>
                            <span class="spec-label">${formatSpecLabel(key)}</span>
                            <span class="spec-value">${value}</span>
                        </li>
                    `).join('')}
                </ul>

                <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                    <button class="btn btn-primary" style="flex: 1;" onclick="addToCart(${product.id}); closeProductModal();">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Ajouter au panier
                    </button>
                </div>

                <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                    <p style="font-size: 0.875rem; color: var(--text-secondary);">
                        <strong>⚠️ Information importante:</strong> Ce produit est destiné exclusivement 
                        à la recherche scientifique et aux applications en laboratoire. Respectez toutes 
                        les normes de sécurité en vigueur.
                    </p>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function formatSpecLabel(key) {
    const labels = {
        purity: 'Pureté',
        volume: 'Volume',
        stability: 'Stabilité thermique',
        shelf_life: 'Durée de conservation',
        certification: 'Certification'
    };
    return labels[key] || key;
}

// ==========================================
// GESTION DU PANIER
// ==========================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} ajouté au panier`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const countElement = document.getElementById('cartCount');
    if (countElement) {
        countElement.textContent = count;
    }
}

function openCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCart();
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                <p>Votre panier est vide</p>
            </div>
        `;
        totalPriceElement.textContent = '0.000 ETH';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} ${item.currency}</div>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">Quantité: ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Retirer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = `${total.toFixed(3)} ETH`;
}

function saveCart() {
    localStorage.setItem('labCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('labCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// ==========================================
// GESTION DU PAIEMENT
// ==========================================

function openPayment() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide', 'error');
        return;
    }

    closeCart();
    const modal = document.getElementById('paymentModal');
    const paymentContent = document.getElementById('paymentContent');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    paymentContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 3rem; color: var(--primary); font-weight: 800;">
                ${total.toFixed(3)} ETH
            </div>
            <p style="color: var(--text-secondary);">Montant total à payer</p>
        </div>

        <h3 style="margin-bottom: 1rem;">Sélectionnez une cryptomonnaie:</h3>
        <div class="crypto-options">
            ${Object.entries(cryptoAddresses).map(([key, crypto]) => `
                <div class="crypto-option" onclick="selectCrypto('${key}')">
                    <div class="crypto-icon">${crypto.icon}</div>
                    <div class="crypto-name">${crypto.name}</div>
                </div>
            `).join('')}
        </div>

        ${Object.entries(cryptoAddresses).map(([key, crypto]) => `
            <div class="payment-address-section" id="address-${key}">
                <h4 style="margin-bottom: 1rem;">Adresse de paiement ${crypto.name}</h4>
                <div class="payment-address">${crypto.address}</div>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem;">
                    Montant: ${total.toFixed(3)} ETH
                    ${key !== 'ETH' ? ' (équivalent approximatif)' : ''}
                </p>
            </div>
        `).join('')}

        <div class="payment-instructions">
            <h4>📋 Instructions de paiement</h4>
            <ol>
                <li>Sélectionnez votre cryptomonnaie préférée ci-dessus</li>
                <li>Envoyez le montant exact à l'adresse affichée</li>
                <li>Conservez votre hash/ID de transaction</li>
                <li>Envoyez un email à <strong>commande@lelaboratoire.com</strong> avec:
                    <ul style="margin-top: 0.5rem; margin-left: 1rem;">
                        <li>Votre hash de transaction</li>
                        <li>Vos coordonnées de livraison</li>
                        <li>Numéro de commande: LAB-${Date.now()}</li>
                    </ul>
                </li>
                <li>Nous traiterons votre commande sous 24-48h après confirmation</li>
            </ol>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: rgba(255, 51, 102, 0.1); border-radius: var(--radius-md); border-left: 4px solid var(--accent);">
            <p style="font-size: 0.875rem; color: var(--text-primary);">
                <strong>⚠️ Important:</strong> Assurez-vous d'envoyer le montant exact à la bonne adresse. 
                Les transactions blockchain sont irréversibles. En cas de doute, contactez-nous avant d'effectuer le paiement.
            </p>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePayment() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedCrypto = null;
}

function selectCrypto(crypto) {
    selectedCrypto = crypto;

    // Retirer la classe selected de toutes les options
    document.querySelectorAll('.crypto-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Ajouter la classe selected à l'option choisie
    event.currentTarget.classList.add('selected');

    // Cacher toutes les sections d'adresse
    document.querySelectorAll('.payment-address-section').forEach(section => {
        section.classList.remove('active');
    });

    // Afficher la section d'adresse correspondante
    const addressSection = document.getElementById(`address-${crypto}`);
    if (addressSection) {
        addressSection.classList.add('active');
    }
}

// ==========================================
// ÉVÉNEMENTS & NAVIGATION
// ==========================================

function setupEventListeners() {
    // Navigation mobile
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Panier
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }

    // Fermeture des modals
    document.getElementById('modalClose')?.addEventListener('click', closeProductModal);
    document.getElementById('modalOverlay')?.addEventListener('click', closeProductModal);
    
    document.getElementById('cartModalClose')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
    
    document.getElementById('paymentModalClose')?.addEventListener('click', closePayment);
    document.getElementById('paymentOverlay')?.addEventListener('click', closePayment);

    // Bouton checkout
    document.getElementById('checkoutBtn')?.addEventListener('click', openPayment);

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Navigation smooth scroll
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

    // Fermeture des modals avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
            closeCart();
            closePayment();
        }
    });
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    showNotification('Message envoyé avec succès! Nous vous répondrons bientôt.', 'success');
    e.target.reset();
}

// ==========================================
// NOTIFICATIONS
// ==========================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--secondary)' : 'var(--accent)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animations pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ==========================================
// UTILITAIRES
// ==========================================

// Formatage des nombres
function formatPrice(price, decimals = 3) {
    return price.toFixed(decimals);
}

// Copie dans le presse-papier
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Adresse copiée dans le presse-papier!');
    });
}

// Validation email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

console.log('🧪 Le Laboratoire - Application initialisée');
console.log('📦 Produits chargés:', products.length);
console.log('🛒 Panier chargé:', cart.length, 'articles');